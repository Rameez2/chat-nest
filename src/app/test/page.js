'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function AutoWebRTC() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  const [username, setUsername] = useState('');
  const [partnerUsername, setPartnerUsername] = useState('');
  const [status, setStatus] = useState('Idle');
  const [connected, setConnected] = useState(false);
  
  // Design



  useEffect(() => {
    return () => {
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const cleanupConnection = () => {
    setPartnerUsername('');
    setConnected(false);
    setStatus('Partner disconnected.');

    // Close peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // Clear remote video
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
  };

  const start = async () => {
    // const socket = io('http://localhost:4000');
    const socket = io('chat-nest-nodejs-production.up.railway.app');
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
          'turns:bn-turn2.xirsys.com:5349?transport=tcp',
        ],
      },
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
      if (event.candidate === null) {
        const desc = peer.localDescription;
        if (desc?.type === 'offer') {
          socket.emit('send-offer', { offer: desc });
        } else if (desc?.type === 'answer') {
          socket.emit('send-answer', { answer: desc });
        }
      }
    };

    socket.emit('join', { username });

    socket.on('matched', async ({ role, partnerUsername }) => {
      setStatus(`Matched with ${partnerUsername}`);
      setPartnerUsername(partnerUsername);

      if (role === 'offerer') {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
      }
    });

    socket.on('receive-offer', async ({ offer }) => {
      setStatus('Received offer. Creating answer...');
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
    });

    socket.on('receive-answer', async ({ answer }) => {
      setStatus('Connected');
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('partner-left', () => {
      cleanupConnection();
    });

    setConnected(true);
    setStatus('Searching for a partner...');
  };



  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "disconnected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }


  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">WebRTC Video Chat</h1>
          <p className="text-slate-600 text-lg">Real-time video communication via Socket.io</p>

          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}></div>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-sm font-medium rounded-full">{status}</span>
          </div>
        </div>

        {/* Connection Card */}
        {!connected && (
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-6 text-center border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800">Join Video Chat</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                  Your Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12 px-4 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <button
                onClick={start}
                disabled={!username.trim()}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Video Chat
              </button>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Local Video */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-slate-800">You {username && `(${username})`}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
          <video ref={localVideoRef} autoPlay muted playsInline className="w-full border rounded" />

                {/* Placeholder when no video */}


              </div>
            </div>
          </div>

          {/* Remote Video */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${partnerUsername ? "bg-green-500" : "bg-gray-400"}`}></div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {partnerUsername ? `Partner (${partnerUsername})` : "Waiting for partner..."}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                {/* Placeholder when no partner */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
