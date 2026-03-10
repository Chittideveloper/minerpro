import { useState, useEffect, useRef, useCallback } from "react";

const SLIDES = [
  {
    id: 1,
    icon: "🎯",
    title: "Trip Count & Lead Distance",
    subtitle: "100% Accuracy",
    desc: "Capture every trip with pinpoint precision. Know exact lead distances, cycle times, and payload counts — zero guesswork, total control.",
    tag: "Fleet Intelligence",
    color: "#f59e0b",
    accent: "#fbbf24",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&fit=crop",
  },
  {
    id: 2,
    icon: "📡",
    title: "Track Every Vehicle",
    subtitle: "Measure Every Move",
    desc: "Real-time GPS tracking across your entire fleet. Monitor position, speed, idle time, and route deviation from a single command center.",
    tag: "Live Tracking",
    color: "#10b981",
    accent: "#34d399",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&fit=crop",
  },
  {
    id: 3,
    icon: "🔗",
    title: "Excavator–Dumper Association",
    subtitle: "Smart Pairing Engine",
    desc: "Automatically link excavators with dumpers per trip. Identify bottlenecks, optimize loading queues, and eliminate dead haul time.",
    tag: "Association",
    color: "#3b82f6",
    accent: "#60a5fa",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
  },
  {
    id: 4,
    icon: "📹",
    title: "Two-Way Audio Video",
    subtitle: "On-Demand Communication",
    desc: "Instant live video and voice between operators, supervisors, and control rooms. No delays, no third-party apps — built right in.",
    tag: "Communication",
    color: "#8b5cf6",
    accent: "#a78bfa",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&fit=crop",
  },
  {
    id: 5,
    icon: "⛽",
    title: "Monitor Fuel Use",
    subtitle: "Every Trip, Every Day",
    desc: "CAN bus & fuel sensor integration for trip-level and daily consumption analytics. Detect theft, idle burns, and inefficiency instantly.",
    tag: "Fuel Analytics",
    color: "#ef4444",
    accent: "#f87171",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop",
  },
  {
    id: 6,
    icon: "🪪",
    title: "Know Who's Behind the Wheel",
    subtitle: "Driver Identification",
    desc: "RFID & biometric driver login ensures accountability. Know the exact operator for every machine, every shift, every second.",
    tag: "Driver ID",
    color: "#f59e0b",
    accent: "#fcd34d",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&fit=crop",
  },
  {
    id: 7,
    icon: "📊",
    title: "Driver & Machine Efficiency",
    subtitle: "Measured Together",
    desc: "Correlate operator behavior with machine output. Score productivity, benchmark against peers, and coach for peak performance.",
    tag: "Efficiency",
    color: "#10b981",
    accent: "#6ee7b7",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
  },
  {
    id: 8,
    icon: "🤳",
    title: "Smart Facial Attendance",
    subtitle: "Seamless Shift Control",
    desc: "AI-powered face recognition for attendance and shift handover. Eliminate buddy punching and manual registers forever.",
    tag: "Attendance",
    color: "#06b6d4",
    accent: "#22d3ee",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80&fit=crop",
  },
  {
    id: 9,
    icon: "🛢️",
    title: "Fuel Fillings & Consumption",
    subtitle: "Trip-wise & Day-wise",
    desc: "Log every refuel event. Compare filled vs. consumed quantities by trip and shift. Full fuel lifecycle transparency.",
    tag: "Fuel Tracking",
    color: "#f97316",
    accent: "#fb923c",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&fit=crop",
  },
  {
    id: 10,
    icon: "🔧",
    title: "Alert for Breakdowns",
    subtitle: "Monitoring & Analysis",
    desc: "Predictive breakdown alerts, downtime logs, and maintenance analysis dashboards. Reduce unplanned stops and extend machine life.",
    tag: "Maintenance",
    color: "#dc2626",
    accent: "#f87171",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&fit=crop",
  },
  {
    id: 11,
    icon: "⛏️",
    title: "Depth-wise Excavation Tracking",
    subtitle: "Shovel Deployment Assist",
    desc: "Monitor excavation depth in real time and generate data-driven shovel deployment plans. Maximize bench utilization.",
    tag: "Excavation",
    color: "#d97706",
    accent: "#fbbf24",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
  },
  {
    id: 12,
    icon: "📈",
    title: "Track Every KPI",
    subtitle: "Boost Every Ton",
    desc: "From OEE to payload per hour — all critical mining KPIs in one unified dashboard. Drive continuous improvement with data.",
    tag: "KPI Dashboard",
    color: "#7c3aed",
    accent: "#8b5cf6",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
  },
  {
    id: 13,
    icon: "🚛",
    title: "Vehicle Health & Output",
    subtitle: "Every Unit, Every Day",
    desc: "Engine hours, fault codes, tyre pressure, battery vitals — comprehensive health monitoring for every machine in your fleet.",
    tag: "Health Monitor",
    color: "#059669",
    accent: "#10b981",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&fit=crop",
  },
  {
    id: 14,
    icon: "👷",
    title: "Operator Productivity",
    subtitle: "See How Operators Drive It",
    desc: "Visualize individual operator performance trends. Identify top performers and those needing intervention before output drops.",
    tag: "Operator Analytics",
    color: "#b45309",
    accent: "#f59e0b",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&fit=crop",
  },
  {
    id: 15,
    icon: "🚜",
    title: "Dedicated Reports",
    subtitle: "Dozers · Graders · Water Tankers",
    desc: "Purpose-built report modules for auxiliary equipment. Track blade hours, grading passes, and water dispatch independently.",
    tag: "Aux Equipment",
    color: "#0284c7",
    accent: "#38bdf8",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
  },
  {
    id: 16,
    icon: "🚁",
    title: "Drone-Based Live Maps",
    subtitle: "Aerial Intelligence",
    desc: "Real-time orthomosaic maps from drone feeds overlaid on pit plans. See the mine from above — updated continuously.",
    tag: "Drone Mapping",
    color: "#6d28d9",
    accent: "#7c3aed",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80&fit=crop",
  },
  {
    id: 17,
    icon: "🗺️",
    title: "Depth-wise Excavation",
    subtitle: "& Trip Monitoring",
    desc: "Combine spatial depth data with trip counts for a complete excavation progress picture. Know exactly what's been moved where.",
    tag: "Geo-Analytics",
    color: "#065f46",
    accent: "#059669",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&fit=crop",
  },
  {
    id: 18,
    icon: "⚫",
    title: "Waste & Coal Modules",
    subtitle: "Mineral Management",
    desc: "Separate tracking workflows for overburden and mineral hauls. Precise stripping ratios, coal dispatch, and grade management.",
    tag: "Material Modules",
    color: "#6b7280",
    accent: "#9ca3af",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80&fit=crop",
  },
  {
    id: 19,
    icon: "⚖️",
    title: "Weigh Bridge Integration",
    subtitle: "& Dispatch Sync",
    desc: "Live data exchange with weighbridges and dispatch systems. Eliminate double-entry, ensure payload accuracy at every gate.",
    tag: "Integration",
    color: "#1d4ed8",
    accent: "#3b82f6",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop",
  },
  {
    id: 20,
    icon: "🏭",
    title: "Material Management",
    subtitle: "Workshop & Inventory",
    desc: "Track spares, lubricants, tyres, and components from PO to consumption. Keep workshops running without stock-outs.",
    tag: "Inventory",
    color: "#92400e",
    accent: "#b45309",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&fit=crop",
  },
  {
    id: 21,
    icon: "📱",
    title: "Mobile Apps",
    subtitle: "Built for Your Business",
    desc: "Android & iOS apps tailored to your operational roles — supervisor, operator, admin. Everything accessible from the field.",
    tag: "Mobile First",
    color: "#0891b2",
    accent: "#06b6d4",
    img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80&fit=crop",
  },
  {
    id: 22,
    icon: "🤝",
    title: "Customer-Specific Scope",
    subtitle: "Based on Affordability",
    desc: "Modular pricing. Start with what you need, scale as you grow. Every mine is different — your solution should be too.",
    tag: "Flexible Plans",
    color: "#15803d",
    accent: "#22c55e",
    img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&fit=crop",
  },
];

