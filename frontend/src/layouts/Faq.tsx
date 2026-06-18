import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "How does CareerForge work?",
    answer:
      "CareerForge analyzes your resume, evaluates your skills, and provides personalized recommendations to help you improve your profile, prepare for interviews, and advance your career.",
  },
  {
    question: "What can CareerForge help me with?",
    answer:
      "CareerForge helps with resume analysis, ATS optimization, skill gap detection, interview preparation, career insights, and personalized growth recommendations.",
  },
  {
    question: "Is CareerForge suitable for students and professionals?",
    answer:
      "Absolutely. Whether you're a student, fresher, or experienced professional, CareerForge adapts to your career stage and goals.",
  },
  {
    question: "How accurate is the resume analysis?",
    answer:
      "Our analysis is based on ATS best practices, recruiter expectations, and industry standards to provide meaningful insights.",
  },
  {
    question: "Is my resume data secure?",
    answer:
      "Yes. Your resume and personal data are processed securely and are never shared with third parties.",
  },
  {
    question: "Can CareerForge help me prepare for interviews?",
    answer:
      "Yes. You can practice with AI-generated questions, receive feedback, and improve your confidence before real interviews.",
  },
  {
    question: "Does CareerForge provide personalized recommendations?",
    answer:
      "Every recommendation is tailored to your skills, experience, career goals, and target roles.",
  },
];

const Faq = () => {
  const [open, setOpen] = useState<number | null>(0);
  const navigate = useNavigate()
  return (
    <section className="bg-[#EAE3F5] py-10 md:py-16 font-[Sora] min-h-70">
  <div className="mx-auto px-4 sm:px-6 md:px-8">

    <h2
      className="
        text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        font-bold
        text-black
        mb-10
        md:mb-14
      "
    >
      FREQUENTLY ASKED QUESTIONS
    </h2>

    <div className="max-w-5xl mx-auto border-[4px] border-black">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              sm:px-6
              md:px-8
              py-4
              md:py-6
              bg-[#7E57C2]
              cursor-pointer
              border-b-[4px]
              border-black
            "
          >
            <span
              className="
                text-white
                text-base
                sm:text-lg
                md:text-xl
                lg:text-2xl
                font-bold
                text-left
                pr-4
              "
            >
              {faq.question}
            </span>

            <div
              className={`transition-transform duration-300 flex-shrink-0 ${
                open === index ? "rotate-45" : ""
              }`}
            >
              <Plus className="w-5 h-5 md:w-7 md:h-7 text-black" />
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              open === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#D7C7F7] px-4 sm:px-6 md:px-8 py-4 md:py-6 border-b-[4px] border-black">
              <p
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  lg:text-2xl
                  font-semibold
                  text-black
                  leading-relaxed
                "
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-16 md:mt-24 lg:mt-28 max-w-7xl">
      <h3
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-black
          text-black
          mb-4
          md:mb-6
        "
      >
        Ready To Forge Your Next Career Move?
      </h3>

      <p
        className="
          text-lg
          sm:text-xl
          md:text-2xl
          font-bold
          text-black
          leading-relaxed
          mb-4
          max-w-5xl
        "
      >
        CareerForge provides the insights, guidance, and tools you need
        to optimize your profile, prepare for opportunities, and
        accelerate professional growth.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="
          bg-[#7E57C2]
          text-white
          border-[3px]
          border-black
          px-5
          sm:px-6
          md:px-8
          py-2
          md:py-3
          text-lg
          sm:text-xl
          md:text-2xl
          font-black
          shadow-[5px_5px_0px_0px_#000]
          hover:translate-x-1
          hover:translate-y-1
          hover:shadow-none
          transition-all
          duration-150
        "
      >
        GET STARTED
      </button>
    </div>
  </div>
</section>
  );
};

export default Faq;