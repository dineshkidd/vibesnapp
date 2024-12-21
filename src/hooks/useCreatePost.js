import { doc, setDoc } from "firebase/firestore";
import { compressImage } from "../utils/compress";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { db } from "../services/firestore";
import {generatePostId} from "../utils/generate";

const useCreatePost = () => {
  const createPost = async ({ text, postMedia, tag, userId,type }) => {
    try {
      const postId = generatePostId();
      const timestamp = Date.now();
      const post = {};
      if ( postMedia) {
        const postMediaUrl = []
        for (let i=0; i< postMedia.length;i++){
        if(type == "image"){
          const compressedBanner = await compressImage(postMedia[i],0.4,1000);
          const url = await uploadToCloudinary(compressedBanner, import.meta.env.VITE_CLOUDINARY_FOLDER_POST,import.meta.env.VITE_CLOUDINARY_PRESET_POST,type);
          postMediaUrl.push(url)
        }
        else{
          //write video compression logic here  
          const url = await uploadToCloudinary(postMedia[0], import.meta.env.VITE_CLOUDINARY_FOLDER_POST,import.meta.env.VITE_CLOUDINARY_PRESET_POST,type);
          postMediaUrl.push(url)

        }
        
        }
        
        post.postMedia = postMediaUrl;
      }
      
      if (tag) post.text = text;
      if (tag) post.tag = tag;
      if (userId) post.userId = userId;
      if (type) post.type = type;
      post.timestamp = timestamp;
      post.liked = [];

      // Save to Firestore
      const userDocRef = doc(db, "posts", postId);
      await setDoc(userDocRef, post, { merge: true });

      return { success: true, message: "Profile updated successfully!" };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile.");
    }
  };

  return { createPost };
};

export default useCreatePost;