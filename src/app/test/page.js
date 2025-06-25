'use client';

import { useEffect, useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import FullPageSpinner from '@/components/ui/FullPageSpinner';

export default function AutoWebRTC() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const {user,loading} = useUser();
useEffect(() => {
  if (!loading) {
    if (user) {
      // User exists, set username, don't redirect
      console.log('user exists');
      setUsername(user.username);
    } else {
      // No user — redirect to "/"
      console.log('no user');
      router.push('/login');
    }
  }
}, [user, loading]);


  // Pass username to hook to initialize connection logic
  const {
    localVideoRef,
    remoteVideoRef,
    partnerUsername,
    status,
    connected,
    start,
    cleanupConnection,
  } = useWebRTC(username);

  // Status color helper
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500';
      case 'disconnected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if(loading) {
    return <FullPageSpinner/>
  }
  if(!user) {
    return <FullPageSpinner/>
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
                  disabled
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
              </div>
            </div>
          </div>

          {/* Remote Video */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${partnerUsername ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {partnerUsername ? `Partner (${partnerUsername})` : 'Waiting for partner...'}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
