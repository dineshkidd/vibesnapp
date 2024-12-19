import React, { useState } from "react";
import { useAuthStore } from "../../stores/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuthStore();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await resetPassword(email);
      setMessage(response);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded w-full max-w-md">
        {/* <h2 className="mb-6 font-bold text-2xl text-center">Reset Password</h2> */}
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 px-3 py-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full text-white"
          >
            Send Password Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
