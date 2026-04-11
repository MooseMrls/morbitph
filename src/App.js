import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";

// Project Images
import ducImg from "./images/projects/duc1.png";
import amImg from "./images/projects/am1.png";
import mapsaImg from "./images/projects/map3.png";
import nugitsImg from "./images/projects/nugits.png";
import mhdcImg from "./images/projects/mhdc1.png";
import cleverImg from "./images/projects/clev1.png";
import payrollImg from "./images/projects/swift1.png";
import ceapImg from "./images/projects/ceapncr1.png";
import regImg from "./images/projects/reg7.png";
import weatherImg from "./images/projects/wet.jpeg";

// Logo Images
import logoDuciel from "./images/logo/Duciel.jpg";
import logoAM from "./images/logo/AM.jpg";
import logoMapsa from "./images/logo/mapsa.jpg";
import logoClev from "./images/logo/Clev.3.png";
import logoSwift from "./images/logo/swift.png";
import logoCeap from "./images/logo/CEAPNCR LOGO.png";
import logoMhdc from "./images/logo/mhdc.jpg";
import logoWeather from "./images/logo/weather.jpg";
import meImg from "./images/me.jpg";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 1, title: "Du Ciel Fragrance", tag: "E-Commerce", desc: "Modern e-commerce platform for premium fragrances.", tech: ["React", "Node.js", "MongoDB"], live: "https://duciel.vercel.app/", bg: "#1a0a2e", accent: "#c8a97e", image: ducImg },
  { id: 2, title: "Aquamom Management System", tag: "Operations", desc: "All-in-one platform for water refilling station management.", tech: ["React", "Express", "MongoDB"], bg: "#071a2e", accent: "#4CC9F0", image: amImg },
  { id: 3, title: "MaPSA Management System", tag: "HR & Workforce", desc: "Employee management for time tracking and leave approvals.", tech: ["Node.js", "Express", "HTML/CSS"], bg: "#1a0e2e", accent: "#845EC2", image: mapsaImg },
  { id: 4, title: "NU-GITS", tag: "EdTech", desc: "Digital student support platform for guidance counselors.", tech: ["Python", "MongoDB"], live: "https://www.nu-gits.com/", bg: "#061e18", accent: "#00C9A7", image: nugitsImg },
  { id: 5, title: "MaPSA Holistic Dev Center", tag: "Hospitality", desc: "Custom platform managing reservations and guest information.", tech: ["React", "Express", "MongoDB"], bg: "#1e0e06", accent: "#FF6B35", image: mhdcImg },
  { id: 6, title: "Cleverly Attendance System", tag: "Smart Campus", desc: "Smart RFID and facial recognition attendance system.", tech: ["React", "Express", "MongoDB"], bg: "#1e1806", accent: "#F9C74F", image: cleverImg },
  { id: 7, title: "Payroll & Leave System", tag: "Finance / HR", desc: "Simplified payroll processing and leave management web app.", tech: ["React", "Express", "Node.js", "MongoDB"], bg: "#1e0610", accent: "#FF4D6D", image: payrollImg },
  { id: 8, title: "CEAP NCR", tag: "Informational", desc: "Informative website for the Catholic Educational Association.", tech: ["React", "Node.js", "MongoDB"], bg: "#060e1e", accent: "#4361EE", image: ceapImg },
  { id: 9, title: "MaPSA Online Registration", tag: "Portal", desc: "Streamlined registration portal for school association operations.", tech: ["React", "Express", "MongoDB"], bg: "#061018", accent: "#3A86FF", image: regImg },
  { id: 10, title: "Weather Mobile App", tag: "Mobile", desc: "Real-time weather app with hourly forecasts via OpenMeteo API.", tech: ["React Native", "OpenMeteo API"], bg: "#06161e", accent: "#56CFE1", image: weatherImg },
];

const CLIENTS = [
  { name: "Du Ciel Fragrance", logo: logoDuciel, color: "#c8a97e" },
  { name: "Aquamom", logo: logoAM, color: "#4CC9F0" },
  { name: "MaPSA", logo: logoMapsa, color: "#845EC2" },
  { name: "National University", logo: logoWeather, color: "#00C9A7" },
  { name: "Cleverly", logo: logoClev, color: "#F9C74F" },
  { name: "Swift", logo: logoSwift, color: "#FF4D6D" },
  { name: "CEAP NCR", logo: logoCeap, color: "#4361EE" },
  { name: "MHDC", logo: logoMhdc, color: "#FF6B35" },
];

