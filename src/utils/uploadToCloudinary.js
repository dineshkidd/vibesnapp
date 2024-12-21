export const uploadToCloudinary = async (file, folder = "user_profiles", preset,type) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset); // Replace with your Cloudinary preset
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload media to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url; // Return the uploaded file URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
