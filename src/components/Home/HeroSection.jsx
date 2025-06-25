"use client"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent animate-gradient">
              Connect Instantly
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Anywhere, Anytime
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience seamless video communication with crystal-clear quality and instant connections worldwide
          </p>
        </div>

        {/* Hero Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Start Video Chat
          </button>
          <button className="w-full sm:w-auto bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-800 px-8 py-4 rounded-2xl font-bold text-lg border border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Watch Demo
          </button>
        </div>

        {/* Hero Visual */}
        <div className="relative animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 max-w-4xl mx-auto transform hover:scale-[1.02] transition-all duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-semibold">You</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white font-semibold">Partner</div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
