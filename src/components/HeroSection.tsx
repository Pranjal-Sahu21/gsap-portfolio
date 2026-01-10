import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      tl.fromTo(
        titleRef.current?.querySelectorAll(".title-line") || [],
        { y: 120, opacity: 0, skewY: 7 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        );

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current?.querySelector(".scroll-line"), {
        scaleY: 1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex flex-col justify-center relative pt-24"
    >
      <div className="section-container">
        <div className="max-w-6xl">
          <h1 ref={titleRef} className="hero-title mb-8">
            <div className="overflow-hidden">
              <span className="title-line block">Frontend</span>
            </div>
            <div className="overflow-hidden">
              <span className="title-line block text-gradient">Developer</span>
            </div>
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
          >
            Bringing sleek, responsive, and personality-driven web experiences
            to life through thoughtful design and fluid animations.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a
              href="https://drive.google.com/file/d/1zwEZOF3Tdz97v0aHU2WnPNEKKgdBdFIb/view?usp=sharing"
              target="_blank"
              className="magnetic-button"
            >
              Download CV
            </a>
            <button
              onClick={() => scrollToSection("contact")}
              className="outline-button"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 right-8 md:right-16 lg:right-20 flex flex-col items-center gap-4"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-16 bg-border relative overflow-hidden">
          <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-foreground origin-top scale-y-0" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
