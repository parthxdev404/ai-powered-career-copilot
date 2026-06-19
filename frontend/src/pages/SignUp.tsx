import React, { useState } from "react";
import signUpPageImg from "../assets/Recommendation letter-bro.png";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterData, FormError } from "../types/auth.types";
import { registerUser, googleLogin } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormError = {};

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: any
  ) => {
    try {
      const response = await googleLogin(
        credentialResponse.credential
      );

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      localStorage.setItem("token", response.token);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-h-[95vh] flex flex-col lg:flex-row">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center font-[Poppins] p-4 md:p-6 ">
        <form
          onSubmit={submitHandler}
          className="
            w-full
            max-w-md
            p-6
            border-2 border-black shadow-[6px_6px_0px_0px_#000]
            md:p-8
            bg-white
          "
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Hey There, great to have you
          </h1>

          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border-2 border-black shadow-[6px_6px_0px_0px_#000] px-4 py-2"
            />
          </div>

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
              className="w-full border-2 border-black shadow-[6px_6px_0px_0px_#000] px-4 py-2 "
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-violet-500 text-white py-2  hover:bg-violet-600 transition-colors border-2 border-black shadow-[6px_6px_0px_0px_#000]"
          >
            Create Account
          </button>

          <div className="text-center mt-3">
            <span>
              Already have an account?{" "}
              <Link
                className="underline font-medium"
                to="/login"
              >
                Login
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

      <div className="hidden lg:flex lg:w-1/2 bg-violet-500 items-center justify-center h-screen">
        <img
          src={signUpPageImg}
          alt="Signup Illustration"
          className="w-[80%] max-w-xl min-h-screen object-contain"
        />
      </div>

    </div>
  );
};

export default SignUp;