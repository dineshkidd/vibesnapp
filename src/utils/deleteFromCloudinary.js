export const deleteFromCloudinary = async (publicId) => {
    const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/dtf74c9x7/image/destroy`;
  
    const formData = new FormData();
    formData.append("public_id", publicId);  // The public ID of the image you want to delete
    formData.append("api_key", "YOUR_API_KEY"); // Use your API Key
    formData.append("api_secret", "YOUR_API_SECRET"); // Use your API Secret
  
    try {
      const response = await fetch(cloudinaryApiUrl, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.result === "ok") {
        console.log("Image deleted successfully!");
      } else {
        console.error("Error deleting image:", result);
      }
    } catch (error) {
      console.error("Error in Cloudinary deletion:", error);
      throw error;
    }
  };
  