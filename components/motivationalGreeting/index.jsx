"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Sun, Coffee, Heart, Star, Zap } from "lucide-react";

// 22 Working Days Motivational Quotes (Mon-Fri, 4 weeks + 2 days)
const workingDaysQuotes = [
  // Week 1
  { day: 1, dayName: "Monday", quote: "New week, new opportunities! Let's make it count, Sam!", audio: "/voices/monday1.mp3" },
  { day: 2, dayName: "Tuesday", quote: "Your first call sets your momentum. Begin strong!", audio: "/voices/day2.mp3" },
  { day: 3, dayName: "Wednesday", quote: "Today’s numbers start now. Own them!" , audio: "/voices/day3.mp3" },
  { day: 4, dayName: "Thursday", quote: "Energy high, focus sharp — targets in sight!", audio: "/voices/day 4.mp3" },
  { day: 5, dayName: "Friday", quote: "Your morning discipline decides your evening success.", audio: "/voices/day 5.mp3" },
  
  // Week 2
  { day: 6, dayName: "Monday", quote: "Every lead is a new opportunity — go capture it!" , audio: "/voices/day 6.mp3" },
  { day: 7, dayName: "Tuesday", quote: "Start fast, finish faster!", audio: "/voices/day 7.mp3" },
  { day: 8, dayName: "Wednesday", quote: "Be the reason the team hits record numbers today." , audio: "/voices/day 8.mp3" },
  { day: 9, dayName: "Thursday", quote: "A powerful day starts with a powerful mindset.", audio: "/voices/day 9.mp3" },
  { day: 10, dayName: "Friday", quote: "Success doesn’t wait — start taking action now." , audio: "/voices/day 10.mp3" },
  
  // Week 3
  { day: 11, dayName: "Monday", quote: "Your effort today writes your success story." ,audio: "/voices/day 11.mp3" },
  { day: 12, dayName: "Tuesday", quote: "Let's turn potential into performance.", audio: "/voices/day 12.mp3" },
  { day: 13, dayName: "Wednesday", quote: "Winners act early. Be the first to close today", audio: "/voices/day 13.mp3" },
  { day: 14, dayName: "Thursday", quote: "Focus on progress, not perfection — keep moving." , audio: "/voices/day 14.mp3" },
  { day: 15, dayName: "Friday", quote: "Your tone, confidence, and attitude move sales.", audio: "/voices/day 15.mp3" },
  
  // Week 4
  { day: 16, dayName: "Monday", quote: "Make today better than yesterday." , audio: "/voices/day 16.mp3" },
  { day: 17, dayName: "Tuesday", quote: "You came to work — now let’s work to win.!" , audio: "/voices/day 17.mp3" },
  { day: 18, dayName: "Wednesday", quote: "Your morning calls build the whole day’s momentum." , audio: "/voices/day 18.mp3" },
  { day: 19, dayName: "Thursday", quote: "If you want results, start creating them now." , audio: "/voices/day 19.mp3" },
  { day: 20, dayName: "Friday", quote: "Every target is achievable — break it step by step." , audio: "/voices/day 20.mp3" },
  
  // Extra 2 days (for full month coverage)
  { day: 21, dayName: "Monday", quote: "Mindset ON, excuses OFF", audio: "/voices/day 21.mp3" },
  { day: 22, dayName: "Tuesday", quote: "Let’s make today the highest-performing day of the week.", audio: "/voices/day 22.mp3" },
];

// Function to get current working day number (1-22) based on date
const getCurrentWorkingDay = () => {
  const startDate = new Date(2025, 11, 1); // December 1, 2025 (month is 0-indexed)
  const currentDate = new Date();
    
  let workingDayCount = 0;
  const tempDate = new Date(startDate);
  
  while (tempDate <= currentDate) {
    const dayOfWeek = tempDate.getDay();
    // Count only Monday (1) to Friday (5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDayCount++;
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }
  
  // Keep within 1-22 range
  return workingDayCount > 0 ? ((workingDayCount - 1) % 22) + 1 : 1;
};

