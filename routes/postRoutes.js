import express from "express";
import { createPost, getPosts, deletePost, updatePost, toggleLikePost, getUserPosts } from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.get("/user/:userId", protect, getUserPosts);
router.put("/:id", protect, updatePost)
router.put("/:id/like", protect, toggleLikePost);
router.delete("/:id", protect, deletePost);

export default router;