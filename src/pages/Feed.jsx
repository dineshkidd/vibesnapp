import { useAuthStore } from "../stores/authStore";
import Header from "../components/Feed/Header";
import { useUserInfo } from "../hooks/useUserInfo";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateTag } from "../utils/generate";
import { useNavigate } from "react-router";

export default function Feed() {
  const { logout, user } = useAuthStore();
  const tag = generateTag(user?.email);
  const { data: userProfile, isLoading, error } = useUserInfo(tag);
  const navigate = useNavigate();
  return <div className="flex flex-col mx-auto p-4 max-w-screen-md">
    {isLoading ? "" : <Header className="justify-start" userProfile={userProfile} logout={logout} />}
    <div className="flex flex-row justify-between items-center pt-5">
      <h1 className="font-bold text-2xl text-center">Feeds</h1>
      <Tabs defaultValue="recent" className="">
        <TabsList className="rounded-full *:text-xs
        ">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
      </Tabs>

    </div>
    <div>posts</div>
    <div className="right-5 bottom-5 fixed flex bg-black px-3 py-3 rounded-full text-white cursor-pointer" onClick={() => navigate("/newpost")} >
      <Plus className="w-7 h-7" strokeWidth={1.3} />
    </div>
  </div>;
}

