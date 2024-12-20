import { useInfiniteQuery } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from "../services/firestore"; // Replace with your Firestore configuration

const fetchPosts = async ({ pageParam = null }) => {
  const postsCollection = collection(db, 'posts'); // Replace 'posts' with your Firestore collection name
  let postsQuery = query(postsCollection, orderBy('timestamp', 'desc'), limit(20));

  if (pageParam) {
    postsQuery = query(postsCollection, orderBy('timestamp', 'desc'), startAfter(pageParam), limit(20));
  }

  const snapshot = await getDocs(postsQuery);

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { posts, nextPage: lastVisible || null };
};

const useFetchPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export default useFetchPosts;
