import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { content, profileImage, description } = req.body;

    const post = await Post.create({
      user: req.user._id,
      content,
      profileImage,
      description,
    });

    const updatedPost = await Post.findById(post._id).populate("user", "name profileImage headline description");

    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "name profileImage headline description").sort({createdAt:-1}).lean();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ user: userId }).populate("user", "name profileImage headline description").sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this post!"});
        }

        await post.deleteOne();

        res.status(200).json({ message: "Post deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

export const toggleLikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found"});
        }

        const isLiked = post.likes.some((id) => id.toString() === userId.toString());
        if (isLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.status(201).json({ likes: post.likes });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const { content, profileImage, description } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found"});
        }

        if (post.user.toString() !== userId.toString()) {
            return res.status(401).json({ message: "Not authorized to edit this post!"});
        }

        post.content = content || post.content;
        post.profileImage = profileImage || post.profileImage;
        post.description = description || post.description;

        await post.save();

        const updatedPost = await Post.findById(post._id).populate("user", "name profileImage headline description");
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}