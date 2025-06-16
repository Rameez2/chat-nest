import Link from "next/link";

const HeroSection = () => {
    return (
        <main className="container mx-auto px-4 py-12 md:py-20">
            <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Meet New People
                    <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Around the World
                    </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Connect instantly with strangers through video chat. Make new friends, practice languages, or just have fun
                    conversations with people from everywhere.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link href="/video-chat">
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center cursor-pointer">

                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            Start Video Chat
                        </button>
                    </Link>
                    {/* <button className="border-2 border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Text Chat Only
            </button> */}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">2M+</div>
                        <div className="text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
                        <div className="text-gray-600">Countries</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-gray-600">Available</div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <section id="features" className="mb-20">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose ChatConnect?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Connection</h3>
                        <p className="text-gray-600">
                            Connect with someone new in seconds. No registration required, just click and start chatting.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Safe & Secure</h3>
                        <p className="text-gray-600">
                            Advanced moderation and reporting tools keep our community safe and friendly for everyone.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Community</h3>
                        <p className="text-gray-600">
                            Meet people from different cultures and backgrounds. Practice languages and learn about the world.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make New Connections?</h2>
                <p className="text-xl mb-8 opacity-90">Join millions of people already chatting on ChatConnect</p>
                <Link href="/video-chat">
                    <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto cursor-pointer">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        Start Chatting Now
                    </button>
                </Link>
            </section>
        </main>
    );
}

export default HeroSection;
