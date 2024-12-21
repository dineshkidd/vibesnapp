import useFetchPostsByTag from "@/hooks/useFetchPostsByTag";
import VideoPlayer from "../ui/VideoPlayer";
import { useNavigate } from "react-router";
export default function ProfilePosts({ tag }) {
    const navigate = useNavigate();
    const { data: posts, isLoading, isError } = useFetchPostsByTag(tag);
    if (isLoading) return <div>Loading...</div>;
    // const navigate = useNavigate();

    const handleProfilePostClick = (postId) => {
        // window.location.href = `/post/${postId}`;
        navigate(`/post/${postId}`);
    }

    return <div className="w-full max-w-screen-md mx-1 mt-2">
        <div className="columns-2 gap-3 space-y-3">
            {posts.map((item) => (
                <div
                    key={item.id}
                    className="break-inside-avoid rounded-lg overflow-hidden  transform transition-transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => {handleProfilePostClick(item.id)}}
                >
                    <div className="relative">
                        {item.type == "image" ? (
                            <img
                                src={item.postMedia[0]}
                                className="w-full h-auto"
                            />
                        ) : (<VideoPlayer
                            src={item.postMedia[0]}
                            className="w-full h-auto"
                            showMuteButton={false}
                        />)}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/65" />
                            {item.postMedia.length >1 
                             && <p className="font-mono absolute top-2  right-2 px-2 py-1  text-xs  leading-tight rounded-full bg-white border opacity-85">1/{item.postMedia.length}</p>}
                            <div className="absolute bottom-3 left-3 right-0 ">
                                <p className="text-white font-semibold text-md mb-2 line-clamp-1 leading-tight mr-1">
                                    {item?.text}
                                </p>
                                <div className="flex items-center text-white leading-non opacity-65">
                                    <img src="/heart.svg" className="w-4 h-4 mr-1 " />
                                    <span className=" leading-none">{item.liked.length}</span>
                                </div>
                            </div>
                    </div>
                </div>
            ))}
        </div>
    </div>

}