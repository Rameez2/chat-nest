'use client';

import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ICE_SERVERS, SOCKET_URL } from '../config/config';

export function useWebRTC({user,filters}) {
  console.log('filters web',filters);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  const [partnerUsername, setPartnerUsername] = useState('');
  const [status, setStatus] = useState('idle');


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
    setStatus('Partner disconnected.');

    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    cleanupRemoteStream();
    // start again after partner is disconnected
    start()
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

    socket.emit('join', { username:user.username }); // send join signal to server

    socket.on('matched', async ({ role, partnerUsername }) => {
      setStatus(`connecting`);
      // setStatus(`Matched with ${partnerUsername}`);
      setPartnerUsername(partnerUsername);

      if (role === 'offerer') {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
      }
    });

    socket.on('receive-offer', async ({ offer }) => {
      await peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      setStatus('connected');
    });

    socket.on('receive-answer', async ({ answer }) => {
      setStatus('connected');
      await peer.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('partner-left', () => {
      cleanupConnection();
    });

    setStatus('searching');
  };


// NEXT CALL
const nextCall = async () => {
  try {
    console.log('🔄 Starting next call...');
    
    // 1. Clean up existing peer connection, stream, and socket
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    cleanupRemoteStream();

    setPartnerUsername('');
    setStatus('reconnecting');

    // 2. Restart the call
    await start();
  } catch (error) {
    console.error('Error during nextCall:', error);
    setStatus('Failed to reconnect');
  }
};

// STOP CALL

const stopCall = async () => {
  try {
    console.log('🛑 Stopping current call...');

    // 1. Close peer connection
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }

    // 2. Disconnect from socket
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // 3. Stop local stream
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    // 4. Stop remote stream
    cleanupRemoteStream();

    // 5. Reset state
    setPartnerUsername('');
    setStatus('idle');
  } catch (error) {
    console.error('❌ Error while stopping call:', error);
    setStatus('error');
  }
};



  return {
    localVideoRef,
    remoteVideoRef,
    partnerUsername,
    status,
    start,
    nextCall,
    stopCall,
    cleanupConnection,
  };
}
