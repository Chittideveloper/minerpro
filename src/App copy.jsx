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
  },
  {
    id: 11,
    icon: "⛏️",
    title: "Depth-wise Excavation Tracking",
    subtitle: "Shovel Deployment Assist",
    desc: "Monitor excavation depth in real time and generate data-driven shovel deployment plans. Maximize bench utilization.",
    tag: "Excavation",
    color: "#92400e",
    accent: "#d97706",
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
  },
  {
    id: 18,
    icon: "⚫",
    title: "Waste & Coal Modules",
    subtitle: "Mineral Management",
    desc: "Separate tracking workflows for overburden and mineral hauls. Precise stripping ratios, coal dispatch, and grade management.",
    tag: "Material Modules",
    color: "#374151",
    accent: "#6b7280",
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
  },
];

export default function FeatureCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const go = useCallback(
    (next) => {
      if (animating || next === current) return;
      setDirection(next > current ? 1 : -1);
      setPrev(current);
      setCurrent(next);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 600);
    },
    [animating, current]
  );

  const next = useCallback(() => go((current + 1) % total), [go, current, total]);
  const prev2 = useCallback(() => go((current - 1 + total) % total), [go, current, total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 3800);
    return () => clearTimeout(timerRef.current);
  }, [current, paused, next]);

  const slide = SLIDES[current];
  const prevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Exo+2:ital,wght@0,300;0,700;1,300&display=swap');

        @keyframes slideInRight {
          from { transform: translateX(80px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-80px); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to   { transform: translateX(-80px); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to   { transform: translateX(80px); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes iconPop {
          0%   { transform: scale(0.6) rotate(-12deg); opacity: 0; }
          60%  { transform: scale(1.12) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes barFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes gridShift {
          from { background-position: 0 0; }
          to   { background-position: 40px 40px; }
        }
        .in-right  { animation: slideInRight 0.55s cubic-bezier(.22,1,.36,1) both; }
        .in-left   { animation: slideInLeft  0.55s cubic-bezier(.22,1,.36,1) both; }
        .out-left  { animation: slideOutLeft  0.45s cubic-bezier(.55,0,.8,.6) both; }
        .out-right { animation: slideOutRight 0.45s cubic-bezier(.55,0,.8,.6) both; }
      `}</style>

      <div
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "#0b0d11",
          fontFamily: "'Exo 2', sans-serif",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Animated grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            animation: "gridShift 8s linear infinite",
          }}
        />

        {/* Glow blob */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-1000"
          style={{
            width: 600,
            height: 600,
            background: slide.color,
            filter: "blur(160px)",
            opacity: 0.12,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Header label */}
        <div className="relative z-10 mb-10 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-12" style={{ background: slide.color, transition: "background 0.5s" }} />
            <span
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: slide.color, fontFamily: "'Rajdhani', sans-serif", transition: "color 0.5s" }}
            >
              Platform Features
            </span>
            <div className="h-px w-12" style={{ background: slide.color, transition: "background 0.5s" }} />
          </div>
          <p className="text-white/20 text-xs tracking-widest uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Mining Intelligence Suite
          </p>
        </div>

        {/* Card Stage */}
        <div className="relative z-10 w-full max-w-3xl px-6" style={{ minHeight: 360 }}>
          {/* Exiting card */}
          {prevSlide && (
            <div
              key={`prev-${prev}`}
              className={`absolute inset-0 ${direction > 0 ? "out-left" : "out-right"}`}
            >
              <SlideCard slide={prevSlide} entering={false} />
            </div>
          )}
          {/* Entering card */}
          <div
            key={`curr-${current}`}
            className={animating ? (direction > 0 ? "in-right" : "in-left") : ""}
          >
            <SlideCard slide={slide} entering={true} />
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 w-full max-w-3xl px-6 mt-6">
          <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
            <div
              key={current}
              className="h-full rounded-full"
              style={{
                background: slide.color,
                animation: paused ? "none" : "barFill 3.8s linear forwards",
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-6 mt-8">
          <button
            onClick={prev2}
            className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white/40 text-white/40 hover:text-white transition-all duration-200 rounded"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            ‹
          </button>

          {/* Dot nav */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  background: i === current ? slide.color : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-white/40 text-white/40 hover:text-white transition-all duration-200 rounded"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            ›
          </button>
        </div>

        {/* Counter */}
        <div className="relative z-10 mt-4 text-white/20 text-xs tracking-widest" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
    </>
  );
}

function SlideCard({ slide, entering }) {
  return (
    <div
      className="w-full rounded-2xl p-8 md:p-12 relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid rgba(255,255,255,0.07)`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${slide.color}22 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at bottom right, ${slide.color}18 0%, transparent 70%)`,
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
          style={{
            background: `${slide.color}18`,
            border: `1px solid ${slide.color}40`,
            animation: entering ? "iconPop 0.55s cubic-bezier(.22,1,.36,1) 0.1s both" : "none",
          }}
        >
          {slide.icon}
        </div>

        {/* Tag */}
        <div
          className="px-3 py-1 rounded text-xs uppercase tracking-widest"
          style={{
            background: `${slide.color}18`,
            border: `1px solid ${slide.color}40`,
            color: slide.accent,
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            animation: entering ? "fadeUp 0.5s ease 0.15s both" : "none",
          }}
        >
          {slide.tag}
        </div>
      </div>

      {/* Title */}
      <h2
        className="text-4xl md:text-5xl font-bold text-white leading-tight mb-1"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          animation: entering ? "fadeUp 0.5s ease 0.2s both" : "none",
        }}
      >
        {slide.title}
      </h2>

      {/* Subtitle */}
      <div
        className="text-base font-light mb-6"
        style={{
          color: slide.accent,
          fontStyle: "italic",
          animation: entering ? "fadeUp 0.5s ease 0.28s both" : "none",
        }}
      >
        {slide.subtitle}
      </div>

      {/* Divider */}
      <div
        className="w-16 h-0.5 mb-6 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${slide.color}, transparent)`,
          animation: entering ? "fadeUp 0.5s ease 0.32s both" : "none",
        }}
      />

      {/* Desc */}
      <p
        className="text-white/50 leading-relaxed text-sm md:text-base max-w-xl"
        style={{
          animation: entering ? "fadeUp 0.5s ease 0.38s both" : "none",
        }}
      >
        {slide.desc}
      </p>

      {/* Feature number watermark */}
      <div
        className="absolute bottom-6 right-8 text-7xl font-black pointer-events-none select-none"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: `${slide.color}10`,
          lineHeight: 1,
        }}
      >
        {String(slide.id).padStart(2, "0")}
      </div>
    </div>
  );
}