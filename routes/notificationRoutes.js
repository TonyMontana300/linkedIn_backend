import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotification);
router.get("/", protect, getNotifications);
router.put("/:id/read", protect, markAsRead);

export default router;
