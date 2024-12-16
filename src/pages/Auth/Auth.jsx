import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import LoginForm from "../../components/Auth/LoginForm";
import RegisterForm from "../../components/Auth/RegisterForm";
import { Link } from "react-router";
import { useEffect } from "react";
import ResetPasswordForm from "../../components/Auth/ResetPasswordForm";

const Auth = () => {
  const { login, register, googleLogin } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [authTitle, setAuthTitle] = useState("Log in");


  const isLogin = location.pathname === "/login";

  useEffect(() => {
    setAuthTitle(isLogin ? "Log in" : "Register");
    if (showResetPassword) {
      setAuthTitle("Reset Password");
    }
  }, [isLogin, showResetPassword]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      if (isLogin) {
        await login(email, password);
        navigate("/"); // Redirect only if login is successful
      } else {
        await register(email, password);
        alert("Registration successful. Please verify your email.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message); // Display the error message
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const response = await resetPassword(email);
      setMessage(response);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };



  const handleGoogleAuth = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <div className="bg-white shadow p-8 rounded w-full max-w-md">
        <h2 className="mb-6 font-bold text-2xl text-center">
          {authTitle}
        </h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}
        {!showResetPassword && (
          <div>{isLogin ? (
            <LoginForm
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
          />
        ) : (
          <RegisterForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        )}</div>)}
        {showResetPassword && (
          <ResetPasswordForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleResetPassword}
          />
        )}
        {true && (
          <div>
            <div className="mt-4 text-center">or</div>
        <button
          onClick={handleGoogleAuth}
          className="flex justify-center items-center bg-neutral-800 hover:bg-neutral-900 mt-4 py-2 rounded-full w-full text-white"
        >
          <svg className="w-4 h-4 me-2" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline" onClick={() => setShowResetPassword(false)}>
                Log in here
              </Link>
            </>
          )}
        </p>
        {!showResetPassword && <p className="mt-4 text-center text-sm">
          <button
            type="button"
            onClick={() => setShowResetPassword(true)}
            className="text-blue-600 hover:underline"
          >
            Forgot your password?
          </button>
        </p>}
        {showResetPassword && <p className="mt-4 text-center text-sm">
          <Link
            type="button"
            onClick={() => setShowResetPassword(false)}
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to login
          </Link>
        </p>}

        </div>)}

      </div>
    </div>
  );
};

export default Auth;
