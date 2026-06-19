import React, { useState } from "react";
import loginPageImg from "../assets/User research-bro.png";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData } from "../types/auth.types";
import { loginSuccess } from "../redux/authSlice";
import { loginUser, googleLogin } from "../services/authService";
import { useDispatch } from "react-redux";
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

      navigate("/");
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

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-h-[90vh] flex flex-col lg:flex-row">
      <div className="hidden h-screen lg:flex lg:w-1/2 bg-violet-500 items-center justify-center">
        <img
          src={loginPageImg}
          alt="Login Illustration"
          className="w-[80%] max-w-xl h-screen object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center font-[Poppins] p-4 md:p-6 h-[90vh]">
        <form
          onSubmit={submitHandler}
          className="
            w-full
            max-w-md
            p-6
            md:p-8
            bg-white
            shadow-[6px_6px_0px_0px_#000]
            border-4
            border-black
          "
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Welcome Back</h1>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-2 border-black shadow-[6px_6px_0px_0px_#000] px-4 py-2"
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
              className="w-full border-2 border-black shadow-[6px_6px_0px_0px_#000] px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-violet-500 text-white py-2  hover:bg-violet-600 transition-colors border-2 border-black shadow-[6px_6px_0px_0px_#000] px-4 "
          >
            Login
          </button>

          <div className="text-center mt-3">
            <span>
              Don't have an account?{" "}
              <Link className="underline font-medium" to="/register">
                Create Account
              </Link>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-5">
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
