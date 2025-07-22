import { v2 as cloudinary } from "cloudinary";

cloudinary.config(true); // auto-configures from CLOUDINARY_URL env var

export const uploadImage = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "hyperai",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
