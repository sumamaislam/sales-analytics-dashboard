"use client"

import { useEffect, useState } from "react"
import { useTheme } from "./theme-context"
import GoodMorning from "../goodMorning"
import GoodNight from "../goodNight"
import Header from "../header"
import SalesDashboard from "../SalesDashboard"
import SalesMarquee from "../SalesDashboard/salesMarquee"
import SummaryCom from "../SalesDashboard/summaryCom"

export default function ThemeDisplay() {
  const { theme } = useTheme()
  const [showGreeting, setShowGreeting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userNames, setUserNames] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showSalesDashboard, setShowSalesDashboard] = useState(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [slideX, setSlideX] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);

  useEffect(() => {
    // Show greeting component for 5 seconds based on theme
    if (theme === 'light' || theme === 'evening') {
      // Reset any existing timers and states
      setShowGreeting(false)
      setShowSalesDashboard(false)
      setShowSummary(false)
      setCurrentIndex(0) // Reset to first user
      
      // Small delay to ensure clean state reset
      setTimeout(() => {
        setShowGreeting(true)
      }, 100)

      const timer = setTimeout(() => {
        setShowGreeting(false)
        setShowSalesDashboard(true) // Ensure dashboard shows after greeting
      }, 5000) // 5 seconds

      return () => clearTimeout(timer)
    } else {
      // For other themes, ensure dashboard is shown
      setShowGreeting(false)
      setShowSalesDashboard(true)
    }
  }, [theme])

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
                        setCurrentIndex((prev) => (prev + 1) % userNames.length);
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


  if (showGreeting) {
    // Show greeting component based on theme
    if (theme === 'light') {
      return <GoodMorning isVisible={true} />
    } else if (theme === 'evening') {
      return <GoodNight isVisible={true} />
    }
  }
  // Always show main dashboard
  return (
    <div className="h-[100vh] relative bg-background text-foreground transition-all duration-1000 ease-in-out"  style={{ 
      opacity: opacity,
      transform: `scale(${scale}) translateY(${slideX}px)`,
      transformOrigin: 'center center'
  }}>
      <main className="xl-plus:py-16 py-10 xl-plus:pt-[83px] pt-[30px]">
        <div>
          <div className='xl-plus:px-[100px] px-[50px]'>
            <Header />
            <div className=''>
              {/* {showSalesDashboard && ( */}
                <SalesDashboard 
                  currentIndex={currentIndex} 
                  setCurrentIndex={setCurrentIndex} 
                  userNames={userNames} 
                  setUserNames={setUserNames} 
                />
              {/* )} */}
              {/* {showSummary && (
                <SummaryCom/>
)}  */}
            </div>
          </div>
          <div className='xl-plus:mt-[51px] mt-[30px] 2xl:absolute bottom-0 w-full'>
            <SalesMarquee />
          </div>
        </div>
      </main>
    </div>
  )
}
