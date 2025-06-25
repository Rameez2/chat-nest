"use client"

import HeroSection from "@/components/Home/HeroSection"
import Footer from "@/components/others/Footer"
import Nav from "@/components/others/Nav"

export default function Home() {

  return (
 <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
        {/* <Nav/> */}
      {/* Hero Section */}
      <HeroSection/>

      {/* Footer */}
    <Footer/>
    </div>
  )
}
