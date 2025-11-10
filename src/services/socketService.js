import io from 'socket.io-client';
import keys from '../../config/keys';

/**
 * Socket.IO Service for React Native
 * Manages real-time communication with the server
 */
class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.userId = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.eventListeners = new Map();
  }

  /**
   * Connect to Socket.IO server
   */
  connect() {
    if (this.socket && this.socket.connected) {
      console.log('✅ Socket already connected');
      return this.socket;
    }

    console.log('🔌 Connecting to Socket.IO server:', keys.serverUrl);

    this.socket = io(keys.serverUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
    });

    this.setupEventHandlers();
    return this.socket;
  }

  /**
   * Setup Socket.IO event handlers
   */
  setupEventHandlers() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('✅ Socket connected:', this.socket.id);

      // Re-authenticate if we have a userId
      if (this.userId) {
        this.authenticate(this.userId);
      }
    });

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false;
      console.log('🔌 Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('❌ Max reconnection attempts reached');
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('🔄 Socket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.reconnectAttempts = 0;

      // Re-authenticate after reconnection
      if (this.userId) {
        this.authenticate(this.userId);
      }
    });

    // Real-time data updates
    this.socket.on('data-updated', (data) => {
      console.log('📨 Received data update:', data);
      this.notifyListeners('data-updated', data);
    });

    // General notifications
    this.socket.on('notification', (data) => {
      console.log('📢 Received notification:', data);
      this.notifyListeners('notification', data);
    });
  }

  /**
   * Authenticate user with Socket.IO server
   */
  authenticate(userId) {
    if (!this.socket || !userId) return;

    this.userId = userId;
    this.socket.emit('authenticate', { userId });
    console.log('🔐 Authenticated with userId:', userId);
  }

  /**
   * Send user activity
   */
  sendUserActivity(userId) {
    if (!this.socket || !userId) return;
    this.socket.emit('user-activity', { userId, timestamp: Date.now() });
  }

  /**
   * Add event listener
   */
  addEventListener(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  /**
   * Remove event listener
   */
  removeEventListener(event, callback) {
    if (!this.eventListeners.has(event)) return;

    const listeners = this.eventListeners.get(event);
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  /**
   * Notify all listeners of an event
   */
  notifyListeners(event, data) {
    if (!this.eventListeners.has(event)) return;

    const listeners = this.eventListeners.get(event);
    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    });
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      userId: this.userId,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  /**
   * Disconnect socket
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
      this.userId = null;
      console.log('🔌 Socket disconnected manually');
    }
  }
}

// Export singleton instance
export default new SocketService();

