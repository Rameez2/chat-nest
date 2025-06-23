'use client';

import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';

export default function ManualWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [peer, setPeer] = useState(null);
  const [yourSDP, setYourSDP] = useState('');
  const [remoteSDP, setRemoteSDP] = useState('');
  const [stream, setStream] = useState(null);
  const [connected, setConnected] = useState(false);
  const [logs, setLogs] = useState([]);

  const log = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
        log('✅ Local media stream acquired.');
      })
      .catch((err) => {
        log('❌ Failed to get media: ' + err.message);
      });
  }, []);

  const createPeer = (initiator) => {
    if (!stream) {
      log('⚠️ Media stream not ready.');
      return;
    }

    log(initiator ? '🚀 Initiator started.' : '📥 Receiver started.');

    const newPeer = new Peer({
      initiator: initiator,
      trickle: false,
      stream: stream,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          {
            urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
            username: 'webrtc',
            credential: 'webrtc',
          },
        ],
      },
    });

    newPeer.on('signal', (data) => {
      setYourSDP(JSON.stringify(data, null, 2));
      log('📤 Local SDP generated.');
    });

    newPeer.on('stream', (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
        setConnected(true);
        log('🎥 Remote stream received. Connection established!');
      }
    });

    newPeer.on('error', (err) => {
      log('❌ Peer error: ' + err.message);
    });

    newPeer.on('connect', () => {
      log('🔗 Data connection established.');
    });

    setPeer(newPeer);
  };

  const handleRemoteSignal = () => {
    if (!peer) {
      alert("Create or receive a peer first.");
      return;
    }

    try {
      log('📥 Remote SDP submitted.');
      const signal = JSON.parse(remoteSDP);
      peer.signal(signal);
    } catch (err) {
      log('❌ Failed to parse remote SDP.');
      alert("Invalid SDP format.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Manual WebRTC with Simple-Peer (JS)</h2>

      <div className="flex space-x-4">
        <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2 border rounded" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border rounded" />
      </div>

      <div className="space-x-2">
        <button onClick={() => createPeer(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Start as Initiator</button>
        <button onClick={() => createPeer(false)} className="bg-green-500 text-white px-4 py-2 rounded">Start as Receiver</button>
        <button onClick={handleRemoteSignal} className="bg-purple-500 text-white px-4 py-2 rounded">Submit Remote SDP</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="w-full p-2 border"
          placeholder="Your SDP (copy this)"
          rows={10}
          value={yourSDP}
          readOnly
        />
        <textarea
          className="w-full p-2 border"
          placeholder="Paste remote SDP here"
          rows={10}
          value={remoteSDP}
          onChange={(e) => setRemoteSDP(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">📋 Logs</h3>
        <div className="bg-black text-green-400 font-mono text-sm p-2 h-48 overflow-y-scroll rounded border">
          {logs.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>

      {connected && <p className="text-green-600 font-semibold">✅ Peer-to-peer connection established!</p>}
    </div>
  );
}
