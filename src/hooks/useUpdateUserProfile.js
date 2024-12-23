import { doc, setDoc } from "firebase/firestore";
import { compressImage } from "../utils/compress";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { db } from "../services/firestore";

export const useUpdateUserProfile = () => {
  const updateProfile = async ({ tag, name, bio, pp, banner }) => {
    try {
      const updates = {};
      if (pp) {
        const compressedPP = await compressImage(pp,0.3,400);
        const ppUrl = await uploadToCloudinary(compressedPP, import.meta.env.VITE_CLOUDINARY_FOLDER_PROFILE_PICTURE,import.meta.env.VITE_CLOUDINARY_PRESET_PROFILE_PICTURE,"image");
        updates.pp = ppUrl;
      }
      if (banner) {
        const compressedBanner = await compressImage(banner,0.7,1000);
        const bannerUrl = await uploadToCloudinary(compressedBanner, import.meta.env.VITE_CLOUDINARY_FOLDER_BANNER,import.meta.env.VITE_CLOUDINARY_PRESET_BANNER,"image");
        updates.banner = bannerUrl;
      }
      if (name) updates.name = name;
      if (bio) updates.bio = bio;

      // Save to Firestore
      const userDocRef = doc(db, "users", tag);
      await setDoc(userDocRef, updates, { merge: true });

      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile.");
    }
  };

  return { updateProfile };
};
