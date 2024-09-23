// middleware/upload.js
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'employee_images', // Specify the folder name
  allowedFormats: ['jpg', 'png', 'jpeg'], // Allowed formats
});

// Create the multer instance
const upload = multer({ storage });

export default upload;
