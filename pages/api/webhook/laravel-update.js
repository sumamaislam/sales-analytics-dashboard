import { getSocketInstance } from '../../../lib/socket.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  console.log("🔔 Laravel webhook received - data updated");
  console.log("📊 Webhook data:", req.body);
  
  try {
    const io = getSocketInstance();
    
    if (io) {
      // Trigger WebSocket event to all clients
      io.emit("laravelDataChanged");
      console.log("✅ WebSocket notification sent to all clients");
    } else {
      console.warn("⚠️ Socket.io instance not available");
    }
    
    return res.status(200).json({ 
      success: true, 
      message: "WebSocket notification sent to all clients",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

