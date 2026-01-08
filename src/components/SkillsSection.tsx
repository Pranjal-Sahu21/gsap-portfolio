import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import skill images
import htmlIcon from "@/assets/skills/html-logo-modified.png";
import cssIcon from "@/assets/skills/css-logo-modified.png";
import jsIcon from "@/assets/skills/js-logo-modified.png";
import tailwindIcon from "@/assets/skills/tailwindcss-logo-modified.png";
import reactIcon from "@/assets/skills/react-logo-modified.png";
import framerIcon from "@/assets/skills/framer-motion-seeklogo-modified.png";
import javaIcon from "@/assets/skills/java-logo-modified.png";
import mysqlIcon from "@/assets/skills/icons8-mysql-logo-96-modified.png";
import pythonIcon from "@/assets/skills/python-logo-modified.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "Tailwind", icon: tailwindIcon },
  { name: "Vanilla js", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Framer motion", icon: framerIcon },
  { name: "Java", icon: javaIcon },
  { name: "Python", icon: pythonIcon },
  { name: "MySQL", icon: mysqlIcon },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const items = gridRef.current?.querySelectorAll(".skill-item");
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-32 bg-secondary/30">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title mb-16 text-center">
          Skills & Expertise
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-item group flex flex-col items-center gap-3"
            >
              <div
                className={`relative rounded-lg overflow-hidden transition-all duration-300 group-hover:border-foreground/50 group-hover:scale-110
        ${
          skill.name === "Framer motion"
            ? "w-12 h-12 md:w-16 md:h-16" // smaller sizes
            : "w-16 h-16 md:w-20 md:h-20"
        }
      `}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-125"
                />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
