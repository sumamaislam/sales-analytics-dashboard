// socket-hooks.js
import { useSocketData as useSocketContext } from "./socket-data-context"

// Wrapper hook for base context
export function useSocket() {
  return useSocketContext()
}

// Alias for backward compatibility
export function useSocketData() {
  return useSocketContext()
}

// Specific hooks for different data
export function useSalesAnalytics() {
  const { salesAnalytics, error, isConnected } = useSocketContext()
  return {
    data: salesAnalytics,
    error,
    isConnected,
    loading: !salesAnalytics && isConnected,
  }
}
export function useSalesSummary() {
  const { salesSummary, error, isConnected } = useSocketContext()
  return {
    data: salesSummary,
    error,
    isConnected,
    loading: !salesSummary && isConnected,
  }
}
export function useDesignAndDieAnalytics() {
  const { designAndDieAnalytics, error, isConnected } = useSocketContext()
  return {
    data: designAndDieAnalytics,
    error,
    isConnected,
    loading: !designAndDieAnalytics && isConnected,
  }
}
export function useMessage() {
  const { message, sendMessage, error, isConnected } = useSocketContext()
  return {
    message,
    sendMessage,
    error,
    isConnected,
  }
}

export function useSocketConnection() {
  const { isConnected, error, reconnect, disconnect, getSocketId } = useSocketContext()
  return {
    isConnected,
    error,
    reconnect,
    disconnect,
    socketId: getSocketId(),
  }
}
