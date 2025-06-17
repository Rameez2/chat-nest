'use client';

import { useEffect, useRef, useState } from 'react';

export default function ManualWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [localSDP, setLocalSDP] = useState('');
  const [remoteSDP, setRemoteSDP] = useState('');
  const [pc, setPc] = useState(null);

  useEffect(() => {
    // const peerConnection = new RTCPeerConnection();

    // Google’s free STUN server
    //     const peerConnection = new RTCPeerConnection({
    //   iceServers: [
    //     { urls: 'stun:stun.l.google.com:19302' }
    //   ]
    // });

    // TURN server


    const iceServers = [
      { urls: "stun:stun.l.google.com:19302" },
      {
        urls: "turn:turn.anyfirewall.com:443?transport=tcp",
        username: "webrtc",
        credential: "webrtc",
      }
    ];
    const peerConnection = new RTCPeerConnection({ iceServers });

    setPc(peerConnection);

    // Handle incoming media
    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    });

    // Handle ICE candidates (trickle ICE disabled for now)
    peerConnection.onicecandidate = (event) => {
      if (event.candidate === null) {
        setLocalSDP(JSON.stringify(peerConnection.localDescription));
      }
    };
  }, []);


  // create offer
  const createOffer = async () => {
    try {
      // Inside createOffer()
      if (!pc) return alert('Peer connection not ready');

      // Similar checks for receiveOffer and addAnswer

      console.log('creating offer...');

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
    } catch (error) {
      console.log(error);

    }
  };

  const receiveOffer = async () => {
    console.log('recieving offer...');

    const offer = JSON.parse(remoteSDP);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
  };

  const addAnswer = async () => {

    try {

      console.log('recieving offer...');
      const answer = JSON.parse(remoteSDP);
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.log(error);

    }

  };



  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Manual WebRTC (Copy-Paste)</h2>

      <div className="flex space-x-4">
        <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2 border rounded" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border rounded" />
      </div>

      <div className="space-x-2">
        <button onClick={createOffer} className="bg-blue-500 text-white px-4 py-2 rounded">Create Offer</button>
        <button onClick={receiveOffer} className="bg-green-500 text-white px-4 py-2 rounded">Receive Offer</button>
        <button onClick={addAnswer} className="bg-purple-500 text-white px-4 py-2 rounded">Add Answer</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="w-full p-2 border"
          placeholder="Local SDP"
          rows={10}
          value={localSDP}
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
    </div>
  );
}
