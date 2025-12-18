
"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, Crown, Star } from "lucide-react"
import { useMessage } from "../socket/useSocketData"

export default function CelebrationScreen() {
  const [particles, setParticles] = useState([])
  const [glowParticles, setGlowParticles] = useState([])
  const [audioStarted, setAudioStarted] = useState(false)
  const [celebrationData, setCelebrationData] = useState(null)
  console.log(celebrationData, "samamaPayment");
  
  const audioRef = useRef(null)

  const { notification } = useMessage()

  // Only update celebrationData if notification has a valid amount
  useEffect(() => {
    // if (notification && typeof notification.amount === 'number' && notification.amount > 0) {
    if(notification){
      setCelebrationData(notification)
      console.log("New Notification:", notification)
    }
  }, [notification])

  // Safe number formatting
  const formatNumber = (num) => {
    const n = Number(num)
    if (isNaN(n)) return ""
    return n.toLocaleString("en-US")
  }

  // Enhanced particle system
  useEffect(() => {
    const newParticles = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 4 + 6,
      color: ["from-amber-300", "from-blue-300", "from-cyan-300"][Math.floor(Math.random() * 3)],
    }))
    setParticles(newParticles)

    const glowParticlesArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 5 + 8,
    }))
    setGlowParticles(glowParticlesArray)
  }, [])

  // Confetti
  useEffect(() => {
    let intervalId
    let confettiInstance
    let isUnmounted = false

    // const launch = async () => {
    //   const module = await import("canvas-confetti")
    //   confettiInstance = module.default

    //   const shoot = () => {
    //     if (isUnmounted) return
    //     const defaults = { origin: { y: 0.1 }, ticks: 400, zIndex: 9999 }

    //     confettiInstance({
    //       ...defaults,
    //       particleCount: 200,
    //       spread: 100,
    //       startVelocity: 70,
    //       scalar: 1.3,
    //       colors: ["#fbbf24", "#f59e0b", "#d97706"],
    //     })

    //     confettiInstance({
    //       ...defaults,
    //       particleCount: 150,
    //       spread: 120,
    //       startVelocity: 60,
    //       scalar: 1.2,
    //       angle: 45,
    //       origin: { x: 0.2, y: 0.2 },
    //       colors: ["#3b82f6", "#0ea5e9", "#06b6d4"],
    //     })

    //     confettiInstance({
    //       ...defaults,
    //       particleCount: 150,
    //       spread: 120,
    //       startVelocity: 60,
    //       scalar: 1.2,
    //       angle: 135,
    //       origin: { x: 0.8, y: 0.2 },
    //       colors: ["#3b82f6", "#0ea5e9", "#06b6d4"],
    //     })
    //   }

    //   shoot()
    //   intervalId = setInterval(shoot, 5000)
    // }

    // launch()
 const launch = async () => {
      const module = await import("canvas-confetti");
      confettiInstance = module.default;

      const shoot = () => {
        if (isUnmounted) return;
        const defaults = { origin: { y: 0.1 }, ticks: 300, zIndex: 9999 };
        confettiInstance({ ...defaults, particleCount: 250, spread: 120, startVelocity: 80, scalar: 1.5 });
        confettiInstance({ ...defaults, particleCount: 200, spread: 140, startVelocity: 90, scalar: 1.5, angle: 60, origin: { x: 0.1, y: 0.2 } });
        confettiInstance({ ...defaults, particleCount: 200, spread: 140, startVelocity: 90, scalar: 1.5, angle: 120, origin: { x: 0.9, y: 0.2 } });
      };
      shoot();
      intervalId = setInterval(shoot, 4000);
    };
    launch();
    return () => {
      isUnmounted = true
      if (intervalId) clearInterval(intervalId)
      if (confettiInstance && confettiInstance.reset) confettiInstance.reset()
    }
  }, [])

  // Audio
  useEffect(() => {
    const audio = new window.Audio("/audio/firework.mp3")
    audio.loop = true
    audioRef.current = audio

    audio.play().catch(() => {
      setAudioStarted(false)
    })

    const resumeAudio = () => {
      if (!audioStarted) {
        audio.play().then(() => setAudioStarted(true))
      }
    }

    window.addEventListener("click", resumeAudio)
    window.addEventListener("touchstart", resumeAudio)

    return () => {
      audio.pause()
      audio.currentTime = 0
      window.removeEventListener("click", resumeAudio)
      window.removeEventListener("touchstart", resumeAudio)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a00]">
      {/* GLOBAL SOFT SPOTLIGHT */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,90,0.18),transparent_65%)]"></div>

      {/* Gold soft reflective layer */}
      <div className="pointer-events-none absolute inset-0 backdrop-blur-xl opacity-[0.11] mix-blend-overlay bg-[linear-gradient(135deg,rgba(255,200,0,0.05),rgba(255,255,255,0.01),rgba(255,200,0,0.05))]"></div>

      {/* Floating golden ribbons */}
      <div className="pointer-events-none absolute w-[180%] h-[260%] -left-1/3 -top-1/3 opacity-[0.22] animate-spin-slow bg-[conic-gradient(from_45deg,transparent,rgba(255,200,0,0.16),transparent)] rounded-full blur-3xl"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[32rem] h-[32rem] bg-gradient-to-br from-amber-400/30 to-amber-600/10 rounded-full blur-3xl animate-glow2" />
        <div className="absolute -bottom-1/4 left-1/4 w-[28rem] h-[28rem] bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-glow2" style={{ animationDelay: "1.3s" }} />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Crown Section */}
        <div className="mb-20 animate-name-popup">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 via-yellow-200/20 to-amber-400/10 rounded-full blur-3xl opacity-70 animate-pulse" />
            <div className="relative w-40 h-40 xl-plus:w-[400px] xl-plus:h-[400px] bg-gradient-to-br from-[#f7d564] via-[#dcbf44] to-[#f7d564] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(255,200,0,0.35)] border animate-bounce border-amber-200/50 backdrop-blur-xl">
              <Crown className="w-20  h-20  xl-plus:w-[204px] xl-plus:h-[204px] text-amber-900 drop-shadow-2xl" />
            </div>
          </div>
        </div>

        {/* TITLES */}
        <div className="text-center space-y-8 mb-16">
          <h1  className="text-7xl md:text-9xl xl-plus:text-[290px] font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-[#f7d564] via-[#fff0b0] to-[#f7d564] drop-shadow-[0_0_55px_rgba(255,220,90,0.45)]  animate-gold-shimmer">
            Record Broken
          </h1>

          <p className="text-2xl md:text-4xl text-yellow-100/70 tracking-[0.4em]  mt-6">
            ✨ Premium Milestone ✨
          </p>

          {/* Agent Name */}
          <h6 style={{fontFamily:"math"}} className="text-6xl xl:text-[150px] xl-plus:text-[270px] font-extrabold  tracking-wide text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text drop-shadow-[0_0_70px_rgba(255,221,120,0.4)] animate-name-shine">
            {celebrationData?.agentName }
          </h6>
        </div>

        {/* AMOUNT */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl px-20 py-10 border border-white/20 shadow-[0_0_45px_rgba(255,210,110,0.3)]">
          <h6 style={{fontFamily:"math"}} className="text-8xl md:text-9xl xl-plus:text-[500px] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#ffe27a] via-white to-[#ffe27a] animate-amount-pop">
            ${formatNumber(celebrationData?.amount) }
          </h6>
        </div>

        {/* <p className="text-yellow-200/60 text-lg uppercase tracking-widest mt-10">
          ✨ Phenomenal Achievement ✨
        </p> */}
      </div>

      <style jsx>{`
        @keyframes glow2 {
          0%, 100% { opacity: .3; transform: scale(1); } 
          50% { opacity: .6; transform: scale(1.2); }
        }
        .animate-spin-slow { animation: spin 30s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes goldShine { 0% { background-position:200% } 100% {background-position:-200%} }
        .animate-gold-shimmer { background-size:200%; animation: goldShine 4s linear infinite; }
        @keyframes popup { 0% {transform:scale(.7); opacity:0;} 100% {transform:scale(1); opacity:1;} }
        .animate-name-popup { animation: popup 1.3s ease-out forwards; }
        @keyframes nameShine {0% {filter:brightness(.8);} 50% {filter:brightness(1.4);} 100% {filter:brightness(1);} }
        .animate-name-shine { animation: nameShine 3s infinite; }
        @keyframes amountPop { 0% { transform: scale(.7) rotate(2deg);} 100% { transform: scale(1) rotate(0deg);} }
        .animate-amount-pop { animation: amountPop 1s ease-out;}
      `}</style>
    </main>
  )
}
