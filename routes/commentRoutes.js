import express from "express";
import { createComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:postId", protect, createComment);
router.get("/:postId", protect, getCommentsByPost);
router.delete("/:id", protect, deleteComment);

export default router;