import { ArrowLeft } from "lucide-react";
import { isMobile } from "../lib/utils";
import { useNavigate } from "react-router";
import MediaPicker from '@/components/NewPost/MediaPicker';
// import CustomCarousel from "@/components/NewPost/Carousel";
import { useState,useRef } from "react";
import NewPostCarousel from "@/components/NewPost/NewPostCarousel";
import useCreatePost from "@/hooks/useCreatePost";
import LoadingPage from "@/pages/LoadingPage";
import { useAuthStore } from "../stores/authStore";
import { generateTag } from "../utils/generate";
import { useUserInfo } from "../hooks/useUserInfo";

export default function NewPost() {
    const navigate = useNavigate();
    // const [postmedia,setPostMedia] = useState();
    const [postMedia, setPostMedia] = useState([]);
    const [mediatype, setMediaType] = useState();
    // Handlers for file input
    const [loading, setLoading] = useState(false);
    const {createPost}=useCreatePost();
    const contentRef = useRef(null);
    const { logout, user } = useAuthStore();
    const tag = generateTag(user?.email);
    const { data: userProfile, isLoading, error } = useUserInfo(tag);

    const handleDelete = (index) => {
        console.log(`Deleted image at index ${index}`)
    }

    const handleFileAdd = (e, type, maxFiles) => {
        const files = Array.from(e.target.files);
        if (files.length > maxFiles) {
          alert(`You can select a maximum of 4 files.`);
          return;
        }
        // setMediaType(type);
        setPostMedia((prevMedia) => [...prevMedia, ...files]);
      };

      const handleCreatePost = async (e) => {
        setLoading("true");
        // setMessage("");
        try {
          await createPost({
            text:contentRef.current.value,
            postMedia,
            tag:userProfile.tag,
            userId:userProfile.userId,
            type:mediatype
          });
          // setMessage("Profile updated successfully!");
          navigate(-1);
        } catch (error) {
          // setMessage(error.message);
          console.log(error.message);
        } finally {
    
          setLoading(false);
        }
      };

      if(loading){return <LoadingPage loadingText="posting"/>}

    // const isMobile = true;
    return <div className="flex flex-col mx-auto p-4 max-w-screen-md">
        <div className="flex flex-row items-center space-x-2 mb-4">
            <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
            <h1 className="font-bold text-center text-xl">New Post</h1>
        </div>

        {postMedia.length > 0 &&
            <NewPostCarousel
                images={postMedia}
                onDelete={handleDelete}
                setPostMedia={setPostMedia}
                type={mediatype}
            />}

        {/* Add more photos */}
        <input
            type="file"
            id="more-photo-input"
            accept="image/*"
            multiple
            max={postMedia.length > 0 ? 5 - postMedia.length : 5}
            className="hidden"
        onChange={(e) => handleFileAdd(e, "image", postMedia.length > 0 ? 5 - postMedia.length : 5)}
        />
        {postMedia.length > 0 && mediatype == 'image' && <label
            htmlFor="more-photo-input"
            className="flex items-center space-x-2 cursor-pointer"
        >
            <img src="./photo.svg" alt="Camera" className="w-7 h-7" />
            <div className="font-semibold text-sm">Add more Photos</div>
        </label>}


        <textarea className="mt-2 bg-gray-300 px-2 py-4 border rounded-md w-full h-ful placeholder:text-gray-500 focus:outline-none resize-none" maxLength="150" rows={6} placeholder="What's on your mind?✨" ref={contentRef} />


        {postMedia.length < 1 && <MediaPicker postMedia={postMedia} setPostMedia={setPostMedia} setMediaType={setMediaType} />}

        <div className="bottom-3 left-1/2 fixed flex space-x-2 px-6 w-full max-w-screen-md transform -translate-x-1/2" >
            <button className="bg-white hover:bg-gray-100 mx-auto px-3 py-3 border border-black rounded-full w-full text-black text-center" onClick={() => navigate(-1)}>
                CANCEL
            </button>
            <button className="bg-black hover:bg-gray-900 mx-auto px-3 py-3 rounded-full w-full text-center text-white"  onClick={handleCreatePost} >
                CREATE
            </button>
        </div>
    </div>
}