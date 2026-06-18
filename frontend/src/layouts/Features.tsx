const Features = () => {


  const features = [
    {
      title: "RESUME ANALYSIS",
      subtitle: "Understand What Recruiters Actually Notice",
      points: [
        "Detect weaknesses impacting application success",
        "Receive actionable recommendations instantly",
        "Identify strengths across resume sections",
      ],
    },
    {
      title: "ATS Optimization",
      subtitle: "Improve Visibility Across Hiring Systems",
      points: [
        "Measure resume compatibility accurately",
        "Optimize keywords for target roles",
        "Increase chances of recruiter discovery",
      ],
    },
    {
      title: "Skill Gap Detection",
      subtitle: "Discover Missing Skills For Success",
      points: [
        "Compare skills against role requirements",
        "Identify learning opportunities effectively",
        "Build stronger professional foundations",
      ],
    },
    {
      title: "Interview Preparation",
      subtitle: "Practice Confidently Before Real Interviews",
      points: [
        "Generate role specific interview questions",
        "Receive feedback on every answer",
        "Improve communication and confidence",
      ],
    },
    {
      title: "Career Insights",
      subtitle: "Make Smarter Professional Growth Decisions",
      points: [
        "Analyze strengths and improvement areas",
        "Track progress across career goals",
        "Gain personalized career recommendations",
      ],
    },
    {
      title: "Career Readiness",
      subtitle: "Measure Progress Toward Desired Roles",
      points: [
        "Evaluate readiness for target positions",
        "Understand areas requiring improvement",
        "Build confidence before applying",
      ],
    },
  ];

  
  return (
    <section className="bg-[#7E57C2] font-[Sora]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-14 lg:py-16">
        <h2
          className="
            text-white
            font-extrabold
            uppercase
            leading-tight
            mb-8
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
          "
        >
          Tools That Turn Potential
          Into Opportunity
        </h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="
                bg-[#F8F6F4]
                border-[3px]
                border-black
                shadow-[6px_6px_0px_0px_#000]
                p-7
                md:p-6
                min-h-[220px]
              "
            >
              <h3
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-black
                  text-black
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                  text-lg
                  md:text-xl
                  font-bold
                  text-black
                  mt-2
                "
              >
                {feature.subtitle}
              </p>

              <div className="mt-6 md:mt-8 lg:mt-10 space-y-2">
                {feature.points.map((point) => (
                  <p
                    key={point}
                    className="
                      text-base
                      md:text-lg
                      font-semibold
                      text-black
                      leading-relaxed
                    "
                  >
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;