import background from "../assets/background.png";

const Hero = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="text-center font-[Sora] text-black">
        <h1 className="
          font-bold
          mb-4
          leading-tight
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          xl:text-8xl
        ">
          THE MISSING LINK
          <br />
          BETWEEN{" "}
          <span className="text-[#7D58C2]">
            POTENTIAL
          </span>
          <br />
          AND{" "}
          <span className="text-[#7D58C2]">
            OPPORTUNITY
          </span>
        </h1>

        <p
          className="
            font-medium
            mx-auto
            leading-relaxed
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            max-w-xs
            sm:max-w-xl
            md:max-w-2xl
            lg:max-w-4xl
          "
        >
          careerForge is an ai-powered career companion that provides
          personalized insights, guidance, and tools for professional growth.
        </p>
      </div>
    </div>
  );
};

export default Hero;