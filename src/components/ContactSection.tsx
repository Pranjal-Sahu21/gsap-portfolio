import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  message: z.string().trim().min(1, "Message is required"),
});

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Pranjal-Sahu21" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/pranjal-sahu-/" },
  { name: "Instagram", href: "https://www.instagram.com/prsahu_21/" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll(".animate-element");

      elements?.forEach((el: Element, index: number) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    // SAFE REFRESH WITHOUT EVENTS (fixes mobile & resize issues)
    setTimeout(() => {
      if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
        ScrollTrigger.refresh();
      }
    }, 50);

    return () => {
      ctx.revert();
      // NO removeEventListener calls needed anymore
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const err: Record<string, string> = {};
      result.error.errors.forEach((x) => (err[x.path[0]] = x.message));
      setErrors(err);
      return;
    }

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    toast({
      title: "Message sent!",
      description: "I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-secondary/30">
      {" "}
      <div className="section-container">
        {" "}
        <div ref={contentRef} className="max-w-4xl mx-auto">
          {" "}
          <div className="text-center mb-16">
            {" "}
            <h2 className="animate-element section-title mb-6">
              {" "}
              Let's Work Together{" "}
            </h2>{" "}
            <p className="animate-element text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {" "}
              Fill out the form below or reach out directly.{" "}
            </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 items-start">
            {" "}
            {/* Contact Form */}{" "}
            <form onSubmit={handleSubmit} className="animate-element space-y-6">
              {" "}
              <div>
                {" "}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 uppercase tracking-wider"
                >
                  {" "}
                  Name{" "}
                </label>{" "}
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="Your name"
                />{" "}
                {errors.name && (
                  <p className="mt-2 text-sm text-destructive">{errors.name}</p>
                )}{" "}
              </div>{" "}
              <div>
                {" "}
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 uppercase tracking-wider"
                >
                  {" "}
                  Email{" "}
                </label>{" "}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="your@email.com"
                />{" "}
                {errors.email && (
                  <p className="mt-2 text-sm text-destructive">
                    {" "}
                    {errors.email}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <div>
                {" "}
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 uppercase tracking-wider"
                >
                  {" "}
                  Message{" "}
                </label>{" "}
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />{" "}
                {errors.message && (
                  <p className="mt-2 text-sm text-destructive">
                    {" "}
                    {errors.message}{" "}
                  </p>
                )}{" "}
              </div>{" "}
              <button
                type="submit"
                disabled={isSubmitting}
                className="magnetic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {" "}
                {isSubmitting ? "Sending..." : "Send Message"}{" "}
              </button>{" "}
            </form>{" "}
            {/* Vertical divider (desktop) */}{" "}
            <div className="hidden lg:block w-px bg-border mx-auto h-full"></div>{" "}
            {/* Horizontal divider (mobile/tablet) */}{" "}
            <div className="block lg:hidden h-px bg-border my-8 w-full"></div>{" "}
            {/* Contact Info */}{" "}
            <div className="animate-element space-y-8 lg:pl-8">
              {" "}
              <div>
                {" "}
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                  {" "}
                  Email{" "}
                </h3>{" "}
                <a
                  href="mailto:hello@johndoe.dev"
                  className="text-xl font-bold hover:text-gradient transition-all duration-300 font-[var(--font-display)]"
                >
                  {" "}
                  sahupranjal1619@gmail.com{" "}
                </a>{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                  {" "}
                  Location{" "}
                </h3>{" "}
                <p className="text-xl font-medium">Rourkela, Odisha</p>{" "}
                {/* <p className="text-muted-foreground">Available worldwide</p> */}{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                  {" "}
                  Connect{" "}
                </h3>{" "}
                <div className="flex flex-wrap gap-6">
                  {" "}
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-sm"
                    >
                      {" "}
                      {link.name}{" "}
                    </a>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};
export default ContactSection;
