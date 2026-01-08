import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journeyData = [
  {
    year: "2028",
    title: "NIT Rourkela",
    company: "Bachelor of Technology",
    description: "CGPA: 8.48",
  },
  {
    year: "2024",
    title: "SAI International School",
    company: "CBSE 12th boards",
    description: "Grade: 92.2%",
  },
  {
    year: "2022",
    title: "Vikash Convent School",
    company: "ICSE 10th boards",
    description: "Grade: 96.2%",
  },
];

const JourneySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          }
        );
      });

      gsap.fromTo(
        ".timeline-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="py-32 relative">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title mb-20 text-center">
          My Journey
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line">
            <div className="timeline-line-fill absolute inset-0 bg-foreground origin-top" />
          </div>

          <div className="space-y-16">
            {journeyData.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                <div
                  className={`${
                    index % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"
                  }`}
                >
                  <span className="text-5xl font-bold text-muted-foreground/30 font-[var(--font-display)]">
                    {item.year}
                  </span>
                </div>
                <div
                  className={`pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:pl-16" : "md:order-1 md:pr-16"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground mb-3">{item.company}</p>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="timeline-dot" style={{ top: "0.5rem" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
