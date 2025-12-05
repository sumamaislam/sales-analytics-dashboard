"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Star, Sunset, Sparkles } from "lucide-react";

// Off Time Screen Quotes - 22 Working Days (Mon-Fri, 4 weeks + 2 days)
const offTimeQuotes = [
  // Week 1
  { day: 1, dayName: "Monday", quote: "Last hour, best hour — finish strong!", message: "See you tomorrow, champion!", icon: Moon, color: "from-slate-800 to-purple-900", audio: "/audio/exit/day_1.mp3" },
  { day: 2, dayName: "Tuesday", quote: "Close the day with pride, not regret!", message: "Your hard work pays off — enjoy your evening!", icon: Sunset, color: "from-orange-800 to-red-900", audio: "/audio/exit/day_2.mp3" },
  { day: 3, dayName: "Wednesday", quote: "Your final push today builds tomorrow’s momentum.", message: "Rest well. Tomorrow awaits your energy.", icon: Star, color: "from-indigo-800 to-blue-900", audio: "/audio/exit/day_3.mp3" },
  { day: 4, dayName: "Thursday", quote: "One more call can change the whole day.", message: "See you fresh tomorrow morning!", icon: Sparkles, color: "from-pink-800 to-purple-900", audio: "/audio/exit/day_4.mp3" },
  { day: 5, dayName: "Friday", quote: "End the day like a champion — strong and confident.", message: "Enjoy your weekend — you've earned it!", icon: Moon, color: "from-emerald-800 to-teal-900", audio: "/audio/exit/day_5.mp3" },
  
  // Week 2
  { day: 6, dayName: "Monday", quote: "Results come to those who finish, not those who quit early.", message: "Recharge and reset for tomorrow.", icon: Sunset, color: "from-amber-800 to-orange-900", audio: "/audio/exit/day_6.mp3" },
  { day: 7, dayName: "Tuesday", quote: "If you didn’t give up today, you already won.", message: "Sleep well, wake up stronger.", icon: Star, color: "from-violet-800 to-purple-900", audio: "/audio/exit/day_7.mp3" },
  { day: 8, dayName: "Wednesday", quote: "Push now so tomorrow becomes easier.", message: "Rest is part of the winning formula.", icon: Sparkles, color: "from-blue-800 to-indigo-900", audio: "/audio/exit/day_8.mp3" },
  { day: 9, dayName: "Thursday", quote: "“Don't leave success for tomorrow — close it today.", message: "Tomorrow starts with tonight's rest.", icon: Moon, color: "from-cyan-800 to-blue-900", audio: "/audio/exit/day_9.mp3" },
  { day: 10, dayName: "Friday", quote: "Your dedication in the last hour defines you as a closer.", message: "Weekend mode: ON. You deserve it!", icon: Sunset, color: "from-rose-800 to-pink-900", audio: "/audio/exit/day_10.mp3" },
  
  // Week 3
  { day: 11, dayName: "Monday", quote: "Stay sharp — great closers don’t slow down near the finish line.", message: "See you tomorrow, ready to lead again.", icon: Star, color: "from-purple-800 to-fuchsia-900", audio: "/audio/exit/day_11.mp3" },
  { day: 12, dayName: "Tuesday", quote: "Every minute counts — use them wisely.", message: "Recharge your mind and body tonight.", icon: Sparkles, color: "from-teal-800 to-cyan-900", audio: "/audio/exit/day_12.mp3" },
  { day: 13, dayName: "Wednesday", quote: "Day isn’t over until you decide it is.", message: "Rest easy. Tomorrow brings new victories.", icon: Moon, color: "from-indigo-800 to-violet-900", audio: "/audio/exit/day_13.mp3" },
  { day: 14, dayName: "Thursday", quote: "End with excellence, not exhaustion.", message: "Your effort matters. Now rest matters too.", icon: Sunset, color: "from-orange-800 to-amber-900", audio: "/audio/exit/day_14.mp3" },
  { day: 15, dayName: "Friday", quote: "Success is built in the moments when others slow down.", message: "Enjoy the weekend — you've earned every second!", icon: Star, color: "from-emerald-800 to-green-900", audio: "/audio/exit/day_15.mp3" },
  
  // Week 4
  { day: 16, dayName: "Monday", quote: "Finish today like you want to start tomorrow.", message: "Sleep well tonight. Big things ahead.", icon: Sparkles, color: "from-blue-800 to-purple-900", audio: "/audio/exit/day_16.mp3" },
  { day: 17, dayName: "Tuesday", quote: "One strong close = one step closer to your monthly target", message: "Tomorrow's success starts with tonight's sleep.", icon: Moon, color: "from-slate-800 to-gray-900", audio: "/audio/exit/day_17.mp3" },
  { day: 18, dayName: "Wednesday", quote: "Don’t leave leads hanging — resolve, follow up, close.", message: "Recharge tonight. Finish strong tomorrow.", icon: Sunset, color: "from-pink-800 to-rose-900", audio: "/audio/exit/day_18.mp3" },
  { day: 19, dayName: "Thursday", quote: "A closer’s power is in the final push.", message: "Rest up. Tomorrow's the final push.", icon: Star, color: "from-violet-800 to-indigo-900", audio: "/audio/exit/day_19.mp3" },
  { day: 20, dayName: "Friday", quote: "You’ve made progress; now make results.", message: "Celebrate your wins this weekend!", icon: Sparkles, color: "from-amber-800 to-yellow-900", audio: "/audio/exit/day_20.mp3" },
  
  // Extra 2 days (for full month coverage)
  { day: 21, dayName: "Monday", quote: "Close strong so you go home strong.", message: "Rest tonight. Rise tomorrow.", icon: Moon, color: "from-cyan-800 to-teal-900", audio: "/audio/exit/day_21.mp3" },
  { day: 22, dayName: "Tuesday", quote: "Today’s closing effort shapes tomorrow’s success.", message: "Sleep well. Tomorrow is yours to conquer.", icon: Sunset, color: "from-purple-800 to-pink-900", audio: "/audio/exit/day_22.mp3" },
];

