import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    const comment = await Comment.create({
      content,
      user: req.user._id,
      post: postId,
    });

    const populatedComment = await comment.populate(
      "user",
      "name profileImage headline",
    );

    res.status(200).json(populatedComment);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user", "name profileImage headline")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment)
      return res.status(404).json({ message: "Comment not found!" });
    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });
    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
