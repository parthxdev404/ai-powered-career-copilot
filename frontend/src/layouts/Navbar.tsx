import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        font-[Sora]
        flex
        items-center
        justify-between
        px-4
        sm:px-6
        md:px-8
        lg:px-12
        mt-4
        md:mt-6
        lg:mt-8
        absolute
        top-0
        left-0
        w-full
        z-50
      "
    >
      <h1
        className="
          font-bold
          text-xl
          sm:text-2xl
          md:text-4xl
          lg:text-5xl
        "
      >
        CAREERFORGE
      </h1>

      <button
        onClick={() => navigate("/register")}
        className="
          bg-[#7D58C2]
          font-bold
          text-white
          border-4
          border-black
          cursor-pointer
          transition-all
          shadow-[6px_6px_0px_0px_#000]
          hover:translate-x-1
          hover:translate-y-1
          hover:shadow-[3px_3px_0px_0px_#000]

          text-sm
          sm:text-base
          md:text-xl
          lg:text-2xl

          px-3
          sm:px-4
          md:px-5
          lg:px-6

          py-2
        "
      >
        GET STARTED
      </button>
    </div>
  );
};

export default Navbar;