export default function MotivationalGreeting({ isVisible }) {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [mounted, setMounted] = useState(false);
const [audioPlayer, setAudioPlayer] = useState(null);
//   useEffect(() => {
//     setMounted(true);
//     // Get today's working day quote
//     const workingDayNum = getCurrentWorkingDay();
//     const todayQuote = workingDaysQuotes.find(q => q.day === workingDayNum);
//     setCurrentQuote(todayQuote || workingDaysQuotes[0]);
//   }, []);


//  useEffect(() => {
//     if (mounted && isVisible && currentQuote && currentQuote.audio) {
//       const audio = new Audio(currentQuote.audio);
//       audio.volume = 1;
//       audio.play();
//       setAudioPlayer(audio);

//       return () => {
//         audio.pause();
//         audio.src = "";
//       };
//     }
//   }, [mounted, isVisible, currentQuote]);

//   if (!mounted || !isVisible || !currentQuote) return null;
useEffect(() => {
    setMounted(true);

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

    // Skip screen on Saturday & Sunday
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    const workingDayNum = getCurrentWorkingDay();
    const todayQuote = workingDaysQuotes.find(q => q.day === workingDayNum);
    setCurrentQuote(todayQuote || workingDaysQuotes[0]);
  }, []);

  useEffect(() => {
    if (mounted && isVisible && currentQuote && currentQuote.audio) {
      const audio = new Audio(currentQuote.audio);
      audio.volume = 1;
      audio.play();
      setAudioPlayer(audio);

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [mounted, isVisible, currentQuote]);

  // Don’t render anything on Sat/Sun
  if (!mounted || !isVisible || !currentQuote) return null; 
return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Glowing Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-[120px] opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Content Container */}
          <div className="relative z-10 xl-plus:w-[70%]  mx-auto px-8">
            {/* Top Bar with Day Info */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center justify-between mb-16"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 xl-plus:h-32 h-16 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                <div>
                  <div className="text-gray-400 mb-4 xl-plus:text-5xl text-sm font-medium uppercase tracking-wider">Working Day</div>
                  <div className="text-white xl-plus:text-7xl text-3xl font-black">
                    <span className="text-purple-400"> {currentQuote.dayName}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 xl-plus:text-5xl text-sm font-medium uppercase tracking-wider mb-4">Current Time</div>
                <div className="text-white xl-plus:text-7xl text-3xl font-black">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
                
              </div>
            </motion.div>

            {/* Main Greeting */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
             
              className="text-center xl-plus:mb-20 mb-12"
            >
              <motion.h1
                className="xl-plus:text-[350px] text-[120px] xl-plus:mt-32 font-black leading-none mb-4"
                style={{
                  background: "linear-gradient(to right, #a78bfa, #60a5fa, #a78bfa)",
                  fontFamily:"cursive",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% center", "200% center", "0% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                HELLO EVERYONE
              </motion.h1>
              
              {/* Animated Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="xl-plus:h-5 h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto xl-plus:max-w-[70%] max-w-2xl rounded-full"
              />
            </motion.div>

            {/* Motivational Quote Box */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl rounded-3xl" />
              
              {/* Quote Container */}
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl xl-plus:mt-[200px] p-12 shadow-2xl">
                <div className="absolute top-0 left-12 -translate-y-1/2">
                  <div className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold xl-plus:text-5xl text-sm uppercase tracking-wider">
                    Daily Quotes
                  </div>
                </div>
                
                <p className=" xl-plus:text-[100px]  text-4xl font-bold text-white leading-relaxed text-center">
                  {currentQuote.quote}
                </p>
              </div>
            </motion.div>

            {/* Bottom Stats/Icons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="xl-plus:mt-30 mt-16 flex justify-center gap-8"
            >
              {[
                { Icon: Zap, label: "Energy", color: "from-yellow-500 to-orange-500" },
                { Icon: Heart, label: "Passion", color: "from-pink-500 to-red-500" },
                { Icon: Star, label: "Excellence", color: "from-purple-500 to-blue-500" },
                { Icon: Coffee, label: "Focus", color: "from-blue-500 to-cyan-500" },
              ].map(({ Icon, label, color }, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className={`bg-gradient-to-br ${color} p-4 rounded-2xl shadow-lg`}>
                    <Icon className="text-white xl-plus:w-30 xl-plus:h-30 w-8 h-8" />
                  </div>
                  <span className="text-gray-400 xl-plus:text-3xl text-sm font-semibold uppercase tracking-wider">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-purple-500/50 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-blue-500/50 rounded-br-3xl" />
          
          {/* Floating Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
