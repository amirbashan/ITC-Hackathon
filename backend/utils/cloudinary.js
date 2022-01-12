import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

function uploadToCloudinary(filePath) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      if (result) resolve(result);
    });
  });
}
export { uploadToCloudinary };
