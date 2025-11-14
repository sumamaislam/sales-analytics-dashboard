"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function Birthday({ isVisible, name = "Friend" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cleanup effect to stop music when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    };
  }, [audioRef]);

  useEffect(() => {
    if (!isVisible) return;

    // Start playing birthday music
    if (audioRef) {
      audioRef.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }

    const timer1 = setTimeout(() => setCurrentStep(1), 1000);
    const timer2 = setTimeout(() => setCurrentStep(2), 3000);
    const timer3 = setTimeout(() => setCurrentStep(3), 5000);
    const timer4 = setTimeout(() => setShowConfetti(true), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isVisible, audioRef]);

  if (!isVisible || !isClient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Birthday Music */}
      <audio
        ref={setAudioRef}
        loop
        preload="auto"
        volume={0.7}
      >
        <source src="/birthday-music.mp3" type="audio/mpeg" />
        <source src="/birthday-music.ogg" type="audio/ogg" />
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
        {/* Fallback to a free birthday song URL */}
        <source src="https://www.bensound.com/bensound-music/bensound-happybirthday.mp3" type="audio/mpeg" />
      </audio>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/font/manrope/3568339.jpg')",
          // filter: "brightness(0.8) contrast(1.2) saturate(1.1)"
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-purple-900/15 to-pink-800/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-indigo-800/15 to-purple-700/20"></div>
      </div>

      {/* Animated particles */}
      {currentStep >= 1 && (
        <>
          {[...Array(260)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-5 h-5 bg-white/70 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0 
              }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
                y: [null, -100]
              }}
              transition={{
                duration: 5,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </>
      )}

      {/* Floating Stars */}
      {currentStep >= 2 && (
        <>
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-300 text-3xl pointer-events-none"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0,
                rotate: 0
              }}
              animate={{ 
                scale: [0, 1.8, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
                y: [null, -150]
              }}
              transition={{
                duration: 7,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Step 1: Dim background */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 1 ? 0.15 : 0 }}
          transition={{ duration: 2 }}
        />

        {/* Step 2: Light show */}
        {currentStep >= 2 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-500/20 to-pink-500/15 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/15 via-cyan-500/20 to-blue-500/15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </motion.div>
        )}

        {/* Step 3: Happy Birthday Text */}
        {currentStep >= 3 && (
          <motion.div
            className="text-center z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 1
            }}
          >
            {/* Split text into individual characters for falling animation */}
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 mb-20">
              {[ 'Happy', ' ', 'Birthday', ' ', name, '!'].map((word, wordIndex) => {
                if (word === ' ') {
                  return <span key={`space-${wordIndex}`} className="w-4 md:w-8 xl-plus:w-16"></span>;
                }
                
                return word.split('').map((char, charIndex) => {
                  const totalIndex = wordIndex * 10 + charIndex; // Create unique index for each character
                  
                  return (
                    <motion.span
                      key={`char-${wordIndex}-${charIndex}`}
                      className="text-6xl md:text-8xl xl-plus:text-[300px] font-extrabold inline-block"
                      style={{
                        background: "linear-gradient(45deg, #93c5fd, #c4b5fd, #f9a8d4, #67e8f9, #86efac, #fde68a, #fca5a5)",
                        backgroundSize: "400% 400%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "gradientShift 4s ease-in-out infinite",
                        textShadow: "0 0 20px rgba(147, 197, 253, 0.4), 0 0 40px rgba(196, 181, 253, 0.3)",
                        filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.3))"
                      }}
                      initial={{ 
                        y: -window.innerHeight - 200, 
                        opacity: 0, 
                        scale: 0.3,
                        rotate: -180 + Math.random() * 360
                      }}
                      animate={{ 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        rotate: 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                        delay: totalIndex * 0.1, // Each character falls 0.1s after the previous
                        duration: 1.5
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                });
              })}
            </div>
          
            {/* Glowing effect behind text */}
            <div 
              className="absolute inset-0 blur-3xl opacity-20"
              style={{
                background: "linear-gradient(45deg, #93c5fd, #c4b5fd, #f9a8d4, #67e8f9, #86efac, #fde68a)",
                backgroundSize: "400% 400%",
                animation: "gradientShift 4s ease-in-out infinite"
              }}
            ></div>

            <motion.p
              className="text-xl md:text-3xl xl-plus:text-[80px] font-light mb-12 text-white/90"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                color: "#93c5fd",
                textShadow: "0 0 15px rgba(147, 197, 253, 0.5), 0 0 30px rgba(196, 181, 253, 0.4)",
                filter: "drop-shadow(0 0 8px rgba(147, 197, 253, 0.3))"
              }}
            >
              Wishing {name} a day filled with joy and celebration! ✨
            </motion.p>
          </motion.div>
        )}

        {/* Floating celebration emojis */}
        {currentStep >= 3 && (
          <div className="flex justify-center flex-wrap gap-6 text-[70px]">
            {['🎈', '🎁', '🎊', '✨', '🎉', '🌟', '💫', '🎆'].map((emoji, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                  y: [0, -20, 0]
                }}
                transition={{
                  delay: i * 0.2,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="inline-block"
              >
                {emoji}
              </motion.span>
            ))}
          </div>
        )}

        {/* Floating Hearts */}
        {currentStep >= 3 && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-pink-400 text-4xl pointer-events-none"
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: window.innerHeight + 50,
                  scale: 0,
                  rotate: 0
                }}
                animate={{ 
                  y: -100,
                  scale: [0, 1.8, 0],
                  rotate: [0, 180, 360],
                  x: [null, Math.random() * window.innerWidth]
                }}
                transition={{
                  duration: 10,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}

        {/* Floating Balloons */}
        {currentStep >= 3 && (
          <>
            {[...Array(50)].map((_, i) => {
              // Create different movement patterns
              const patterns = [
                // Pattern 1: Bottom to top with horizontal drift
                {
                  initial: { x: Math.random() * window.innerWidth, y: window.innerHeight + 100 },
                  animate: { 
                    y: -200,
                    x: [null, Math.random() * window.innerWidth],
                    scale: [0, 1, 0.8],
                    rotate: [0, 360, 720]
                  }
                },
                // Pattern 2: Left to right with vertical drift
                {
                  initial: { x: -200, y: Math.random() * window.innerHeight },
                  animate: { 
                    x: window.innerWidth + 200,
                    y: [null, Math.random() * window.innerHeight],
                    scale: [0, 1, 0.8],
                    rotate: [0, -360, -720]
                  }
                },
                // Pattern 3: Right to left with vertical drift
                {
                  initial: { x: window.innerWidth + 200, y: Math.random() * window.innerHeight },
                  animate: { 
                    x: -200,
                    y: [null, Math.random() * window.innerHeight],
                    scale: [0, 1, 0.8],
                    rotate: [0, 360, 720]
                  }
                },
                // Pattern 4: Top to bottom with horizontal drift
                {
                  initial: { x: Math.random() * window.innerWidth, y: -200 },
                  animate: { 
                    y: window.innerHeight + 200,
                    x: [null, Math.random() * window.innerWidth],
                    scale: [0, 1, 0.8],
                    rotate: [0, -360, -720]
                  }
                },
                // Pattern 5: Diagonal movements
                {
                  initial: { x: -200, y: window.innerHeight + 200 },
                  animate: { 
                    x: window.innerWidth + 200,
                    y: -200,
                    scale: [0, 1, 0.8],
                    rotate: [0, 360, 720]
                  }
                },
                // Pattern 6: Reverse diagonal
                {
                  initial: { x: window.innerWidth + 200, y: window.innerHeight + 200 },
                  animate: { 
                    x: -200,
                    y: -200,
                    scale: [0, 1, 0.8],
                    rotate: [0, -360, -720]
                  }
                }
              ];
              
              const pattern = patterns[i % patterns.length];
              const duration = 15 + Math.random() * 10; // Random duration between 15-25 seconds
              const delay = i * 0.5; // Staggered start times
              
              return (
                <motion.div
                  key={`balloon-${i}`}
                  className="absolute pointer-events-none"
                  initial={{ 
                    ...pattern.initial,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={pattern.animate}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src={`/images/salesDashboard/${i % 2 === 0 ? 'images-removebg-preview.png' : 'images__1_-removebg-preview.png'}`}
                    alt="Floating Balloon"
                    className="w-[200px] xl-plus:w-[300px] object-contain"
                    style={{ 
                      filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                      opacity: 0.8 + Math.random() * 0.2 // Random opacity for variety
                    }}
                  />
                </motion.div>
              );
            })}
          </>
        )}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 1920}
          height={typeof window !== 'undefined' ? window.innerHeight : 1080}
          recycle={false}
          numberOfPieces={700}
          colors={['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7']}
        />
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
}