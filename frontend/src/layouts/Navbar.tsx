import React from "react";
import Header from "./Header";
import { MoveRight } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      <Header />
      <nav className="flex items-center justify-around mt-4 pb-4">
        <h1 className="text-4xl ">careerforge.ai</h1>
        <div className="font-medium text-lg mt-2">
          <a className="mx-8" href="#">
            Product
          </a>
          <a className="mx-8" href="#">
            Features
          </a>
          <a className="mx-8" href="#">
            Testimonials
          </a>
          <a className="mx-8" href="#">
            FAQ
          </a>
   
        </div>
               <button className="group flex items-center gap-2 bg-black rounded-4xl text-lg cursor-pointer text-white p-2 px-8 mx-4">
            Get Started
            <MoveRight
              className="transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
              size={22}
              color="white"
            />
          </button>
      </nav>
    </>
  );
};
