import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where,orderBy } from 'firebase/firestore';
import { db } from "../services/firestore";

const useFetchPostsByTag = (tag) => {
  return useQuery({
    queryKey: ['posts', tag],
    queryFn: async () => {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef,where('tag', '==', tag));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      return posts;
    },
    enabled: !!tag, 
  });
};

export default useFetchPostsByTag;
