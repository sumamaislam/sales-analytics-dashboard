"use client"

import BreakTimeQuotes from "@/components/breakTimeQuotes"
import DesignDashboard from "@/components/designDashboard"
import DesignStats from "@/components/designDashboard/designStats"
import GoodMorning from "@/components/goodMorning"
import GoodNight from "@/components/goodNight"
import Header from "@/components/header"
import CelebrationScreen from "@/components/highSale"
import MotivationalGreeting from "@/components/motivationalGreeting"
import NormalSaleScreen from "@/components/normalSale"
import OffTimeScreen from "@/components/offTimeScreen"
import SalesMarquee from "@/components/SalesDashboard/salesMarquee"
import { useDesignAndDieAnalytics, useMessage } from "@/components/socket/useSocketData"
import { useTheme } from "@/components/theme/theme-context"
import { useEffect, useState } from "react"
import Birthday from "../components/birthday"


export default function ThemeDisplay() {
  const { theme } = useTheme()
  const [showGreeting, setShowGreeting] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
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
  const [showCelebration, setShowCelebration] = useState(false);
  const [showNormalSale ,setShowNormalSale] = useState(false);
  const [showSummary, setShowSummary] = useState(false);


    const [payment, setPayment] = useState(null);

      const {notification  } = useMessage()
       useEffect(() => {
         if (notification) {
           setPayment(notification);
          //  console.log("New Notification:", notification);
        }
      }, [notification]);
    
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

 
useEffect(() => {
  const checkBirthdayTime = async () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // At 11:58 PM
    if (hours === 23 && minutes === 58 && !birthdayShownToday) {
      try {
        const response = await fetch('/api/birthday');
        const data = await response.json();
        const birthdayArray = data?.all || data || [];
        if (birthdayArray && birthdayArray.length > 0) {
          // Check first 5 entries for tomorrow's birthday
          const tomorrow = new Date(now);
          tomorrow.setDate(now.getDate() + 1);
          const tomorrowMonth = tomorrow.getMonth();
          const tomorrowDay = tomorrow.getDate();

          // Find all matches in first 5
          const birthdayMatches = birthdayArray.slice(0, 5).filter(b => {
            if (!b.date_of_birth) return false;
            const dateParts = b.date_of_birth.split('-');
            const birthdayMonth = parseInt(dateParts[1]) - 1; // 0-indexed
            const birthdayDay = parseInt(dateParts[2]);
            return birthdayDay === tomorrowDay && birthdayMonth === tomorrowMonth;
          });

          if (birthdayMatches.length > 0) {
            setBirthdayShownToday(true);
            const msToMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0) - now;
            setTimeout(() => {
              // Pass all names to Birthday component
              setBirthdayName(birthdayMatches.map(b => b.name || "Friend"));
              setShowBirthday(true);
              setShowGreeting(false);
              setShowDashboard(false);
              setShowSummary(false);
              setShowMotivational(false);
              setShowBreakTimeQuotes(false);
              setShowOffTimeScreen(false);
              setTimeout(() => {
                setShowBirthday(false);
                setShowDashboard(true);
              }, 30000);
            }, msToMidnight);
          } else {
            setBirthdayShownToday(true);
          }
        } else {
          setBirthdayShownToday(true);
        }
      } catch (err) {
        setBirthdayShownToday(true);
      }
    }
    // Reset flag for next day at midnight
    if (hours === 0 && minutes === 0) {
      setBirthdayShownToday(false);
    }
  };
  checkBirthdayTime();
  const interval = setInterval(checkBirthdayTime, 60000);
  return () => clearInterval(interval);
}, [birthdayShownToday]);

  useEffect(() => {
    // alert(payment.isCelebration)
    if (payment && payment.isCelebration) {
      setShowGreeting(false);
      setShowDashboard(false);
      setShowSummary(false);
      setShowMotivational(false);
      setShowBreakTimeQuotes(false);
      setShowOffTimeScreen(false);
      setShowBirthday(false);
      setOffTimeShownToday(false);

      if (payment.isPremium) {
        setShowCelebration(true);
        // Hide after 10 seconds
        setTimeout(() => {
          setShowCelebration(false);
          setShowDashboard(true);
        }, 10000);
      } else {
        // Show normalSale screen
        setShowNormalSale(true);
        setTimeout(() => {
          setShowNormalSale(false);
          setShowDashboard(true);
        }, 10000);
      }
    }
  }, [payment]);

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
        setShowDashboard(false);
        setShowSummary(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowMotivational(false);
          setShowDashboard(true);
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
        setShowDashboard(false);
        setShowSummary(false);
        setShowMotivational(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowBreakTimeQuotes(false);
          setShowDashboard(true);
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
      if (hours === 4 && minutes === 58 && !offTimeShownToday) {
        setOffTimeShownToday(true);
        setShowOffTimeScreen(true);
        setShowGreeting(false);
        setShowDashboard(false);
        setShowSummary(false);
        setShowMotivational(false);
        setShowBreakTimeQuotes(false);
        
        // Hide after 10 seconds
        setTimeout(() => {
          setShowOffTimeScreen(false);
          setShowDashboard(true);
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

 if (showGreeting) {
    // Show greeting component based on theme
    if (theme === 'light') {
      return <GoodMorning isVisible={true} />
    } else if (theme === 'evening') {
      return <GoodNight isVisible={true} />
    }
  }
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

  if(showCelebration){
    return <CelebrationScreen isVisible={true} />;
  }
  if(showNormalSale){
    return <NormalSaleScreen isVisible={true} />;
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
