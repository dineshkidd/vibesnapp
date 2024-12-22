import { generateAvatarFallback,generateTag } from "@/utils/generate";
import { useAuthStore } from "@/stores/authStore";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useState} from 'react';
import { useAddComment } from "@/hooks/useAddComment";
import Comment from '@/components/Post/Comment'

export default function CommentBox({ comments, postId }) {
  const { logout, user } = useAuthStore();
  const tag = generateTag(user?.email);
  const [currentComment,setCurrentComment] =useState("");
  const { data: userProfile, isLoading, error } = useUserInfo(tag);
  const { addComment, isError } = useAddComment();
  const revArrComment = [...comments].reverse();


  const handleAddComment = async  () =>{
    if (!currentComment.trim()) return;

    try {
      await addComment({postId, currentComment, tag});
      setCurrentComment("");
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }

  };
  if(isLoading) return; 
    return <div className="max-w-lg  mx-auto mt-1 ">
      <h2 className="font-bold text-lg">Comments</h2>

      {revArrComment.length>0 && <div className="pb-10">
      {revArrComment.map((comment)=>
        <Comment comment={comment} key={comment.id}/>
      )}
      </div>}

      {revArrComment.length == 0 && <p className="text-gray-600">No Comments yet</p>}
    

    <div className="w-full max-w-lg left-1/2 transform -translate-x-1/2  mr-4  bottom-0 fixed flex bg-gray-200 px-4 py-3 rounded text-white items-center "  >
      <Avatar className="w-10 h-10">
                      <AvatarImage src={userProfile?.pp} className="object-cover" />
                      <AvatarFallback>{generateAvatarFallback(userProfile?.name)}</AvatarFallback>
      </Avatar>
      <textarea className="border-b border-black bg-gray-200 w-3/4 outline-none text-black ml-4 rounded-none" value={currentComment}  onChange={(e) => setCurrentComment(e.target.value)} maxLength={100} placeholder="Add a comment..." rows={2}/>
      {currentComment && <button className="text-blue-700 font-semibold ml-4" onClick={handleAddComment}>Post</button>}
    </div>
    </div>
}