import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const menu = menuRef.current;

    if (isMenuOpen) {
      // Make sure menu is mounted before animating
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    } else {
      // Animate exit, then unmount
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setShouldRenderMenu(false),
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMenuOpen) setShouldRenderMenu(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-6 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="section-container flex items-center justify-between">
        <button
          onClick={() => scrollToSection("hero")}
          className="text-xl font-bold tracking-tight font-[var(--font-display)]"
        >
          PS.
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {["journey", "skills", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="nav-link"
            >
              {section}
            </button>
          ))}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu with Enter + Exit Animation */}
      {shouldRenderMenu && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-full left-0 right-0 overflow-hidden bg-background/95 backdrop-blur-md border-b border-border/50"
        >
          <div className="section-container py-6 flex flex-col gap-4">
            {["journey", "skills", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="nav-link text-left text-lg capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
