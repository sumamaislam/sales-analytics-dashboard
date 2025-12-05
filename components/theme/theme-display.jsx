"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "./theme-context";
import { useSalesAnalytics } from "../socket/useSocketData";
import GoodMorning from "../goodMorning";
import GoodNight from "../goodNight";
import MotivationalGreeting from "../motivationalGreeting";
import BreakTimeQuotes from "../breakTimeQuotes";
import OffTimeScreen from "../offTimeScreen";
import Birthday from "../birthday";
import Header from "../header";
import SalesDashboard from "../SalesDashboard";
import SalesMarquee from "../SalesDashboard/salesMarquee";
import SummaryCom from "../SalesDashboard/summaryCom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Ring Tones Library - defined outside component to avoid recreation
const ringTones = {
  nadra: {
    name: "Nadra Office Style",
    play: (audioContext) => {
      // Professional office notification sound (like Nadra screens)
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);

      osc1.type = "sine";
      osc2.type = "sine";

      const now = audioContext.currentTime;

      // Two-tone professional beep (like office systems)
      osc1.frequency.setValueAtTime(1000, now);
      osc2.frequency.setValueAtTime(1200, now);

      // Quick double beep pattern
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
      gainNode.gain.setValueAtTime(0.4, now + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.15);

      // Second beep
      gainNode.gain.setValueAtTime(0, now + 0.2);
      gainNode.gain.linearRampToValueAtTime(0.4, now + 0.25);
      gainNode.gain.setValueAtTime(0.4, now + 0.3);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.35);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    },
  },
  classic: {
    name: "Classic Phone Ring",
    play: (audioContext) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = "sine";
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.setValueAtTime(1000, now + 0.1);
      oscillator.frequency.setValueAtTime(800, now + 0.2);
      oscillator.frequency.setValueAtTime(1000, now + 0.3);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.6, now + 0.05);
      gainNode.gain.setValueAtTime(0.6, now + 0.35);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.4);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    },
  },
  bell: {
    name: "Bell",
    play: (audioContext) => {
      const now = audioContext.currentTime;

      // First bell ring
      const osc1 = audioContext.createOscillator();
      const gain1 = audioContext.createGain();
      osc1.connect(gain1);
      gain1.connect(audioContext.destination);
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.7, now + 0.1);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc1.start(now);
      osc1.stop(now + 0.5);

      // Second bell ring (after a short pause)
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      osc2.type = "sine";
      const secondStart = now + 0.6; // Start after first bell ends
      osc2.frequency.setValueAtTime(523.25, secondStart); // C5
      osc2.frequency.setValueAtTime(659.25, secondStart + 0.1); // E5
      osc2.frequency.setValueAtTime(783.99, secondStart + 0.2); // G5
      gain2.gain.setValueAtTime(0, secondStart);
      gain2.gain.linearRampToValueAtTime(0.7, secondStart + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.01, secondStart + 0.5);
      osc2.start(secondStart);
      osc2.stop(secondStart + 0.5);
    },
  },
  chime: {
    name: "Chime",
    play: (audioContext) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = "sine";
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(880, now); // A5
      oscillator.frequency.setValueAtTime(1108.73, now + 0.15); // C#6
      oscillator.frequency.setValueAtTime(1318.51, now + 0.3); // E6
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.6, now + 0.05);
      gainNode.gain.setValueAtTime(0.6, now + 0.4);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.6);
      oscillator.start(now);
      oscillator.stop(now + 0.6);
    },
  },
  beep: {
    name: "Beep",
    play: (audioContext) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = "square";
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(1000, now);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.05);
      gainNode.gain.setValueAtTime(0.5, now + 0.15);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      oscillator.start(now);
      oscillator.stop(now + 0.2);
    },
  },
  notification: {
    name: "Notification",
    play: (audioContext) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = "sine";
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(800, now);
      oscillator.frequency.setValueAtTime(600, now + 0.1);
      oscillator.frequency.setValueAtTime(800, now + 0.2);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.05);
      gainNode.gain.setValueAtTime(0.5, now + 0.25);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
    },
  },
  doorbell: {
    name: "Doorbell",
    play: (audioContext) => {
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      osc1.type = "sine";
      osc2.type = "sine";
      const now = audioContext.currentTime;
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.frequency.setValueAtTime(659.25, now); // E5
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.6, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    },
  },
  melody: {
    name: "Melody (Long)",
    play: (audioContext) => {
      // Long melodic sequence
      const notes = [
        { freq: 523.25, time: 0, duration: 0.3 }, // C5
        { freq: 659.25, time: 0.3, duration: 0.3 }, // E5
        { freq: 783.99, time: 0.6, duration: 0.3 }, // G5
        { freq: 1046.5, time: 0.9, duration: 0.4 }, // C6
        { freq: 783.99, time: 1.3, duration: 0.3 }, // G5
        { freq: 1046.5, time: 1.6, duration: 0.5 }, // C6
      ];

      notes.forEach((note) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(
          note.freq,
          audioContext.currentTime + note.time
        );
        gain.gain.setValueAtTime(0, audioContext.currentTime + note.time);
        gain.gain.linearRampToValueAtTime(
          0.5,
          audioContext.currentTime + note.time + 0.05
        );
        gain.gain.setValueAtTime(
          0.5,
          audioContext.currentTime + note.time + note.duration - 0.1
        );
        gain.gain.linearRampToValueAtTime(
          0,
          audioContext.currentTime + note.time + note.duration
        );
        osc.start(audioContext.currentTime + note.time);
        osc.stop(audioContext.currentTime + note.time + note.duration);
      });
    },
  },
  chimes: {
    name: "Chimes (Long)",
    play: (audioContext) => {
      // Long chime sequence
      const chimes = [
        { freq: 880, time: 0 }, // A5
        { freq: 1108.73, time: 0.2 }, // C#6
        { freq: 1318.51, time: 0.4 }, // E6
        { freq: 1567.98, time: 0.6 }, // G6
        { freq: 1760, time: 0.8 }, // A6
      ];

      chimes.forEach((chime, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        const now = audioContext.currentTime + chime.time;
        osc.frequency.setValueAtTime(chime.freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        osc.start(now);
        osc.stop(now + 1.2);
      });
    },
  },
  fanfare: {
    name: "Fanfare (Long)",
    play: (audioContext) => {
      // Long fanfare sequence
      const fanfare = [
        { freq: 523.25, time: 0 }, // C5
        { freq: 659.25, time: 0.1 }, // E5
        { freq: 783.99, time: 0.2 }, // G5
        { freq: 1046.5, time: 0.3 }, // C6
        { freq: 1318.51, time: 0.4 }, // E6
        { freq: 1567.98, time: 0.5 }, // G6
        { freq: 2093, time: 0.6 }, // C7
      ];

      fanfare.forEach((note, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        const now = audioContext.currentTime + note.time;
        osc.frequency.setValueAtTime(note.freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.7, now + 0.05);
        gain.gain.setValueAtTime(0.7, now + 0.3);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      });
    },
  },
  ascending: {
    name: "Ascending (Long)",
    play: (audioContext) => {
      // Long ascending sequence
      const scale = [
        523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5,
      ]; // C major scale

      scale.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.type = "sine";
        const now = audioContext.currentTime + index * 0.2;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
        gain.gain.setValueAtTime(0.6, now + 0.15);
        gain.gain.linearRampToValueAtTime(0, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      });
    },
  },
};

