'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function AutoWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('Idle');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const start = async () => {
    // const socket = io('http://localhost:4000');
    const socket = io('https://chat-nest-nodejs-production.up.railway.app/');
    socketRef.current = socket;

    const iceServers = [
      { urls: ['stun:bn-turn2.xirsys.com'] },
      {
        username:
          '8fUyCPsN4iaQBVt2m85Z7C0-mF6AQK-2yCqX4BlxnxDykeOCip2JN20jhSC7JgoiAAAAAGhZs6JyYW1lZXpyb290',
        credential: '77d21974-506d-11f0-bb59-0242ac140004',
        urls: [
          'turn:bn-turn2.xirsys.com:80?transport=udp',
          'turn:bn-turn2.xirsys.com:3478?transport=udp',
          'turn:bn-turn2.xirsys.com:80?transport=tcp',
          'turn:bn-turn2.xirsys.com:3478?transport=tcp',
          'turns:bn-turn2.xirsys.com:443?transport=tcp',
          'turns:bn-turn2.xirsys.com:5349?transport=tcp'
        ]
      }
    ];

    const peer = new RTCPeerConnection({ iceServers });
    peerRef.current = peer;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    peer.onicecandidate = (event) => {
      // Not using trickle ICE, wait for full SDP
      if (event.candidate === null) {
        if (peer.localDescription.type === 'offer') {
          socket.emit('send-offer', { offer: peer.localDescription });
        } else if (peer.localDescription.type === 'answer') {
          socket.emit('send-answer', { answer: peer.localDescription });
        }
      }
    };

    socket.emit('join', { username });

    socket.on('create-offer', async () => {
      setStatus('Creating offer...');
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
    });

    socket.on('wait-for-offer', () => {
      setStatus('Waiting for offer...');
    });

    socket.on('receive-offer', async ({ offer }) => {
      setStatus('Received offer. Creating answer...');
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
    });

    socket.on('receive-answer', async ({ answer }) => {
      setStatus('Received answer. Connected!');
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('partner-left', () => {
      setStatus('Partner disconnected.');
    });

    setConnected(true);
    setStatus('Searching for a partner...');
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Auto WebRTC (via Socket.io)</h2>

      {!connected && (
        <div className="space-x-2">
          <input
            type="text"
            className="border px-2 py-1"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={start}
            disabled={!username}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start
          </button>
        </div>
      )}

      <p>Status: {status}</p>

      <div className="flex space-x-4">
        <div className="flex-1">
          <h4 className="font-semibold">Your Video</h4>
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full border rounded" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Partner Video</h4>
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full border rounded" />
        </div>
      </div>
    </div>
  );
}
