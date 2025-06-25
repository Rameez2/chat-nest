'use client';

import { useEffect, useState } from 'react';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import FullPageSpinner from '@/components/ui/FullPageSpinner';

export default function AutoWebRTC() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const { user, loading } = useUser();
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
    start,
    nextCall,
    stopCall,
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

  if (loading) {
    return <FullPageSpinner />
  }
  if (!user) {
    return <FullPageSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 sm:mb-6">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            WebRTC Video Chat
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Connect instantly with people around the world through real-time video communication
          </p>

          {/* Enhanced Status Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
            <span className="text-sm sm:text-base text-gray-700 font-medium capitalize">{status}</span>
          </div>
        </div>

        {/* Connection Card */}
        {status === "idle" && 
        <div className="max-w-md mx-auto mb-6 sm:mb-8 lg:mb-12">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Join Video Chat</h2>
            </div>
            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
              <div className="space-y-2 sm:space-y-3">
                <label
                  htmlFor="username"
                  className="block text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide"
                >
                  Your Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  disabled
                  className="w-full h-12 sm:h-14 px-4 sm:px-6 text-center bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg font-medium"
                />
              </div>
              <button
                onClick={start}
                disabled={!username.trim()}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Start Video Chat
              </button>
            </div>
          </div>
        </div>
        }

        {/* Video Container - Both videos in single div */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-white">Video Chat Session</h3>
            </div>
            <div className="p-3 sm:p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                {/* Local Video */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/10 rounded-lg">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                      You {username && `(${username})`}
                    </h4>
                  </div>
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-inner">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Remote Video */}
                <div className="space-y-2 sm:space-y-3">
                  <div
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg ${partnerUsername ? "bg-blue-500/10" : "bg-gray-400/10"}`}
                  >
                    <div
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${partnerUsername ? "bg-blue-500 animate-pulse" : "bg-gray-400"}`}
                    ></div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800">
                      {partnerUsername ? `Partner (${partnerUsername})` : "Waiting for Partner"}
                    </h4>
                  </div>
                  {status === "searching" ? (
                    <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex justify-center items-center">
                      <div className="flex flex-col items-center gap-3 sm:gap-4">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 border-3 sm:border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm sm:text-base text-gray-600 font-medium">Searching for partner...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl overflow-hidden shadow-inner">
                      <video
                        ref={remoteVideoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        {true && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button
              onClick={nextCall}
              className="w-full sm:w-32 h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              Next
            </button>

            <button
              onClick={stopCall}
              className="w-full sm:w-32 h-12 sm:h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Stop Call
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
