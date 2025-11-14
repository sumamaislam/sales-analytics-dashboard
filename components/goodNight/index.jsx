import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

function GoodNight({ isVisible }) {
  const [playAnimation, setPlayAnimation] = useState(false)
  const [moonPosition, setMoonPosition] = useState(false)

  useEffect(() => {
    let timer
    if (isVisible) {
      setPlayAnimation(false)
      setMoonPosition(false)
      timer = setTimeout(() => {
        setPlayAnimation(true)
        setMoonPosition(true)
      }, 500)
    } else {
      setPlayAnimation(false)
      setMoonPosition(false)
    }
    return () => clearTimeout(timer)
  }, [isVisible])

  // Generate random stars
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkle: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }))
  }

  const stars = generateStars(150)

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-black via-purple-900 to-black">
      {/* Mars-like background gradient */}
      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
          moonPosition
            ? "bg-gradient-to-b from-black via-black/20 to-purple-900"
            : "bg-gradient-to-b from-gray-400 via-purple-900 to-black"
        }`}
      />

      {/* Animated stars background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.twinkle}s`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px white`
            }}
          />
        ))}
      </div>

      {/* Mars surface effect */}
      {/* <div
        className={`absolute bottom-0 left-0 right-0 h-[40vh] blur-3xl transition-all duration-[5000ms] ease-out ${
          moonPosition ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(to top,rgba(177, 47, 209, 0.65),rgb(89, 58, 94),rgb(52, 4, 80), transparent)`
        }}
      /> */}

      {/* Moon animation */}
      <div
        className={`relative z-10 transition-all duration-[3000ms] ease-out transform ${
          moonPosition ? "translate-y-[-20vh] scale-110" : "translate-y-[70vh] scale-90"
        }`}
      >
        <div className="relative">
          {/* Moon glow effect */}
          <div
            className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
              moonPosition ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-radial from-gray-300/30 via-gray-200/20 to-transparent rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-radial from-gray-200/40 via-gray-100/30 to-transparent rounded-full animate-pulse" />
          </div>

          {/* Moon SVG */}
          <div className="relative z-10 ">
           <img className='xl-plus:w-[750px]  w-[350px]' src="/images/salesDashboard/moon.png" alt="moon" />
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
          moonPosition ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 4}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Good Night Text Animation */}
      <div
        className={`absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-[5000ms] ease-out delay-[2000ms] ${
          moonPosition ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="xl-plus:text-[200px] mt-10 text-[150px] md:text-8xl font-bold text-white animate-pulse">
          Good Evening, Team
        </h1>
        
      </div>
    </div>
  )
}

export default GoodNight