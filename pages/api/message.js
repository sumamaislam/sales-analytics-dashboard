import connectDB from '../../lib/db.js';

// Store latest message in memory (you can also use a database)
let latestMessage = "hi";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: latestMessage 
    });
  }

  if (req.method === 'POST') {
    const { message, title } = req.body;
    
    if (message) {
      latestMessage = message;
      console.log("💬 Message received:", message);
      console.log("✅ Latest message updated to:", latestMessage);

      // Note: Socket.io emit will be handled in the socket server
      // This endpoint just updates the message
      return res.status(200).json({ 
        success: true, 
        message: latestMessage 
      });
    }

    return res.status(400).json({ 
      success: false, 
      message: 'Message is required' 
    });
  }

  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}

