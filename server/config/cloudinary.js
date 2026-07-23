<<<<<<< HEAD
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
=======
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
>>>>>>> 3c18276 (feat: migrate db to atlas, cloudinary setup and exports fixes)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
<<<<<<< HEAD
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
=======
    api_secret: CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
>>>>>>> 3c18276 (feat: migrate db to atlas, cloudinary setup and exports fixes)
