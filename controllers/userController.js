import User from "../models/User.js";

// GET all users
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user (admin/general)
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET current user
export const getMe = async (req, res) => {
  try {
    const freshUser = await User.findById(req.user._id).select("-password");
    if (!freshUser) {
      return res.status(404).json({ message: "User not found!" });
    };
    res.status(200).json(freshUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE logged-in user
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, headline, location, profileImage, coverImage, about } =
      req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (req.file) {
      user.profileImage = req.file.path;
      console.log("File: ", req.file);
    }

    if (!req.file && profileImage) {
      user.profileImage = profileImage;
    }

    user.name = name || user.name;
    user.headline = headline || user.headline;
    user.location = location || user.location;
    user.coverImage = coverImage || user.coverImage;
    user.about = about || user.about;

    const updatedUser = await user.save();
    const userObj = updatedUser.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
