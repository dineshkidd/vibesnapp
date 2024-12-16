import React from "react";

const RegisterForm = ({ email, password, setEmail, setPassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 py-2 rounded w-full text-white"
      >
        Register
      </button>
     
    </form>
  );
};

export default RegisterForm;
