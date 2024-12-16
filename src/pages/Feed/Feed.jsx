import { useAuthStore } from "../../stores/authStore";

export default function Feed() {
  const { logout } = useAuthStore();
  return <div><h1>Feed</h1>
  <button onClick={() => logout()}>Logout</button></div>;
}

