import React from "react";
import { MoveRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="text-6xl flex items-center flex-col gap-6 justify-center font-medium text-center h-150">
      <h1>
        Analyze resumes, improve ATS scores,
        <br />
        discover matching jobs, identify skill gaps,
        <br />
        and prepare for interviews with AI.
      </h1>
      <div>
        <button className="group flex items-center gap-2 bg-black rounded-4xl text-lg cursor-pointer text-white p-2 px-8 mx-4">
          Try For Free
          <MoveRight
            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
            size={22}
            color="white"
          />
        </button>
      </div>
    </div>
  );
};

export default Hero;
