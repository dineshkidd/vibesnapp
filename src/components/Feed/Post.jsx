import { useState, useRef, useEffect } from 'react'
import { Heart, Share } from 'lucide-react'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { generateAvatarFallback, generateTimeAgo, generateTag } from '@/utils/generate'
import { useUserInfo } from '@/hooks/useUserInfo'
import { useNavigate } from 'react-router'
import VideoPlayer from '@/components/ui/VideoPlayer'
import { useAuthStore } from "../../stores/authStore";
import { useLikePost } from '@/hooks/useLikePost'
import ShareDialog from './ShareDialog'

export default function Post({ post }) {
  const { logout, user } = useAuthStore();
  const tag = generateTag(user?.email);
  const images = post?.postMedia || []
  const type = post.type ? post.type : "image"
  const { data: userProfile, isLoading, error } = useUserInfo(post.tag);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.liked.includes(tag))
  const [likeCount, setLikeCount] = useState(post.liked.length)
  const { toggleLike, isLoading: isLiking } = useLikePost(post.id, tag);
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    toggleLike(!liked);
  };
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleCopy = () => {
    const currentURL = window.location.origin + '/post/'+post.id;


    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(currentURL)
        .then(() => {
          alert('copied!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          fallbackCopyTextToClipboard(currentURL);
        });
    } else {
      fallbackCopyTextToClipboard(currentURL);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      // textArea.remove();
      alert('copied!');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      alert('Failed to copy URL', 'error');
    }
    textArea.remove();
  };

  if (isLoading) return null;

  return (
    <div className="max-w-lg bg-gray-100 rounded-3xl p-3 mx-auto mt-3" data-postid={post.id}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Avatar className="w-12 h-12 border cursor-pointer" onClick={() => navigate(`/profile/${post.tag}`)}>
          <AvatarImage src={userProfile.pp} className="object-cover" />
          <AvatarFallback>{generateAvatarFallback(userProfile.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium leading-none">{userProfile.name}</h2>
          <p className="text-xs text-gray-500">{generateTimeAgo(post.timestamp)}</p>
        </div>
      </div>

      {/* Caption */}
      <p className="mb-2 text-sm leading-tight mx-1">
        {post?.text}
      </p>

      {/* Scrollable Image List */}
      {type == "image" && images.length > 1 &&
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="h-56 w-fit first:ml-0 last:mr-0 inline-block object-contain rounded-2xl"
              />
            ))}
          </div>
          {images.length > 1 && <div className="h-3"></div>}
          {images.length > 1 && <ScrollBar orientation="horizontal" className="bg-gray-300 h-1 hover:h-1.5 rounded-full mx-28 opacity-90" />}
        </ScrollArea>}

        {/* for single image post */}
        {type == "image" && images.length == 1 &&
          <div className="flex gap-2">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full first:ml-0 last:mr-0 inline-block object-cover rounded-2xl"
              />
            ))}
          </div>
          }

      {/* video banner */}
      {type == "video" && images.length > 0 &&
        images.map((src, index) => (
          <VideoPlayer
            key={index}
            src={src}
          />
        ))
      }

      {/* Actions */}
      <div className={`flex items-center justify-between ${images.length > 1 ? 'mt-1' : 'mt-3'}`}>
        <button
          onClick={handleLike}
          className="flex items-center gap-2"
        >
          <Heart
            className={`w-6 h-6 ${liked ? 'fill-pink-500 text-pink-500' : 'text-gray-600'
              }`}
          />
          <span className={`${liked ? 'text-pink-500' : 'text-gray-600'}`}>{likeCount}</span>
        </button>
        <button className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded-full" onClick={() => setShowModal(true)}>
          <img src="/share.svg" className="w-5 h-5" />
          <span className='text-sm'>Share</span>
        </button>
      </div>

      {showModal && (<div
        className="z-50 fixed inset-0 flex justify-center items-center bg-black/90  p-2 sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
          }
        }}
      >
        <ShareDialog url={window.location.origin + '/post/'+post.id} setShowModal={setShowModal} handleCopy={handleCopy}/>

      </div>)}
    </div>
  )
}