// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Gift, PartyPopper, Sparkles, Crown, Star, Cake } from "lucide-react";
// import Confetti from "react-confetti";

// export default function Birthday({ isVisible, name = "Friend" }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [isClient, setIsClient] = useState(false);
//   const [audioRef, setAudioRef] = useState(null);
//   const [clapRef, setClapRef] = useState(null);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Cleanup effect to stop music when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if (audioRef) {
  //       audioRef.pause();
  //       audioRef.currentTime = 0;
  //     }
  //     if (clapRef) {
  //       clapRef.pause();
  //       clapRef.currentTime = 0;
  //     }
  //   };
  // }, [audioRef, clapRef]);

//   useEffect(() => {
//     if (!isVisible) return;

//     // Start playing birthday music
//     if (audioRef) {
//       audioRef.play().catch(error => {
//         console.log('Audio play failed:', error);
//       });
//     }

//     const timer1 = setTimeout(() => setCurrentStep(1), 1000);
//     const timer2 = setTimeout(() => setCurrentStep(2), 3000);
//     const timer3 = setTimeout(() => setCurrentStep(3), 5000);
//     const timer4 = setTimeout(() => setShowConfetti(true), 6000);

//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//       clearTimeout(timer3);
//       clearTimeout(timer4);
//     };
//   }, [isVisible, audioRef]);

//   // Play clap sound once when confetti shows
//   useEffect(() => {
//     if (showConfetti && clapRef) {
//       clapRef.currentTime = 0;
//       clapRef.play().catch((error) => {
//         console.log("Clap play failed:", error);
//       });
//     }
//   }, [showConfetti, clapRef]);

//   if (!isVisible || !isClient) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-hidden">
//       {/* Birthday Music */}
      

//       {/* Clap/Applause Sound (plays once at confetti) */}
      // <audio ref={setClapRef} preload="auto" volume={1}>
      //   <source src="/audio/birthday.mp3" type="audio/mpeg" />
      //   <source src="/audio/birthday.ogg" type="audio/ogg" />
      //   <source src="https://www.soundjay.com/human/applause-01.mp3" type="audio/mpeg" />
      // </audio>
//       {/* Background Image */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: "url('/font/manrope/3568339.jpg')",
//           // filter: "brightness(0.8) contrast(1.2) saturate(1.1)"
//         }}
//       >
//         {/* Overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-900/35 via-indigo-900/25 to-purple-800/20"></div>
//         <div className="absolute inset-0 bg-gradient-to-tr from-rose-400/12 via-sky-400/12 to-emerald-400/12"></div>
//       </div>

//       {/* Animated particles */}
//       {currentStep >= 1 && (
//         <>
//           {[...Array(260)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-5 h-5 bg-white/70 rounded-full"
//               initial={{ 
//                 x: Math.random() * window.innerWidth, 
//                 y: Math.random() * window.innerHeight,
//                 scale: 0 
//               }}
//               animate={{ 
//                 scale: [0, 1.5, 0],
//                 opacity: [0, 1, 0],
//                 rotate: [0, 360],
//                 y: [null, -100]
//               }}
//               transition={{
//                 duration: 5,
//                 delay: i * 0.1,
//                 repeat: Infinity,
//                 repeatDelay: 2
//               }}
//             />
//           ))}
//         </>
//       )}

//       {/* Floating Stars */}
//       {currentStep >= 2 && (
//         <>
//           {[...Array(25)].map((_, i) => (
//             <motion.div
//               key={`star-${i}`}
//               className="absolute text-yellow-300 text-3xl pointer-events-none"
//               initial={{ 
//                 x: Math.random() * window.innerWidth, 
//                 y: Math.random() * window.innerHeight,
//                 scale: 0,
//                 rotate: 0
//               }}
//               animate={{ 
//                 scale: [0, 1.8, 0],
//                 rotate: [0, 180, 360],
//                 opacity: [0, 1, 0],
//                 y: [null, -150]
//               }}
//               transition={{
//                 duration: 7,
//                 delay: i * 0.3,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//               }}
//             >
//               ✨
//             </motion.div>
//           ))}
//         </>
//       )}

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
//         {/* Step 1: Dim background */}
//         <motion.div
//           className="absolute inset-0 bg-black"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: currentStep >= 1 ? 0.15 : 0 }}
//           transition={{ duration: 2 }}
//         />

