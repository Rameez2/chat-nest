'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ICE_SERVERS, SOCKET_URL } from '../config/config';

export function useWebRTC(username) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  const [partnerUsername, setPartnerUsername] = useState('');
  const [status, setStatus] = useState('Idle');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return () => {
      if (peerRef.current) peerRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
      cleanupRemoteStream();
    };
  }, []);

  const cleanupRemoteStream = () => {
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
  };

  const cleanupConnection = () => {
    setPartnerUsername('');
    setConnected(false);
    setStatus('Partner disconnected.');

    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    cleanupRemoteStream();
  };

  const start = async () => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    const peer = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    peerRef.current = peer;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
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

  return {
    localVideoRef,
    remoteVideoRef,
    partnerUsername,
    status,
    connected,
    start,
    cleanupConnection,
  };
}
