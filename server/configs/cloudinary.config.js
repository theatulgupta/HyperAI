import { v2 as cloudinary } from "cloudinary";

cloudinary.config(true); // auto-configures from CLOUDINARY_URL env var

const baseUpload = async (image, options = {}) => {
  try {
    const uploadOptions = {
      folder: "hyperai",
      ...options,
    };
    const result = await cloudinary.uploader.upload(image, uploadOptions);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const uploadImage = async (image) => {
  return await baseUpload(image);
};

export const uploadImageRemoveBackground = async (image) => {
  return await baseUpload(image, {
    transformation: [
      {
        effect: "background_removal",
        background_removal: "remove_the_background",
      },
    ],
  });
};

export const uploadImageRemoveObject = async (image, object) => {
  const secure_url = await baseUpload(image, {});

  return cloudinary.url(secure_url, {
    transformation: [{ effect: `gen_remove:${object}` }],
    resource_type: "image",
  });
};