export default function FeatureCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [bgAnimating, setBgAnimating] = useState(false);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const go = useCallback(
    (next) => {
      if (animating || next === current) return;
      const dir = next > current ? 1 : -1;
      setDirection(dir);
      setPrev(current);
      setCurrent(next);
      setAnimating(true);
      setBgAnimating(true);
      setTimeout(() => { setPrev(null); setAnimating(false); }, 650);
      setTimeout(() => setBgAnimating(false), 900);
    },
    [animating, current]
  );

  const goNext = useCallback(() => go((current + 1) % total), [go, current, total]);
  const goPrev = useCallback(() => go((current - 1 + total) % total), [go, current, total]);

  // Always auto-advance, no pause on hover
  useEffect(() => {
    timerRef.current = setTimeout(goNext, 4000);
    return () => clearTimeout(timerRef.current);
  }, [current, goNext]);

  const slide = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Exo+2:ital,wght@0,300;0,400;0,700;1,300&display=swap');

        @keyframes slideInR { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInL { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutL { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
        @keyframes slideOutR { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes iconPop { 0% { transform: scale(0.5) rotate(-15deg); opacity: 0; } 65% { transform: scale(1.15) rotate(4deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes barFill { from { width: 0%; } to { width: 100%; } }
        @keyframes bgZoom { from { transform: scale(1.08); } to { transform: scale(1.0); } }
        @keyframes bgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:.3; } }

        .in-r  { animation: slideInR  0.6s cubic-bezier(.22,1,.36,1) both; }
        .in-l  { animation: slideInL  0.6s cubic-bezier(.22,1,.36,1) both; }
        .out-l { animation: slideOutL 0.5s cubic-bezier(.55,0,.8,.6) both; }
        .out-r { animation: slideOutR 0.5s cubic-bezier(.55,0,.8,.6) both; }
      `}</style>

      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ fontFamily: "'Exo 2', sans-serif", background: "#050709" }}
      >
        {/* ── BACKGROUND LAYER ── */}
        <div className="absolute inset-0 z-0">
          {/* prev bg fading out */}
          {prevSlide && (
            <div
              key={`bg-prev-${prev}`}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${prevSlide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: `bgFadeIn 0.6s ease reverse both`,
              }}
            />
          )}
          {/* current bg zooming in */}
          <div
            key={`bg-curr-${current}`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation: "bgZoom 6s ease-out forwards, bgFadeIn 0.7s ease both",
            }}
          />
          {/* heavy dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,0.85) 100%)" }} />
          {/* color tint from slide */}
          <div className="absolute inset-0 transition-all duration-1000" style={{ background: `${slide.color}18`, mixBlendMode: "overlay" }} />
          {/* scanline sweep */}
          <div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${slide.color}60, transparent)`, animation: "scanline 7s linear infinite", opacity: 0.6 }}
          />
          {/* grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* ── HEADER ── */}
        <div className="relative z-10 mb-6 flex flex-col items-center gap-1 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-px w-10 transition-all duration-700" style={{ background: slide.color }} />
            <span className="text-xs uppercase tracking-[0.35em] transition-colors duration-500" style={{ color: slide.color, fontFamily: "'Rajdhani',sans-serif", fontWeight: 600 }}>
              Mining Intelligence Suite
            </span>
            <div className="h-px w-10 transition-all duration-700" style={{ background: slide.color }} />
          </div>
          <p className="text-white/25 text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
            Platform Features — {String(current + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </p>
        </div>

        {/* ── CARD STAGE ── */}
        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-8" style={{ minHeight: 340 }}>
          {/* exiting */}
          {prevSlide && (
            <div key={`card-prev-${prev}`} className={`absolute inset-0 ${direction > 0 ? "out-l" : "out-r"}`}>
              <Card slide={prevSlide} entering={false} />
            </div>
          )}
          {/* entering */}
          <div key={`card-curr-${current}`} className={animating ? (direction > 0 ? "in-r" : "in-l") : ""}>
            <Card slide={slide} entering={true} />
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="relative z-10 w-full max-w-4xl px-4 sm:px-8 mt-5">
          <div className="w-full h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              key={current}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${slide.color}, ${slide.accent})`, animation: "barFill 4s linear forwards" }}
            />
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div className="relative z-10 flex items-center gap-5 mt-6 mb-8">
          <button
            onClick={goPrev}
            className="w-9 h-9 flex items-center justify-center rounded text-white/50 hover:text-white text-xl transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >‹</button>

          {/* Dot nav */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center" style={{ maxWidth: 340 }}>
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 18 : 5,
                  height: 5,
                  background: i === current ? slide.color : "rgba(255,255,255,0.18)",
                  boxShadow: i === current ? `0 0 8px ${slide.color}` : "none",
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-9 h-9 flex items-center justify-center rounded text-white/50 hover:text-white text-xl transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >›</button>
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        <div className="relative z-10 w-full overflow-x-auto pb-4 px-4">
          <div className="flex gap-2 w-max mx-auto">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="flex-shrink-0 rounded overflow-hidden transition-all duration-300 relative"
                style={{
                  width: i === current ? 72 : 48,
                  height: 36,
                  border: i === current ? `2px solid ${s.color}` : "2px solid transparent",
                  opacity: i === current ? 1 : 0.4,
                  boxShadow: i === current ? `0 0 12px ${s.color}60` : "none",
                }}
              >
                <img src={s.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: i === current ? `${s.color}30` : "rgba(0,0,0,0.4)" }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ slide, entering }) {
  return (
    <div
      className="w-full rounded-2xl relative overflow-hidden flex flex-col justify-between"
      style={{
        minHeight: 320,
        background: "rgba(0,0,0,0.45)",
        border: `1px solid rgba(255,255,255,0.07)`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${slide.color}, ${slide.accent}, transparent)` }} />

      {/* corner glow */}
      <div className="absolute top-0 left-0 w-48 h-48 pointer-events-none rounded-tl-2xl"
        style={{ background: `radial-gradient(circle at top left, ${slide.color}20 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom right, ${slide.color}15 0%, transparent 70%)` }} />

      <div className="p-7 md:p-10">
        {/* top row */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            {/* icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `${slide.color}20`,
                border: `1px solid ${slide.color}50`,
                animation: entering ? "iconPop 0.55s cubic-bezier(.22,1,.36,1) 0.05s both" : "none",
              }}
            >
              {slide.icon}
            </div>
            {/* tag */}
            <div
              className="px-3 py-1 rounded text-xs uppercase tracking-widest"
              style={{
                background: `${slide.color}20`,
                border: `1px solid ${slide.color}40`,
                color: slide.accent,
                fontFamily: "'Rajdhani',sans-serif",
                fontWeight: 700,
                animation: entering ? "fadeUp 0.4s ease 0.1s both" : "none",
              }}
            >{slide.tag}</div>
          </div>

          {/* feature number */}
          <div
            className="text-6xl font-black leading-none select-none"
            style={{
              fontFamily: "'Rajdhani',sans-serif",
              color: `${slide.color}25`,
            }}
          >{String(slide.id).padStart(2, "0")}</div>
        </div>

        {/* title */}
        <h2
          className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-1"
          style={{
            fontFamily: "'Rajdhani',sans-serif",
            fontWeight: 700,
            animation: entering ? "fadeUp 0.45s ease 0.15s both" : "none",
          }}
        >{slide.title}</h2>

        {/* subtitle */}
        <div
          className="text-base font-light italic mb-5"
          style={{
            color: slide.accent,
            animation: entering ? "fadeUp 0.45s ease 0.22s both" : "none",
          }}
        >{slide.subtitle}</div>

        {/* divider */}
        <div
          className="w-14 h-0.5 mb-5 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${slide.color}, transparent)`,
            animation: entering ? "fadeUp 0.45s ease 0.27s both" : "none",
          }}
        />

        {/* desc */}
        <p
          className="text-white/55 leading-relaxed text-sm sm:text-base max-w-xl"
          style={{ animation: entering ? "fadeUp 0.45s ease 0.33s both" : "none" }}
        >{slide.desc}</p>
      </div>
    </div>
  );
}