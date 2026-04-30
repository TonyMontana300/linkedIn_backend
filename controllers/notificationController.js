import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const { recipient, type, post } = req.body;
    if (String(recipient) === String(req.user._id)) {
      return res.status(200).json({ message: "No self notification" });
    }

    const notification = await Notification.create({
      recipient,
      sender: req.user._id,
      type,
      post,
    });

    console.log("Creating Notification: ", {
      recipient,
      sender: req.user._id,
      type,
      post,
    });

    const populatedNotification = await notification.populate([
      { path: "sender", select: "name profileImage" },
      { path: "post" },
    ]);

    console.log("Saved notification: ", populatedNotification);
    res.status(201).json(populatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "name profileImage")
      .populate("post")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({ message: "Marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
