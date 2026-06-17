import React, { useState } from "react";
import loginPageImg from "../assets/User research-bro.png";
import { Link } from "react-router-dom";
import type { LoginData } from "../types/auth.types";
import { loginSuccess } from "../redux/authSlice";
import { loginUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.email || !formData.password) {
        alert("All fields are required");
        return;
      }
      const response = await loginUser(formData);

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await googleLogin(credentialResponse.credential);

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        }),
      );

      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 bg-violet-500 flex items-center justify-center">
        <img
          src={loginPageImg}
          alt="Login Illustration"
          className="h-[80%] object-contain"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center font-[Poppins]">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-full max-w-md p-8 shadow-lg rounded-lg h-130"
        >
          <h1 className="text-3xl font-bold mb-6">Welcome Back </h1>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600"
          >
            Login
          </button>
          <div className="text-center mt-2">
            <span className="text-center">
              Don't have an account ?{" "}
              <Link className="underline" to="/register">
                Create Account
              </Link>
            </span>
          </div>
          <div className="text-center flex flex-wrap justify-center items-center gap-4 mt-4">
            <h1>OR</h1>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
              theme="filled_black"
              shape="pill"
              size="large"
              text="continue_with"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
