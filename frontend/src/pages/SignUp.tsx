import React, { useState } from "react";
import signUpPageImg from "../assets/Recommendation letter-bro.png";
import { Link } from "react-router-dom";
import type { RegisterData, FormError } from "../types/auth.types";

const SignUp = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors: FormError = {};

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long ";
    }

    if (formData.password != formData.confirmPassword) {
      newErrors.confirmpassword = "Password does not match";
    }

        setErrors(newErrors);
        setFormData({
          name : "",
          email : "",
          password :"",
          confirmPassword : ""
        })
    return Object.keys(newErrors).length === 0;
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
          <div className="mb-6">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your confirm password"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.confirmpassword && <span>{errors.confirmpassword}</span>}

          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600"
          >
            Login
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
            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition"
            >
              Continue With Google
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </button>
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
