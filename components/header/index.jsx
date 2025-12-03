import { Moon, Sun, Settings, Cloud } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useTheme } from '../theme/theme-context'
import SettingsMenu from './SettingsMenu'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    // Mark as client-side and set initial time
    setIsClient(true)
    setCurrentTime(new Date())
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Cleanup timer on component unmount
    return () => clearInterval(timer)
  }, [])

  // Use static time for server-side rendering, live time for client
  const displayTime = isClient ? currentTime : new Date('2024-01-01T00:00:00')
  const formattedDate = displayTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const formattedTime = displayTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  return (
    <div className='h-[4vh]'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='xl-plus:text-[56px] text-[32px]'>Sales Dashboard</h1>
        </div>
        <div className='flex items-center xl-plus:gap-[41px] gap-[20px]'>
          <p className='xl-plus:text-[38px] text-[24px]'>{formattedDate}</p>
          <p className={`xl-plus:w-[15px] xl-plus:h-[15px] w-[10px] h-[10px] rounded-full ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></p>
            <p className='xl-plus:text-[38px] text-[24px]'>{formattedTime}</p>
          
          {/* Theme Toggle Button */}
          <div className='flex items-center gap-2'>
            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className='ml-4 bg-card dark:bg-card dark:border p-2 xl-plus:p-4 rounded-[9px] w-[40px] xl-plus:w-[88px] h-auto xl-plus:h-auto transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'
              title="Settings"
            >
              <Settings className='w-full h-auto text-gray-700 dark:text-gray-300 xl-plus:text-[50px] text-[20px]' />
            </button>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className='ml-4 bg-card dark:bg-card dark:border p-2 xl-plus:p-4 rounded-[9px] w-[40px] xl-plus:w-[88px] h-auto xl-plus:h-auto transition-colors'
              title={`Current: ${theme} mode - Click to cycle through themes`}
            >
              {theme === 'light' ? (
                <img className='w-[100%] h-auto' src="/images/salesDashboard/sun.svg" alt="sun icon" />
              ) : theme === 'dark' ? (
                <img className='w-[100%] h-auto' src="/images/salesDashboard/moon.svg" alt="moon icon" />
              ) : (
                <Cloud className='w-full h-auto text-yellow-400 xl-plus:text-[50px] text-[20px]' />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Settings Menu */}
      <SettingsMenu 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  )
}

export default Header