"use client"

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Ready to Connect?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join millions of users already enjoying seamless video conversations
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Start Your First Call
          </button>
        </div>
      </div>
    </section>
  )
}
