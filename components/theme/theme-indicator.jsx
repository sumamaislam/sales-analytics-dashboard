"use client"

import { Sun, Moon, Clock } from "lucide-react"
import { useTheme } from "./theme-context"
import { useState, useEffect } from "react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [pakistanTime, setPakistanTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const pakistanTimeString = now.toLocaleString("en-US", { 
        timeZone: "Asia/Karachi",
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
      })
      setPakistanTime(pakistanTimeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 right-4">
      <div className="bg-card border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
          <div className="text-sm">
            <div className="font-medium text-card-foreground capitalize">
              {theme === "light" ? "Day Mode" : "Night Mode"}
            </div>
            <div className="text-xs text-muted-foreground">
              {theme === "light" ? "12 PM - 12 AM PKT" : "12 AM - 12 PM PKT"}
            </div>
          </div>
        </div>
        
        {/* Pakistan Time Display */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div className="text-xs">
            <div className="font-medium text-card-foreground">Pakistan Time</div>
            <div className="text-muted-foreground">{pakistanTime}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
