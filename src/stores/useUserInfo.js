import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "../services/firestore";

export const fetchUserData = async (tag) => {
  try {
    const userDoc = doc(db, "users", tag);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      throw new Error("User data not found.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};



export const useUserInfo = (tag) => {
    return useQuery({
        queryKey: ["userProfile", tag],
        queryFn: () => fetchUserData(tag),
        enabled: !!tag, // Only fetch when `uid` is available
      });
};
