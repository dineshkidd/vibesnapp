import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from "../services/firestore";

export function useLikePost(postId, userId) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isLiking) => {
      const postRef = doc(db, 'posts', postId);

      if (isLiking) {
        // Add the user to the likes array
        await updateDoc(postRef, {
          liked: arrayUnion(userId),
        });
      } else {
        // Remove the user from the likes array
        await updateDoc(postRef, {
          liked: arrayRemove(userId),
        });
      }
    },
    onSuccess: () => {
      // Optimistically update the cache
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: (error) => {
      console.error('Error updating likes:', error);
    },
  });

  const toggleLike = (isLiking) => mutation.mutate(isLiking);

  return {
    toggleLike,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