//         {/* Step 2: Light show */}
//         {currentStep >= 2 && (
//           <motion.div
//             className="absolute inset-0"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-purple-500/20 to-pink-500/15 animate-pulse"></div>
//             <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/15 via-cyan-500/20 to-blue-500/15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
//           </motion.div>
//         )}

//         {/* Step 3: Happy Birthday Text */}
//         {currentStep >= 3 && (
//           <motion.div
//             className="text-center z-20"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 100,
//               damping: 15,
//               duration: 1
//             }}
//           >
//             {/* Split text into individual characters for falling animation */}
//             <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 mb-20">
//               {[ 'Happy', ' ', 'Birthday', ' ', name, '!'].map((word, wordIndex) => {
//                 if (word === ' ') {
//                   return <span key={`space-${wordIndex}`} className="w-4 md:w-8 xl-plus:w-16"></span>;
//                 }
                
//                 return word.split('').map((char, charIndex) => {
//                   const totalIndex = wordIndex * 10 + charIndex; // Create unique index for each character
                  
//                   return (
//                     <motion.span
//                       key={`char-${wordIndex}-${charIndex}`}
//                       className="text-6xl md:text-8xl xl-plus:text-[300px] font-extrabold inline-block"
//                       style={{
//                         background: "linear-gradient(120deg, #f9a8d4, #c084fc, #60a5fa, #34d399, #f472b6)",
//                         backgroundSize: "400% 400%",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                         animation: "gradientShift 4s ease-in-out infinite",
//                         textShadow: "0 0 20px rgba(147, 197, 253, 0.4), 0 0 40px rgba(196, 181, 253, 0.3)",
//                         filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.3))"
//                       }}
//                       initial={{ 
//                         y: -window.innerHeight - 200, 
//                         opacity: 0, 
//                         scale: 0.3,
//                         rotate: -180 + Math.random() * 360
//                       }}
//                       animate={{ 
//                         y: 0, 
//                         opacity: 1, 
//                         scale: 1,
//                         rotate: 0
//                       }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 150,
//                         damping: 25,
//                         delay: totalIndex * 0.1, // Each character falls 0.1s after the previous
//                         duration: 1.5
//                       }}
//                     >
//                       {char}
//                     </motion.span>
//                   );
//                 });
//               })}
//             </div>
          
//             {/* Glowing effect behind text */}
//             <div 
//               className="absolute inset-0 blur-3xl opacity-20"
//               style={{
//                 background: "linear-gradient(45deg, #93c5fd, #c4b5fd, #f9a8d4, #67e8f9, #86efac, #fde68a)",
//                 backgroundSize: "400% 400%",
//                 animation: "gradientShift 4s ease-in-out infinite"
//               }}
//             ></div>

//             <motion.p
//               className="text-xl md:text-3xl xl-plus:text-[80px] font-light mb-12 text-white/90"
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5, duration: 1 }}
//               style={{
//                 color: "#93c5fd",
//                 textShadow: "0 0 15px rgba(147, 197, 253, 0.5), 0 0 30px rgba(196, 181, 253, 0.4)",
//                 filter: "drop-shadow(0 0 8px rgba(147, 197, 253, 0.3))"
//               }}
//             >
//               Wishing {name} a day filled with joy and celebration! ✨
//             </motion.p>
//           </motion.div>
//         )}

//         {/* Glow halo behind text */}
//         {currentStep >= 3 && (
//           <motion.div
//             className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] xl-plus:w-[35vw] xl-plus:h-[35vw] rounded-full blur-3xl bg-gradient-to-br from-rose-400/25 via-violet-500/18 to-sky-400/22"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: [0.9, 1.05, 0.95] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             style={{ zIndex: 1 }}
//           />
//         )}

