// src/pages/Login.tsx
import { useState } from "react";
import { loginAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
    const navigate = useNavigate();
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

      try {
          const res = await loginAPI(form);

          if (res.data.status) {
              localStorage.setItem("token", res.data.token);
              navigate("/admin"); // redirect
          } else {
              alert(res.data.message);
          }
      } catch (err) {
          alert("Login failed");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-600">
      
      {/* Card */}
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Forgot Password */}
          {/* <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div> */}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        {/* <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div> */}

        {/* Social Login (Optional UI) */}
        {/* <button className="w-full border py-2 rounded-lg hover:bg-gray-100 transition">
          Continue with Google
        </button> */}

        {/* Footer */}
        {/* <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default Login;