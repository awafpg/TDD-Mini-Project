import axios from "axios";
import { useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [collorMessage, setCollorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://reqres.in/api/register",
        {
          email,
          password,
        },
        {
          headers: { "x-api-key": "reqres-free-v1" },
        }
      );
      console.log("🚀 ~ handleRegister ~ response:", response.data);
      setMessage("Register Success");
      setCollorMessage("text-green-500");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Register Unsuccessful";

      setMessage("Register Failed : " + errorMessage);
      setCollorMessage("text-red-500");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-400">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          Register
        </button>
        <div className="flex justify-center">
          <p className="pt-2">
            Sudah Punya akun?
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
        <p className={`p-1 ${collorMessage}`}>{message}</p>
      </form>
    </div>
  );
}

export default RegisterPage;