//         {/* Icon badges */}
//         {currentStep >= 3 && (
//           <div className="flex flex-wrap justify-center gap-4 md:gap-6 xl-plus:gap-8 mb-10 xl-plus:mb-14 mt-4">
//             {[
//               { Icon: PartyPopper, label: "Celebrate", colors: "from-rose-500 to-amber-400" },
//               { Icon: Gift, label: "Surprise", colors: "from-sky-400 to-cyan-300" },
//               { Icon: Crown, label: "Star", colors: "from-amber-300 to-yellow-400" },
//               { Icon: Sparkles, label: "Shine", colors: "from-violet-500 to-indigo-400" },
//               { Icon: Star, label: "Wish", colors: "from-emerald-400 to-teal-300" },
//             ].map(({ Icon, label, colors }, idx) => (
//               <motion.div
//                 key={label}
//                 initial={{ scale: 0, rotate: -90 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 200, damping: 16 }}
//                 className="flex flex-col items-center gap-2"
//               >
//                 <div className={`p-4 xl-plus:p-6 rounded-2xl bg-gradient-to-br ${colors} shadow-xl backdrop-blur-sm border border-white/20`}
//                   style={{ boxShadow: "0 15px 40px rgba(0,0,0,0.25)" }}
//                 >
//                   <Icon className="w-8 h-8 xl-plus:w-12 xl-plus:h-12 text-white" />
//                 </div>
//                 <span className="text-white/90 text-sm xl-plus:text-lg font-semibold tracking-wide uppercase">
//                   {label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {/* Celebration card */}
//         {currentStep >= 3 && (
//           <motion.div
//             initial={{ y: 40, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="mt-6 xl-plus:mt-10 max-w-3xl w-full px-4"
//             style={{ zIndex: 2 }}
//           >
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 xl-plus:p-10 shadow-2xl">
//               <div className="flex items-center justify-center gap-4 md:gap-6">
//                 <div className="p-3 md:p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-pink-500 shadow-lg">
//                   <Cake className="w-8 h-8 md:w-10 md:h-10 text-white" />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-white/80 text-sm md:text-base xl-plus:text-xl uppercase tracking-[0.2em] mb-1">Make a wish</p>
//                   <p className="text-white text-2xl md:text-3xl xl-plus:text-4xl font-semibold leading-tight">
//                     Cheers to you, {name}! Blow out the candles and own the year ahead.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Floating celebration emojis */}
//         {currentStep >= 3 && (
//           <div className="flex justify-center flex-wrap gap-6 text-[70px]">
//             {['🎈', '🎁', '🎊', '✨', '🎉', '🌟', '💫', '🎆'].map((emoji, i) => (
//               <motion.span
//                 key={i}
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{ 
//                   scale: [0, 1.2, 1],
//                   rotate: [0, 360],
//                   y: [0, -20, 0]
//                 }}
//                 transition={{
//                   delay: i * 0.2,
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatDelay: 3
//                 }}
//                 className="inline-block"
//               >
//                 {emoji}
//               </motion.span>
//             ))}
//           </div>
//         )}

//         {/* Floating Hearts */}
//         {currentStep >= 3 && (
//           <>
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={`heart-${i}`}
//                 className="absolute text-pink-400 text-4xl pointer-events-none"
//                 initial={{ 
//                   x: Math.random() * window.innerWidth, 
//                   y: window.innerHeight + 50,
//                   scale: 0,
//                   rotate: 0
//                 }}
//                 animate={{ 
//                   y: -100,
//                   scale: [0, 1.8, 0],
//                   rotate: [0, 180, 360],
//                   x: [null, Math.random() * window.innerWidth]
//                 }}
//                 transition={{
//                   duration: 10,
//                   delay: i * 0.8,
//                   repeat: Infinity,
//                   ease: "easeInOut"
//                 }}
//               >
//                 ❤️
//               </motion.div>
//             ))}
//           </>
//         )}

//         {/* Floating Balloons */}
//         {currentStep >= 3 && (
//           <>
//             {[...Array(50)].map((_, i) => {
//               // Create different movement patterns
//               const patterns = [
//                 // Pattern 1: Bottom to top with horizontal drift
//                 {
//                   initial: { x: Math.random() * window.innerWidth, y: window.innerHeight + 100 },
//                   animate: { 
//                     y: -200,
//                     x: [null, Math.random() * window.innerWidth],
//                     scale: [0, 1, 0.8],
//                     rotate: [0, 360, 720]
//                   }
//                 },
//                 // Pattern 2: Left to right with vertical drift
//                 {
//                   initial: { x: -200, y: Math.random() * window.innerHeight },
//                   animate: { 
//                     x: window.innerWidth + 200,
//                     y: [null, Math.random() * window.innerHeight],
//                     scale: [0, 1, 0.8],
//                     rotate: [0, -360, -720]
//                   }
//                 },
//                 // Pattern 3: Right to left with vertical drift
//                 {
//                   initial: { x: window.innerWidth + 200, y: Math.random() * window.innerHeight },
//                   animate: { 
//                     x: -200,
//                     y: [null, Math.random() * window.innerHeight],
//                     scale: [0, 1, 0.8],
//                     rotate: [0, 360, 720]
//                   }
//                 },
//                 // Pattern 4: Top to bottom with horizontal drift
//                 {
//                   initial: { x: Math.random() * window.innerWidth, y: -200 },
//                   animate: { 
//                     y: window.innerHeight + 200,
//                     x: [null, Math.random() * window.innerWidth],
//                     scale: [0, 1, 0.8],
//                     rotate: [0, -360, -720]
//                   }
//                 },
//                 // Pattern 5: Diagonal movements
//                 {
//                   initial: { x: -200, y: window.innerHeight + 200 },
//                   animate: { 
//                     x: window.innerWidth + 200,
//                     y: -200,
//                     scale: [0, 1, 0.8],
//                     rotate: [0, 360, 720]
//                   }
//                 },
//                 // Pattern 6: Reverse diagonal
//                 {
//                   initial: { x: window.innerWidth + 200, y: window.innerHeight + 200 },
//                   animate: { 
//                     x: -200,
//                     y: -200,
//                     scale: [0, 1, 0.8],
//                     rotate: [0, -360, -720]
//                   }
//                 }
//               ];
              
//               const pattern = patterns[i % patterns.length];
//               const duration = 15 + Math.random() * 10; // Random duration between 15-25 seconds
//               const delay = i * 0.5; // Staggered start times
              
//               return (
//                 <motion.div
//                   key={`balloon-${i}`}
//                   className="absolute pointer-events-none"
//                   initial={{ 
//                     ...pattern.initial,
//                     scale: 0,
//                     rotate: 0
//                   }}
//                   animate={pattern.animate}
//                   transition={{
//                     duration: duration,
//                     delay: delay,
//                     repeat: Infinity,
//                     ease: "easeInOut"
//                   }}
//                 >
//                   <img
//                     src={`/images/salesDashboard/${i % 2 === 0 ? 'images-removebg-preview.png' : 'images__1_-removebg-preview.png'}`}
//                     alt="Floating Balloon"
//                     className="w-[200px] xl-plus:w-[300px] object-contain"
//                     style={{ 
//                       filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
//                       opacity: 0.8 + Math.random() * 0.2 // Random opacity for variety
//                     }}
//                   />
//                 </motion.div>
//               );
//             })}
//           </>
//         )}
//       </div>

//       {/* Confetti */}
//       {showConfetti && (
//         <Confetti
//           width={typeof window !== 'undefined' ? window.innerWidth : 1920}
//           height={typeof window !== 'undefined' ? window.innerHeight : 1080}
//           recycle={false}
//           numberOfPieces={700}
//           colors={['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#a855f7']}
//         />
//       )}

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes gradientShift {
//           0%, 100% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Confetti from "react-confetti"

export default function BirthdayPremium({ isVisible, name = "Friend" }) {
  const [phase, setPhase] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [audioRef, setAudioRef] = useState(null);
  const [clapRef, setClapRef] = useState(null);
  const [interactionHooked, setInteractionHooked] = useState(false);
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
      if (clapRef) {
        clapRef.pause();
        clapRef.currentTime = 0;
      }
    };
  }, [audioRef, clapRef]);
  
  useEffect(() => {
    if (!isVisible) {
      setPhase(0)
      setShowConfetti(false)
      setInteractionHooked(false)
      return
    }

    // Start playing birthday music once when visible
    if (audioRef) {
      audioRef.currentTime = 0;
      audioRef.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }

    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1400),
      setTimeout(() => setShowConfetti(true), 2200),
    ]

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [isVisible, audioRef])

  // Fallback: if autoplay is blocked, play on first user interaction
  useEffect(() => {
    if (!isVisible || !audioRef || interactionHooked) return;

    const handleInteraction = () => {
      audioRef.currentTime = 0;
      audioRef.play().catch(() => {});
      setInteractionHooked(true);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    window.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [isVisible, audioRef, interactionHooked]);

  // Play clap sound when confetti shows
  useEffect(() => {
    if (showConfetti && clapRef) {
      clapRef.currentTime = 0;
      clapRef.play().catch((error) => {
        console.log("Clap play failed:", error);
      });
    }
  }, [showConfetti, clapRef]);

  if (!isVisible || !isClient) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const floatVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Light Off-White Background */}
      
      {/* Birthday Music */}
      <audio
        ref={setAudioRef}
        preload="auto"
        autoPlay
        playsInline
      >
        <source src="/audio/birthday.mp3" type="audio/mpeg" />
        <source src="/audio/birthday.ogg" type="audio/ogg" />
      </audio>

      {/* Clap Sound */}
      <audio ref={setClapRef} preload="auto" volume={1}>
        <source src="/audio/clap.mp3" type="audio/mpeg" />
        <source src="/audio/clap.ogg" type="audio/ogg" />
      </audio>
      
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #ECD1A3 0%, #f5e6d3 50%, #ECD1A3 100%)" }}>
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 xl-plus:w-[700px] xl-plus:h-[700px] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 xl-plus:w-[700px] xl-plus:h-[700px] w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 xl-plus:w-[700px] xl-plus:h-[700px]  w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 xl-plus:w-[700px] xl-plus:h-[700px] w-64 h-64 bg-rose-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Animated Particles Background */}
        {phase >= 1 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(120)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 xl-plus:w-4 xl-plus:h-4 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444, #ec4899, #a855f7)",
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [null, -100],
                  x: [null, Math.random() * window.innerWidth],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: i * 0.05,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>
        )}

        {/* Main Text Section */}
        {phase >= 2 && (
          <motion.div
            className="text-center mb-12 xl-plus:mb-24 z-20"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl lg:text-9xl xl-plus:text-[300px] font-black mb-6 xl-plus:mb-12 tracking-tighter"
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #ec4899 75%, #a855f7 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 3s ease infinite",
              }}
            >
              Happy Birthday
            </motion.h1>

            <motion.div
              className="text-5xl md:text-6xl lg:text-7xl xl-plus:text-[240px] font-bold mb-8 xl-plus:mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #ec4899 75%, #a855f7 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientFlow 3s ease infinite",
              }}
            >
              {name}
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl xl-plus:text-7xl max-w-2xl xl-plus:max-w-7xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                background: "linear-gradient(120deg, #fbbf24, #f59e0b, #ec4899, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ✨ Wishing you a year filled with joy, laughter, and unforgettable moments ✨
            </motion.p>
          </motion.div>
        )}

        {/* Celebration Elements */}
        

        {/* Premium Card */}
        {phase >= 3 && (
          <motion.div
            className="max-w-md xl-plus:max-w-7xl w-full"
            variants={floatVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl xl-plus:rounded-[3rem] p-8 xl-plus:p-16 shadow-2xl">
              <div className="space-y-4 xl-plus:space-y-8 text-center">
                <p 
                  className="text-sm xl-plus:text-7xl uppercase tracking-[0.15em] font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #ec4899 75%, #a855f7 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradientFlow 3s ease infinite",
                  }}
                >
                  Make a Wish
                </p>
                <p 
                  className="text-lg xl-plus:text-6xl leading-relaxed"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #ec4899 75%, #a855f7 100%)",
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "gradientFlow 3s ease infinite",
                  }}
                >
                  🎂 Blow out the candles and embrace the magic of another year
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating Elements */}
        
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1920}
          height={typeof window !== "undefined" ? window.innerHeight : 1080}
          recycle={false}
          numberOfPieces={800}
          colors={["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#06b6d4"]}
        />
      )}
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.div>
  )
}
