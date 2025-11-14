import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import { getSalesAnalytics } from './lib/controllers/salesAnalyticsController.js';
import { getSalesSummary } from './lib/controllers/salesSummaryController.js';
import { getDesignAndDieAnalytics } from './lib/controllers/designAndDieController.js';
import { setSocketInstance } from './lib/socket.js';

// Load environment variables
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

let latestMessage = "hi";

app.prepare().then(() => {
  // Connect to database
  connectDB();

  // Create HTTP server
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Create Socket.io server
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Set socket instance for API routes
  setSocketInstance(io);

  // WebSocket Events for Real-time Updates
  io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);
    console.log("🌐 Total connected clients:", io.sockets.sockets.size);

    // Send initial message
    socket.emit("messageUpdated", latestMessage);

    // Send analytics immediately on connect
    (async () => {
      try {
        const analyticsData = await getSalesAnalytics();
        socket.emit("salesAnalytics", analyticsData);
      } catch (error) {
        socket.emit("salesAnalyticsError", { message: "Failed to fetch sales analytics" });
      }
    })();

    // Send summary immediately on connect
    (async () => {
      try {
        const analyticsSummary = await getSalesSummary();
        socket.emit("salesSummary", analyticsSummary);
      } catch (error) {
        socket.emit("salesSummaryError", { message: "Failed to fetch sales summary" });
      }
    })();

    (async () => {
      try {
        const designAndDieAnalytics = await getDesignAndDieAnalytics();
        socket.emit("designAndDieAnalytics", designAndDieAnalytics);
      } catch (error) {
        socket.emit("designAndDieAnalyticsError", { message: "Failed to fetch design and die analytics" });
      }
    })();

    // On demand analytics
    socket.on("getSalesAnalytics", async () => {
      console.log("📊 Client requested sales analytics");
      try {
        const analyticsData = await getSalesAnalytics();
        socket.emit("salesAnalytics", analyticsData);
      } catch (error) {
        socket.emit("salesAnalyticsError", { message: "Failed to fetch sales analytics" });
      }
    });

    // On demand summary
    socket.on("getSalesSummary", async () => {
      console.log("📈 Client requested sales summary");
      try {
        const analyticsSummary = await getSalesSummary();
        socket.emit("salesSummary", analyticsSummary);
      } catch (error) {
        socket.emit("salesSummaryError", { message: "Failed to fetch sales summary" });
      }
    });

    socket.on("getDesignAndDieAnalytics", async () => {
      console.log("📈 Client requested design and die analytics");
      try {
        const designAndDieAnalytics = await getDesignAndDieAnalytics();
        socket.emit("designAndDieAnalytics", designAndDieAnalytics);
      } catch (error) {
        socket.emit("designAndDieAnalyticsError", { message: "Failed to fetch design and die analytics" });
      }
    });

    // Listen for Laravel API change notifications
    socket.on("laravelDataChanged", async () => {
      console.log("🔄 Laravel data changed - fetching fresh data");
      
      try {
        const analyticsData = await getSalesAnalytics();
        // Broadcast to all connected clients
        io.emit("salesAnalytics", analyticsData);
        console.log("✅ Fresh analytics data broadcasted to all clients");
      } catch (error) {
        console.error("Error fetching fresh analytics data:", error);
        io.emit("salesAnalyticsError", { message: "Failed to fetch fresh analytics data" });
      }

      try {
        const analyticsSummary = await getSalesSummary();
        // Broadcast to all connected clients
        io.emit("salesSummary", analyticsSummary);
        console.log("✅ Fresh summary data broadcasted to all clients");
      } catch (error) {
        console.error("Error fetching fresh summary data:", error);
        io.emit("salesSummaryError", { message: "Failed to fetch fresh summary data" });
      }

      try {
        const designAndDieAnalytics = await getDesignAndDieAnalytics();
        // Broadcast to all connected clients
        io.emit("designAndDieAnalytics", designAndDieAnalytics);
        console.log("✅ Fresh design and die analytics data broadcasted to all clients");
      } catch (error) {
        console.error("Error fetching fresh design and die analytics data:", error);
        io.emit("designAndDieAnalyticsError", { message: "Failed to fetch fresh design and die analytics data" });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });


  server
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
      console.log(`💚 Health Check: http://localhost:${port}/api/health`);
      console.log(`📊 Sales Analytics: http://localhost:${port}/api/sales-analytics`);
      console.log(`📈 Sales Summary: http://localhost:${port}/api/sales-summary`);
      console.log(`📈 Design and Die Analytics: http://localhost:${port}/api/design-and-die-analytics`);
      console.log(`🔔 Webhook: http://localhost:${port}/api/webhook/laravel-update`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('✅ Application started successfully!');
    });
});

// Error handling
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  console.error('Stack:', err.stack);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  console.error('Stack:', err.stack);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

