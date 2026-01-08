import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import projectEcommerce from "@/assets/Voltmart-modified.png";
import projectResume from "@/assets/ResuScope-modified.png";
import projectTyping from "@/assets/cheetype-modified.png";
import projectRecipe from "@/assets/tastegpt-modified.png";
import projectWeather from "@/assets/skylune-modified.png";
import projectToDo from "@/assets/plannix-modified.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Voltmart",
    link: "https://voltmart.netlify.app",
    description:
      "A quick-commerce web app with smooth navigation and persistent cart/orders/address storage.",
    tags: ["React", "Context API", "Tailwind", "Clerk"],
    year: "2026",
    image: projectEcommerce,
  },
  {
    title: "ResuScope",
    link: "https://resuscope.netlify.app",
    description:
      "An AI-powered resume analyzer that evaluates resume-job fit and provides personalized improvement tips.",
    tags: ["React", "Tailwind", "Dropzone", "Framer Motion"],
    year: "2025",
    image: projectResume,
  },
  {
    title: "Cheetype",
    link: "https://cheetype.netlify.app",
    description:
      "An interactive typing test that tracks speed and accuracy in real-time, with customisable test lengths.",
    tags: ["React", "CSS"],
    year: "2025",
    image: projectTyping,
  },
  {
    title: "TasteGPT",
    link: "https://tastegpt.netlify.app",
    description:
      "Recommends a single recipe based on user-provided ingredients with dark/light mode integration.",
    tags: ["React", "CSS", "Spoonacular API"],
    year: "2025",
    image: projectRecipe,
  },
  {
    title: "Skylune",
    link: "https://skylune.netlify.app",
    description:
      "A simple weather app delivering current conditions and a 4-day forecast with live location tracking.",
    tags: ["HTML", "CSS", "Vanilla JS", "OpenWeather API"],
    year: "2025",
    image: projectWeather,
  },
  {
    title: "Plannix",
    link: "https://plannix.netlify.app",
    description:
      "A fully responsive minimalist to-do list app that keeps tasks persistent across sessions by using localStorage.",
    tags: ["HTML", "CSS", "Vanilla JS", "localStorage"],
    year: "2025",
    image: projectToDo,
  },
];

const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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

      const cards =
        projectsRef.current?.querySelectorAll<HTMLElement>(".project-card");

      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true as const,
    centerPadding: "20px",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: false,
    swipeToSlide: true,
  };

  return (
    <section ref={sectionRef} id="projects" className="py-32">
      <div className="section-container">
        <h2 ref={titleRef} className="section-title mb-16 text-center">
          Featured Projects
        </h2>

        {/* Mobile Slider */}
        {isMobile ? (
          <Slider {...sliderSettings}>
            {projects.map((project) => (
              <a
                href={project.link}
                key={project.title}
                className="project-card block px-3 outline-none"
              >
                <div className="aspect-video bg-muted relative overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-4 md:line-clamp-none">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </Slider>
        ) : (
          <div ref={projectsRef} className="grid md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <a
                href={project.link}
                key={project.title}
                className="project-card group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-background"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* View Live Button */}
                  <span className="inline-flex items-center text-sm font-medium text-primary transition-all duration-300">
                    View Live
                    <svg
                      className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
