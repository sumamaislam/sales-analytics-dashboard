"use client"

import DesignDashboard from "@/components/designDashboard"
import DesignStats from "@/components/designDashboard/designStats"
import GoodMorning from "@/components/goodMorning"
import GoodNight from "@/components/goodNight"
import Header from "@/components/header"
import SalesMarquee from "@/components/SalesDashboard/salesMarquee"
import { useDesignAndDieAnalytics } from "@/components/socket/useSocketData"
import { useTheme } from "@/components/theme/theme-context"
import { useEffect, useState } from "react"



export default function ThemeDisplay() {
  const { theme } = useTheme()
  const [showGreeting, setShowGreeting] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const { data: designAndDieAnalytics, loading, error } = useDesignAndDieAnalytics()
  console.log(designAndDieAnalytics, "designAndDieAnalytics");

  useEffect(() => {
    // Show greeting component for 10 seconds based on theme
    if (theme === 'light' || theme === 'evening') {
      setShowGreeting(true)
      setShowDashboard(false)

      const timer = setTimeout(() => {
        setShowGreeting(false)
        setShowDashboard(true)
      }, 5000) // 10 seconds

      return () => clearTimeout(timer)
    } else if (theme === 'dark') {
      // Dark theme shows dashboard directly
      setShowGreeting(false)
      setShowDashboard(true)
    }
  }, [theme]) // Re-run when theme changes

  if (showGreeting) {
    // Show greeting component based on theme
    if (theme === 'light') {
      return <GoodMorning isVisible={true} />
    } else if (theme === 'evening') {
      return <GoodNight isVisible={true} />
    }
  }

  if (showDashboard) {
    // Show main dashboard
    return (
      <div className="h-[100vh] relative  bg-background text-foreground transition-colors duration-500">
        <main className="xl-plus:py-16 py-10 xl-plus:pt-[83px] pt-[30px]">
          <div>
            <div className='xl-plus:px-[100px] px-[50px]'>
              <Header />
              <div className=''>
                <DesignDashboard designAndDieAnalytics={designAndDieAnalytics} />
              </div>
            </div>
            {/* <div className='xl-plus:mt-[51px] mt-[30px] 2xl:absolute bottom-0 w-full'>
              <SalesMarquee />
            </div> */}
          </div>
        </main>
      </div>
    )
  }

//   // Default loading state
//   return (
//     <div className="h-[100vh] flex items-center justify-center bg-background">
//       <div className="text-foreground">Loading...</div>
//     </div>
//   )
}
