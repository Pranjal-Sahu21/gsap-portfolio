"use client";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Pranjal-Sahu21" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/pranjal-sahu-/" },
  { name: "Instagram", href: "https://www.instagram.com/prsahu_21/" },
];

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // === GSAP Scroll Animations ===
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".reveal-title", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-title",
          start: "top 85%",
        },
      });

      gsap.from(".reveal-form", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-form",
          start: "top 85%",
        },
      });

      gsap.from(".reveal-info", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
          trigger: ".reveal-info",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // === Form Logic ===
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
    const payload = new FormData(formRef.current!);

    fetch(formRef.current!.action, {
      method: "POST",
      body: payload,
      headers: { Accept: "application/json" },
    })
      .then(async (res) => {
        setIsSubmitting(false);
        if (res.ok) {
          setIsSuccess(true);
          formRef.current?.reset();
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          alert("Failed to send message. Please try again.");
        }
      })
      .catch(() => {
        setIsSubmitting(false);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="py-32 bg-secondary/30 flex items-center justify-center px-6"
      >
        <div className="section-container w-full">
          <div className="max-w-4xl mx-auto">
            {/* Title */}
            <div className="reveal-title text-center mb-16">
              <h2 className="section-title mb-6">Let's Work Together</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Fill out the form below or reach out directly.
              </p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 items-start">
              {/* Contact Form */}
              <form
                ref={formRef}
                autoComplete="off"
                onSubmit={handleSubmit}
                action="https://formspree.io/f/movnrvqz"
                method="POST"
                className="reveal-form space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-border mx-auto h-full"></div>
              <div className="block lg:hidden h-px bg-border my-8 w-full"></div>

              {/* Contact Info */}
              <div className="reveal-info space-y-8 lg:pl-8">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                    Email
                  </h3>
                  <a
                    href="mailto:sahupranjal1619@gmail.com"
                    className="text-xl font-bold hover:text-gradient"
                  >
                    sahupranjal1619@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                    Phone
                  </h3>
                  <a
                    href="tel:+918895596189"
                    className="text-xl font-medium hover:text-gradient"
                  >
                    +91 8895596189
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                    Location
                  </h3>
                  <p className="text-xl font-medium">Rourkela, Odisha</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4 text-muted-foreground">
                    Connect
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link text-sm"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsSuccess(false)}
          >
            <motion.div
              className="bg-background border border-border p-8 shadow-xl text-center max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Message Sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Thanks for reaching out — I'll get back to you soon.
              </p>
              <button
                className="px-6 py-2 border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
                onClick={() => setIsSuccess(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactSection;
