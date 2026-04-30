import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";;
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "profile-images",
        allowed_formats: ["jpg", "png", "jpeg", "jfif"],
    },
});

const upload = multer({ storage });

export default upload;