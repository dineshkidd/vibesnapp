import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router"
import { generateAvatarFallback } from "@/utils/generate"

export default function Header({ userProfile, logout }) {

    return <div className="flex flex-row justify-between items-center space-x-3">
        {/* <h1>Header</h1> */}
        <Link to={`/profile/${userProfile.tag}`} className="flex flex-row justify-center items-center space-x-2 cursor-pointer">
            <Avatar className="w-12 h-12">
                <AvatarImage src={userProfile.pp} className="object-cover" />
                <AvatarFallback>{generateAvatarFallback(userProfile.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center items-start mr-auto">
                <h1 className="m-0 p-0 font-bold text-lg leading-none mb-1">{userProfile.name}</h1>
                <span className="m-0 p-0 text-gray-500 text-xs hover:underline leading-none">@{userProfile.tag}</span>
            </div>
        </Link>
        {/* <button className="text-gray-500 text-sm hover:text-gray-700 underline" onClick={() => logout()}>Logout</button> */}
    </div>
}

