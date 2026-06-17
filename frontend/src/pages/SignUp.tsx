import React, { useState } from "react";
import signUpPageImg from "../assets/Recommendation letter-bro.png";
import { Link } from "react-router-dom";
import type { RegisterData, FormError } from "../types/auth.types";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../services/authService";
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
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await registerUser(formData);

      navigate("/login");
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
      <div className="w-1/2 flex items-center justify-center font-[Poppins]">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-full max-w-md p-8 shadow-lg rounded-lg h-180"
        >
          <h1 className="text-3xl font-bold mb-6">
            Hey There , great to have you{" "}
          </h1>

          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2"
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
            {errors.password && <span>{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600"
          >
            Create Account
          </button>
          <div className="text-center mt-2">
            <span className="text-center">
              Already have an account ?{" "}
              <Link className="underline" to="/login">
                Login
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
      <div className="w-1/2 bg-violet-500 flex items-center justify-center">
        <img
          src={signUpPageImg}
          alt="Login Illustration"
          className="h-[80%] object-contain"
        />
      </div>
    </div>
  );
};

export default SignUp;
