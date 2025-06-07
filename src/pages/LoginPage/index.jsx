import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [colorMessage, setColorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        {
          email,
          password,
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1",
          },
        }
      );
      console.log("🚀 ~ handleSubmit ~ response:", response);
      // In your login logic
      localStorage.setItem("token", response.data.token);
      navigate("/user");
      setMessage(`Login successful.`);
      setColorMessage("text-green-500");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data.error;
      setMessage("Login failed. " + errorMessage);
      setColorMessage("text-red-500");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#feb924]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="flex justify-center">
          <p className={colorMessage}>{message}</p>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
        <div className="flex justify-center">
          <p className="pt-2">
            Belum Punya akun?
            <a href="/register" className="text-blue-500">
              Buat Akun
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
