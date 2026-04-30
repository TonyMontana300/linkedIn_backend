import express from "express";
import {
  getMe,
  updateProfile,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();
router.get("/", getUser);

router.get("/me", protect, getMe);
router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
)

router.get("/:id", getUserById);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
