import { useAuthStore } from "../../stores/authStore";
import { useUserInfo } from "../../stores/useUserInfo";
import { useUpdateUserProfile } from "../../stores/useUpdateUserProfile";
import { ArrowLeft, Pencil, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LoadingPage from "../LoadingPage";
import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";

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
  }, [userProfile,isEditing]);

  useEffect(() => {
    if (isEditing) {
      handleInput();
    }
  }, [isEditing]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMessage("");
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
            className="brightness-75 rounded-b-2xl w-full h-full object-cover"
          />
          <div className="top-0 right-0 left-2 absolute flex items-center p-4">
            <div className="flex items-center text-white cursor-pointer">
              <Link to={`${isEditing ? `/profile/${userProfile.tag}` : "/"}`} onClick={() => setIsEditing(false)}><ArrowLeft className="mr-2 w-7 h-7" /></Link >
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
                <Pencil className="w-4 h-4" />
              </button>
            </div>}
          </div>
        </div>

        {/* Profile Picture */}
        <div className="-bottom-12 left-6 absolute">
          <div className="relative rounded-full">
            <Avatar className="w-28 h-28">
              <AvatarImage src={ppUrl ? ppUrl : userProfile.pp} className="" />
              <AvatarFallback>{userProfile.name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
            {userProfile.userId === user.uid && isEditing &&
            <div className="top-28 right-0 absolute">
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
              <Pencil className="w-4 h-4" />
            </button></div>}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="-bottom-12 left-36 absolute flex flex-row space-x-2">
          {userProfile.userId === user.uid && !isEditing &&
           <button className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-xs" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>}
          {userProfile.userId === user.uid && !isEditing && <button onClick={logout} className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-xs">
            Logout
          </button>}

          {userProfile.userId !== user.uid && <button className="border-gray-400 bg-white hover:bg-gray-100 px-6 py-1.5 border rounded-full text-xs">
            Add to friends
          </button>}
        </div>
      </div>

    </div>
    <div className="mt-16 px-8">
      {!isEditing ?
        <div>
          <h2 className="font-semibold text-3xl leading-none">{userProfile.name}</h2>
          {!isEditing && <p className="ml-1 text-gray-500 text-xs leading-none">{userProfile.tag}</p>}
          <p className="mt-2 text-black text-sm">{userProfile.bio}</p>
          {!isEditing && <div className="mt-4">
            <h2 className="font-semibold text-3xl">Posts</h2>
            <div className="text-xl">Posts go here</div>
          </div>}
        </div> :
        <div>
          <div className="mb-2 text-black text-lg">Name</div>
          <input type="text" className="border-b border-black rounded-none font-semibold text-lg focus:outline-none" maxLength="25" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name..." />
          <div className="mt-8 mb-2 text-black text-lg">Bio</div>
          <textarea type="text" className="border-b border-black rounded-none w-full font-semibold text-lg overflow-hidden focus:outline-none" maxLength="150" onInput={handleInput} ref={textareaRef} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write something about yourself..." />
          
          </div>}
    </div>

    {!isEditing && <div className="right-5 bottom-5 fixed flex bg-black px-3 py-3 rounded-full text-white cursor-pointer" >
     <Plus className="w-7 h-7" strokeWidth={1.3} />
    </div>}
    {isEditing && <div className="bottom-3 left-1/2 fixed flex space-x-2 px-6 w-full max-w-screen-md transform -translate-x-1/2" >
      <button className="bg-white hover:bg-gray-100 mx-auto px-3 py-3 border border-black rounded-full w-full text-black text-center" onClick={() => setIsEditing(false)}>
        CANCEL
      </button>
      <button className="bg-black hover:bg-gray-900 mx-auto px-3 py-3 rounded-full w-full text-center text-white" onClick={handleSave}>
        SAVE
      </button>
    </div>}
  </div>;
}

