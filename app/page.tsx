"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import TiltCard from "@/components/TiltCard";
import CyberPet from "@/components/CyberPet";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Global Modal State
  const [modalData, setModalData] = useState<any>(null);

  // Contact Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailStatus, setEmailStatus] = useState("EMAIL ME DIRECTLY");

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("mayank75033@gmail.com");
    }
    setEmailStatus("EMAIL COPIED! 📋");
    setTimeout(() => setEmailStatus("EMAIL ME DIRECTLY"), 2500);
    window.location.href = "mailto:mayank75033@gmail.com";
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setFormStatus("sending");

    const formData = new URLSearchParams({
      "form-name": "contact",
      name: formState.name,
      email: formState.email,
      message: formState.message,
      subject: "New portfolio message for Mayank",
      "bot-field": "",
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      });
      if (!response.ok) throw new Error("Netlify form submission failed");
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modalData]);

  if (!mounted) return null;

  const stackData = [
    { id: "01", title: "Frontend", items: "React.js, Next.js, HTML5, CSS3, Tailwind", level: 95, desc: "Building fluid, animated, and responsive user interfaces that perform flawlessly. Deep expertise in React ecosystem.", accent: "#00F0FF" },
    { id: "02", title: "Backend", items: "Node.js, Express.js, REST APIs, JWT Auth", level: 90, desc: "Architecting scalable backend services, securing data with JWT, and building robust RESTful APIs.", accent: "#0070FF" },
    { id: "03", title: "Database", items: "MongoDB, Mongoose, SQL Basics", level: 85, desc: "Designing NoSQL schemas, optimizing queries, and managing complex data structures.", accent: "#39FF14" },
    { id: "04", title: "AI & Cyber", items: "LLM APIs, Prompt Systems, Kali Linux", level: 80, desc: "Integrating LLMs into products and ensuring security through fundamental penetration testing and OSINT.", accent: "#FF0055" },
    { id: "05", title: "Tools / Ops", items: "Git, GitHub, Vercel, Netlify", level: 88, desc: "Managing CI/CD pipelines, version control, and rapid deployment cycles.", accent: "#888888" }
  ];

  const projectData = [
    { 
      cat: "01 / WEB APP · Clone testing website ", 
      title: " Clone Crash Lab  ", 
      desc: " A Full Stack web lab build to test , rebuild , and anylze clone style projects with authentication dashboard page , API Routes , database models , and a clean devloper-focused workflow", 
      tech: ["React", "Node", "Mongo DB Authentication", "API Routes"], 
      link: "https://shopsarkar.netlify.app",
      image: "/projects/shop-sarkar.jpg",
      color: "linear-gradient(135deg, rgba(0, 240, 255, 0.12) 0%, rgba(0, 80, 255, 0.25) 100%)",
      accent: "#00F0FF",
      year: "2025"
    },
    { 
      cat: "02 / AI · PRODUCT", 
      title: "GENERATIVE AI", 
      desc: "AI-powered web app focused on real-time prompt interaction and smooth user experience.", 
      tech: ["React", "LLM APIs", "JavaScript"], 
      link: "https://generativeai7.netlify.app",
      image: "/projects/generative-ai-7.webp",
      color: "linear-gradient(135deg, rgba(57, 255, 20, 0.12) 0%, rgba(10, 46, 10, 0.35) 100%)",
      accent: "#39FF14",
      year: "2024"
    },
    { 
      cat: "03 / CYBER · SYSTEM", 
      title: "CYBER MAYANK", 
      desc: "Cybersecurity portfolio and interactive educational toolkit.", 
      tech: ["Kali Linux", "Cybersecurity"], 
      link: "https://github.com/mayank544/Cyber-Mayank",
      image: "/projects/cyber-mayank.avif",
      color: "linear-gradient(135deg, rgba(255, 0, 85, 0.12) 0%, rgba(46, 10, 20, 0.35) 100%)",
      accent: "#FF0055",
      year: "2024"
    },
    { 
      cat: "04 / CLIENT · BRAND", 
      title: "SITEWEB STUDIO", 
      desc: "Professional web studio landing page focused on UI/UX and client conversion.", 
      tech: ["HTML", "CSS", "JS"], 
      link: "https://siteweb-studio.netlify.app",
      image: "/projects/siteweb-studio.avif",
      color: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(20, 20, 20, 0.35) 100%)",
      accent: "#888888",
      year: "2023"
    }
  ];

  const modalAccent = modalData?.accent || "#00F0FF";

  return (
    <>
      {/* GLOBAL MODAL */}
      <AnimatePresence>
        {modalData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}
            onClick={() => setModalData(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#080808] border p-8 md:p-14 max-w-3xl w-full relative cursor-none"
              style={{ 
                boxShadow: `0 0 60px ${modalAccent}14`,
                borderColor: `${modalAccent}40`
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: modalAccent }}>
                  {modalData.type === 'project' ? '// PROJECT · DETAILED VIEW' : '// SKILL · ANALYSIS'}
                </span>
                <button
                  onClick={() => setModalData(null)}
                  className="font-mono text-[10px] text-zinc-500 hover:text-white border border-[#222] hover:border-zinc-500 px-3 py-1 transition-all cursor-none hover-target uppercase tracking-widest"
                >
                  CLOSE ✕
                </button>
              </div>

              <h2 className="font-archivo text-4xl md:text-6xl text-white mb-6 break-words leading-none tracking-tighter">
                {modalData.title}
              </h2>

              {/* Dynamic Accent divider */}
              <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: modalAccent }}></div>

              {/* Description - supports newlines */}
              <div className="font-sans text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed whitespace-pre-line">
                {modalData.desc}
              </div>

              {/* Tech tags */}
              {modalData.tech && modalData.tech.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {modalData.tech.map((t: string, idx: number) => (
                    <span key={idx} className="font-mono text-[10px] border border-[#333] px-3 py-1.5 text-zinc-400 uppercase tracking-widest">{t}</span>
                  ))}
                </div>
              )}

              {modalData.type === 'project' && modalData.link && (
                <div className="border-t border-[#1a1a1a] pt-8">
                  <Magnetic>
                    <a
                      href={modalData.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 border transition-all cursor-none hover-target font-mono text-xs uppercase tracking-widest"
                      style={{ 
                        color: modalAccent, 
                        borderColor: modalAccent,
                        boxShadow: `0 0 15px ${modalAccent}20`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = modalAccent;
                        e.currentTarget.style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = modalAccent;
                      }}
                    >
                      ACCESS SYSTEM <span className="text-lg">→</span>
                    </a>
                  </Magnetic>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full min-h-screen pt-24 pb-20 px-4 md:px-12 max-w-[1800px] mx-auto font-sans overflow-x-hidden">

      {/* 1. NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-4 md:px-12 py-4 md:py-6 flex items-center justify-between z-40 bg-[#050505]/90 backdrop-blur-md border-b border-[#222]"
      >
        <div className="flex items-center gap-5 lg:gap-12">
          <Magnetic>
            <a href="#home" className="font-archivo text-2xl tracking-tighter text-white cursor-none hover-target">
              M<span className="text-cyan">/</span>YK
            </a>
          </Magnetic>
          
          <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] text-zinc-500 tracking-widest">
            {['HOME', 'WORK', 'SKILLS', 'EXPERIENCE', 'CONTACT'].map((item, i) => (
              <Magnetic key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover-target hover:text-white transition-colors cursor-none">
                  {`0${i + 1}. ${item}`}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 font-mono text-[10px] md:text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse"></span> ONLINE
          </div>
          <Magnetic>
            <a href="#contact" className="px-3 md:px-6 py-2 border border-cyan text-cyan hover:bg-cyan hover:text-black transition-all hover-target uppercase tracking-widest cursor-none">
              HIRE ME
            </a>
          </Magnetic>
        </div>
      </motion.nav>

      {/* 2. HERO SECTION */}
      <section id="home" className="pt-14 md:pt-20 min-h-[90vh] flex flex-col justify-center relative">
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-[-1] flex items-center justify-center opacity-[0.03] pointer-events-none"
        >
          <div className="font-archivo text-[30vw] whitespace-nowrap text-cyan">SYS_READY</div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 w-full">
          {/* Top Data */}
          <motion.div variants={fadeUp} className="hero-meta flex flex-col md:flex-row justify-between items-start md:items-center font-mono text-[10px] text-zinc-500 mb-16 md:mb-20 uppercase tracking-widest gap-4">
            <div>SOUTH DELHI, DELHI - 110074</div>
            <div>N 12.97° · E 77.59°</div>
            <div>SYS_V2.5.1 // FULL_STACK</div>
            <div className="text-cyan">2026</div>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={fadeUp} className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <div className="w-12 h-[1px] bg-cyan"></div>
            <p className="font-mono text-[10px] md:text-xs text-cyan tracking-[0.2em] uppercase">
              Initializing Full Stack Mission Control
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 text-center md:text-left">
              {/* Massive Name - Responsive Fixes */}
              <motion.h1 variants={fadeUp} className="font-archivo text-[clamp(3.5rem,18vw,10rem)] md:text-[clamp(4rem,10vw,10rem)] leading-[0.8] tracking-tighter text-white mb-8 group cursor-none whitespace-nowrap mx-auto md:mx-0 w-fit max-w-full">
                MAYANK<span className="text-cyan">.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="font-sans text-lg md:text-2xl text-zinc-300 max-w-xl mx-auto md:mx-0 mb-12 text-balance leading-snug">
                I build MERN apps, AI tools, dashboards, and secure web experiences with a product-first mindset.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-8 font-mono text-xs tracking-widest uppercase">
                <Magnetic>
                  <a href="#work" className="px-8 py-4 border border-cyan bg-cyan/5 text-cyan hover:bg-cyan hover:text-black transition-all flex items-center gap-2 hover-target cursor-none w-full sm:w-auto justify-center">
                    VIEW MISSIONS <span>→</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#contact" className="text-white border-b border-zinc-700 pb-1 hover:border-white transition-colors hover-target cursor-none">
                    ACCESS TERMINAL
                  </a>
                </Magnetic>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 relative min-h-44 sm:min-h-48 flex justify-center lg:justify-end overflow-hidden">
              <CyberPet />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. RECENT MISSIONS (PROJECTS) - UPDATED VISUAL GRID */}
      <section id="work" className="py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-pink mb-6 uppercase tracking-widest">
              <div className="w-8 h-[1px] bg-pink"></div>
              02 · SELECTED WORK
            </div>
            <h2 className="font-archivo text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-tighter break-words">
              <span className="text-white block">RECENT</span>
              <span className="text-pink block">MISSIONS.</span>
            </h2>
          </div>
          <p className="font-sans text-zinc-400 max-w-sm text-lg text-balance pb-2">
            A glimpse into the products and experiments I've shipped — from secure platforms to AI tools.
          </p>
        </motion.div>

        {/* 3D Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {projectData.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-auto"
            >
              <TiltCard 
                className="w-full"
                onClick={() => setModalData({ ...proj, type: 'project' })}
              >
                <div 
                  className="relative w-full aspect-[4/3] md:aspect-[16/10] border border-[#222] p-8 md:p-12 flex flex-col justify-between overflow-hidden group"
                  style={{ background: proj.color }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-75 transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${proj.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.38)_72%)]"></div>
                  {/* Grid overlay for texture */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-45"></div>
                  
                  <div className="relative z-10 flex justify-between font-mono text-[10px] text-zinc-400 tracking-widest">
                    <span>{proj.cat}</span>
                    <span className="text-white font-bold">{proj.year}</span>
                  </div>
                  
                  <div className="relative z-10 mt-auto">
                    <h3 className="font-archivo text-[clamp(2rem,5vw,5rem)] text-white leading-none tracking-tighter uppercase drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 origin-left break-words">
                      {proj.title}
                    </h3>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                    <span className="font-mono text-sm text-white border border-white px-6 py-3 uppercase tracking-widest">VIEW DETAILS</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. TOOLSET & STACK */}
      <section id="skills" className="py-32 border-t border-[#222]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-lime mb-6 uppercase tracking-widest">
              <div className="w-8 h-[1px] bg-lime"></div>
              03 · ARCHITECTURE
            </div>
            <h2 className="font-archivo text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-tighter break-words">
              <span className="text-white block">TOOLSET &</span>
              <span className="text-lime block">STACK.</span>
            </h2>
          </div>
          <p className="font-sans text-zinc-400 max-w-sm text-lg text-balance pb-2">
            A condensed view of the tools I reach for daily and the stack I'm fluent in. Click for details.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stackData.map((stack, i) => (
            <TiltCard key={i} onClick={() => setModalData({ ...stack, type: 'skill' })}>
              <div className="glow-border-lime bg-[#0a0a0a] p-8 flex flex-col justify-between h-full min-h-[220px] group">
                <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-8">
                  <span>{stack.title}</span>
                  <span className="text-lime">{stack.id}/05</span>
                </div>
                <h3 className="font-archivo text-3xl md:text-4xl text-white mb-4 group-hover:text-lime transition-colors break-words">{stack.title}</h3>
                <p className="font-mono text-[10px] md:text-xs text-zinc-400 mb-8 h-12 leading-relaxed">{stack.items}</p>
                <div className="mt-auto">
                  <div className="w-full h-[2px] bg-zinc-800 mb-2 relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stack.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-lime"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-zinc-500 tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-lime">CLICK FOR ANALYSIS →</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section id="experience" className="py-32 border-t border-[#222]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-[#FF0055] mb-6 uppercase tracking-widest">
              <div className="w-8 h-[1px] bg-[#FF0055]"></div>
              04 · EXECUTION TIMELINE
            </div>
            <h2 className="font-archivo text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-tighter break-words">
              <span className="text-white block">EXPERI</span>
              <span className="text-[#FF0055] block">ENCE.</span>
            </h2>
          </div>
          <p className="font-sans text-zinc-400 max-w-sm text-lg text-balance pb-2">
            Developer + founder + client delivery experience spanning 4 active layers.
          </p>
        </motion.div>

        <div className="border-l border-[#222] pl-8 md:pl-16 flex flex-col gap-12 md:gap-20">
          {[
            { date: "Jun 2024 — Present", role: "Full Stack Engineer", org: "Freelance / Self-Employed", desc: "Built and deployed full-stack MERN apps, client websites, AI tools, and recruiter-facing web products focused on end-to-end execution.", tags: ["MERN Apps", "Client Delivery", "AI Tools", "Deployment"], signal: "Current Core Role" },
            { date: "Jan 2022 — Present", role: "CEO & Founder", org: "SiteWeb Studio", desc: "Founded a web development studio focused on modern websites, landing pages, branding, and client conversion. Handled all project delivery.", tags: ["Startup", "Web Studio", "UI/UX", "Clients"], signal: "Founder Mode" },
            { date: "Apr 2024 — Jun 2026", role: "Co-Founder", org: "AQUA X", desc: "Worked on branding, supplier coordination, B2B client handling, and full business operations including sales and vendor management.", tags: ["Branding", "B2B", "Operations", "Growth"], signal: "Business Operator" },
            { date: "Jan 2024 — Dec 2025", role: "Operations Manager", org: "Grow With AD", desc: "Managed daily operations, promotional content, social media growth, and client-facing digital work across platforms.", tags: ["Content", "Operations", "Social Media", "Clients"], signal: "Marketing + Ops" }
          ].map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[2.15rem] md:-left-[4.65rem] top-8 w-4 h-4 rounded-full border border-[#333] bg-[#050505] flex items-center justify-center group-hover:border-[#FF0055] transition-all duration-300">
                <div className="w-1.5 h-1.5 bg-[#FF0055] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </div>

              <div
                onClick={() => setModalData({ title: exp.role, desc: `${exp.org} | ${exp.date}\n\n${exp.desc}`, type: 'skill', tech: exp.tags, accent: '#FF0055' })}
                className="border border-[#1a1a1a] bg-[#080808] p-8 md:p-12 hover:border-[#FF0055]/50 transition-all duration-500 cursor-none hover-target group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#FF0055] tracking-widest uppercase block mb-2">{exp.date}</span>
                    <h3 className="font-archivo text-3xl md:text-5xl text-white group-hover:text-[#FF0055] transition-colors break-words">{exp.role}</h3>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest px-4 py-2 bg-[#111] whitespace-nowrap">@ {exp.org}</span>
                    <span className="font-mono text-[10px] text-[#FF0055]/60 uppercase tracking-widest">{exp.signal}</span>
                  </div>
                </div>
                <p className="font-sans text-base md:text-lg text-zinc-400 mb-8">{exp.desc}</p>
                <div className="flex flex-wrap gap-3">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="font-mono text-[10px] border border-[#222] px-3 py-1 text-zinc-500 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-[#FF0055] mt-6 block opacity-0 group-hover:opacity-100 transition-opacity">CLICK FOR DETAILS →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CERTIFICATIONS VAULT */}
      <section id="vault" className="py-32 border-t border-[#222]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400 mb-6 uppercase tracking-widest">
              <div className="w-8 h-[1px] bg-zinc-400"></div>
              05 · PROOF OF WORK
            </div>
            <h2 className="font-archivo text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-tighter break-words">
              <span className="text-white block">PROOF</span>
              <span className="text-zinc-600 block">VAULT.</span>
            </h2>
          </div>
          <p className="font-sans text-zinc-400 max-w-sm text-lg text-balance pb-2">
            Verified credentials + execution signals. 11+ certifications backing the product mindset.
          </p>
        </motion.div>

        {/* Scan Bars */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="border border-[#1a1a1a] bg-[#080808] p-8 md:p-12 mb-12">
          <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest border-b border-[#222] pb-6 mb-8">
            <span>RECRUITER_SCAN // PROFILE_STRENGTH</span>
            <span className="text-[#39FF14]">VERIFIED</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Full Stack Projects", value: "24+ deployed", pct: 94 },
              { label: "MERN Stack Match", value: "High", pct: 91 },
              { label: "Founder / Client Signal", value: "Strong", pct: 88 },
              { label: "AI + Cyber Awareness", value: "Active", pct: 82 }
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
                  <span>{bar.label}</span>
                  <span className="text-white">{bar.value}</span>
                </div>
                <div className="w-full h-[2px] bg-zinc-800 relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.pct}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                    className="absolute top-0 left-0 h-full bg-[#39FF14]"
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cert Grid */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Deloitte Cyber Job Simulation", issuer: "Deloitte" },
            { name: "Deloitte Data Analytics", issuer: "Deloitte" },
            { name: "Deloitte Technology", issuer: "Deloitte" },
            { name: "Google Cloud Trust & Security", issuer: "Google" },
            { name: "Hugging Face: LLMs", issuer: "Hugging Face" },
            { name: "WsCube Cybersecurity Pro", issuer: "WsCube" },
            { name: "TCS Email Etiquette", issuer: "TCS" },
            { name: "Intel HTML Web Designing", issuer: "Intel / CBSE" }
          ].map((cert, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              onClick={() => setModalData({ title: cert.name, desc: `Issued by ${cert.issuer}. This certification validates practical expertise and professional-grade standards in the domain.`, type: 'skill', tech: [cert.issuer, 'Certified'], accent: '#39FF14' })}
              className="border border-[#1a1a1a] bg-[#080808] p-5 md:p-6 hover:bg-[#111] hover:border-zinc-600 transition-all duration-300 hover-target group cursor-none"
            >
              <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center mb-4 group-hover:border-[#39FF14] transition-colors">
                <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-[#39FF14] transition-colors"></div>
              </div>
              <h3 className="font-mono text-[10px] text-white uppercase tracking-wider leading-relaxed mb-2">{cert.name}</h3>
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{cert.issuer}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <section id="contact" className="pt-40 pb-12 relative border-t border-[#222]">
        <div className="border border-[#222] bg-[#050505] p-8 md:p-16 mb-40 relative overflow-hidden">
          <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 font-mono text-xs text-cyan mb-8 uppercase tracking-widest">
                  <div className="w-2 h-2 bg-cyan animate-pulse"></div>
                  TERMINAL // CONTACT
                </div>
                <h2 className="font-archivo text-5xl md:text-7xl text-white mb-6">Initiate Contact.</h2>
                <p className="font-sans text-xl text-zinc-400 mb-12">Available for Full Stack Developer roles, freelance work, and building the future.</p>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
                  <Magnetic>
                    <button 
                      onClick={handleEmailClick}
                      className="px-8 py-4 bg-[#00F0FF] text-black hover:bg-white transition-colors hover-target cursor-none inline-block font-mono font-bold tracking-widest text-xs"
                    >
                      {emailStatus}
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <a href="https://github.com/mayank544" target="_blank" rel="noreferrer" className="px-8 py-4 border border-[#333] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors hover-target cursor-none inline-block">
                      GITHUB
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a href="https://linkedin.com/in/mayank-kumar-jha-7576-" target="_blank" rel="noreferrer" className="px-8 py-4 border border-[#333] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] transition-colors hover-target cursor-none inline-block">
                      LINKEDIN
                    </a>
                  </Magnetic>
                </div>

                <div className="font-mono text-xs text-zinc-500 bg-[#0a0a0a] border border-[#222] p-6 max-w-md rounded-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-[#222] pb-3">
                    <span>status.log</span>
                    <span className="text-cyan">READY</span>
                  </div>
                  <p><span className="text-pink">$</span> role: Full Stack Dev</p>
                  <p><span className="text-pink">$</span> system: MERN / AI</p>
                  <p><span className="text-pink">$</span> status: Awaiting Input...</p>
                  <div className="w-2 h-4 bg-cyan animate-pulse mt-2"></div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 border border-[#222] bg-[#080808] p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-zinc-600">
                SECURE_CONN_TLS_1.3
              </div>
              <h3 className="font-archivo text-2xl text-white mb-8 uppercase tracking-tight">Transmission Console</h3>
              
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleFormSubmit} className="flex flex-col gap-6 font-mono text-xs">
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="subject" value="New portfolio message for Mayank" />
                <p className="hidden">
                  <label htmlFor="bot-field">Do not fill this out</label>
                  <input id="bot-field" name="bot-field" tabIndex={-1} autoComplete="off" />
                </p>
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-zinc-500 uppercase tracking-widest text-[10px]">Name</label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="ENTER YOUR IDENTIFIER"
                    className="w-full bg-[#050505] border border-[#222] focus:border-[#00F0FF] px-4 py-3 text-white placeholder-zinc-700 outline-none transition-colors cursor-none hover-target"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-zinc-500 uppercase tracking-widest text-[10px]">Email Address</label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="ENTER EMAIL FOR COMPATIBILITY"
                    className="w-full bg-[#050505] border border-[#222] focus:border-[#00F0FF] px-4 py-3 text-white placeholder-zinc-700 outline-none transition-colors cursor-none hover-target"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="form-msg" className="text-zinc-500 uppercase tracking-widest text-[10px]">Message Details</label>
                  <textarea
                    id="form-msg"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="TYPE MESSAGE TRANSMISSION..."
                    className="w-full bg-[#050505] border border-[#222] focus:border-[#00F0FF] px-4 py-3 text-white placeholder-zinc-700 outline-none transition-colors cursor-none hover-target resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-transparent border border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black transition-colors font-mono tracking-widest uppercase hover-target cursor-none disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {formStatus === "idle" && "SEND TRANSMISSION →"}
                  {formStatus === "sending" && "TRANSMITTING..."}
                  {formStatus === "success" && "TRANSMISSION RECEIVED ✔"}
                  {formStatus === "error" && "TRANSMISSION ERROR ✕"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-20 select-none overflow-hidden py-8 text-center"
        >
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent"></div>
          <motion.div
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00F0FF]/10"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{ rotate: { duration: 18, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            {[0, 1, 2, 3].map((dot) => (
              <span
                key={dot}
                className="absolute h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_#00F0FF]"
                style={{
                  left: dot % 2 === 0 ? "8%" : "88%",
                  top: dot < 2 ? "18%" : "78%",
                }}
              />
            ))}
          </motion.div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((star) => (
              <span
                key={star}
                className="footer-star absolute rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.85)]"
                style={{
                  left: `${10 + ((star * 11) % 78)}%`,
                  top: `${16 + ((star * 17) % 58)}%`,
                  width: star % 3 === 0 ? 4 : 3,
                  height: star % 3 === 0 ? 4 : 3,
                  animationDelay: `${star * 0.22}s`,
                }}
              />
            ))}
          </div>
          <h2 className="relative z-10 flex flex-wrap items-center justify-center gap-[0.02em] font-archivo text-[clamp(3.6rem,19vw,19rem)] leading-[0.78] tracking-tighter text-white">
            {"MAYANK".split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className="relative inline-block hover-target cursor-none"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.16, ease: "easeInOut" }}
                whileHover={{ y: -18, rotate: index % 2 === 0 ? -3 : 3, color: index === 3 ? "#00F0FF" : "#ffffff" }}
                whileTap={{ scale: 0.92, y: -10 }}
              >
                <span className="absolute inset-0 translate-x-1 translate-y-1 text-[#00F0FF] opacity-25 blur-[1px]">{letter}</span>
                <span className="absolute inset-0 -translate-x-1 text-[#FF0055] opacity-20 blur-[1px]">{letter}</span>
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="inline-block text-cyan"
              animate={{ opacity: [1, 0.25, 1], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              .
            </motion.span>
          </h2>
          <div className="relative z-10 mx-auto mt-4 flex h-5 w-44 items-end justify-center gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((bar) => (
              <motion.span
                key={bar}
                className="w-1 bg-cyan/70 shadow-[0_0_10px_rgba(0,240,255,0.55)]"
                animate={{ height: [4, 18 - Math.abs(3 - bar) * 3, 6] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: bar * 0.08, ease: "easeInOut" }}
              />
            ))}
          </div>
          <div className="relative z-10 mt-5 flex flex-wrap items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500">
            <span className="h-px w-8 bg-[#00F0FF]/60"></span>
            <span>signed by code</span>
            <span className="text-cyan">M/YK</span>
            <span>made to be remembered</span>
            <span className="h-px w-8 bg-[#00F0FF]/60"></span>
          </div>
        </motion.div>
        
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <p>© 2026 MAYANK KUMAR · ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="https://github.com/mayank544" className="hover:text-white transition-colors hover-target cursor-none">GITHUB</a>
            <a href="https://linkedin.com/in/mayank-kumar-jha-7576-" className="hover:text-white transition-colors hover-target cursor-none">LINKEDIN</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan"></div>
            SYSTEM_ONLINE
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