// eslint-disable-next-line no-unused-vars
const SKILLS = ["React", "JavaScript", "Node.js", "TypeScript", "HTML/CSS", "Flutter", "Python", "Express.js", "MongoDB", "SQL", "React Native", "OpenMeteo API", "Multimedia Arts", "GitHub", "UI/UX Design"];

const SERVICES = [
  { label: "Custom System Development", desc: "We build tailored systems from scratch — no templates, no shortcuts. Built around your unique business processes.", accent: "#7B73E4", icon: "⌘", video: "https://cdn.pixabay.com/video/2023/07/21/172655-847860558_large.mp4" },
  { label: "Admin Dashboards & CRM", desc: "Gain full control over your business with powerful dashboards, customer data analytics, and permission-based access.", accent: "#4CC9F0", icon: "◈", video: "https://cdn.pixabay.com/video/2021/04/05/69999-533348151_large.mp4" },
  { label: "Mobile & Web App Development", desc: "We design and develop fast, scalable apps for both mobile and web — fully custom, user-friendly, and built to grow.", accent: "#00C9A7", icon: "⊡", video: "https://cdn.pixabay.com/video/2023/07/31/174003-850361299_large.mp4" },
  { label: "E-Commerce & Online Stores", desc: "Launch fully functional e-commerce stores with product management, order tracking, and upsell tools.", accent: "#FF6B35", icon: "⊕", video: "https://cdn.pixabay.com/video/2020/06/27/43304-435970695_large.mp4" },
];

const PROCESS_DATA = [
  { step: "01", label: "Data Gathering", desc: "Start with your project", icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg> },
  { step: "02", label: "Planning", desc: "Map out your journey", icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg> },
  { step: "03", label: "Development", desc: "Build your solution", icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg> },
  { step: "04", label: "Testing", desc: "Ensure quality delivery", icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg> },
  { step: "05", label: "Deployment", desc: "Launch to production", icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg> },
];

// ─── LOGO SVG ─────────────────────────────────────────────────────────────────
function LogoMark({ size = 28, strokeColor = "#fff", dotColor = "#4da6ff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke={strokeColor} strokeWidth="6" fill="none" />
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke={strokeColor} strokeWidth="4" fill="none" transform="rotate(-18 50 50)" opacity="0.6" />
      <circle cx="86" cy="37" r="7" fill={dotColor} />
      <text x="50" y="63" textAnchor="middle" fontFamily="Georgia, serif" fontSize="36" fontWeight="bold" fill={strokeColor}>M</text>
    </svg>
  );
}



