import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Use existing model if it exists, otherwise create new one
const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

export default Notification;

