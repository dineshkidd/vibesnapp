import { doc, setDoc } from "firebase/firestore";
import { compressImage } from "../utils/compress";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { db } from "../services/firestore";

export const useUpdateUserProfile = () => {
  const updateProfile = async ({ tag, name, bio, pp, banner }) => {
    try {
      const updates = {};
      if (pp) {
        const compressedPP = await compressImage(pp,0.3,200);
        const ppUrl = await uploadToCloudinary(compressedPP, "altersnap/profile/pp","profilepic");
        updates.pp = ppUrl;
      }
      if (banner) {
        const compressedBanner = await compressImage(banner,0.7,1000);
        const bannerUrl = await uploadToCloudinary(compressedBanner, "altersnap/profile/banner","banner");
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
