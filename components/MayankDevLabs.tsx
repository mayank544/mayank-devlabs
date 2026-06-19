"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Database,
  Globe,
  Layers3,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  certificates,
  experience,
  profile,
  projects,
  skills,
  stats,
  terminalLines,
} from "../data/profile";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
  },
};
export default function MayankDevLabs() {
  const [intro, setIntro] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const projectFilters = ["All", "MERN", "AI", "Cyber", "Client"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntro(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="site-shell">
      <AnimatePresence mode="wait">
        {intro && <NeonCurtainIntro />}
      </AnimatePresence>

      <div className="noise" />
      <div className="scanlines" />
      <div className="hud-corner hud-top-left" />
      <div className="hud-corner hud-top-right" />
      <div className="hud-corner hud-bottom-left" />
      <div className="hud-corner hud-bottom-right" />
      <div className="grid-bg" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <nav className="nav">
        <a href="#home" className="brand">
          <span className="brand-mark">M</span>
          <span>{profile.brand}</span>
        </a>

        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero section">
        <motion.div
          className="hero-left"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">
            <Sparkles size={16} />
            Initializing Full Stack Mission Control
          </div>

          <h1>
  Full Stack Developer
  <span>building products that recruiters remember.</span>
</h1>

          <p className="hero-text">
            I build MERN apps, AI tools, dashboards, and secure web experiences with a product-first mindset — from idea to deployment.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn primary">
              View Projects <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="btn secondary">
              Contact Me <Mail size={18} />
            </a>
          </div>

          <div className="quick-stack">
            <span>React.js</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
            <span>JWT</span>
            <span>AI APIs</span>
          </div>
        </motion.div>

                <motion.div
          className="hero-right command-center"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="dashboard-shell">
            <div className="dashboard-top">
              <div>
                <span className="mini-label">LIVE SYSTEM</span>
                <h3>Mayank DevLabs Control</h3>
              </div>

              <div className="live-badge">
                <span />
                ONLINE
              </div>
            </div>
<div className="system-strip">
  <div className="system-pill">
    <Rocket size={15} />
    <div>
      <span>MERN Core</span>
      <strong>Product Builds</strong>
    </div>
  </div>

  <div className="system-pill">
    <Sparkles size={15} />
    <div>
      <span>AI Ready</span>
      <strong>LLM Tools</strong>
    </div>
  </div>

  <div className="system-pill">
    <ShieldCheck size={15} />
    <div>
      <span>Secure Layer</span>
      <strong>JWT / Cyber</strong>
    </div>
  </div>
</div>
            <div className="dashboard-main">
              <div className="radar-card">
                <div className="radar">
                  <span className="radar-sweep" />
                  <span className="radar-dot dot-a" />
                  <span className="radar-dot dot-b" />
                  <span className="radar-dot dot-c" />
                  <div className="radar-core">
                    <Rocket size={26} />
                  </div>
                </div>

                <div className="radar-text">
                  <span>PROJECT SCAN</span>
                  <strong>24+ Deployments Detected</strong>
                </div>
              </div>

              <div className="metrics-grid">
                <div className="metric-box">
                  <Code2 size={18} />
                  <span>Frontend</span>
                  <strong>React / Next</strong>
                  <div className="meter">
                    <span style={{ width: "92%" }} />
                  </div>
                </div>

                <div className="metric-box">
                  <Database size={18} />
                  <span>Backend</span>
                  <strong>Node / APIs</strong>
                  <div className="meter">
                    <span style={{ width: "86%" }} />
                  </div>
                </div>

                <div className="metric-box">
                  <ShieldCheck size={18} />
                  <span>Security</span>
                  <strong>JWT / Cyber</strong>
                  <div className="meter">
                    <span style={{ width: "80%" }} />
                  </div>
                </div>

                <div className="metric-box">
                  <Sparkles size={18} />
                  <span>AI Layer</span>
                  <strong>LLM APIs</strong>
                  <div className="meter">
                    <span style={{ width: "78%" }} />
                  </div>
                </div>
              </div>
            </div>

        <div className="mobile-live-feed">
  <div className="mobile-live-feed-head">
    <span>deployment.feed</span>
    <strong>READY</strong>
  </div>

  <div className="mobile-live-feed-lines">
    <div>
      <b>$ whoami</b>
      <p>Mayank Kumar — Full Stack Developer</p>
    </div>

    <div>
      <b>$ stack</b>
      <p>React.js | Node.js | Express.js | MongoDB</p>
    </div>

    <div>
      <b>$ mission</b>
      <p>Building fast, secure, recruiter-stopping products.</p>
    </div>

    <div>
      <b>$ status</b>
      <p>Available for Full Stack Developer roles</p>
    </div>
  </div>
</div>
          </div>
        </motion.div>
      </section>

      <section className="stats-row">
        {stats.map((item, index) => (
          <motion.div
            className="stat-card"
            key={item.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: index * 0.02 }}
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </motion.div>
        ))}
      </section>

      <section id="projects" className="section">
        <SectionHeader
          icon={<Layers3 size={18} />}
          label="Project Galaxy"
          title="Featured systems, products, and experiments"
          text="A portfolio should not only list projects. It should prove execution, product thinking, and deployment ability."
        />

        <div className="project-toolbar">
  {projectFilters.map((filter) => (
    <button
      key={filter}
      className={activeFilter === filter ? "filter-btn active" : "filter-btn"}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>

<motion.div className="project-grid" layout>
  {filteredProjects.map((project, index) => (
    <motion.article
      layout
      className={project.featured ? "project-card featured" : "project-card"}
      key={project.name}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay: index * 0.025 }}
    >
      <div className="project-visual">
        <div className="project-window">
          <div className="window-bar">
            <span />
            <span />
            <span />
          </div>

          <div className="preview-screen">
            <div className="preview-topline" />
            <div className="preview-layout">
              <div className="preview-sidebar" />
              <div className="preview-content">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="preview-glow" />
          </div>
        </div>

        <div className="project-category">{project.category}</div>
      </div>

      <div className="project-top">
        <div>
          <span>{project.type}</span>
          <h3>{project.name}</h3>
        </div>
        <Globe size={22} />
      </div>

      <p>{project.description}</p>

      <div className="chips">
        {project.stack.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>

      <div className="project-actions">
        <a href={project.live} target="_blank" rel="noreferrer">
          Live <ArrowUpRight size={16} />
        </a>
        <a href={project.github} target="_blank" rel="noreferrer">
          GitHub <Code2 size={16} />
        </a>
      </div>
    </motion.article>
  ))}
</motion.div>
      </section>

      <section className="section bento-section">
        <SectionHeader
          icon={<Code2 size={18} />}
          label="Case Studies"
          title="Not just websites — complete product thinking"
          text="These cards explain the thinking behind the build, not only the tech stack."
        />

        <div className="bento-grid">
          <div className="bento-card large">
            <h3>ShopSarkar Architecture</h3>
            <p>
              Built as a full e-commerce flow with catalog, cart, responsive UI,
              and scalable MERN structure.
            </p>
            <div className="flow">
              <span>User</span>
              <span>React UI</span>
              <span>API</span>
              <span>Auth</span>
              <span>MongoDB</span>
            </div>
          </div>

          <div className="bento-card">
            <h3>AI Tooling</h3>
            <p>
              GenerativeAI7 shows real-time AI interaction, API thinking, and
              modern UI handling.
            </p>
          </div>

          <div className="bento-card">
            <h3>Security Mindset</h3>
            <p>
              Cyber Mayank adds a cybersecurity-aware layer to development,
              authentication, and safer product thinking.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <SectionHeader
          icon={<Database size={18} />}
          label="Skill Architecture"
          title="A full-stack map from interface to deployment"
          text="Recruiters should instantly understand where each skill fits inside a real application."
        />

        <div className="architecture-lab">
  <motion.div
    className="pipeline-card"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="pipeline-header">
      <div>
        <span className="mini-label">SYSTEM FLOW</span>
        <h3>How I think while building full-stack products</h3>
      </div>
      <div className="live-badge">
        <span />
        ARCHITECTURE READY
      </div>
    </div>

    <div className="pipeline">
      <div className="pipeline-line" />

      <div className="pipeline-node">
        <div className="node-icon">
          <Globe size={22} />
        </div>
        <span>User</span>
        <strong>Experience</strong>
      </div>

      <div className="pipeline-node">
        <div className="node-icon">
          <Code2 size={22} />
        </div>
        <span>Frontend</span>
        <strong>React UI</strong>
      </div>

      <div className="pipeline-node">
        <div className="node-icon">
          <Rocket size={22} />
        </div>
        <span>Backend</span>
        <strong>REST API</strong>
      </div>

      <div className="pipeline-node">
        <div className="node-icon">
          <ShieldCheck size={22} />
        </div>
        <span>Security</span>
        <strong>JWT Auth</strong>
      </div>

      <div className="pipeline-node">
        <div className="node-icon">
          <Database size={22} />
        </div>
        <span>Database</span>
        <strong>MongoDB</strong>
      </div>

      <div className="pipeline-node">
        <div className="node-icon">
          <Sparkles size={22} />
        </div>
        <span>Deploy</span>
        <strong>Netlify</strong>
      </div>
    </div>
  </motion.div>

  <div className="stack-matrix">
    {skills.map((group, index) => (
      <motion.div
        className="stack-card"
        key={group.group}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: index * 0.03 }}
      >
        <div className="stack-card-top">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{group.group}</h3>
        </div>

        <div className="chips">
          {group.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</div>
      </section>

      <section id="experience" className="section">
        <SectionHeader
          icon={<BadgeCheck size={18} />}
          label="Execution Timeline"
          title="Developer + founder + client delivery experience"
          text="This section shows that I can code, communicate, manage delivery, and think like a product builder."
        />

        <div className="career-os">
  <motion.div
    className="career-command"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <span className="mini-label">CAREER OS</span>
    <h3>Developer execution + founder mindset</h3>
    <p>
      My journey combines full-stack development, client delivery, startup
      ownership, operations, and product thinking.
    </p>

    <div className="career-terminal">
      <p>
        <span>$</span> scan career
      </p>
      <strong>4 active experience layers found</strong>

      <p>
        <span>$</span> strongest signal
      </p>
      <strong>Full Stack Developer with real project ownership</strong>

      <p>
        <span>$</span> recruiter note
      </p>
      <strong>Can build, explain, deploy, and manage delivery</strong>
    </div>
  </motion.div>

  <div className="career-timeline">
    {experience.map((item, index) => (
      <motion.article
        className="career-card"
        key={`${item.role}-${item.company}`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ delay: index * 0.02 }}
      >
        <div className="career-index">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="career-content">
          <div className="career-top">
            <div>
              <span>{item.period}</span>
              <h3>{item.role}</h3>
              <h4>{item.company}</h4>
            </div>

            <div className="career-signal">{item.signal}</div>
          </div>

          <p className="career-highlight">{item.highlight}</p>
          <p className="career-desc">{item.description}</p>

          <div className="career-metrics">
            {item.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        </div>
      </motion.article>
    ))}
  </div>
</div>
      </section>

      <section className="section proof-section">
  <SectionHeader
    icon={<ShieldCheck size={18} />}
    label="Proof Vault"
    title="Verified learning signals + execution proof"
    text="Certifications are not the main story. They support the real proof: projects, deployment, client work, and full-stack execution."
  />

  <div className="proof-vault">
    <motion.div
      className="proof-command"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="proof-command-top">
        <span className="mini-label">RECRUITER SCAN</span>
        <div className="live-badge">
          <span />
          VERIFIED
        </div>
      </div>

      <h3>Profile strength signals</h3>

      <div className="proof-scan">
        <div className="scan-row">
          <span>Full Stack Projects</span>
          <strong>24+ deployed</strong>
        </div>

        <div className="scan-bar">
          <span style={{ width: "94%" }} />
        </div>

        <div className="scan-row">
          <span>MERN Stack Match</span>
          <strong>High</strong>
        </div>

        <div className="scan-bar">
          <span style={{ width: "91%" }} />
        </div>

        <div className="scan-row">
          <span>Founder / Client Signal</span>
          <strong>Strong</strong>
        </div>

        <div className="scan-bar">
          <span style={{ width: "88%" }} />
        </div>

        <div className="scan-row">
          <span>AI + Cyber Awareness</span>
          <strong>Active</strong>
        </div>

        <div className="scan-bar">
          <span style={{ width: "82%" }} />
        </div>
      </div>

      <div className="proof-terminal">
        <p>
          <span>$</span> validate profile
        </p>
        <strong>Projects, skills, founder experience, and certifications aligned.</strong>

        <p>
          <span>$</span> hiring signal
        </p>
        <strong>Can build real products and explain the system behind them.</strong>
      </div>
    </motion.div>

    <div className="proof-grid">
      {certificates.map((cert, index) => (
        <motion.div
          className="proof-card"
          key={cert}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: index * 0.02 }}
        >
          <div className="proof-icon">
            <BadgeCheck size={20} />
          </div>

          <div>
            <span>Credential Signal</span>
            <h3>{cert}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
<section id="contact" className="section contact-section">
  <motion.div
    className="hire-panel"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="hire-panel-left">
      <p className="eyebrow">
        <Sparkles size={16} />
        Hire Me Control Panel
      </p>

      <h2>Let&apos;s build something powerful.</h2>

      <p>
        I build full-stack web apps, AI-powered tools, modern dashboards,
        responsive business websites, and secure digital experiences with a
        product-first mindset.
      </p>

      <div className="hire-actions">
        <a href={`mailto:${profile.email}`} className="btn primary">
          Email Mayank <Mail size={18} />
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="btn secondary"
        >
          GitHub <Code2 size={18} />
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="btn secondary"
        >
          LinkedIn <ArrowUpRight size={18} />
        </a>

        <a href={profile.resume} className="btn secondary">
          Resume <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="availability-strip">
        <div className="live-badge">
          <span />
          AVAILABLE
        </div>
        <p>
          Open for Full Stack Developer roles, internships, freelance work, and
          client projects.
        </p>
      </div>
    </div>

    <div className="hire-panel-right">
      <div className="hire-terminal">
        <div className="console-header">
          <span>hire.scan</span>
          <strong>READY</strong>
        </div>

        <div className="console-lines">
          <p>
            <span>$ role</span>
            Full Stack Developer — MERN / AI / Cyber-aware
          </p>
          <p>
            <span>$ strongest_signal</span>
            Can build, deploy, explain, and improve real products
          </p>
          <p>
            <span>$ response</span>
            Email, GitHub, LinkedIn, and resume available
          </p>
        </div>
      </div>

      <div className="build-grid">
        <div className="build-card">
          <Rocket size={20} />
          <span>Build</span>
          <strong>MERN web apps</strong>
        </div>

        <div className="build-card">
          <Sparkles size={20} />
          <span>Create</span>
          <strong>AI tools</strong>
        </div>

        <div className="build-card">
          <ShieldCheck size={20} />
          <span>Secure</span>
          <strong>Auth & APIs</strong>
        </div>

        <div className="build-card">
          <Globe size={20} />
          <span>Launch</span>
          <strong>Business sites</strong>
        </div>
      </div>
    </div>
  </motion.div>

  <footer className="footer">
    <span>Mayank DevLabs</span>
    <p>Designed and built by Mayank Kumar.</p>
  </footer>
</section>
    </main>
  );
}
function NeonCurtainIntro() {
  return (
    <motion.div
  className="neon-curtain neon-curtain-auto-hide"
  initial={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.18, ease: "easeOut" }}
>
      <motion.div
        className="curtain-panel curtain-left"
        initial={{ x: 0 }}
        animate={{ x: "-102%" }}
        transition={{
          duration: 0.58,
          delay: 1.18,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className="curtain-panel curtain-right"
        initial={{ x: 0 }}
        animate={{ x: "102%" }}
        transition={{
          duration: 0.58,
          delay: 0.62,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className="curtain-identity"
        initial={{ opacity: 0, y: 10, scale: 0.985 }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [10, 0, 0, -8],
          scale: [0.985, 1, 1, 0.99],
        }}
        transition={{
          duration: 1.15,
          times: [0, 0.18, 0.86, 1],
          ease: "easeOut",
        }}
      >
        <span>MAYANK DEVLABS</span>
        <h1>Mayank Kumar</h1>
        <p>Full Stack Developer</p>
      </motion.div>

      <motion.div
        className="curtain-scan"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{
          duration: 0.5,
          delay: 1.1,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}
function SectionHeader({
  icon,
  label,
  title,
  text,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      className="section-header"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <p className="eyebrow">
        {icon}
        {label}
      </p>
      <h2>{title}</h2>
      <p>{text}</p>
    </motion.div>
  );
}