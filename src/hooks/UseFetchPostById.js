import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../services/firestore"; // Adjust the path based on your Firebase configuration file

const useFetchPostById = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const postRef = doc(db, 'posts', postId);
      const docSnap = await getDoc(postRef);
      if (!docSnap.exists()) {c
        throw new Error('Post not found');
      }
      return { id: docSnap.id, ...docSnap.data() };
    },
    enabled: !!postId, // Prevent fetching if postId is not provided
  });
};

export default useFetchPostById;
