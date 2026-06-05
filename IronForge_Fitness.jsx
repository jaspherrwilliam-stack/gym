import { useState, useEffect, useRef } from "react";
import {
  Dumbbell, Flame, Users, Award, ChevronDown, Star, Phone, Mail, MapPin,
  Instagram, Twitter, Facebook, Youtube, Check, ArrowRight, Menu, X,
  Zap, Heart, Target, Clock, TrendingUp, Shield, Play, ChevronLeft,
  ChevronRight, MessageCircle, Trophy, Salad, Activity
} from "lucide-react";

const NAV_LINKS = ["Home", "Programs", "Trainers", "Membership", "Testimonials", "Contact"];

const STATS = [
  { value: "5,000+", label: "Active Members", icon: Users },
  { value: "10+", label: "Elite Trainers", icon: Award },
  { value: "25+", label: "Fitness Programs", icon: Dumbbell },
  { value: "95%", label: "Client Satisfaction", icon: Heart },
];

const PROGRAMS = [
  { icon: Flame, title: "Weight Loss", desc: "Science-backed fat loss protocols combining HIIT, metabolic conditioning, and personalized caloric strategies.", color: "#FF6B35" },
  { icon: Dumbbell, title: "Muscle Building", desc: "Progressive overload programs designed by elite coaches to maximize hypertrophy and strength gains.", color: "#FF6B35" },
  { icon: Trophy, title: "Personal Training", desc: "One-on-one sessions with certified trainers. Your goals, your schedule, your results.", color: "#FF6B35" },
  { icon: Zap, title: "CrossFit Training", desc: "High-intensity functional workouts that build endurance, strength, and mental toughness.", color: "#FF6B35" },
  { icon: Activity, title: "Functional Fitness", desc: "Movement-based training that improves real-world strength, mobility, and injury prevention.", color: "#FF6B35" },
  { icon: Salad, title: "Nutrition Coaching", desc: "Personalized meal planning and nutritional guidance to fuel performance and accelerate transformation.", color: "#FF6B35" },
];

const WHYCHOOSE = [
  { icon: Award, title: "Certified Trainers", desc: "Every trainer holds elite certifications and 5+ years of transforming bodies." },
  { icon: Zap, title: "Modern Equipment", desc: "Over $2M in state-of-the-art Rogue, Technogym, and Life Fitness equipment." },
  { icon: Target, title: "Personalized Plans", desc: "No cookie-cutter programs. Your body, your goals, your custom blueprint." },
  { icon: Clock, title: "Flexible Hours", desc: "Open 5AM–midnight, 7 days a week. Fit fitness around your life, not the other way around." },
  { icon: Salad, title: "Nutrition Support", desc: "In-house nutrition coaching, meal prep guides, and supplement guidance included." },
  { icon: Users, title: "Elite Community", desc: "Join 5,000+ members who push, motivate, and elevate each other every day." },
];

