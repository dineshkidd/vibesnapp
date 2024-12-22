import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../services/firestore';

/**
 * Custom hook to add a comment to an existing post
 */
export function useAddComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ postId, currentComment, tag }) => {
      const postRef = doc(db, 'posts', postId);

      const newComment = {
        comment:currentComment,
        id:crypto.randomUUID(),
        tag,
        timestamp: Date.now(),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
    onError: (error) => {
      console.error('Error adding comment:', error);
    },
  });


  const addComment = ({ postId, currentComment, tag }) => {
    mutation.mutate({ postId, currentComment, tag });
  };

  return {
    addComment,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
