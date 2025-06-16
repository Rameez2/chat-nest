"use client"
import Link from "next/link"

export default function VideoChatPage() {

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col relative">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">

                        <Link href="/" className="flex items-center space-x-2">
                            {/* Your content here */}

                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="text-white font-bold">ChatConnect</span>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-300 text-sm">Connected</span>
                        </div>
                    </div>

                    <button className="md:hidden bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Chat
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex relative">
                {/* Video Section */}
                <div className="flex-1 flex flex-col relative">
                    {/* Split Video Container */}
                    <div className="flex-1 flex relative bg-black">
                        {/* Stranger's Video - Left Side */}
                        <div className="flex-1 relative bg-gray-800 border-r border-gray-700">
                            {/* Stranger Profile Overlay */}
                            <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Alex Johnson</div>
                                        <div className="text-gray-300 text-sm">22 from USA 🇺🇸</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-white text-lg">Stranger</p>
                                    <p className="text-gray-400 text-sm">Camera is off</p>
                                </div>
                            </div>

                            {/* AD Label */}
                            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-2 py-1 rounded">AD</div>
                        </div>

                        {/* Your Video - Right Side */}
                        <div className="flex-1 relative bg-gray-700">
                            {/* Your Profile Label */}
                            <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">You</div>
                                        <div className="text-gray-300 text-sm">Your video feed</div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-white text-lg">You</p>
                                    <p className="text-gray-400 text-sm">Camera is on</p>
                                </div>
                            </div>
                        </div>

                        {/* Center Divider Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600 transform -translate-x-px"></div>
                    </div>

                    {/* Premium Promotion Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 relative">
                        <button className="absolute top-2 right-2 text-white/70 hover:text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex items-center justify-center space-x-4 text-white">
                            <div className="flex items-center space-x-2">
                                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="font-bold text-lg">Enjoy with ChatConnect Plus</span>
                                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-blue-100 text-sm mt-1">Select your preference to meet people you like</p>
                    </div>

                    {/* Controls */}
                    <div className="bg-gray-800 p-4">
                        <div className="flex items-center justify-center space-x-4">
                            <button className="p-3 rounded-full transition-colors bg-gray-600 hover:bg-gray-700">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                    />
                                </svg>
                            </button>

                            <button className="p-3 rounded-full transition-colors bg-gray-600 hover:bg-gray-700">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </button>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                                Next
                            </button>

                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                                Stop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Chat Sidebar */}
                <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col hidden md:flex">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="text-white font-semibold">Chat</h3>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        <div className="text-center">
                            <div className="bg-gray-700 text-gray-300 px-3 py-2 rounded-full text-sm inline-block">
                                Connected to Alex Johnson from USA 🇺🇸
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="inline-block max-w-xs px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                Hello! How are you?
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="inline-block max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-white">
                                Hi there! I'm doing great, thanks for asking!
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="inline-block max-w-xs px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                Where are you from?
                            </div>
                        </div>

                        <div className="text-left">
                            <div className="inline-block max-w-xs px-4 py-2 rounded-lg bg-gray-700 text-white">
                                I'm from New York! What about you?
                            </div>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-700">
                        <form className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