// Function to get current working day number (1-22) based on UTC-6 timezone
const getCurrentWorkingDay = () => {
  const startDate = new Date(2025, 11, 1); // December 1, 2025 (month is 0-indexed)
  
  // Get current time in UTC-6 timezone (CST/CDT - America/Chicago)
  const usaDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  
  let workingDayCount = 0;
  const tempDate = new Date(startDate);
  
  while (tempDate <= usaDate) {
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

// Get off time quote for current working day
const getCurrentOffTimeQuote = () => {
  const workingDayNum = getCurrentWorkingDay();
  return offTimeQuotes.find(q => q.day === workingDayNum) || offTimeQuotes[0];
};

export default function OffTimeScreen({ isVisible }) {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Get current time in UTC-6 timezone (CST/CDT)
    const usaDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    const dayOfWeek = usaDate.getDay(); // 0 = Sunday, 6 = Saturday

    // Skip screen on Saturday & Sunday
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    // Get today's working day off time quote
    setCurrentQuote(getCurrentOffTimeQuote());
  }, []);

  // Play audio automatically with delay - same as MotivationalGreeting
  useEffect(() => {
    if (mounted && isVisible && currentQuote && currentQuote.audio) {
      const audio = new Audio(currentQuote.audio);
      audio.volume = 1;
      const timer = setTimeout(() => {
        audio.play();
      }, 2000); // 2 sec delay

      setAudioPlayer(audio);

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [mounted, isVisible, currentQuote]);

  // Don't render anything on Sat/Sun
  if (!mounted || !isVisible || !currentQuote) return null;

  const IconComponent = currentQuote.icon;

  return (
    // <AnimatePresence>
    //   {isVisible && (
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       className={`h-screen w-full flex items-center justify-center bg-gradient-to-br ${currentQuote.color} relative overflow-hidden`}
    //     >
    //       {/* Animated Stars Background */}
    //       <div className="absolute inset-0 opacity-30">
    //         <div
    //           className="absolute inset-0"
    //           style={{
    //             backgroundImage: `radial-gradient(2px 2px at 20% 30%, white, transparent),
    //                              radial-gradient(2px 2px at 60% 70%, white, transparent),
    //                              radial-gradient(1px 1px at 50% 50%, white, transparent),
    //                              radial-gradient(1px 1px at 80% 10%, white, transparent),
    //                              radial-gradient(2px 2px at 90% 60%, white, transparent),
    //                              radial-gradient(1px 1px at 33% 85%, white, transparent),
    //                              radial-gradient(2px 2px at 15% 75%, white, transparent)`,
    //             backgroundSize: "200% 200%",
    //           }}
    //         />
    //       </div>

    //       {/* Glowing Moon/Sun Effect */}
    //       <motion.div
    //         className="absolute top-20 right-20 w-48 h-48 bg-white rounded-full opacity-20 blur-3xl"
    //         animate={{
    //           scale: [1, 1.3, 1],
    //           opacity: [0.2, 0.4, 0.2],
    //         }}
    //         transition={{
    //           duration: 4,
    //           repeat: Infinity,
    //           ease: "easeInOut",
    //         }}
    //       />

    //       {/* Floating Background Elements */}
    //       <motion.div
    //         className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl"
    //         animate={{
    //           scale: [1, 1.2, 1],
    //           y: [0, -20, 0],
    //         }}
    //         transition={{
    //           duration: 5,
    //           repeat: Infinity,
    //           ease: "easeInOut",
    //         }}
    //       />

    //       {/* Main Content Container */}
    //       <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
    //         {/* Top Bar with Day Info */}
    //         <motion.div
    //           initial={{ y: -30, opacity: 0 }}
    //           animate={{ y: 0, opacity: 1 }}
    //           transition={{ delay: 0.1, duration: 0.6 }}
    //           className="mb-8 flex items-center justify-between"
    //         >
    //           <div className="flex items-center gap-4">
    //             <div className="w-2 h-12 bg-white rounded-full opacity-50" />
    //             <div>
    //               <div className="text-white/70 text-xs font-medium uppercase tracking-wider">Working Day</div>
    //               <div className="text-white text-2xl font-black">
    //                 Day {currentQuote.day} • {currentQuote.dayName}
    //               </div>
    //             </div>
    //           </div>
    //           <div className="text-right">
    //             <div className="text-white/70 text-xs font-medium uppercase tracking-wider">Time to Rest</div>
    //             <div className="text-white text-2xl font-black">
    //               {new Date().toLocaleTimeString("en-US", {
    //                 hour: "2-digit",
    //                 minute: "2-digit",
    //                 hour12: true,
    //               })}
    //             </div>
    //           </div>
    //         </motion.div>

    //         {/* Off Time Badge */}
    //         <motion.div
    //           initial={{ y: -20, opacity: 0 }}
    //           animate={{ y: 0, opacity: 1 }}
    //           transition={{ delay: 0.2, duration: 0.6 }}
    //           className="mb-8"
    //         >
    //           <div className="inline-block mt-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-8 py-3">
    //             <span className="text-white font-bold uppercase  text-7xl drop-shadow-lg">
    //               🌙 OFF TIME
    //             </span>
    //           </div>
    //         </motion.div>

    //         {/* Animated Icon */}
    //         <motion.div
    //           initial={{ scale: 0, rotate: -180 }}
    //           animate={{ scale: 1, rotate: 0 }}
    //           transition={{
    //             delay: 0.4,
    //             type: "spring",
    //             stiffness: 200,
    //             damping: 15,
    //           }}
    //           className="mb-12"
    //         >
    //           <motion.div
    //             animate={{
    //               y: [0, -20, 0],
    //               rotate: [0, 10, -10, 0],
    //             }}
    //             transition={{
    //               duration: 3,
    //               repeat: Infinity,
    //               ease: "easeInOut",
    //             }}
    //           >
    //             <IconComponent className="w-32 h-32 text-white mx-auto drop-shadow-2xl" />
    //           </motion.div>
    //         </motion.div>

    //         {/* Main Quote */}
    //         {/* <motion.div
    //           initial={{ y: 30, opacity: 0 }}
    //           animate={{ y: 0, opacity: 1 }}
    //           transition={{ delay: 0.6, duration: 0.8 }}
    //           className="mb-8"
    //         >
    //           <h1 className="text-6xl xl-plus:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
    //             {currentQuote.quote}
    //           </h1>
    //           <div className="h-1 w-32 bg-white mx-auto rounded-full opacity-50" />
    //         </motion.div> */}

    //         {/* Goodbye Message Box */}
    //         <motion.div
    //           initial={{ y: 30, opacity: 0 }}
    //           animate={{ y: 0, opacity: 1 }}
    //           transition={{ delay: 0.8, duration: 0.8 }}
    //           className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 mb-8"
    //         >
    //           <p className="text-white/90 text-3xl font-bold">
    //             ✨  {currentQuote.quote}
    //           </p>
    //         </motion.div>

    //         {/* Thank You Message */}
    //         <motion.div
    //           initial={{ opacity: 0, scale: 0.9 }}
    //           animate={{ opacity: 1, scale: 1 }}
    //           transition={{ delay: 1, duration: 0.8 }}
    //           className="text-white/80 text-xl font-semibold"
    //         >
    //           Thank you for your dedication today! 🙏
    //         </motion.div>
    //       </div>

    //       {/* Floating Stars/Particles */}
    //       {[...Array(12)].map((_, i) => (
    //         <motion.div
    //           key={i}
    //           className="absolute bg-white rounded-full"
    //           style={{
    //             width: Math.random() > 0.5 ? "4px" : "3px",
    //             height: Math.random() > 0.5 ? "4px" : "3px",
    //             left: `${Math.random() * 100}%`,
    //             top: `${Math.random() * 100}%`,
    //           }}
    //           animate={{
    //             y: [0, -50, 0],
    //             opacity: [0, 1, 0],
    //             scale: [0, 1.5, 0],
    //           }}
    //           transition={{
    //             duration: 3 + Math.random() * 3,
    //             repeat: Infinity,
    //             delay: Math.random() * 2,
    //           }}
    //         />
    //       ))}

    //       {/* Corner Glow Effects */}
    //       <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
    //       <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
    //     </motion.div>
    //   )}
    // </AnimatePresence>
    <AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`h-screen w-full flex items-center justify-center bg-gradient-to-br ${currentQuote.color} relative overflow-hidden`}
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(3px 3px at 20% 30%, white, transparent),
                              radial-gradient(3px 3px at 60% 70%, white, transparent),
                              radial-gradient(2px 2px at 50% 50%, white, transparent),
                              radial-gradient(2px 2px at 80% 10%, white, transparent),
                              radial-gradient(3px 3px at 90% 60%, white, transparent),
                              radial-gradient(2px 2px at 33% 85%, white, transparent),
                              radial-gradient(3px 3px at 15% 75%, white, transparent)`,
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Glowing Moon/Sun */}
      <motion.div
        className="absolute top-40 right-40 w-64 h-64 bg-white rounded-full opacity-20 blur-4xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Background Blob */}
      <motion.div
        className="absolute bottom-20 left-20 w-56 h-56 bg-white rounded-full opacity-20 blur-4xl"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 xl-plus:max-w-[2500px] max-w-[1600px] mx-auto px-12 text-center">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-6">
            <div className="w-3 h-16 bg-white rounded-full opacity-50" />
            <div>
              <div className="text-white/70 xl-plus:text-5xl text-sm font-medium uppercase tracking-wider">
                Working Day
              </div>
              <div className="text-white text-4xl xl-plus:text-5xl font-black">
                Day {currentQuote.day} • {currentQuote.dayName}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 xl-plus:text-5xl text-sm font-medium uppercase tracking-wider">
              Time to Rest
            </div>
            <div className="text-white text-4xl xl-plus:text-5xl font-black">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        </motion.div>

        {/* Off Time Badge */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block mt-24 bg-white/20 backdrop-blur-md border border-white/30 rounded-full xl-plus:px-20 xl-plus:py-20 px-12 py-4">
            <span className="text-white font-bold uppercase text-9xl xl-plus:text-[14rem] drop-shadow-lg">
              🌙 OFF TIME
            </span>
          </div>
        </motion.div>

        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mb-16"
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <IconComponent className="w-40 h-40 xl-plus:w-56 xl-plus:h-56 text-white mx-auto drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Quote Box */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-16 mb-12"
        >
          <p className="text-white/90 text-4xl xl-plus:text-7xl font-bold leading-tight">
            ✨ {currentQuote.quote}
          </p>
        </motion.div>

        {/* Thank You */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-white/80 text-2xl xl-plus:text-5xl font-semibold"
        >
          Thank you for your dedication today! 🙏
        </motion.div>
      </div>

      {/* Floating Stars/Particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() > 0.5 ? "6px" : "4px",
            height: Math.random() > 0.5 ? "6px" : "4px",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Corner Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-4xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-4xl" />
    </motion.div>
  )}
</AnimatePresence>

  );
}
