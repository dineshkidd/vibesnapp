import { useAuthStore } from "../stores/authStore";
import { useUserInfo } from "../hooks/useUserInfo";
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LoadingPage from "./LoadingPage";
import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { generateAvatarFallback } from "@/utils/generate";
import ProfilePosts from "../components/Profile/ProfilePosts";

export default function Profile() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const { tag } = useParams();
  const { data: userProfile, isLoading, error } = useUserInfo(tag);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [pp, setPp] = useState("");
  const [ppUrl, setPpUrl] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const textareaRef = useRef();
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useUpdateUserProfile();
  const bannerInputRef = useRef(null);
  const ppInputRef = useRef(null);

  const handleBannerClick = () => {
    bannerInputRef.current.click(); // Trigger file input click
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerUrl(URL.createObjectURL(file));
      setBanner(file);
      console.log("Selected file:", file.name);
    }
  };

  const handlePpClick = () => {
    ppInputRef.current.click(); // Trigger file input click
  };

  const handlePpChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPpUrl(URL.createObjectURL(file));
      setPp(file);
      console.log("Selected file:", file.name);
    }
  };

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setBio(userProfile.bio);
      setPpUrl(userProfile.pp);
      setBannerUrl(userProfile.banner);
    }
  }, [userProfile, isEditing]);

  useEffect(() => {
    if (isEditing) {
      handleInput();
    }
  }, [isEditing]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMessage("");
    if (!name || !bio) {
      // setMessage("Name and bio cannot be empty!");
      setLoading(false);
      return;}
    try {
      await updateProfile({
        tag,
        name,
        bio,
        pp,
        banner,
      });
      // setMessage("Profile updated successfully!");
      navigate(0);
    } catch (error) {
      // setMessage(error.message);
      console.log(error.message);
    } finally {

      setLoading(false);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };


  if (isLoading || loading) return <LoadingPage />;
  return <div className="flex flex-col mx-auto px-0 md:px-4 max-w-screen-md">
    <div className="min-h-screen-1/2">
      <div className="relative">
        {/* Header Section */}
        <div className="relative w-full h-36">
          <img
            src={bannerUrl ? bannerUrl : "https://placehold.co/600x400/f0f0f0/f0f0f0"}
            alt="Header background"
            className="brightness-75 rounded-b-xl w-full h-full object-cover"
          />
          <div className="top-0 right-0 left-2 absolute flex items-center py-2">
            <div className="flex items-center text-white cursor-pointer">
              <img src="/arrowLeft.svg" className="mr-2 w-9 h-9 hover:bg-black/50 rounded-full" onClick={() =>{ 
                if(isEditing){
                  setIsEditing(false);
                }
                else{
                  navigate(-1);
                }
              
              }} />
              <span className="font-medium text-lg">{isEditing ? "Edit Profile" : ""}</span>
            </div>
            {userProfile.userId === user.uid && isEditing && <div className="top-24 right-4 absolute">
              <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                onChange={handleBannerChange}
                accept="image/*"
              />
              <button
                className="bg-gray-100 p-2 rounded-full text-black"
                onClick={handleBannerClick}
              >
                <img src="/edit.svg" className="w-4 h-4" />
              </button>
            </div>}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="-bottom-14 left-4 absolute">
          <div className="relative rounded-full">
            <Avatar className="w-32 h-32">
              <AvatarImage src={ppUrl} className="object-cover" />
              <AvatarFallback>{generateAvatarFallback(userProfile.name)}</AvatarFallback>
            </Avatar>
            {userProfile.userId === user.uid && isEditing &&
              <div className="top-28 right-0 absolute w-full">
                <input
                  type="file"
                  ref={ppInputRef}
                  className="hidden"
                  onChange={handlePpChange}
                  accept="image/*"
                />
                <button
                  className="right-0 bottom-0 absolute bg-gray-100 p-2 rounded-full text-black"
                  onClick={handlePpClick}
                >
                  <img src="/edit.svg" className="w-4 h-4" />
                </button></div>}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="-bottom-12 left-36 absolute flex flex-row space-x-2">
          {userProfile.userId === user.uid && !isEditing &&
            <button className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>}
          {userProfile.userId === user.uid && !isEditing && <button onClick={logout} className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-sm">
            Logout
          </button>}

          {userProfile.userId !== user.uid && <button className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-sm">
            Add to friends
          </button>}
        </div>
      </div>

    </div>
    <div className="mt-16 px-4">
      {!isEditing ?
        <div className="w-full">
          <h2 className="font-semibold text-2xl leading-none mb-1">{userProfile.name}</h2>
          <p className=" text-gray-500 text-xs leading-none">@{userProfile.tag}</p>
          <p className="mt-4 text-black text-sm break-words">{userProfile.bio}</p>
          <div className="mt-4 w-full">
            <h2 className="font-semibold text-xl">Posts</h2>
            <ProfilePosts tag={tag} />
          </div>
        </div>
        : <div>
          <div className="mb-2 font-normal text-black text-lg">Name</div>
          <input type="text" className="border-b border-black rounded-none w-full font-semibold text-lg focus:outline-none" maxLength="20" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name..." />
          <div className="mt-8 mb-2 text-black text-lg">Bio</div>
          <textarea type="text" className="border-b border-black rounded-none w-full font-semibold text-lg overflow-hidden focus:outline-none" maxLength="150" onInput={handleInput} ref={textareaRef} value={bio} rows={1} onChange={(e) => setBio(e.target.value)} placeholder="Write something about yourself..." />
        </div>}
    </div>

    {!isEditing && <div className="right-5 bottom-5 fixed flex bg-black p-4 rounded-full text-white cursor-pointer" onClick={() => navigate("/newpost")} >
      <img src="/plus.svg" className="w-5 h-5" />
    </div>}


    {isEditing && <div className="bottom-3 left-1/2 fixed flex space-x-2 px-6 w-full max-w-screen-md transform -translate-x-1/2" >
      <button className="bg-white hover:bg-gray-100 mx-auto px-3 py-3 border border-black rounded-full w-full text-black text-center" onClick={() => setIsEditing(false)}>
        CANCEL
      </button>
      <button className="enabled:bg-black enabled:cursor-pointer bg-gray-500 cursor-not-allowed mx-auto px-3 py-3 rounded-full w-full text-center text-white" onClick={handleSave} disabled={loading || name === "" || bio === ""}>
        SAVE
      </button>
    </div>}
  </div>;
}

