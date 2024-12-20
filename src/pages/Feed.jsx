import { useAuthStore } from "../stores/authStore";
import Header from "../components/Feed/Header";
import { useUserInfo } from "../hooks/useUserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateTag } from "../utils/generate";
import { useNavigate } from "react-router";
import React, { useState, useRef, useCallback } from "react";
import Post from "../components/Feed/Post";
import useFetchPosts from "../hooks/useFetchPosts";

export default function Feed() {
  const { logout, user } = useAuthStore();
  const tag = generateTag(user?.email);
  const { data: userProfile, isLoading, error } = useUserInfo(tag);
  const navigate = useNavigate();
  const [feedBy, setFeedBy] = useState("recent");
  const [posts, setPosts] = useState(['']);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchPosts();
  const [showModal, setShowModal] = React.useState(false);
  const [shareLink, setSharePost] = React.useState(null);
  const observerRef = useRef();
  

  const loadMore = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  return <div className="flex flex-col mx-auto p-4 max-w-screen-md">
    {isLoading ? "" : <Header className="justify-start" userProfile={userProfile} logout={logout} />}
    <div className="flex flex-row justify-between items-center pt-5">
      <h1 className="font-bold text-2xl text-center">Feeds</h1>
     
     {/* TODO: Add tabs for recent, friends, popular */}
     {/* <Tabs defaultValue={feedBy} className="">
        <TabsList className="rounded-full *:text-xs
        ">
          <TabsTrigger value="recent" onClick={() => setFeedBy("recent")}>Recent</TabsTrigger>
          <TabsTrigger value="friends" onClick={() => setFeedBy("friends")}>Friends</TabsTrigger>
          <TabsTrigger value="popular" onClick={() => setFeedBy("popular")}>Popular</TabsTrigger>
        </TabsList>
      </Tabs> */}

    </div>

    <div>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.posts.map(post => (
            <Post post={post} key={post.id}/>
          ))}
        </React.Fragment>
      ))}
      <div ref={loadMore} style={{ height: '1px', background: 'transparent' }} />
      {isFetchingNextPage && <p></p>}
    </div>
    <div className="right-5 bottom-5 fixed flex bg-black p-4 rounded-full text-white cursor-pointer" onClick={() => navigate("/newpost")} >
      <img src="/plus.svg" className="w-5 h-5" />
    </div>
  </div>;
}