export default function ThemeDisplay() {
  const { theme } = useTheme();
  const { data: salesData, loading } = useSalesAnalytics();
  const [showGreeting, setShowGreeting] = useState(false);
  const [showMotivational, setShowMotivational] = useState(false);
  const [showBreakTimeQuotes, setShowBreakTimeQuotes] = useState(false);
  const [showOffTimeScreen, setShowOffTimeScreen] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [birthdayName, setBirthdayName] = useState("");
  const [motivationalShownToday, setMotivationalShownToday] = useState(false);
  const [breakTimeShownToday, setBreakTimeShownToday] = useState(false);
  const [offTimeShownToday, setOffTimeShownToday] = useState(false);
  const [birthdayShownToday, setBirthdayShownToday] = useState(false);
  console.log(birthdayShownToday, "birthdayShow");
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [userNames, setUserNames] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showSalesDashboard, setShowSalesDashboard] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [voices, setVoices] = useState([]);

  const [selectedRingTone, setSelectedRingTone] = useState(() => {
    // Load from localStorage or use default (Nadra style)
    if (typeof window !== "undefined") {
      return localStorage.getItem("ringTone") || "nadra";
    }
    return "nadra";
  });

  const [isMuted, setIsMuted] = useState(() => {
    // Load mute state from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("ringToneMuted") === "true";
    }
    return false;
  });

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const audioContextRef = useRef(null);

  const playAIvoice = async (text) => {
  const apiKey = "7751dec2849769f6acfa4dca4281355c54ab5ddc73ba9dc4e0e4d71675b63fdc";

  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/N2lVS1w4EtoT3dr4eOWO",  // Default Riley voice
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.8,
        },
      }),
    }
  );

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
};
  // Initialize audio context on user interaction
  useEffect(() => {
    const initAudio = () => {
      try {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass && !audioContextRef.current) {
          audioContextRef.current = new AudioContextClass();
          // Resume if suspended
          if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
          }
        }
      } catch (error) {
        console.log("Audio init error:", error);
      }
    };

    // Initialize on any user interaction
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, initAudio, { once: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, initAudio);
      });
    };
  }, []);

  // Function to speak user name
  const speakUserName = (userName, selectedVoice = null) => {
    console.log("Attempting to speak user name:", userName);
    if (!userName || typeof window === "undefined") return;

    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(userName);
        utterance.lang = "en-US"; // Set language to Urdu (Pakistan)
        utterance.rate = 0.9; // Slightly slower
        utterance.pitch = 1.1;
        utterance.volume = 1;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        // Speak the user name
        window.speechSynthesis.speak(utterance);
        console.log(`🗣️ Speaking user name: ${userName}`);
      }
    } catch (error) {
      console.log("Speech synthesis error:", error);
    }
  };

  // Function to play ring sound
  const playRingSound = () => {
    // Check if muted - get latest from localStorage
    const currentMuted =
      typeof window !== "undefined"
        ? localStorage.getItem("ringToneMuted") === "true"
        : isMuted;

    if (currentMuted) {
      console.log("🔇 Sound is muted");
      return;
    }

    // Get current user name
    const currentUserName = userNames[currentIndex] || "";
    console.log("🔔 Ring sound for user:", currentUserName);

    try {
      if (!audioContextRef.current) {
        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) {
          console.log("AudioContext not supported");
          return;
        }
        audioContextRef.current = new AudioContextClass();
      }

      const audioContext = audioContextRef.current;

      // Resume audio context if suspended
      if (audioContext.state === "suspended") {
        audioContext
          .resume()
          .then(() => {
            playRingTone(audioContext);
          })
          .catch((err) => {
            console.log("Audio context resume failed:", err);
          });
      } else {
        playRingTone(audioContext);
      }
    } catch (error) {
      console.log("Audio error:", error);
    }
  };
  useEffect(() => {
    if (userNames.length === 0) return;

    const currentName = userNames[currentIndex];
    console.log("🎤 Speaking: ", currentName);
    setTimeout(() => {
      // playAIvoice(currentName, selectedVoice);
      speakUserName(currentName, selectedVoice);
    }, 2000);
  }, [currentIndex, userNames]);

  // Listen for mute state and ring tone changes from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const muted = localStorage.getItem("ringToneMuted") === "true";
        setIsMuted(muted);

        // Also update ring tone from localStorage
        const savedTone = localStorage.getItem("ringTone") || "nadra";
        if (savedTone !== selectedRingTone) {
          setSelectedRingTone(savedTone);
        }
      }
    };

    // Listen for storage events (when changed from another tab/window)
    window.addEventListener("storage", handleStorageChange);

    // Also check periodically (for same-tab changes)
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [selectedRingTone]);

  // Check for birthday at 12:00 PM (noon)

