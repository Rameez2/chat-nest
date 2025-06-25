"use client"

export default function StatsSection() {
  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "50M+", label: "Video Calls" },
    { number: "99.9%", label: "Uptime" },
    { number: "150+", label: "Countries" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 animate-count-up">{stat.number}</div>
              <div className="text-blue-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