// ─── VIDEO MOCKUP ─────────────────────────────────────────────────────────────
function VideoMockup({ src, accent = "#7B73E4" }) {
  return (
    <div className="mockup-frame" style={{ borderColor: accent + "44" }}>
      <div className="mockup-topbar" style={{ borderColor: accent + "22", background: "rgba(255,255,255,0.02)" }}>
        <span className="mockup-dot rd" /><span className="mockup-dot yw" /><span className="mockup-dot gn" />
        <div className="mockup-url-bar" style={{ background: accent + "22" }} />
      </div>
      <div className="mockup-layout" style={{ padding: 0, position: 'relative', background: "#000" }}>
        <video
          className="mockup-video"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}11, transparent)`, pointerEvents: 'none' }} />
      </div>
    </div>
  );
}



// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "vision",   label: "Vision"   },
  { id: "work",     label: "Work"     },
  { id: "services", label: "Services" },
  { id: "process",  label: "Process"  },
  { id: "clients",  label: "Clients"  },
  { id: "team",     label: "Team"     },
  { id: "about",    label: "About"    },
];

function Nav({ onGetStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const pick = () => {
      const threshold = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", pick, { passive: true });
    pick();
    return () => window.removeEventListener("scroll", pick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!e.target.closest(".nav-menu-pill") && !e.target.closest(".hamburger")) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <LogoMark size={32} strokeColor="#fff" dotColor="#4da6ff" />
        MORBIT
      </div>

      <div className={`nav-menu-pill ${open ? "open" : ""}`}>
        {NAV_LINKS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-link ${active === id ? "nav-link--active" : ""}`}
            onClick={() => go(id)}
          >
            {label}
          </button>
        ))}
        <button className="nav-cta-mobile" onClick={onGetStarted}>Get Started →</button>
      </div>

      <div className="nav-actions">
        <button className="nav-cta-pill" onClick={onGetStarted}>Get Started</button>
        <button className={`hamburger ${open ? "active" : ""}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onGetStarted }) {
  const titleRef = useRef();
  const subRef = useRef();
  const btnsRef = useRef();
  const proofRef = useRef();
  const eyebrowRef = useRef();

  useEffect(() => {
    gsap.timeline({ delay: 0.15 })
      .fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }, "-=0.3")
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.65")
      .fromTo(btnsRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.55")
      .fromTo(proofRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.35");
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="container centered">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title centered">
            Custom Software<br />
            That Powers<br />
            <span className="hero-gradient">Real Business Growth</span>
          </h1>
          <p ref={subRef} className="hero-sub centered">
            We build custom software, management systems, and high-performance apps
            tailored for businesses.
          </p>
          <div ref={btnsRef} className="hero-actions centered">
            <button className="btn-primary btn-lg" onClick={onGetStarted}>
              Book Your Free Demo
            </button>
            <button className="btn-ghost btn-lg" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
              View Our Work
            </button>
          </div>
          <div ref={proofRef} className="hero-proof centered">
            <div className="avatar-stack">
              {[logoDuciel, logoAM, logoMapsa, logoClev, logoCeap].map((img, i) => (
                <div key={i} className="avatar-chip" style={{ zIndex: 5 - i }}>
                  <img src={img} alt="Client" className="avatar-img" />
                </div>
              ))}
            </div>
            <div className="proof-text">
              <div className="stars">★★★★★ <span>| Ratings</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  // return (
  //   <div className="marquee-wrap">
  //     <div className="marquee-track">
  //       {items.map((t, i) => (
  //         <span key={i} className="m-item">
  //           <span className="m-dot" /> {t}
  //         </span>
  //       ))}
  //     </div>
  //   </div>
  // );
}

// ─── WORK ─────────────────────────────────────────────────────────────────────
function Work() {
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => PROJECTS, []);

  const carouselRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Section header animations
    gsap.fromTo(".work-head .s-label", { opacity: 0, x: -20 }, {
      opacity: 1, x: 0, duration: 0.6,
      scrollTrigger: { trigger: ".work-head", start: "top 85%" }
    });
    gsap.fromTo(".work-head .s-title", { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, delay: 0.1,
      scrollTrigger: { trigger: ".work-head", start: "top 85%" }
    });
    gsap.fromTo(".work-head .s-sub", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, delay: 0.2,
      scrollTrigger: { trigger: ".work-head", start: "top 85%" }
    });
  }, []);

  // Sync index with filtered list bounds and handle animations
  useEffect(() => {
    if (!trackRef.current) return;

    // Ensure index is within bounds (safety for filter changes)
    const safeIndex = Math.min(index, filtered.length - 1);
    if (safeIndex < 0) return;

    // Animate the track to the current index
    gsap.to(trackRef.current, {
      xPercent: -safeIndex * 100,
      duration: 0.8,
      ease: "power3.inOut",
      overwrite: true
    });

    // Animate content inside the active slide
    const activeSlide = trackRef.current.children[safeIndex];
    if (activeSlide) {
      const visual = activeSlide.querySelector(".project-carousel-visual");
      const info = activeSlide.querySelector(".project-carousel-info");

      if (visual) {
        gsap.fromTo(visual, { opacity: 0, x: -40, scale: 0.95 }, {
          opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out", overwrite: true
        });
      }

      if (info && info.children.length > 0) {
        gsap.fromTo(Array.from(info.children), { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power2.out", overwrite: true
        });
      }
    }
  }, [index, filtered]);

  const next = () => setIndex((prev) => (prev + 1) % filtered.length);
  const prev = () => setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);

  return (
    <section className="section work-section" id="work">
      <div className="container">
        {/* Heading */}
        <div className="work-head section-head center-head">
          <span className="s-label">Our Projects</span>
          <h2 className="s-title">A Glimpse Into<br /><em>What We've Shipped</em></h2>
          <p className="s-sub">Behind-the-scenes look into the systems we've built — and the results they delivered.</p>
        </div>

        {/* Filter Bar */}
        {/* <div className="filter-bar">
          {tags.map((t) => (
            <button key={t} className={`filter-btn ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div> */}

        {/* Carousel */}
        <div className="projects-carousel-container" ref={carouselRef}>
          <div className="carousel-track" ref={trackRef}>
            {filtered.map((p, idx) => (
              <div key={p.id} className={`project-carousel-slide ${idx === index ? 'active' : ''}`} style={{ "--project-accent": p.accent }}>
                <div className="project-carousel-card">
                  <div className="project-carousel-visual" style={{ background: p.bg }}>
                    {p.image && (
                      <img src={p.image} alt={p.title} className="project-main-image" style={{ objectFit: p.tag === "Mobile" ? "contain" : "cover" }} />
                    )}
                    <div className="card-bg-glow" style={{ "--project-accent": p.accent }} />
                  </div>
                  <div className="project-carousel-info">
                    <span className="pf-tag">{p.tag}</span>
                    <h3 className="pf-title">{p.title}</h3>
                    <p className="pf-desc">{p.desc}</p>
                    {/* <div className="pf-tech">
                      {p.tech.map((t) => <span key={t} className="pf-chip">{t}</span>)}
                    </div> */}
                    {/* {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="pf-link">
                        View Live Site <span className="pf-link-arrow">↗</span>
                      </a>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="carousel-nav">
            <button className="carousel-arrow prev" onClick={prev} aria-label="Previous Project">
              ←
            </button>
            <div className="carousel-dots">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <button className="carousel-arrow next" onClick={next} aria-label="Next Project">
              →
            </button>
          </div>
        </div>

        {/* Horizontal scroll showcase strip (kept as a design element) */}
        {/* <div className="projects-showcase">
          <p className="showcase-label">All Projects Overview</p>
          <div className="showcase-track-wrap">
            <div className="showcase-track">
              {[...PROJECTS, ...PROJECTS].map((p, i) => (
                <div key={i} className="showcase-pill">
                  <div className="showcase-pill-dot" style={{ background: p.accent }} />
                  <span className="showcase-pill-name">{p.title}</span>
                  <span className="showcase-pill-tag">{p.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  useEffect(() => {
    gsap.fromTo(".svc-card", { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
      scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-head center-head">
          <span className="s-label">Our Services</span>
          <h2 className="s-title">The Full Stack of<br /><em>What We Build</em></h2>
          <p className="s-sub">From custom systems to full-scale automation. Designed to solve real business problems.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s, idx) => (
            <div key={s.label} className="svc-card">
              <span className="svc-number">0{idx + 1}</span>
              <div className="svc-mockup-wrap">
                <VideoMockup src={s.video} accent={s.accent} />
              </div>
              <div className="svc-body">
                <div className="svc-icon" style={{ background: s.accent + "15", color: s.accent, border: `1px solid ${s.accent}30` }}>
                  {s.icon}
                </div>
                <h3 className="svc-title">{s.label}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-footer">
                  <div className="svc-accent-line" style={{ color: s.accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
function Process({ onGetStarted }) {
  useEffect(() => {
    gsap.fromTo(".process-step", { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.55, stagger: 0.12,
      scrollTrigger: { trigger: ".process-track", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section process-section" id="process">
      <div className="container">
        <div className="section-head center-head">
          <span className="s-label">How We Work</span>
          <h2 className="s-title">Our Onboarding<br /><em>Process</em></h2>
          <p className="s-sub">Our approach is simple: listen deeply, design smart, build fast.</p>
        </div>
        <div className="process-track">
          {PROCESS_DATA.map((p) => (
            <div key={p.step} className="process-step">
              <div className="process-icon">{p.icon}</div>
              <div className="process-text">
                <div className="process-label">{parseInt(p.step, 10)}. {p.label}</div>
                <div className="process-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <button className="btn-primary" onClick={onGetStarted}>Get Started Today</button>
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTS ─────────────────────────────────────────────────────────────────
function Clients() {
  useEffect(() => {
    gsap.fromTo(".clients-marquee-wrap", { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: ".clients-marquee-wrap", start: "top 85%" },
    });
    document.querySelectorAll(".stat-num").forEach((el) => {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || "";
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => gsap.to({ v: 0 }, {
          v: target, duration: 1.8, ease: "power2.out",
          onUpdate() { el.textContent = Math.round(this.targets()[0].v) + suffix; },
        }),
      });
    });
  }, []);

  return (
    <section className="section clients-section" id="clients">
      <div className="container">
        <div className="section-head center-head">
          <span className="s-label">Partner Network</span>
          <h2 className="s-title">Trusted By<br /><em>Builders & Brands</em></h2>
        </div>
        {/* <div className="stats-row">
          {[["8","+","Clients"],["10","+","Projects"],["3","+","Years"],["100","%","Satisfaction"]].map(([v,s,l]) => (
            <div key={l} className="stat-block">
              <span className="stat-num" data-target={v} data-suffix={s}>0{s}</span>
              <span className="stat-lbl">{l}</span>
            </div>
          ))}
        </div> */}
        <div className="clients-marquee-wrap">
          <div className="clients-marquee-track">
            {/* Group 1 */}
            <div className="clients-marquee-group">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <div key={`set1-${c.name}-${i}`} className="client-logo-box">
                  <img src={c.logo} alt={c.name} className="client-logo-img" />
                </div>
              ))}
            </div>
            {/* Group 2 (Duplicate for seamless loop) */}
            <div className="clients-marquee-group" aria-hidden="true">
              {[...CLIENTS, ...CLIENTS].map((c, i) => (
                <div key={`set2-${c.name}-${i}`} className="client-logo-box">
                  <img src={c.logo} alt={c.name} className="client-logo-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % TEAM.length);
  const prev = () => setIndex((prev) => (prev - 1 + TEAM.length) % TEAM.length);

  const getSlideClass = (i) => {
    if (i === index) return "active";
    if (i === index - 1 || (index === 0 && i === TEAM.length - 1)) return "prev";
    if (i === index + 1 || (index === TEAM.length - 1 && i === 0)) return "next";
    return "hidden";
  };

  return (
    <section className="section team-section" id="team">
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="section-head center-head" style={{ marginBottom: 40 }}>
          <span className="s-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> */}
            THE PEOPLE
          </span>
          <h2 className="s-title">The Morbit <em>Team</em></h2>
        </div>

        <div className="team-carousel-wrapper">
          <button className="tc-arrow tc-prev" onClick={prev}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <div className="tc-viewport">
            <div className="tc-track">
              {TEAM.map((m, i) => (
                <div key={m.name} className={`tc-slide ${getSlideClass(i)}`}>
                  <img src={m.image} alt={m.name} className="tc-image" />
                </div>
              ))}
            </div>
          </div>

          <button className="tc-arrow tc-next" onClick={next}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className="tc-info-section">
          <h3 className="tc-name">{TEAM[index].name}</h3>
          <p className="tc-desc">{TEAM[index].desc}</p>
          
          <div className="tc-dots">
            {TEAM.map((_, i) => (
              <button 
                key={i} 
                className={`tc-dot ${i === index ? "active" : ""}`} 
                onClick={() => setIndex(i)} 
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

const TEAM = [
  { name: "Sean Morales", role: "Founder", initial: "SM", color: "#4da6ff", image: meImg, desc: "Founder" },
  // { name: "Joshua", role: "Operations Lead", initial: "JM", color: "#00d4b8", image: meImg, desc: "Joshua brings order to the chaos. Scaling operations seamlessly across multiple departments." },
  // { name: "Michael", role: "Creative Director", initial: "MM", color: "#7B73E4", image: meImg, desc: "Crafting beautiful, high-converting interfaces that feel as good as they look." },
  // { name: "Jessica", role: "Project Manager", initial: "JD", color: "#56CFE1", image: meImg, desc: "Keeping everything on track and ensuring flawless sprint execution every time." },
];

// ─── VISION ──────────────────────────────────────────────────────────────────
function Vision() {
  useEffect(() => {
    gsap.fromTo(".vision-item", { opacity: 0, scale: 0.94, y: 20 }, {
      opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: ".vision-bento", start: "top 80%" },
    });
  }, []);

  return (
    <section className="section vision-section" id="vision">
      <div className="container">
        <div className="section-head center-head">
          <span className="s-label">The Vision</span>
          <h2 className="s-title">Engineering local growth<br /><em>for every business</em></h2>
        </div>
        <div className="vision-bento">
          <div className="vision-item s-1 group">
            <div className="vision-bg-video">
              <video src="https://cdn.pixabay.com/video/2021/04/05/69999-533348151_large.mp4" autoPlay loop muted playsInline />
              <div className="vision-overlay"></div>
            </div>
            <h3>Systemize<br />Every Filipino Business</h3>
            <span className="vision-arrow">→</span>
          </div>
          <div className="vision-item s-2 group">
            <div className="vision-text">
              <h3>Be the Team Behind the Boldest Brands</h3>
              <p>We orchestrate high-performance technology for scaling ventures.</p>
            </div>
            <div className="vision-image">
              <img src={amImg} alt="Brand Mockup" />
            </div>
          </div>
          <div className="vision-item s-3 group">
            <h3>Turn Process into Results</h3>
            <p>From fragmented workflows to unified intelligent systems.</p>
            <div className="vision-chart">
              <div className="bar b1"></div>
              <div className="bar b2"></div>
              <div className="bar b3"></div>
              <div className="bar b4"></div>
            </div>
          </div>
          <div className="vision-item s-4 group">
            <div className="vision-bg-video">
              <video src="https://cdn.pixabay.com/video/2023/07/21/172655-847860558_large.mp4" autoPlay loop muted playsInline />
              <div className="vision-overlay darker"></div>
            </div>
            <div className="vision-text bottom">
              <h3>Built For Scale</h3>
              <p>Design-first architecture engineered to grow unconditionally with your vision.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  useEffect(() => {
    gsap.fromTo(".about-headline", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-new-inner", start: "top 80%" } });
    gsap.fromTo(".about-manifesto", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".about-new-inner", start: "top 80%" } });
    gsap.fromTo(".about-pill", { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 0.25, ease: "back.out(1.4)", scrollTrigger: { trigger: ".about-new-inner", start: "top 80%" } });
    gsap.fromTo(".about-metric", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, delay: 0.3, ease: "power2.out", scrollTrigger: { trigger: ".about-metrics-row", start: "top 85%" } });
    gsap.fromTo(".about-trait", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, delay: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".about-traits", start: "top 85%" } });
  }, []);

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-new-inner">

          {/* ── LEFT COLUMN ── */}
          <div className="about-left-col">
            <span className="s-label">Who We Are</span>
            <h2 className="s-title about-headline">
              Built with Clarity.<br />
              <em>Delivered with Purpose.</em>
            </h2>
            <p className="about-manifesto">
              Morbit is a software studio from the Philippines. We don't pitch decks and disappear — we embed, we build, and we stay. Every system we ship is handcrafted around how <em>you</em> actually work.
            </p>
            <p className="about-manifesto" style={{ marginTop: "16px" }}>
              We've built for fragrance brands, schools, water stations, hospitals, and more. The stack changes. The standard doesn't.
            </p>


            {/* Pillars */}
            <div className="about-pillars">
              {[
                { tag: "No Shortcuts", desc: "Built from scratch, every time." },
                { tag: "Design-First", desc: "We make it beautiful before we make it work." },
                { tag: "Post-Launch Partners", desc: "We don't vanish after go-live." },
              ].map((p) => (
                <div key={p.tag} className="about-pill">
                  <span className="about-pill-tag">{p.tag}</span>
                  <span className="about-pill-desc">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="about-right-col">
            {/* Big quote card */}
            <div className="about-quote-card">
              <div className="about-quote-mark">"</div>
              <p className="about-quote-text">We treat your business like it's ours. Because for the duration of every project — it is.</p>
              <div className="about-quote-sig">
                <div className="about-sig-dot" />
                <span>The Morbit Team</span>
              </div>
            </div>

            {/* Trait list */}
            <div className="about-traits">
              {[
                { icon: "◎", label: "Precision Engineering", desc: "Every line of code is intentional. We architect systems that scale, not just ones that work today." },
                { icon: "◈", label: "Design-Led Execution", desc: "UI isn't an afterthought. We start with how it feels, then build what makes it work." },
                { icon: "◉", label: "Radical Transparency", desc: "No surprises. You'll always know where we are, what's blocking us, and what's next." },
              ].map((t) => (
                <div key={t.label} className="about-trait">
                  <span className="about-trait-icon">{t.icon}</span>
                  <div className="about-trait-body">
                    <h4>{t.label}</h4>
                    <p>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ──────────────────────────────────────────────────────────────
function CtaBanner({ onGetStarted }) {
  return (
    <div className="cta-inner">
      <div className="cta-card">
        <div className="cta-content">
          <h2 className="cta-title">
            You're About to Build a<br />
            <span className="cta-gradient">System That Wins</span>
          </h2>
          <p className="cta-sub">While they scramble, you'll systematize. That's how you win every time — with the right team and the right tools.</p>
          <button className="btn-primary pill-btn" onClick={onGetStarted}>
            Book Your Free Demo Call
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {

  // return (
  //   <section className="section contact-section" id="contact">
  //     <div className="container">
  //       <div className="contact-inner">
  //         <div className="contact-left">
  //           <span className="s-label">Get In Touch</span>
  //           <h2 className="s-title">Let's Build<br /><em>Something Great</em></h2>
  //           <p className="contact-sub">Ready to start your next project? Let's collaborate and create something extraordinary.</p>
  //           <div className="contact-details">
  //             <a href="mailto:morales.seanpatrick@gmail.com" className="ci"><span className="ci-icon">✉</span><span>morales.seanpatrick@gmail.com</span></a>
  //             <a href="https://github.com/moosemorales" target="_blank" rel="noreferrer" className="ci"><span className="ci-icon">⌨</span><span>github.com/moosemorales</span></a>
  //             <a href="https://linkedin.com/in/sean-patrick-morales-22a697268" target="_blank" rel="noreferrer" className="ci"><span className="ci-icon">◈</span><span>LinkedIn Profile</span></a>
  //           </div>
  //         </div>
  //         <div className="contact-right">
  //           {sent ? (
  //             <div className="sent-state">
  //               <div className="sent-check">✓</div>
  //               <h3>Message Sent!</h3>
  //               <p>We'll be in touch soon. Let's build something great.</p>
  //               <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
  //             </div>
  //           ) : (
  //             <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); setForm({ name:"", email:"", message:"" }); }}>
  //               <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} required />
  //               <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} required />
  //               <textarea rows={5} placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} required />
  //               <button type="submit" className="btn-primary full-w">Send Message →</button>
  //             </form>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="footer-inner">
      <hr className="footer-top-divider" />
      <div className="footer-inner-top">
        <div className="footer-brand-side">
          <div className="footer-logo-container">
            <LogoMark size={60} strokeColor="#fff" dotColor="#4da6ff" />
            <span className="footer-brand-title">MORBIT</span>
          </div>
        </div>
        <div className="footer-nav-grid">
          <div className="footer-nav-column">
            <h4 className="footer-column-head">Home</h4>
            <button className="footer-nav-link" onClick={() => go("services")}>What do we do?</button>
            <button className="footer-nav-link" onClick={() => go("services")}>Our Services</button>
            <button className="footer-nav-link" onClick={() => go("process")}>Our Onboarding</button>
          </div>
          <div className="footer-nav-column">
            <h4 className="footer-column-head">About</h4>
            <button className="footer-nav-link" onClick={() => go("about")}>What is Morbit?</button>
            <button className="footer-nav-link" onClick={() => go("team")}>Our Team</button>
            <button className="footer-nav-link" onClick={() => go("vision")}>Vision</button>
          </div>
          <div className="footer-nav-column">
            <h4 className="footer-column-head">Our Projects</h4>
            <button className="footer-nav-link" onClick={() => go("work")}>Glimpse to our Projects</button>
            <button className="footer-nav-link" onClick={() => go("clients")}>Morbit X Partners</button>
          </div>
        </div>
      </div>
      {/* <hr className="footer-row-divider" /> */}
      <div className="footer-bottom-row">
        <p className="footer-copyright">© {new Date().getFullYear()} <strong>Morbit</strong>. All rights reserved.</p>
        <div className="footer-social-row">
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-circle" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.39-.12 6.78-.13 10.16-.01 1.06-.2 2.14-.64 3.11-.61 1.45-1.78 2.7-3.23 3.38-1.45.71-3.15.93-4.73.61-1.61-.31-3.13-1.18-4.22-2.39-1.22-1.34-1.89-3.15-1.92-4.96-.03-1.84.66-3.7 1.96-5.06 1.25-1.31 3.03-2.11 4.86-2.22v4.06c-.84.08-1.71.39-2.36.96-.68.61-1.09 1.55-1.1 2.48.01.99.5 1.95 1.28 2.58.82.68 1.93.94 2.97.7 1.03-.21 1.96-.89 2.44-1.84.22-.44.34-.94.34-1.44-.01-4.04 0-8.07 0-12.11z" /></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-circle" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-circle" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-circle" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── GET STARTED PAGE ────────────────────────────────────────────────────────
function GetStartedPage({ onBack }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", timeline: "", description: "", hearAbout: ""
  });

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const canNext1 = form.name.trim() && form.email.trim() && form.phone.trim();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="gs-page">
      <nav className="nav" style={{ background: "transparent", backdropFilter: "none", borderBottom: "none", boxShadow: "none" }}>
        <div className="nav-logo" onClick={onBack} style={{ cursor: "pointer" }}>
          <LogoMark size={32} strokeColor="#fff" dotColor="#4da6ff" />
          MORBIT
        </div>
        {/* <button className="nav-cta-pill" onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          ←
        </button> */}
      </nav>

      <div className="gs-wrap">
        {submitted ? (
          <div className="gs-success">
            <div className="gs-success-icon">✓</div>
            <h2 className="gs-success-title">You're In!</h2>
            <p className="gs-success-sub">
              Thanks, <strong>{form.name}</strong>. We've received your details and will reach out to <strong>{form.email}</strong> within 24 hours to schedule your free demo call.
            </p>
            <div className="gs-success-details">
              <div className="gs-detail-row"><span>Service</span><strong>{form.service}</strong></div>
              <div className="gs-detail-row"><span>Timeline</span><strong>{form.timeline || "Flexible"}</strong></div>
            </div>
            <button className="btn-primary" style={{ marginTop: "8px" }} onClick={onBack}>← Back to Home</button>
          </div>
        ) : (
          <>
            <div className="gs-header">
              <span className="s-label">Let's Get Started</span>
              <h1 className="gs-title">Book Your <span className="hero-gradient">Free Demo Call</span></h1>
              <p className="gs-sub">Fill in the details below and we'll reach out within 24 hours.</p>
            </div>

            {/* Step Indicator */}
            <div className="gs-steps">
              {["Your Info", "Project Details", "Final Notes"].map((label, i) => (
                <div key={i} className={`gs-step-item ${step > i + 1 ? "done" : ""} ${step === i + 1 ? "active" : ""}`}>
                  <div className="gs-step-circle">{step > i + 1 ? "✓" : i + 1}</div>
                  <span className="gs-step-label">{label}</span>
                  {i < 2 && <div className={`gs-step-line ${step > i + 1 ? "done" : ""}`} />}
                </div>
              ))}
            </div>

            <div className="gs-form-card">
              {/* Step 1 */}
              {step === 1 && (
                <div className="gs-step-content">
                  <h3 className="gs-step-title">Tell us about yourself</h3>
                  <div className="gs-fields">
                    <div className="gs-field-group">
                      <label className="gs-label">Full Name *</label>
                      <input className="gs-input" type="text" placeholder="e.g. Juan dela Cruz" value={form.name} onChange={e => set("name", e.target.value)} />
                    </div>
                    <div className="gs-field-group">
                      <label className="gs-label">Email Address *</label>
                      <input className="gs-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} />
                    </div>
                    <div className="gs-field-group">
                      <label className="gs-label">Phone / WhatsApp *</label>
                      <input className="gs-input" type="tel" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={e => set("phone", e.target.value)} />
                    </div>
                    <div className="gs-field-group">
                      <label className="gs-label">Company / Business Name</label>
                      <input className="gs-input" type="text" placeholder="Your company (optional)" value={form.company} onChange={e => set("company", e.target.value)} />
                    </div>
                  </div>
                  <div className="gs-actions">
                    <button className="btn-primary" disabled={!canNext1} onClick={() => setStep(2)}>
                      Next: Project Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="gs-step-content">
                  <h3 className="gs-step-title">What are you building?</h3>
                  <div className="gs-fields">
                    <div className="gs-field-group full">
                      <label className="gs-label">Service Needed *</label>
                      <input
                        className="gs-input"
                        type="text"
                        placeholder="e.g. Custom inventory system, HR management app, e-commerce store..."
                        value={form.service}
                        onChange={e => set("service", e.target.value)}
                      />
                    </div>
                    <div className="gs-field-group full">
                      <label className="gs-label">Ideal Timeline</label>
                      <select
                        className="gs-input gs-select"
                        value={form.timeline}
                        onChange={e => set("timeline", e.target.value)}
                      >
                        <option value="" disabled>Select a timeline...</option>
                        <option value="ASAP">ASAP</option>
                        <option value="1–3 months">1–3 months</option>
                        <option value="3–6 months">3–6 months</option>
                        <option value="6+ months">6+ months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div className="gs-actions">
                    <button className="gs-back-btn" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn-primary" disabled={!form.service.trim()} onClick={() => setStep(3)}>
                      Next: Final Notes →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="gs-step-content">
                  <h3 className="gs-step-title">Almost there — a few more details</h3>
                  <div className="gs-fields">
                    <div className="gs-field-group full">
                      <label className="gs-label">Describe Your Project</label>
                      <textarea
                        className="gs-input gs-textarea"
                        rows={5}
                        placeholder="Tell us what you need — the more detail, the better we can prepare for your demo call."
                        value={form.description}
                        onChange={e => set("description", e.target.value)}
                      />
                    </div>
                    <div className="gs-field-group full">
                      <label className="gs-label">How did you hear about Morbit?</label>
                      <div className="gs-option-grid small">
                        {["Facebook", "Instagram", "TikTok", "Referral", "Google", "Other"].map(opt => (
                          <button
                            key={opt}
                            className={`gs-option-btn ${form.hearAbout === opt ? "selected" : ""}`}
                            onClick={() => set("hearAbout", opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="gs-actions">
                    <button className="gs-back-btn" onClick={() => setStep(2)}>← Back</button>
                    <button className="btn-primary" onClick={handleSubmit}>
                      Submit & Book Demo 🚀
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showForm) return <GetStartedPage onBack={() => { setShowForm(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />;

  return (
    <div className="app">
      <Nav onGetStarted={openForm} />
      <Hero onGetStarted={openForm} />
      <Marquee />
      <Vision />
      <Work />
      <Services />
      <Process onGetStarted={openForm} />
      <Clients />
      <Team />
      <About />
      <div className="cta-footer-wrap">
        <CtaBanner onGetStarted={openForm} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}