useEffect(() => {
  const checkBirthdayTime = async () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Hit API only at 4:33 AM once per day
    if (hours === 12 && minutes === 0 && !birthdayShownToday) {
      try {
       
        const response = await fetch('/api/birthday');
        const data = await response.json();
       

        // Handle API response with "all" array
        const birthdayArray = data?.all || data || [];
        
        if (birthdayArray && birthdayArray.length > 0) {
          const firstBirthday = birthdayArray[0];
          const today = new Date();
          
        
          
          // Get the date_of_birth field
          const dateField = firstBirthday.date_of_birth;
          
          if (dateField) {
            // Parse the date string and ignore year
            const dateParts = dateField.split('-'); // Format: YYYY-MM-DD
            const birthdayMonth = parseInt(dateParts[1]) - 1; // Month is 0-indexed
            const birthdayDay = parseInt(dateParts[2]);
            
            const today = new Date();
            const todayMonth = today.getMonth();
            const todayDay = today.getDate();
            

            // Compare month and day only (ignore year)
            if (birthdayDay === todayDay && birthdayMonth === todayMonth) {
              
              
              setBirthdayName(firstBirthday.name || "Friend");
              setBirthdayShownToday(true);
              setShowBirthday(true);
              setShowGreeting(false);
              setShowSalesDashboard(false);
              setShowSummary(false);
              setShowMotivational(false);
              setShowBreakTimeQuotes(false);
              setShowOffTimeScreen(false);


              // Hide after 30 seconds
              setTimeout(() => {
                setShowBirthday(false);
                setShowSalesDashboard(true);
              }, 30000);
            } else {
              
              setBirthdayShownToday(true);
            }
          } else {
           
            setBirthdayShownToday(true);
          }
        } else {
        
          setBirthdayShownToday(true);
        }
      } catch (err) {
        console.error('❌ Birthday API error:', err);
        setBirthdayShownToday(true);
      }
    }

    // Reset flag for next day at midnight
    if (hours === 0 && minutes === 0) {
      console.log('🕛 Midnight - Reset birthday flag for tomorrow');
      setBirthdayShownToday(false);
    }
  };

  // Check on mount
  checkBirthdayTime();
  
  // Check every 1 minute
  const interval = setInterval(checkBirthdayTime, 60000);
  return () => clearInterval(interval);
}, [birthdayShownToday]);


  // Check for 4:32 PM to show motivational greeting
  useEffect(() => {
    const checkMotivationalTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Show motivational greeting at 16:32 (4:32 PM)
      if (hours === 19 && minutes === 30 && !motivationalShownToday) {
        setMotivationalShownToday(true);
        setShowMotivational(true);
        setShowGreeting(false);
        setShowSalesDashboard(false);
        setShowSummary(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowMotivational(false);
          setShowSalesDashboard(true);
        }, 30000);
      }
      
      // Reset flag at midnight (next day)
      if (hours === 0 && minutes === 0) {
        setMotivationalShownToday(false);
      }
    };

    // Check immediately
    checkMotivationalTime();
    
    // Check every 5 seconds for faster detection
    const interval = setInterval(checkMotivationalTime, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [motivationalShownToday]);

  // Check for 3:28 AM to show break time quotes
  useEffect(() => {
    const checkBreakTimeQuotes = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Show break time quotes at 3:28 AM (03:28)
      if (hours === 1 && minutes === 0 && !breakTimeShownToday) {
        setBreakTimeShownToday(true);
        setShowBreakTimeQuotes(true);
        setShowGreeting(false);
        setShowSalesDashboard(false);
        setShowSummary(false);
        setShowMotivational(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowBreakTimeQuotes(false);
          setShowSalesDashboard(true);
        }, 30000);
      }
      
      // Reset flag at midnight (next day)
      if (hours === 0 && minutes === 0) {
        setBreakTimeShownToday(false);
      }
    };

    // Check immediately
    checkBreakTimeQuotes();
    
    // Check every 5 seconds for faster detection
    const interval = setInterval(checkBreakTimeQuotes, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [breakTimeShownToday]);

  // Check for off time screen (exit time)
  useEffect(() => {
    const checkOffTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Show off time screen at specific time (e.g., 6:00 PM / 18:00)
      if (hours === 4 && minutes === 45 && !offTimeShownToday) {
        setOffTimeShownToday(true);
        setShowOffTimeScreen(true);
        setShowGreeting(false);
        setShowSalesDashboard(false);
        setShowSummary(false);
        setShowMotivational(false);
        setShowBreakTimeQuotes(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowOffTimeScreen(false);
          setShowSalesDashboard(true);
        }, 30000);
      }
      
      // Reset flag at midnight (next day)
      if (hours === 0 && minutes === 0) {
        setOffTimeShownToday(false);
      }
    };

    // Check immediately
    checkOffTime();
    
    // Check every 5 seconds for faster detection
    const interval = setInterval(checkOffTime, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [offTimeShownToday]);

  // Helper function to play the actual ring tone
  const playRingTone = (audioContext) => {
    try {
      // Get latest ring tone from localStorage to ensure we use the most recent selection
      const currentTone =
        typeof window !== "undefined"
          ? localStorage.getItem("ringTone") || "nadra"
          : selectedRingTone;

      console.log("🎵 Playing ring tone:", currentTone, "from localStorage");

      const ringTone = ringTones[currentTone];
      if (ringTone) {
        ringTone.play(audioContext);
        console.log(`🔔 ${ringTone.name} played`);
      } else {
        // Fallback to nadra
        console.log("⚠️ Ring tone not found, using nadra as fallback");
        ringTones.nadra.play(audioContext);
        console.log("🔔 Nadra ring sound played (fallback)");
      }
    } catch (error) {
      console.log("Ring tone error:", error);
    }
  };

  useEffect(() => {
    // Show greeting component for 5 seconds based on theme
    if (theme === "light" || theme === "evening") {
      // Reset any existing timers and states
      setShowGreeting(false);
      setShowSalesDashboard(false);
      setShowSummary(false);
      setCurrentIndex(0); // Reset to first user

      // Small delay to ensure clean state reset
      setTimeout(() => {
        setShowGreeting(true);
      }, 100);

      const timer = setTimeout(() => {
        setShowGreeting(false);
        setShowSalesDashboard(true); // Ensure dashboard shows after greeting
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    } else {
      // For other themes, ensure dashboard is shown
      setShowGreeting(false);
      setShowSalesDashboard(true);
    }
  }, [theme]);

  // Main timer logic - handles both user switching and summary cycling
  useEffect(() => {
    if (userNames.length > 0 && showSalesDashboard) {
      let userTimer;
      let summaryTimer;
      let initialTimer;

      const startUserCycle = () => {
        // First, wait 40 seconds before starting the cycle
        initialTimer = setTimeout(() => {
          userTimer = setInterval(() => {
            // Data refresh animation - slide up and fade
            setIsAnimating(true);
            setOpacity(0.3);
            setSlideX(0);
            setScale(0.95);

            // After slide animation, change user and slide back
            setTimeout(() => {
              setCurrentIndex((prev) => {
                const newIndex = (prev + 1) % userNames.length;
                // Play ring sound when user changes
                playRingSound();
                return newIndex;
              });
              setOpacity(1);
              setScale(1);

              // Reset animation state after animation completes
              setTimeout(() => {
                setIsAnimating(false);
              }, 1000);
            }, 1000);
          }, 40000); // 40 seconds user switching
        }, 40000); // Wait 40 seconds before starting the first cycle
      };

      const startSummaryCycle = () => {
        // After all users are shown, switch to Summary
        const totalSalesTime = userNames.length * 40000; // Total time for all users (40 seconds each)

        summaryTimer = setTimeout(() => {
          clearInterval(userTimer); // Stop user switching

          // Data refresh animation to summary
          setIsAnimating(true);
          setOpacity(0.3);
          setScale(0.95);

          setTimeout(() => {
            setShowSalesDashboard(false);
            setShowSummary(true);
            setOpacity(1);
            setScale(1);

            setTimeout(() => {
              setIsAnimating(false);

              // After 3 minutes (180 seconds), go back to SalesDashboard
              setTimeout(() => {
                // Data refresh animation back to dashboard
                setIsAnimating(true);
                setOpacity(0.3);
                setScale(0.95);

                setTimeout(() => {
                  setShowSummary(false);
                  setShowSalesDashboard(true);
                  setCurrentIndex(0); // Reset to first user
                  setOpacity(1);
                  setScale(1);

                  setTimeout(() => {
                    setIsAnimating(false);
                    startUserCycle(); // Restart user cycle
                  }, 1000);
                }, 1000);
              }, 180000); // 3 minutes = 180,000 milliseconds
            }, 1000);
          }, 1000);
        }, totalSalesTime);
      };

      startUserCycle();
      startSummaryCycle();

      return () => {
        clearInterval(userTimer);
        clearTimeout(summaryTimer);
        clearTimeout(initialTimer);
      };
    }
  }, [userNames.length, showSalesDashboard]);

  // Show loader while data is loading
  if (loading || !salesData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
            className="absolute top-40 right-20 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
            className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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

        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Main Spinner with Glow Effect */}
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-purple-500 dark:bg-purple-400 rounded-full blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Loader2 className="w-20 h-20 text-purple-600 dark:text-purple-400 drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="xl-plus:text-7xl text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-3">
                Loading Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-300 xl-plus:text-5xl text-lg">
                Fetching your analytics data...
              </p>
            </motion.div>

            {/* Animated Progress Dots */}
            <div className="flex gap-2 mt-6">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 rounded-full shadow-lg"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 1, 0.4],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <motion.div
              className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showGreeting) {
    // Show greeting component based on theme
    if (theme === "light") {
      return <GoodMorning isVisible={true} />;
    } else if (theme === "evening") {
      return <GoodNight isVisible={true} />;
    }
  }

  // Show birthday screen at 12:00 PM
  if (showBirthday) {
    return <Birthday isVisible={true} name={birthdayName} />;
  }

  // Show off time screen (exit screen)
  if (showOffTimeScreen) {
    return <OffTimeScreen isVisible={true} />;
  }

  // Show break time quotes at 3:28 AM
  if (showBreakTimeQuotes) {
    return <BreakTimeQuotes isVisible={true} />;
  }

  // Show motivational greeting at 4:32 PM
  if (showMotivational) {
    return <MotivationalGreeting isVisible={true} />;
  }

  // Always show main dashboard
  return (
    <div
      className="h-[100vh] relative bg-background text-foreground transition-all duration-1000 ease-in-out"
      style={{
        opacity: opacity,
        transform: `scale(${scale}) translateY(${slideX}px)`,
        transformOrigin: "center center",
      }}
    >
      <main className="xl-plus:py-16 py-10 xl-plus:pt-[83px] pt-[30px]">
        <div>
          <div className="xl-plus:px-[100px] px-[50px]">
            <Header />
            <div className="">
              {/* <select
                onChange={(e) => setSelectedVoice(voices[e.target.value])}
              >
                {voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select> */}
              {showSalesDashboard && (
                <SalesDashboard
                  currentIndex={currentIndex}
                  setCurrentIndex={setCurrentIndex}
                  userNames={userNames}
                  setUserNames={setUserNames}
                />
              )}
              {showSummary && <SummaryCom />}
            </div>
          </div>
          <div className="xl-plus:mt-[51px] mt-[30px] 2xl:absolute bottom-0 w-full">
            <SalesMarquee />
          </div>
        </div>
      </main>
    </div>
  );
}
