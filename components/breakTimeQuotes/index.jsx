"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Smile, Zap, Moon, Wind } from "lucide-react";

// Break Time Quotes - 22 Working Days (Mon-Fri, 4 weeks + 2 days)
const breakTimeQuotes = [
  // Week 1
  { day: 1, dayName: "Monday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Second half reloaded — let’s go stronger!", tip: "Stretch your shoulders and hydrate yourself", audio: "/voices/monday1.mp3" },
  { day: 2, dayName: "Tuesday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Afternoon success belongs to those who stay consistent.", tip: "Step outside for 5 minutes of fresh air", audio: "/voices/day2.mp3" },
  { day: 3, dayName: "Wednesday", breakType: "Lunch Break", icon: Smile, color: "from-green-500 to-emerald-500", quote: "Now is the time to convert leads into results.", tip: "Take time to enjoy your meal mindfully", audio: "/voices/day3.mp3" },
  { day: 4, dayName: "Thursday", breakType: "Afternoon Break", icon: Zap, color: "from-blue-500 to-cyan-500", quote: "Don't slow down — speed up!", tip: "Do 10 quick jumping jacks to boost energy", audio: "/voices/day 4.mp3" },
  { day: 5, dayName: "Friday", breakType: "Evening Break", icon: Moon, color: "from-indigo-500 to-purple-500", quote: "One strong afternoon can change the entire day’s numbers.", tip: "Reflect on what you accomplished this week", audio: "/voices/day 5.mp3" },
  
  // Week 2
  { day: 6, dayName: "Monday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Push harder — the finish line is getting closer.", tip: "Do some light stretching exercises", audio: "/voices/day 6.mp3" },
  { day: 7, dayName: "Tuesday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Your best calls might still be ahead of you.", tip: "Breathe deeply for 2 minutes", audio: "/voices/day 7.mp3" },
  { day: 8, dayName: "Wednesday", breakType: "Lunch Break", icon: Smile, color: "from-green-500 to-emerald-500", quote: "You’ve reset — now rise!", tip: "Walk around while eating if possible", audio: "/voices/day 8.mp3" },
  { day: 9, dayName: "Thursday", breakType: "Afternoon Break", icon: Zap, color: "from-blue-500 to-cyan-500", quote: "Momentum wins targets. Keep the rhythm.", tip: "Splash cold water on your face", audio: "/voices/day 9.mp3" },
  { day: 10, dayName: "Friday", breakType: "Evening Break", icon: Moon, color: "from-indigo-500 to-purple-500", quote: "Every follow-up is a step closer to closing.", tip: "Prepare your mind for next week", audio: "/voices/day 10.mp3" },
  
  // Week 3
  { day: 11, dayName: "Monday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Stay hungry. Stay driven.", tip: "Hydrate with a full glass of water", audio: "/voices/day 11.mp3" },
  { day: 12, dayName: "Tuesday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Winners don’t rely on the morning — they dominate the afternoon.", tip: "Stand up and stretch for 1 minute", audio: "/voices/day 12.mp3" },
  { day: 13, dayName: "Wednesday", breakType: "Lunch Break", icon: Smile, color: "from-green-500 to-emerald-500", quote: "Your effort now defines your closing achievements.", tip: "Avoid heavy foods for better afternoon energy", audio: "/voices/day 13.mp3" },
  { day: 14, dayName: "Thursday", breakType: "Afternoon Break", icon: Zap, color: "from-blue-500 to-cyan-500", quote: "Be the reason the team finishes the day with pride.", tip: "Look away from screen for 20 seconds", audio: "/voices/day 14.mp3" },
  { day: 15, dayName: "Friday", breakType: "Evening Break", icon: Moon, color: "from-indigo-500 to-purple-500", quote: "Half the day is gone — the best half starts now!", tip: "Take deep breaths and relax your muscles", audio: "/voices/day 15.mp3" },
  
  // Week 4
  { day: 16, dayName: "Monday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Don’t let leads cool down — bring heat!", tip: "Do neck rolls slowly and carefully", audio: "/voices/day 16.mp3" },
  { day: 17, dayName: "Tuesday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "You came to work — now let's rest to win!", tip: "Close your eyes and relax for 30 seconds", audio: "/voices/day 17.mp3" },
  { day: 18, dayName: "Wednesday", breakType: "Lunch Break", icon: Smile, color: "from-green-500 to-emerald-500", quote: "Fuel up for the final stretch of the week!", tip: "Eat something that energizes you", audio: "/voices/day 18.mp3" },
  { day: 19, dayName: "Thursday", breakType: "Afternoon Break", icon: Zap, color: "from-blue-500 to-cyan-500", quote: "One more day! You're making it happen!", tip: "Jump up and down 10 times", audio: "/voices/day 19.mp3" },
  { day: 20, dayName: "Friday", breakType: "Evening Break", icon: Moon, color: "from-indigo-500 to-purple-500", quote: "Month complete! You crushed it!", tip: "Celebrate your hard work and dedication", audio: "/voices/day 20.mp3" },
  
  // Extra 2 days (for full month coverage)
  { day: 21, dayName: "Monday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "New month, same excellence! Rest and reset!", tip: "Meditate for 1 minute", audio: "/voices/day 21.mp3" },
  { day: 22, dayName: "Tuesday", breakType: "Morning Break", icon: Coffee, color: "from-amber-500 to-orange-500", quote: "Every break brings you closer to success!", tip: "Listen to calming music during your break", audio: "/voices/day 22.mp3" },
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

// Get break quote for current working day
const getCurrentBreakQuote = () => {
  const workingDayNum = getCurrentWorkingDay();
  return breakTimeQuotes.find(q => q.day === workingDayNum) || breakTimeQuotes[0];
};

export default function BreakTimeQuotes({ isVisible }) {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    setMounted(true);

    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 6 = Saturday

    // Skip screen on Saturday & Sunday
    if (dayOfWeek === 0 || dayOfWeek === 6) return;

    // Get today's working day break quote
    setCurrentQuote(getCurrentBreakQuote());
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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`h-screen w-full flex items-center justify-center bg-gradient-to-br ${currentQuote.color} relative overflow-hidden`}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                                 radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Floating Background Elements */}
          <motion.div
            className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full opacity-10 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main Content Container */}
          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            {/* Top Bar with Day Info */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-white rounded-full opacity-50" />
                <div>
                  <div className="text-white/70 text-xs font-medium uppercase tracking-wider">Working Day</div>
                  <div className="text-white text-2xl font-black">
                    Day {currentQuote.day} • {currentQuote.dayName}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Break Type Badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-2">
                <span className="text-white font-bold uppercase tracking-widest text-sm">
                  {currentQuote.breakType}
                </span>
              </div>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconComponent className="w-24 h-24 text-white mx-auto drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Break Quote */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl xl-plus:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                {currentQuote.quote}
              </h1>
              <div className="h-1 w-24 bg-white mx-auto rounded-full opacity-50" />
            </motion.div>

            {/* Wellness Tip */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8"
            >
              <p className="text-white/90 text-xl font-semibold">
                💡 <span className="ml-3">{currentQuote.tip}</span>
              </p>
            </motion.div>

            {/* Time Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12"
            >
              <p className="text-white/80 text-lg">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </motion.div>
          </div>

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0, 1, 0],
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
