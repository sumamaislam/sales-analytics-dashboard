import Notification from '../../../models/notification.js';
import connectDB from '../../../lib/db.js';
import { getSalesAnalytics } from '../../../lib/controllers/salesAnalyticsController.js';
import { getSalesSummary } from '../../../lib/controllers/salesSummaryController.js';
import { getDesignAndDieAnalytics } from '../../../lib/controllers/designAndDieController.js';
import { getSocketInstance } from '../../../lib/socket.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { title, message } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          success: false,
          message: 'Title and message are required'
        });
      }

      // Save notification in DB
      const notification = await Notification.create({ title, message });
      console.log("notification", notification);

      // Get socket instance
      const io = getSocketInstance();

      // Emit notification real-time if socket is available
      if (io) {
        io.emit("new_notification", notification);
      }

      // Fetch latest analytics from Laravel API and emit
      if (io) {
        try {
          const analyticsData = await getSalesAnalytics();
          console.log("analyticsData", analyticsData);
          io.emit("salesAnalytics", analyticsData);
        } catch (error) {
          console.error("❌ Error fetching sales analytics after notification:", error.message);
        }

        try {
          const analyticsSummary = await getSalesSummary();
          io.emit("salesSummary", analyticsSummary);
        } catch (error) {
          console.error("❌ Error fetching sales summary after notification:", error.message);
        }

        try {
          const designAndDieAnalytics = await getDesignAndDieAnalytics();
          io.emit("designAndDieAnalytics", designAndDieAnalytics);
        } catch (error) {
          console.error("❌ Error fetching design and die analytics after notification:", error.message);
        }
      }

      return res.status(201).json({
        success: true,
        data: notification
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error creating notification',
        error: error.message
      });
    }
  }

  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}