const TRAINERS = [
  { name: "Marcus Steel", role: "Strength & Powerlifting", exp: "12 Years", img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop&crop=face", specialty: "Powerlifting Champion" },
  { name: "Aisha Torres", role: "Weight Loss & HIIT", exp: "9 Years", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop&crop=face", specialty: "Body Transformation" },
  { name: "Kai Nakamura", role: "CrossFit & Conditioning", exp: "11 Years", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop&crop=face", specialty: "CrossFit L3 Coach" },
  { name: "Priya Sharma", role: "Yoga & Functional", exp: "8 Years", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&crop=face", specialty: "Mobility Specialist" },
];

const PLANS = [
  {
    name: "Basic", price: 49, period: "month", popular: false,
    features: ["Access to gym floor", "2 group classes/week", "Locker room access", "Basic fitness assessment", "Mobile app access"],
    missing: ["Personal training sessions", "Nutrition coaching", "Unlimited classes"]
  },
  {
    name: "Premium", price: 99, period: "month", popular: true,
    features: ["Unlimited gym access", "Unlimited group classes", "2 PT sessions/month", "Nutrition consultation", "Body composition analysis", "Mobile app + priority booking", "Guest passes (2/month)"],
    missing: []
  },
  {
    name: "Elite", price: 199, period: "month", popular: false,
    features: ["24/7 VIP gym access", "Unlimited everything", "Weekly PT sessions", "Full nutrition program", "Monthly body scans", "Recovery suite access", "Dedicated locker", "Unlimited guest passes"],
    missing: []
  },
];

const TESTIMONIALS = [
  { name: "Jordan Mitchell", role: "Lost 42 lbs in 6 months", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rating: 5, review: "IronForge completely changed my life. The trainers don't just count reps — they rebuild your mindset. I've tried 4 gyms before this and nothing comes close to the culture and results here." },
  { name: "Serena Blake", role: "Gained 18 lbs of muscle", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face", rating: 5, review: "As a woman who was intimidated by weights, IronForge felt welcoming from day one. My trainer Aisha helped me build a physique I never thought possible. Worth every penny of the Elite plan." },
  { name: "Derek Osei", role: "Marathon PR after 3 months", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", rating: 5, review: "The functional fitness and conditioning programs are next level. Kai has an elite understanding of athletic performance. I shaved 18 minutes off my marathon time in just one training cycle." },
  { name: "Lisa Park", role: "Postpartum transformation", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", rating: 5, review: "Coming back after having twins, I needed a team that understood my body. The personalized approach and nutrition coaching here made my comeback journey safe, effective, and actually fun." },
];

const FAQS = [
  { q: "Do I need to be fit to join IronForge?", a: "Absolutely not. We welcome all fitness levels. Your first session includes a comprehensive assessment so we can build a program that meets you exactly where you are." },
  { q: "What's included in the free trial?", a: "Your 7-day free trial includes unlimited gym floor access, 2 group classes of your choice, a fitness assessment, and a strategy session with one of our trainers — no credit card required." },
  { q: "Can I freeze or cancel my membership?", a: "Yes. You can freeze your membership for up to 3 months per year at no charge. Cancellations require 30 days notice and there are no cancellation fees after the first 3 months." },
  { q: "What hours is the gym open?", a: "We're open Monday–Friday 5AM–12AM and weekends 6AM–10PM. Elite plan members enjoy 24/7 keycard access to the gym floor." },
  { q: "Are group classes included in my plan?", a: "Basic members get 2 classes per week. Premium and Elite members enjoy unlimited access to all 40+ weekly group classes including HIIT, cycling, yoga, and CrossFit." },
  { q: "Do you offer nutrition services?", a: "Yes. All plans include basic nutrition guidance. Premium members receive a quarterly consultation, and Elite members get a full personalized nutrition program with monthly check-ins." },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`
    }}>
      {children}
    </div>
  );
}

export default function IronForgeFitness() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Barlow', 'Bebas Neue', sans-serif", background: "#0A0A0A", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;900&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 2px; }
        .orange { color: #FF6B35; }
        .btn-primary {
          background: linear-gradient(135deg, #FF6B35, #FF4500);
          color: #fff; border: none; cursor: pointer;
          font-family: 'Barlow', sans-serif; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(255,107,53,0.5); filter: brightness(1.1); }
        .btn-outline {
          background: transparent; color: #fff;
          border: 2px solid rgba(255,255,255,0.5); cursor: pointer;
          font-family: 'Barlow', sans-serif; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .btn-outline:hover { border-color: #FF6B35; color: #FF6B35; transform: translateY(-2px); }
        .card-hover { transition: all 0.35s ease; }
        .card-hover:hover { transform: translateY(-8px); }
        .program-card:hover .prog-icon { transform: scale(1.2) rotate(10deg); }
        .prog-icon { transition: transform 0.3s ease; }
        .trainer-img { transition: transform 0.5s ease; }
        .trainer-card:hover .trainer-img { transform: scale(1.05); }
        .plan-card { transition: all 0.35s ease; border: 1px solid rgba(255,255,255,0.08); }
        .plan-card:hover { border-color: rgba(255,107,53,0.5); transform: translateY(-6px); }
        .plan-popular { border-color: #FF6B35 !important; background: linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,69,0,0.05)) !important; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .faq-item:hover { border-bottom-color: rgba(255,107,53,0.3); }
        .stat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); }
        .stat-card:hover { background: rgba(255,107,53,0.08); border-color: rgba(255,107,53,0.3); }
        .social-icon { transition: all 0.25s ease; }
        .social-icon:hover { color: #FF6B35 !important; transform: scale(1.2); }
        .why-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s ease; }
        .why-card:hover { background: rgba(255,107,53,0.06); border-color: rgba(255,107,53,0.25); transform: translateY(-4px); }
        input, select { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: #fff; font-family: 'Barlow', sans-serif; outline: none; transition: border-color 0.25s; }
        input:focus, select:focus { border-color: #FF6B35; }
        input::placeholder { color: rgba(255,255,255,0.35); }
        select option { background: #1a1a1a; color: #fff; }
        .nav-link { position: relative; color: rgba(255,255,255,0.75); text-decoration: none; font-weight: 600; letter-spacing: 0.5px; font-size: 13px; text-transform: uppercase; transition: color 0.25s; cursor: pointer; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #FF6B35; transition: width 0.25s ease; }
        .nav-link:hover { color: #FF6B35; }
        .nav-link:hover::after { width: 100%; }
        .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80'); background-size: cover; background-position: center 30%; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, rgba(255,107,53,0.08) 100%); }
        .section-tag { display: inline-block; background: rgba(255,107,53,0.15); color: #FF6B35; border: 1px solid rgba(255,107,53,0.3); font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 2px; margin-bottom: 16px; }
        .display-font { font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px; }
        .glow-line { width: 60px; height: 3px; background: linear-gradient(90deg, #FF6B35, #FF4500); border-radius: 2px; }
        @media (max-width: 768px) {
          .hero-headline { font-size: clamp(42px, 10vw, 90px) !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: 1fr !important; }
        }
        .before-after-card { overflow: hidden; position: relative; }
        .ba-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%); }
        .before-badge, .after-badge { position: absolute; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; border-radius: 2px; }
        .before-badge { top: 12px; left: 12px; background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.2); }
        .after-badge { top: 12px; right: 12px; background: #FF6B35; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,107,53,0.15)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #FF6B35, #FF4500)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Dumbbell size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <span className="display-font" style={{ fontSize: 20, letterSpacing: 3, color: "#fff" }}>IRON<span className="orange">FORGE</span></span>
              <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", lineHeight: 1, marginTop: 1 }}>FITNESS</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav" id="desktop-nav">
            {NAV_LINKS.map(link => (
              <span key={link} className="nav-link" onClick={() => scrollTo(link.toLowerCase())}>{link}</span>
            ))}
            <button className="btn-primary" style={{ padding: "10px 24px", borderRadius: 3, fontSize: 12 }} onClick={() => scrollTo("membership")}>
              Join Now
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "none" }} id="mobile-menu-btn">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "rgba(10,10,10,0.98)", padding: "20px 5%", borderTop: "1px solid rgba(255,107,53,0.2)" }}>
            {NAV_LINKS.map(link => (
              <div key={link} className="nav-link" onClick={() => scrollTo(link.toLowerCase())} style={{ display: "block", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 15 }}>
                {link}
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: 20, width: "100%", padding: "14px", borderRadius: 3, fontSize: 13 }} onClick={() => scrollTo("membership")}>Join Now</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "120px 5% 80px" }}>
          <div style={{ maxWidth: 780 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, opacity: 0.9 }}>
              <div style={{ width: 40, height: 2, background: "#FF6B35" }} />
              <span style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: "#FF6B35", fontWeight: 700 }}>Est. 2009 · Elite Fitness</span>
            </div>

            <h1 className="display-font hero-headline" style={{ fontSize: "clamp(52px, 9vw, 100px)", lineHeight: 0.95, marginBottom: 28, color: "#fff" }}>
              Transform<br />Your Body.<br /><span className="orange">Transform</span><br />Your Life.
            </h1>

            <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 520, marginBottom: 40, fontWeight: 400 }}>
              Join IronForge Fitness and achieve your fitness goals with expert trainers, world-class equipment, and personalized coaching designed around you.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
              <button className="btn-primary" style={{ padding: "16px 36px", borderRadius: 3, fontSize: 14 }} onClick={() => scrollTo("contact")}>
                Start Free Trial
              </button>
              <button className="btn-outline" style={{ padding: "16px 36px", borderRadius: 3, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }} onClick={() => scrollTo("contact")}>
                <Play size={16} fill="#fff" /> Book Consultation
              </button>
            </div>

            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[{ val: "5,000+", lab: "Members" }, { val: "10+", lab: "Certified Trainers" }, { val: "15 Years", lab: "Experience" }].map(({ val, lab }) => (
                <div key={val}>
                  <div className="display-font" style={{ fontSize: 32, color: "#FF6B35" }}>{val}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite", zIndex: 2 }}>
          <ChevronDown size={28} color="rgba(255,255,255,0.4)" />
        </div>

        <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)} }`}</style>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-2">
            <AnimSection>
              <span className="section-tag">About IronForge</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1, marginBottom: 24, color: "#fff" }}>
                WHERE CHAMPIONS<br /><span className="orange">ARE FORGED</span>
              </h2>
              <div className="glow-line" style={{ marginBottom: 28 }} />
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: 20, fontSize: 16 }}>
                Since 2009, IronForge Fitness has been the premier destination for serious athletes and everyday warriors who refuse to settle for ordinary. We don't just offer gym access — we deliver transformation.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontSize: 16 }}>
                Our mission is simple: equip every member with the tools, coaching, and community to surpass their limits. Every program is built on science, delivered with passion, and backed by results.
              </p>
            </AnimSection>

            <AnimSection delay={150}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="stat-card card-hover" style={{ borderRadius: 8, padding: "28px 24px", textAlign: "center", transition: "all 0.3s ease" }}>
                    <Icon size={28} color="#FF6B35" style={{ marginBottom: 12 }} />
                    <div className="display-font" style={{ fontSize: 38, color: "#fff", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" style={{ padding: "100px 5%", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Our Programs</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                BUILT FOR <span className="orange">RESULTS</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "16px auto 0", fontSize: 16, lineHeight: 1.7 }}>
                Every program is engineered by certified experts to deliver measurable, lasting results.
              </p>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="grid-3">
            {PROGRAMS.map(({ icon: Icon, title, desc }, i) => (
              <AnimSection key={title} delay={i * 80}>
                <div className="program-card card-hover" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "36px 28px", height: "100%", cursor: "pointer" }}>
                  <div style={{ width: 56, height: 56, background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <Icon size={26} color="#FF6B35" className="prog-icon" />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#fff", letterSpacing: 0.5 }}>{title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: 14, marginBottom: 24 }}>{desc}</p>
                  <button style={{ background: "none", border: "none", color: "#FF6B35", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Barlow', sans-serif" }}>
                    Learn More <ArrowRight size={15} />
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: "100px 5%", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Why IronForge</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                THE <span className="orange">IRONFORGE</span> DIFFERENCE
              </h2>
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-3">
            {WHYCHOOSE.map(({ icon: Icon, title, desc }, i) => (
              <AnimSection key={title} delay={i * 70}>
                <div className="why-card" style={{ borderRadius: 10, padding: "32px 26px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, background: "rgba(255,107,53,0.1)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={22} color="#FF6B35" />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>{title}</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section id="trainers" style={{ padding: "100px 5%", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Our Trainers</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                ELITE <span className="orange">COACHES</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "16px auto 0", fontSize: 16 }}>
                World-class coaches who've transformed thousands of bodies and lives.
              </p>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="grid-4">
            {TRAINERS.map(({ name, role, exp, img, specialty }, i) => (
              <AnimSection key={name} delay={i * 90}>
                <div className="trainer-card card-hover" style={{ background: "#111", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ height: 320, overflow: "hidden", position: "relative" }}>
                    <img src={img} alt={name} className="trainer-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", top: 14, right: 14, background: "#FF6B35", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", borderRadius: 2 }}>{exp}</div>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ fontSize: 10, color: "#FF6B35", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{specialty}</div>
                    <h3 style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{name}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{role}</p>
                    <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                      {[Instagram, Twitter, Facebook].map((Icon, j) => (
                        <Icon key={j} size={16} color="rgba(255,255,255,0.35)" className="social-icon" style={{ cursor: "pointer" }} />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATION GALLERY */}
      <section style={{ padding: "100px 5%", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Real Results</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                REAL <span className="orange">TRANSFORMATIONS</span>
              </h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-3">
            {[
              { before: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop", after: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&h=500&fit=crop", name: "Sarah K.", loss: "-38 lbs", time: "5 months" },
              { before: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop", after: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=500&fit=crop", name: "James R.", loss: "+22 lbs muscle", time: "8 months" },
              { before: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop", after: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=500&fit=crop", name: "Maya L.", loss: "-45 lbs", time: "7 months" },
            ].map(({ before, after, name, loss, time }, i) => (
              <AnimSection key={name} delay={i * 100}>
                <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <div className="before-after-card" style={{ position: "relative", height: 260 }}>
                      <img src={before} alt="before" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div className="ba-overlay" />
                      <span className="before-badge" style={{ color: "rgba(255,255,255,0.8)" }}>Before</span>
                    </div>
                    <div className="before-after-card" style={{ position: "relative", height: 260 }}>
                      <img src={after} alt="after" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.05)" }} />
                      <div className="ba-overlay" />
                      <span className="after-badge" style={{ color: "#fff" }}>After</span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px", background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{time}</div>
                    </div>
                    <div style={{ background: "rgba(255,107,53,0.15)", color: "#FF6B35", border: "1px solid rgba(255,107,53,0.3)", padding: "6px 14px", borderRadius: 3, fontSize: 13, fontWeight: 700 }}>{loss}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section id="membership" style={{ padding: "100px 5%", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Pricing</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                CHOOSE YOUR <span className="orange">PLAN</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "16px auto 0", fontSize: 16 }}>
                Transparent pricing. No hidden fees. Cancel anytime.
              </p>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }} className="grid-3">
            {PLANS.map(({ name, price, popular, features, missing }, i) => (
              <AnimSection key={name} delay={i * 100}>
                <div className={`plan-card ${popular ? "plan-popular" : ""}`} style={{ borderRadius: 12, padding: "40px 32px", background: "#111", position: "relative" }}>
                  {popular && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #FF6B35, #FF4500)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "6px 20px", borderRadius: 2 }}>
                      Most Popular
                    </div>
                  )}
                  <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: popular ? "#FF6B35" : "rgba(255,255,255,0.4)", fontWeight: 700, marginBottom: 16 }}>{name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>$</span>
                    <span className="display-font" style={{ fontSize: 60, color: "#fff", lineHeight: 1 }}>{price}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>/mo</span>
                  </div>
                  <div className="glow-line" style={{ marginBottom: 28, width: popular ? "60px" : "40px" }} />

                  <div style={{ marginBottom: 32 }}>
                    {features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <Check size={15} color="#FF6B35" style={{ marginTop: 1, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{f}</span>
                      </div>
                    ))}
                    {missing.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                        <X size={15} color="rgba(255,255,255,0.2)" style={{ marginTop: 1, flexShrink: 0 }} />
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", textDecoration: "line-through" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className={popular ? "btn-primary" : "btn-outline"} style={{ width: "100%", padding: "14px", borderRadius: 4, fontSize: 13 }} onClick={() => scrollTo("contact")}>
                    Join Now
                  </button>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "100px 5%", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Testimonials</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                MEMBER <span className="orange">STORIES</span>
              </h2>
            </div>
          </AnimSection>

          <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "50px 60px", textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 24 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#FF6B35" color="#FF6B35" />)}
              </div>
              <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, marginBottom: 36, fontStyle: "italic" }}>
                "{TESTIMONIALS[testimonialIdx].review}"
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <img src={TESTIMONIALS[testimonialIdx].img} alt={TESTIMONIALS[testimonialIdx].name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #FF6B35" }} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 16 }}>{TESTIMONIALS[testimonialIdx].name}</div>
                  <div style={{ fontSize: 12, color: "#FF6B35", fontWeight: 600, letterSpacing: 0.5 }}>{TESTIMONIALS[testimonialIdx].role}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
              <button onClick={() => setTestimonialIdx((testimonialIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.25s" }}>
                <ChevronLeft size={18} />
              </button>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} style={{ width: i === testimonialIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === testimonialIdx ? "#FF6B35" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} />
              ))}
              <button onClick={() => setTestimonialIdx((testimonialIdx + 1) % TESTIMONIALS.length)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.25s" }}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section style={{ padding: "100px 5%", background: "linear-gradient(135deg, #0A0A0A 0%, #1a0a00 50%, #0A0A0A 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,107,53,0.08) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <AnimSection>
            <span className="section-tag">Limited Time Offer</span>
            <h2 className="display-font" style={{ fontSize: "clamp(38px, 6vw, 68px)", color: "#fff", marginBottom: 16 }}>
              START YOUR FITNESS<br /><span className="orange">JOURNEY TODAY</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
              Claim your 7-day free trial. No commitment. No credit card. Just results.
            </p>
          </AnimSection>

          <AnimSection delay={150}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "left" }}>
                <input required placeholder="Your Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ padding: "15px 20px", borderRadius: 4, fontSize: 15, width: "100%" }} />
                <input required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} style={{ padding: "15px 20px", borderRadius: 4, fontSize: 15, width: "100%" }} />
                <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ padding: "15px 20px", borderRadius: 4, fontSize: 15, width: "100%" }} />
                <select required value={formData.goal} onChange={e => setFormData({ ...formData, goal: e.target.value })} style={{ padding: "15px 20px", borderRadius: 4, fontSize: 15, width: "100%", cursor: "pointer" }}>
                  <option value="">Select Fitness Goal</option>
                  <option>Weight Loss</option>
                  <option>Muscle Building</option>
                  <option>General Fitness</option>
                  <option>Athletic Performance</option>
                  <option>Post-Injury Recovery</option>
                </select>
                <button type="submit" className="btn-primary" style={{ gridColumn: "1 / -1", padding: "17px", borderRadius: 4, fontSize: 15, letterSpacing: 2 }}>
                  Claim Free Trial →
                </button>
              </form>
            ) : (
              <div style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 10, padding: "48px 32px", textAlign: "center" }}>
                <Trophy size={48} color="#FF6B35" style={{ marginBottom: 16 }} />
                <h3 className="display-font" style={{ fontSize: 36, color: "#fff", marginBottom: 12 }}>YOU'RE IN!</h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16 }}>Welcome to IronForge, {formData.name}! We'll contact you within 24 hours to schedule your first session.</p>
              </div>
            )}
          </AnimSection>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "100px 5%", background: "#0A0A0A" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">FAQ</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                GOT <span className="orange">QUESTIONS?</span>
              </h2>
            </div>
          </AnimSection>

          {FAQS.map(({ q, a }, i) => (
            <AnimSection key={q} delay={i * 50}>
              <div className="faq-item" style={{ padding: "24px 0", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: openFaq === i ? "#FF6B35" : "#fff", transition: "color 0.25s", lineHeight: 1.4 }}>{q}</h3>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: openFaq === i ? "rgba(255,107,53,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${openFaq === i ? "rgba(255,107,53,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s" }}>
                    <ChevronDown size={16} color={openFaq === i ? "#FF6B35" : "rgba(255,255,255,0.5)"} style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                  </div>
                </div>
                <div style={{ overflow: "hidden", maxHeight: openFaq === i ? "200px" : "0", transition: "max-height 0.4s ease", marginTop: openFaq === i ? 16 : 0 }}>
                  <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: 15 }}>{a}</p>
                </div>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Contact Us</span>
              <h2 className="display-font" style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
                GET IN <span className="orange">TOUCH</span>
              </h2>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="grid-2">
            <AnimSection>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {[
                  { icon: Phone, label: "Phone", val: "+1 (555) 467-6374" },
                  { icon: Mail, label: "Email", val: "hello@ironforgefit.com" },
                  { icon: MapPin, label: "Address", val: "2847 Iron Avenue, Manhattan, NY 10001" },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.25)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color="#FF6B35" />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 16, color: "#fff", fontWeight: 500 }}>{val}</div>
                    </div>
                  </div>
                ))}

                <a href="https://wa.me/15554676374" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 4, fontWeight: 700, fontSize: 14, letterSpacing: 1, textDecoration: "none", marginTop: 8, width: "fit-content", transition: "all 0.25s" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.35)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </AnimSection>

            <AnimSection delay={150}>
              <div style={{ background: "#111", borderRadius: 12, overflow: "hidden", height: 380, position: "relative", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #141414, #1a1008)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <MapPin size={40} color="#FF6B35" />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>IronForge Fitness</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>2847 Iron Avenue, Manhattan, NY 10001</div>
                  </div>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", color: "#FF6B35", padding: "10px 22px", borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase" }}>
                    Open in Maps
                  </a>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,107,53,0.15)", padding: "60px 5% 30px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 50 }} className="grid-4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #FF6B35, #FF4500)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Dumbbell size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="display-font" style={{ fontSize: 18, letterSpacing: 3, color: "#fff" }}>IRON<span className="orange">FORGE</span></span>
                  <div style={{ fontSize: 8, letterSpacing: 3, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>FITNESS</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                Elite fitness since 2009. Transforming bodies, building champions, and forging the strongest version of you.
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <div key={i} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Icon size={16} color="rgba(255,255,255,0.5)" className="social-icon" />
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Quick Links", links: ["Home", "Programs", "Trainers", "Membership", "Testimonials"] },
              { title: "Programs", links: ["Weight Loss", "Muscle Building", "Personal Training", "CrossFit", "Nutrition"] },
              { title: "Company", links: ["About Us", "Blog", "Careers", "Press", "Contact"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#FF6B35", marginBottom: 20 }}>{title}</div>
                {links.map(link => (
                  <div key={link} style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#fff"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>
                    {link}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2024 IronForge Fitness. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(t => (
                <span key={t} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          #desktop-nav { display: none !important; }
          #mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
