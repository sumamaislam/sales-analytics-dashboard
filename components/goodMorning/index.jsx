// "use client"

// import React, { useEffect, useState } from "react"
// import dynamic from "next/dynamic"

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

// function GoodMorning({ isVisible }) {
//     const [playAnimation, setPlayAnimation] = useState(false)

//     useEffect(() => {
//         let timer
//         if (isVisible) {
//             setPlayAnimation(false)
//             timer = setTimeout(() => {
//                 setPlayAnimation(true)
//             }, 500)
//         } else {
//             setPlayAnimation(false)
//         }
//         return () => clearTimeout(timer)
//     }, [isVisible])

//     return (
//         <div className="h-[100vh] flex flex-col justify-center items-center">
//             <Lottie
//                 animationData={require("../../public/sun.json")}
//                 className="w-[250px] md:w-[370px]"
//                 loop={true}
//                 autoplay
//             />

//         </div>
//     )
// }

// export default GoodMorning"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

function GoodMorning({ isVisible }) {
  const [playAnimation, setPlayAnimation] = useState(false)
  const [sunPosition, setSunPosition] = useState(false)

  useEffect(() => {
    let timer
    if (isVisible) {
      setPlayAnimation(false)
      setSunPosition(false)
      timer = setTimeout(() => {
        setPlayAnimation(true)
        setSunPosition(true)
      }, 500)
    } else {
      setPlayAnimation(false)
      setSunPosition(false)
    }
    return () => clearTimeout(timer)
  }, [isVisible])

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
          sunPosition
            ? "bg-gradient-to-b from-orange-200 via-yellow-100 to-blue-100"
            : "bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900"
        }`}
      />
      
      {/* Bottom light effect with #FDAA70 */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[40vh] blur-3xl  ${
          sunPosition ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `linear-gradient(to top, #FDAA70, #FDAA70CC, #FDAA7080, transparent)`
        }}
      />

      <div
        className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
          sunPosition ? "opacity-60" : "opacity-0"
        }`}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[600px] h-[600px] bg-gradient-radial from-yellow-300/30 via-orange-200/20 to-transparent rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-yellow-200/40 via-orange-100/30 to-transparent rounded-full animate-pulse" />
        </div>
      </div>

      <div
        className={`relative z-10 transition-all duration-[3000ms] ease-out transform ${
          sunPosition ? "translate-y-[-20vh] scale-110" : "translate-y-[70vh] scale-90"
        }`}
      >
        <div className="relative">
          <div
            className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
              sunPosition ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-radial from-[#FDAA70] via-orange-300/30 to-transparent rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-radial from-[#FDAA70] via-orange-200/40 to-transparent rounded-full animate-pulse" />
          </div>

          <Lottie
            animationData={require("../../public/sun.json")}
            className="xl-plus:w-[1080px] w-[480px] md:w-[480px] relative z-10"
            loop={true}
            autoplay={true}
            play={playAnimation}
          />
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-[5000ms] ease-out ${
          sunPosition ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute xl-plus:w-6 xl-plus:h-6 w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 7}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      {/* Good Morning Team Text Animation - appears after sun reaches position */}
      <div
        className={`absolute w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-[5000ms] ease-out delay-[2000ms] ${
          sunPosition ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="xl-plus:text-[200px] mt-10 text-[150px] md:text-8xl font-bold  text-black animate-pulse">
          Good Morning, Team
        </h1>
      
      </div>
    </div>
  )
}

export default GoodMorning
