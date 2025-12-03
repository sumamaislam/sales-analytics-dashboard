"use client"

import { motion } from "framer-motion"
import { WifiOff, RefreshCw, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function MaintenancePage({ onRetry }) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon Container */}
        <motion.div
          className="mb-8 flex justify-center"
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-full shadow-2xl">
              <WifiOff className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white mb-4 font-manrope"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Maintenance Mode
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-purple-200 mb-6 font-manrope"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Backend Service Unavailable
        </motion.p>

        {/* Description */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-white/20 shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-4 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-white text-lg mb-2">
                We're currently experiencing connection issues with our backend server.
              </p>
              <p className="text-purple-200">
                Our team has been notified and is working to restore service as soon as possible.
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-purple-300 text-sm mb-2">Connection Status</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-semibold">
                Reconnecting{dots}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Retry Button */}
        <motion.button
          onClick={onRetry}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center gap-3">
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-lg">Retry Connection</span>
          </div>
        </motion.button>

        {/* Footer Info */}
        <motion.p
          className="mt-8 text-purple-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          We apologize for any inconvenience. Please try again in a few moments.
        </motion.p>
      </motion.div>

      {/* Floating Particles */}
      {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * (window.innerWidth || 1920),
            y: Math.random() * (window.innerHeight || 1080),
            opacity: 0,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}


