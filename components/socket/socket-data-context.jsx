"use client"

import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import MaintenancePage from "@/components/maintenance/MaintenancePage"

const SocketDataContext = createContext()

export function SocketDataProvider({ children }) {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState("")
  const [salesAnalytics, setSalesAnalytics] = useState(null)
  const [salesSummary, setSalesSummary] = useState(null)
  const [designAndDieAnalytics, setDesignAndDieAnalytics] = useState(null)
  const [error, setError] = useState(null)
  const [showMaintenance, setShowMaintenance] = useState(false)

  useEffect(() => {
    // Connect socket
    const newSocket = io("https://pipefish-united-poorly.ngrok-free.app", {
      transports: ["websocket"],
      timeout: 50000,
    })

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id)
      setIsConnected(true)
      setError(null)
      setShowMaintenance(false)
    })

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
      setIsConnected(false)
    })

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
      setError(error.message)
      setIsConnected(false)
      setShowMaintenance(true)
    })

    // Listen for message updates
    newSocket.on("messageUpdated", (newMessage) => {
      console.log("📩 Message updated:", newMessage)
      setMessage(newMessage)
    })

    // Listen for sales analytics updates
    newSocket.on("salesAnalytics", (data) => {
      console.log("📊 Analytics received:", data)
      
      // Filter to show only user with id 85
      // if (data?.data?.salesAnalyticsUserWise) {
      //   const filteredData = {
      //     ...data,
      //     data: {
      //       ...data.data,
      //       salesAnalyticsUserWise: Object.fromEntries(
      //         Object.entries(data.data.salesAnalyticsUserWise).filter(
      //           ([key, item]) => item?.userInfo?.id === 85
      //         )
      //       )
      //     }
      //   }
      //   console.log("🔍 Filtered data for ID 85:", filteredData)
      //   setSalesAnalytics(filteredData)
      // } else {
        setSalesAnalytics(data)
      // }
    })

    // Listen for sales summary updates
    newSocket.on("salesSummary", (data) => {
      console.log("📊 Summary received:", data)
      setSalesSummary(data)
    })
    
    newSocket.on("designAndDieAnalytics", (data) => {
      console.log("📊 Design and Die Analytics received:", data)
      setDesignAndDieAnalytics(data)
    })

    // Listen for errors
    newSocket.on("salesAnalyticsError", (err) => {
      console.error("⚠️ Error:", err.message)
      setError(err.message)
    })
    newSocket.on("salesSummaryError", (err) => {
      console.error("⚠️ Error:", err.message)
      setError(err.message)
    })

    newSocket.on("designAndDieAnalyticsError", (err) => {
      console.error("⚠️ Error:", err.message)
      setError(err.message)
    })

    // Listen for Laravel data change notifications
    newSocket.on("laravelDataChanged", () => {
      console.log("🔄 Laravel data changed - requesting fresh data")
      // Request fresh data
      newSocket.emit("getSalesAnalytics")
      newSocket.emit("getSalesSummary")
      newSocket.emit("getDesignAndDieAnalytics")
    })

    setSocket(newSocket)

    // Cleanup
    return () => {
      newSocket.disconnect()
    }
  }, [])

  // Send message via REST

  // Emit custom event
  const emitEvent = (eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data)
    } else {
      console.warn("Socket not connected, cannot emit event:", eventName)
    }
  }

  // Listen to custom event
  const listenToEvent = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback)
    }
  }

  // Remove event listener
  const removeListener = (eventName, callback) => {
    if (socket) {
      socket.off(eventName, callback)
    }
  }

  // Get socket ID
  const getSocketId = () => {
    return socket ? socket.id : null
  }

  // Reconnect socket
  const reconnect = () => {
    setShowMaintenance(false)
    if (socket) {
      socket.connect()
    } else {
      window.location.reload()
    }
  }

  // Disconnect socket
  const disconnect = () => {
    if (socket) {
      socket.disconnect()
    }
  }

  const value = {
    // Socket state
    socket,
    isConnected,
    error,
    
    // Data state
    message,
    salesAnalytics,
    salesSummary,
    designAndDieAnalytics,
    
    // Actions
    emitEvent,
    listenToEvent,
    removeListener,
    getSocketId,
    reconnect,
    disconnect,
    
    // Setters (for manual updates)
    setMessage,
    setSalesAnalytics,
    setSalesSummary,
    setDesignAndDieAnalytics,
    setError
  }

  // Show maintenance page on socket connection error
  if (showMaintenance) {
    return (
      <SocketDataContext.Provider value={value}>
        <MaintenancePage onRetry={reconnect} />
      </SocketDataContext.Provider>
    )
  }

  return (
    <SocketDataContext.Provider value={value}>
      {children}
    </SocketDataContext.Provider>
  )
}

export function useSocketData() {
  const context = useContext(SocketDataContext)
  if (!context) {
    throw new Error("useSocketData must be used within a SocketDataProvider")
  }
  return context
}
