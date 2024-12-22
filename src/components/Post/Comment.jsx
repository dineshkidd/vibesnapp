import { generateTimeAgo, generateTag, generateAvatarFallback } from "@/utils/generate"
import { useUserInfo } from "@/hooks/useUserInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router";
export default function Comment({ comment }) {
    const navigate = useNavigate();
    const handleProfileClick=()=>{
        navigate("/profile/"+userProfile.tag)
    };
    const { data: userProfile, isLoading, error } = useUserInfo(comment.tag);
    return <div className="flex items-center mx-2 space-x-2 my-5 max-w-lg" data-comment-id={comment?.id}>
        <Avatar className="w-8 h-8 cursor-pointer" onClick={handleProfileClick} >
            <AvatarImage src={userProfile?.pp} className="object-cover" />
            <AvatarFallback>{generateAvatarFallback(userProfile?.name)}</AvatarFallback>
        </Avatar>
        <div >
            <p className="leading-tight max-w-lg break-words"><span className="font-semibold hover:underline cursor-pointer" onClick={handleProfileClick}> {userProfile?.name}</span> {comment.comment}</p>
            <p className="text-xs text-gray-600">{generateTimeAgo(comment.timestamp)}</p>
        </div>
    </div>
}