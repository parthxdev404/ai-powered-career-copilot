import React from "react";
import Header from "./Header";

export const Navbar = () => {
  return (
  <>
    <Header/>
     <nav className="flex items-center justify-around mt-4 border-b-2 border-b-white pb-4">
      <h1 className="text-4xl font-semibold text-white">careerForge</h1>
      <div className="font-medium text-lg mt-2">
        <a className="mx-8 text-white" href="#">Features</a>
        <a className="mx-8 text-white" href="#">How It Works</a>
        <a className="mx-8 text-white" href="#">FAQ</a>

         <button className="bg-white rounded text-lg cursor-pointer text-black p-2 px-4 mx-4">SignIn</button>
        <button className="bg-white rounded text-lg cursor-pointer text-black p-2 px-4">Get Started</button>  
      </div>
      
    </nav>
  </>
  );
};
