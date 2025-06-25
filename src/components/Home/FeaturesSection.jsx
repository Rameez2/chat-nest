"use client"

import { useState, useEffect } from "react"

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: "🎥",
      title: "HD Video Quality",
      description: "Crystal clear video calls",
    },
    {
      icon: "⚡",
      title: "Instant Connection",
      description: "Connect in seconds",
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encrypted",
    },
  ]

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Why Choose VideoChat?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge technology for the best experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                activeFeature === index ? "ring-1 ring-blue-400/50 shadow-lg scale-[1.02]" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl mb-3 transform hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
