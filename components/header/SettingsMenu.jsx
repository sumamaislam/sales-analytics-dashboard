"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, User, ArrowRight, Volume2, Play, VolumeX } from "lucide-react"
import { useSocketData } from "@/components/socket/socket-data-context"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function SettingsMenu({ isOpen, onClose }) {
  const { salesAnalytics } = useSocketData()
  const [users, setUsers] = useState([])
  const router = useRouter()
  const [selectedRingTone, setSelectedRingTone] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ringTone') || 'nadra';
    }
    return 'nadra';
  })
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ringToneMuted') === 'true';
    }
    return false;
  })

  // Ring tones list
  const ringTones = {
    nadra: 'Nadra Office Style',
    classic: 'Classic Phone Ring',
    bell: 'Bell',
    chime: 'Chime',
    beep: 'Beep',
    notification: 'Notification',
    doorbell: 'Doorbell',
    melody: 'Melody (Long)',
    chimes: 'Chimes (Long)',
    fanfare: 'Fanfare (Long)',
    ascending: 'Ascending (Long)'
  }

  // Play preview sound
  const playPreview = (tone) => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioContext = new AudioContextClass();
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Play the selected tone
      const playTone = (ctx) => {
        if (tone === 'classic') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.setValueAtTime(1000, now + 0.1);
          osc.frequency.setValueAtTime(800, now + 0.2);
          osc.frequency.setValueAtTime(1000, now + 0.3);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
          gain.gain.setValueAtTime(0.6, now + 0.35);
          gain.gain.linearRampToValueAtTime(0, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
        } else if (tone === 'bell') {
          const now = ctx.currentTime;
          
          // First bell ring
          const osc1 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          osc1.connect(gain1);
          gain1.connect(ctx.destination);
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(523.25, now); // C5
          osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
          osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
          gain1.gain.setValueAtTime(0, now);
          gain1.gain.linearRampToValueAtTime(0.7, now + 0.1);
          gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
          osc1.start(now);
          osc1.stop(now + 0.5);
          
          // Second bell ring (after a short pause)
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'sine';
          const secondStart = now + 0.6; // Start after first bell ends
          osc2.frequency.setValueAtTime(523.25, secondStart); // C5
          osc2.frequency.setValueAtTime(659.25, secondStart + 0.1); // E5
          osc2.frequency.setValueAtTime(783.99, secondStart + 0.2); // G5
          gain2.gain.setValueAtTime(0, secondStart);
          gain2.gain.linearRampToValueAtTime(0.7, secondStart + 0.1);
          gain2.gain.exponentialRampToValueAtTime(0.01, secondStart + 0.5);
          osc2.start(secondStart);
          osc2.stop(secondStart + 0.5);
        } else if (tone === 'chime') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.setValueAtTime(1108.73, now + 0.15);
          osc.frequency.setValueAtTime(1318.51, now + 0.3);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
          gain.gain.setValueAtTime(0.6, now + 0.4);
          gain.gain.linearRampToValueAtTime(0, now + 0.6);
          osc.start(now);
          osc.stop(now + 0.6);
        } else if (tone === 'beep') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'square';
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(1000, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
          gain.gain.setValueAtTime(0.5, now + 0.15);
          gain.gain.linearRampToValueAtTime(0, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (tone === 'notification') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          const now = ctx.currentTime;
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.setValueAtTime(600, now + 0.1);
          osc.frequency.setValueAtTime(800, now + 0.2);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
          gain.gain.setValueAtTime(0.5, now + 0.25);
          gain.gain.linearRampToValueAtTime(0, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.3);
        } else if (tone === 'doorbell') {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.type = 'sine';
          osc2.type = 'sine';
          const now = ctx.currentTime;
          osc1.frequency.setValueAtTime(523.25, now);
          osc2.frequency.setValueAtTime(659.25, now);
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.6, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.5);
          osc2.stop(now + 0.5);
        } else if (tone === 'melody') {
          const notes = [
            { freq: 523.25, time: 0, duration: 0.3 },
            { freq: 659.25, time: 0.3, duration: 0.3 },
            { freq: 783.99, time: 0.6, duration: 0.3 },
            { freq: 1046.50, time: 0.9, duration: 0.4 },
            { freq: 783.99, time: 1.3, duration: 0.3 },
            { freq: 1046.50, time: 1.6, duration: 0.5 }
          ];
          notes.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
            gain.gain.setValueAtTime(0, ctx.currentTime + note.time);
            gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + note.time + 0.05);
            gain.gain.setValueAtTime(0.5, ctx.currentTime + note.time + note.duration - 0.1);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + note.time + note.duration);
            osc.start(ctx.currentTime + note.time);
            osc.stop(ctx.currentTime + note.time + note.duration);
          });
        } else if (tone === 'chimes') {
          const chimes = [
            { freq: 880, time: 0 },
            { freq: 1108.73, time: 0.2 },
            { freq: 1318.51, time: 0.4 },
            { freq: 1567.98, time: 0.6 },
            { freq: 1760, time: 0.8 }
          ];
          chimes.forEach(chime => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const now = ctx.currentTime + chime.time;
            osc.frequency.setValueAtTime(chime.freq, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
            osc.start(now);
            osc.stop(now + 1.2);
          });
        } else if (tone === 'fanfare') {
          const fanfare = [
            { freq: 523.25, time: 0 },
            { freq: 659.25, time: 0.1 },
            { freq: 783.99, time: 0.2 },
            { freq: 1046.50, time: 0.3 },
            { freq: 1318.51, time: 0.4 },
            { freq: 1567.98, time: 0.5 },
            { freq: 2093, time: 0.6 }
          ];
          fanfare.forEach(note => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const now = ctx.currentTime + note.time;
            osc.frequency.setValueAtTime(note.freq, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.7, now + 0.05);
            gain.gain.setValueAtTime(0.7, now + 0.3);
            gain.gain.linearRampToValueAtTime(0, now + 0.4);
            osc.start(now);
            osc.stop(now + 0.4);
          });
        } else if (tone === 'ascending') {
          const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
          scale.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const now = ctx.currentTime + (index * 0.2);
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
            gain.gain.setValueAtTime(0.6, now + 0.15);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
          });
        }
      };

      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => playTone(audioContext));
      } else {
        playTone(audioContext);
      }
    } catch (error) {
      console.log("Preview error:", error);
    }
  };

  const handleRingToneChange = (tone) => {
    setSelectedRingTone(tone);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ringTone', tone);
    }
    // Play preview only if not muted
    if (!isMuted) {
      playPreview(tone);
    }
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ringToneMuted', newMutedState.toString());
    }
  };

  useEffect(() => {
    if (salesAnalytics?.data?.salesAnalyticsUserWise) {
      const userList = Object.values(salesAnalytics.data.salesAnalyticsUserWise)
        .map((item) => ({
          id: item?.userInfo?.id,
          name: item?.userInfo?.name
        }))
        .filter((user) => user.id && user.name)
      
      // Remove duplicates based on ID
      const uniqueUsers = Array.from(
        new Map(userList.map(user => [user.id, user])).values()
      ).sort((a, b) => a.name.localeCompare(b.name))
      
      setUsers(uniqueUsers)
    }
  }, [salesAnalytics])

  const handleUserClick = (userId) => {
    onClose()
    router.push(`/user/${userId}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Side Menu */}
          <motion.div
            className="fixed right-0 top-0 h-full w-[400px] max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Mute/Unmute Toggle */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-red-500" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                  Sound Settings
                </h3>
                
                <motion.button
                  onClick={handleMuteToggle}
                  className={`w-full p-4 rounded-lg border transition-colors flex items-center justify-between ${
                    isMuted
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                      : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                    <div className="text-left">
                      <p className={`font-semibold ${
                        isMuted
                          ? 'text-red-700 dark:text-red-300'
                          : 'text-green-700 dark:text-green-300'
                      }`}>
                        {isMuted ? 'Sound Muted' : 'Sound Enabled'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {isMuted ? 'Ring tones are disabled' : 'Ring tones will play on user change'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    isMuted ? 'bg-red-200 dark:bg-red-800' : 'bg-green-200 dark:bg-green-800'
                  }`}>
                    <motion.div
                      className="w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{ x: isMuted ? 0 : 24 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </motion.button>
              </div>

              {/* Sales Users Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Sales Users
                </h3>
                
                {users.length > 0 ? (
                  <div className="space-y-2">
                    {users.map((user, index) => (
                      <motion.button
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="w-full p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left flex items-center justify-between group"
                      >
                        <p className="text-gray-900 dark:text-white font-medium">
                          {user.name}
                        </p>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      No sales users found
                    </p>
                  </div>
                )}
              </div>

              {/* Ring Tone Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Ring Tone
                </h3>
                
                <div className="space-y-2">
                  {Object.entries(ringTones).map(([key, name]) => (
                    <motion.button
                      key={key}
                      onClick={() => handleRingToneChange(key)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      disabled={isMuted}
                      className={`w-full p-4 rounded-lg border transition-colors text-left flex items-center justify-between group ${
                        selectedRingTone === key
                          ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 dark:border-purple-400'
                          : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                      } ${isMuted ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedRingTone === key
                            ? 'border-purple-600 dark:border-purple-400'
                            : 'border-gray-400 dark:border-gray-500'
                        }`}>
                          {selectedRingTone === key && (
                            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full" />
                          )}
                        </div>
                        <p className={`font-medium ${
                          selectedRingTone === key
                            ? 'text-purple-700 dark:text-purple-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isMuted) {
                            playPreview(key);
                          }
                        }}
                        disabled={isMuted}
                        className={`p-2 rounded-full transition-colors ${
                          isMuted 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'hover:bg-white/50 dark:hover:bg-black/20'
                        }`}
                        title={isMuted ? "Unmute to preview" : "Preview"}
                      >
                        <Play className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* User Count */}
              {users.length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Total Users: <span className="font-bold">{users.length}</span>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

