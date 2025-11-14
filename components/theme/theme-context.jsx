"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  // Simple theme toggle function
  const toggleTheme = () => {
    let newTheme
    if (theme === "light") {
      newTheme = "dark"
    } else if (theme === "dark") {
      newTheme = "evening"
    } else {
      newTheme = "light"
    }
    
    setTheme(newTheme)
    document.documentElement.className = newTheme
    // Don't save to localStorage - let auto theme take over
  }

  // Auto theme based on time
  const getAutoTheme = () => {
    const now = new Date()
    const pakistanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }))
    const hour = pakistanTime.getHours()
    
    // 5 AM to 7 PM = day theme, 7 PM to 11 PM = evening theme, 11 PM to 5 AM = night theme
    if (hour >= 5 && hour < 21) {
      return "light" // Day (5 AM to 7 PM)
    } else if (hour >= 21 && hour < 23) {
      return "evening" // Evening (7 PM to 11 PM)
    } else {
      return "dark" // Night (11 PM to 5 AM)
    }
  }

  useEffect(() => {
    // Always use auto theme based on time
    const autoTheme = getAutoTheme()
    setTheme(autoTheme)
    document.documentElement.className = autoTheme
    
    // Set up auto theme updates every minute
    const interval = setInterval(() => {
      const newAutoTheme = getAutoTheme()
      setTheme(newAutoTheme)
      document.documentElement.className = newAutoTheme
    }, 60000) // 60 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

