import aboutImage from "../assets/Web search-bro.png";

const Product = () => {
  return (
    <section className="bg-[#E8E0F2] py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 font-[Sora]">
      <div className="max-w-7xl mx-auto">
        <h2
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-bold
            text-black
            mb-8
            sm:mb-12
            md:mb-16
          "
        >
          WHY CAREERFORGE ?
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          <div className="flex justify-center">
            <img
              src={aboutImage}
              alt="Career Analysis"
              className="
                w-full
                max-w-[250px]
                sm:max-w-[350px]
                md:max-w-[450px]
                lg:max-w-md
              "
            />
          </div>

          <div
            className="
              bg-[#F8F6F4]
              border-[3px]
              border-black
              p-5
              sm:p-6
              md:p-8
              shadow-[8px_8px_0px_0px_#000]
            "
          >
            <h3
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-extrabold
                text-black
                mb-4
                md:mb-6
                leading-tight
              "
            >
              Find What Recruiters See Before They Do
            </h3>

            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
                text-black
                font-medium
                mb-4
                md:mb-8
                leading-relaxed
              "
            >
              Most candidates apply without knowing how their profile is
              perceived. CareerForge helps you uncover hidden strengths,
              detect missing skills, optimize your resume for ATS systems,
              and prepare for interviews with confidence.
            </p>

            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
                text-black
                font-medium
                leading-relaxed
              "
            >
              We transform uncertainty into clarity, helping you become a
              stronger candidate at every stage of your career journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;