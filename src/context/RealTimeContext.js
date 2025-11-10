import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react'
import socketService from '../services/socketService'
import { Context as AuthContext } from './AuthContext'

/**
 * Real-time Context for managing live updates in mobile app
 *
 * This context provides:
 * - Real-time data updates from server
 * - Connection status
 * - Automatic data refresh when updates are received
 * - User activity tracking
 */

const RealTimeContext = createContext()

export const useRealTime = () => {
  const context = useContext(RealTimeContext)
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider')
  }
  return context
}

export const RealTimeProvider = ({ children }) => {
  const {
    state: { user },
  } = useContext(AuthContext)

  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    userId: null,
    reconnectAttempts: 0,
  })

  const [lastUpdate, setLastUpdate] = useState(null)
  const [updateHistory, setUpdateHistory] = useState([])

  // Use ref to track the last processed update timestamp to prevent duplicates
  const lastProcessedTimestamp = useRef(null)

  /**
   * Initialize socket connection and setup listeners
   */
  useEffect(() => {
    // Connect to Socket.io server
    socketService.connect()

    // Setup event listeners
    const handleDataUpdate = (data) => {
      // Check if this is a duplicate update (same timestamp)
      if (lastProcessedTimestamp.current === data.timestamp) {
        return
      }

      // Check if this is an older update
      if (
        lastProcessedTimestamp.current &&
        data.timestamp < lastProcessedTimestamp.current
      ) {
        return
      }

      // This is a new update, process it
      lastProcessedTimestamp.current = data.timestamp
      setLastUpdate(data)
      setUpdateHistory((prev) => [...prev.slice(-9), data]) // Keep last 10 updates
    }

    const handleNotification = (data) => {
      console.log('📢 Notification received:', data)
      // You can add notification handling here (toast, alert, etc.)
    }

    // Add listeners
    socketService.addEventListener('data-updated', handleDataUpdate)
    socketService.addEventListener('notification', handleNotification)

    // Update connection status periodically
    const statusInterval = setInterval(() => {
      const newStatus = socketService.getConnectionStatus()
      setConnectionStatus((prev) => {
        // Only update if values actually changed
        if (
          prev.isConnected !== newStatus.isConnected ||
          prev.userId !== newStatus.userId ||
          prev.reconnectAttempts !== newStatus.reconnectAttempts
        ) {
          return newStatus
        }
        return prev // Return same object to prevent unnecessary re-renders
      })
    }, 1000)

    // Cleanup on unmount
    return () => {
      socketService.removeEventListener('data-updated', handleDataUpdate)
      socketService.removeEventListener('notification', handleNotification)
      clearInterval(statusInterval)
    }
  }, [])

  /**
   * Automatically set up real-time connection when user is authenticated
   */
  useEffect(() => {
    if (user && user._id) {
      // Authenticate user with real-time service
      socketService.authenticate(user._id)
      setConnectionStatus((prev) => ({ ...prev, userId: user._id }))

      // Send user activity
      socketService.sendUserActivity(user._id)
    } else if (user === null) {
      setConnectionStatus((prev) => ({ ...prev, userId: null }))
    }
  }, [user])

  /**
   * Authenticate user with real-time service
   * Call this manually if needed
   */
  const authenticateUser = (userId) => {
    socketService.authenticate(userId)
  }

  /**
   * Send user activity ping
   */
  const sendUserActivity = (userId) => {
    socketService.sendUserActivity(userId)
  }

  /**
   * Check if there was a recent update (within last 5 seconds)
   */
  const hasRecentUpdate = () => {
    if (!lastUpdate) return false
    const now = Date.now()
    return now - lastUpdate.timestamp < 5000
  }

  const value = {
    connectionStatus,
    lastUpdate,
    updateHistory,
    hasRecentUpdate,
    authenticateUser,
    sendUserActivity,
  }

  return (
    <RealTimeContext.Provider value={value}>
      {children}
    </RealTimeContext.Provider>
  )
}

export default RealTimeContext

