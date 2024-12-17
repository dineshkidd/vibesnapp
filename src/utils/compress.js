import imageCompression from "browser-image-compression";

export const compressImage = async (file,maxSizeMB,maxWidthOrHeight) => {
  const options = {
    maxSizeMB: maxSizeMB, // Max file size 1MB
    maxWidthOrHeight: maxWidthOrHeight, // Resize the image
    useWebWorker: true, // Use web worker for better performance
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
