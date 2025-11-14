import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check for both MONGO_URI and MONGODB_URI for compatibility
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.log("⚠️  MONGODB_URI or MONGO_URI not set, skipping database connection");
      return;
    }

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    // Try to connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    console.log("💡 To fix this:");
    console.log("   1. Check your MONGO_URI in environment variables");
    console.log("   2. Ensure MongoDB Atlas is accessible");
    console.log("   3. App will continue without database");
  }
};

export default connectDB;

