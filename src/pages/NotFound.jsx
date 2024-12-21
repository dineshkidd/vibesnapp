import { useNavigate } from "react-router"

export default function NotFound() {
const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg text-gray-500">Page Not Found</p>

            <button className="mt-4 bg-black text-white px-4 py-2 rounded-md" onClick={() =>navigate("/")}>Go to Home Page</button>
        </div>
    )
}