import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Auth from "./pages/Auth/Auth";
import { useAuthStore } from "./stores/authStore"; // Import Zustand store
import LoadingPage from "./pages/LoadingPage";

const AuthRedirect = () => {
  const { user ,loading} = useAuthStore(); // Get user state from Zustand
  if(loading) return <LoadingPage/>;
  // If the user is already logged in, redirect to home ("/")
  if (user && user.emailVerified) {
    return <Navigate to="/" />;
  }

  return <Auth />; // Otherwise, show the login/register page
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // Wrap feed and other protected routes
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthRedirect /> 
    ),
  },
  {
    path: "/register",
    element: (
      <AuthRedirect />
    ),
  },
]);



const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;