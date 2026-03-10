import { useState, useEffect, useRef, useCallback } from "react";
import image1 from "./assets/images/hero-mining.jpg";
import logo from "./assets/images/tgg_logo.png";

const SLIDES = [
  {
    id: 1, icon: "🎯", title: "Trip Count & Lead Distance", subtitle: "100% Accuracy",
    desc: "Capture every trip with pinpoint precision. Know exact lead distances, cycle times, and payload counts — zero guesswork, total control.",
    tag: "Fleet Intelligence", color: "#f59e0b", accent: "#fbbf24", img: image1,
  },
  {
    id: 2, icon: "📡", title: "Track Every Vehicle", subtitle: "Measure Every Move",
    desc: "Real-time GPS tracking across your entire fleet. Monitor position, speed, idle time, and route deviation from a single command center.",
    tag: "Live Tracking", color: "#10b981", accent: "#34d399", img: image1,
  },
  {
    id: 3, icon: "🔗", title: "Excavator–Dumper Association", subtitle: "Smart Pairing Engine",
    desc: "Automatically link excavators with dumpers per trip. Identify bottlenecks, optimize loading queues, and eliminate dead haul time.",
    tag: "Association", color: "#3b82f6", accent: "#60a5fa", img: image1,
  },
  {
    id: 4, icon: "📹", title: "Two-Way Audio Video", subtitle: "On-Demand Communication",
    desc: "Instant live video and voice between operators, supervisors, and control rooms. No delays, no third-party apps — built right in.",
    tag: "Communication", color: "#8b5cf6", accent: "#a78bfa", img: image1,
  },
  {
    id: 5, icon: "⛽", title: "Monitor Fuel Use", subtitle: "Every Trip, Every Day",
    desc: "CAN bus & fuel sensor integration for trip-level and daily consumption analytics. Detect theft, idle burns, and inefficiency instantly.",
    tag: "Fuel Analytics", color: "#ef4444", accent: "#f87171", img: image1,
  },
  {
    id: 6, icon: "🪪", title: "Know Who's Behind the Wheel", subtitle: "Driver Identification",
    desc: "RFID & biometric driver login ensures accountability. Know the exact operator for every machine, every shift, every second.",
    tag: "Driver ID", color: "#f59e0b", accent: "#fcd34d", img: image1,
  },
  {
    id: 7, icon: "📊", title: "Driver & Machine Efficiency", subtitle: "Measured Together",
    desc: "Correlate operator behavior with machine output. Score productivity, benchmark against peers, and coach for peak performance.",
    tag: "Efficiency", color: "#10b981", accent: "#6ee7b7", img: image1,
  },
  {
    id: 8, icon: "🤳", title: "Smart Facial Attendance", subtitle: "Seamless Shift Control",
    desc: "AI-powered face recognition for attendance and shift handover. Eliminate buddy punching and manual registers forever.",
    tag: "Attendance", color: "#06b6d4", accent: "#22d3ee", img: image1,
  },
  {
    id: 9, icon: "🛢️", title: "Fuel Fillings & Consumption", subtitle: "Trip-wise & Day-wise",
    desc: "Log every refuel event. Compare filled vs. consumed quantities by trip and shift. Full fuel lifecycle transparency.",
    tag: "Fuel Tracking", color: "#f97316", accent: "#fb923c", img: image1,
  },
  {
    id: 10, icon: "🔧", title: "Alert for Breakdowns", subtitle: "Monitoring & Analysis",
    desc: "Predictive breakdown alerts, downtime logs, and maintenance analysis dashboards. Reduce unplanned stops and extend machine life.",
    tag: "Maintenance", color: "#dc2626", accent: "#f87171", img: image1,
  },
  {
    id: 11, icon: "⛏️", title: "Depth-wise Excavation Tracking", subtitle: "Shovel Deployment Assist",
    desc: "Monitor excavation depth in real time and generate data-driven shovel deployment plans. Maximize bench utilization.",
    tag: "Excavation", color: "#d97706", accent: "#fbbf24", img: image1,
  },
  {
    id: 12, icon: "📈", title: "Track Every KPI", subtitle: "Boost Every Ton",
    desc: "From OEE to payload per hour — all critical mining KPIs in one unified dashboard. Drive continuous improvement with data.",
    tag: "KPI Dashboard", color: "#7c3aed", accent: "#8b5cf6", img: image1,
  },
  {
    id: 13, icon: "🚛", title: "Vehicle Health & Output", subtitle: "Every Unit, Every Day",
    desc: "Engine hours, fault codes, tyre pressure, battery vitals — comprehensive health monitoring for every machine in your fleet.",
    tag: "Health Monitor", color: "#059669", accent: "#10b981", img: image1,
  },
  {
    id: 14, icon: "👷", title: "Operator Productivity", subtitle: "See How Operators Drive It",
    desc: "Visualize individual operator performance trends. Identify top performers and those needing intervention before output drops.",
    tag: "Operator Analytics", color: "#b45309", accent: "#f59e0b", img: image1,
  },
  {
    id: 15, icon: "🚜", title: "Dedicated Reports", subtitle: "Dozers · Graders · Water Tankers",
    desc: "Purpose-built report modules for auxiliary equipment. Track blade hours, grading passes, and water dispatch independently.",
    tag: "Aux Equipment", color: "#0284c7", accent: "#38bdf8", img: image1,
  },
  {
    id: 16, icon: "🚁", title: "Drone-Based Live Maps", subtitle: "Aerial Intelligence",
    desc: "Real-time orthomosaic maps from drone feeds overlaid on pit plans. See the mine from above — updated continuously.",
    tag: "Drone Mapping", color: "#6d28d9", accent: "#7c3aed", img: image1,
  },
  {
    id: 17, icon: "🗺️", title: "Depth-wise Excavation", subtitle: "& Trip Monitoring",
    desc: "Combine spatial depth data with trip counts for a complete excavation progress picture. Know exactly what's been moved where.",
    tag: "Geo-Analytics", color: "#065f46", accent: "#059669", img: image1,
  },
  {
    id: 18, icon: "⚫", title: "Waste & Coal Modules", subtitle: "Mineral Management",
    desc: "Separate tracking workflows for overburden and mineral hauls. Precise stripping ratios, coal dispatch, and grade management.",
    tag: "Material Modules", color: "#6b7280", accent: "#9ca3af", img: image1,
  },
  {
    id: 19, icon: "⚖️", title: "Weigh Bridge Integration", subtitle: "& Dispatch Sync",
    desc: "Live data exchange with weighbridges and dispatch systems. Eliminate double-entry, ensure payload accuracy at every gate.",
    tag: "Integration", color: "#1d4ed8", accent: "#3b82f6", img: image1,
  },
  {
    id: 20, icon: "🏭", title: "Material Management", subtitle: "Workshop & Inventory",
    desc: "Track spares, lubricants, tyres, and components from PO to consumption. Keep workshops running without stock-outs.",
    tag: "Inventory", color: "#92400e", accent: "#b45309", img: image1,
  },
  {
    id: 21, icon: "📱", title: "Mobile Apps", subtitle: "Built for Your Business",
    desc: "Android & iOS apps tailored to your operational roles — supervisor, operator, admin. Everything accessible from the field.",
    tag: "Mobile First", color: "#0891b2", accent: "#06b6d4", img: image1,
  },
  {
    id: 22, icon: "🤝", title: "Customer-Specific Scope", subtitle: "Based on Affordability",
    desc: "Modular pricing. Start with what you need, scale as you grow. Every mine is different — your solution should be too.",
    tag: "Flexible Plans", color: "#15803d", accent: "#22c55e", img: image1,
  },
];

const WHY_POINTS = [
  { icon: "⛏️", text: "Domain Expertise in Mining" },
  { icon: "🎯", text: "100% Accurate Trip Data with Lead Analytics" },
  { icon: "🔗", text: "Integration with ERP" },
  { icon: "🤖", text: "AI at Your Service" },
  { icon: "🚁", text: "Drone-Based Updated Maps" },
  { icon: "🛠️", text: "Lifetime Software & Customization Support" },
  { icon: "🕐", text: "24/7 On-Field Technical Support" },
  { icon: "💰", text: "No Capital Investment — Covered Under OPEX" },
];

// ── Single feature card (compact, for dual display) ──
function MiniCard({ slide, entering, delay = 0 }) {
  return (
    <div
      className="flex-1 min-w-0 rounded-2xl overflow-hidden relative flex flex-col"
      style={{
        background: "rgba(0,0,0,0.45)",
        border: `1px solid ${slide.color}30`,
        backdropFilter: "blur(28px)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.5)`,
        animation: entering ? `fadeUp .5s ease ${delay}s both` : "none",
      }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full flex-shrink-0"
        style={{ background: `linear-gradient(90deg,${slide.color},${slide.accent} 60%,transparent)` }} />

      {/* Corner glow top-left */}
      <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left,${slide.color}18 0%,transparent 70%)` }} />
      {/* Corner glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-28 h-28 pointer-events-none"
        style={{ background: `radial-gradient(circle at bottom right,${slide.color}12 0%,transparent 70%)` }} />

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Icon + tag + number */}
        <div className="flex items-center gap-2 mb-3"
          style={{ animation: entering ? `fadeUp .45s ease ${delay + 0.06}s both` : "none" }}>
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
            style={{
              background: `${slide.color}20`,
              border: `1px solid ${slide.color}55`,
              animation: entering ? `iconBounce .5s ease ${delay + 0.05}s both` : "none",
            }}
          >
            {slide.icon}
          </div>
          <span
            className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-[.22em] leading-tight"
            style={{ background: `${slide.color}20`, border: `1px solid ${slide.color}40`, color: slide.accent, fontFamily: "'Rajdhani',sans-serif" }}
          >
            {slide.tag}
          </span>
          <span className="ml-auto font-black text-2xl sm:text-3xl leading-none select-none"
            style={{ fontFamily: "'Rajdhani',sans-serif", color: `${slide.color}22` }}>
            {String(slide.id).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-bold text-white leading-tight mb-1"
          style={{
            fontFamily: "'Rajdhani',sans-serif",
            fontSize: "clamp(16px, 2vw, 28px)",
            animation: entering ? `fadeUp .42s ease ${delay + 0.1}s both` : "none",
          }}
        >
          {slide.title}
        </h2>

        {/* Subtitle */}
        <div
          className="italic font-light text-xs sm:text-sm mb-3"
          style={{ color: slide.accent, animation: entering ? `fadeUp .42s ease ${delay + 0.15}s both` : "none" }}
        >
          {slide.subtitle}
        </div>

        {/* Divider */}
        <div className="h-px w-10 mb-3 rounded-full flex-shrink-0"
          style={{ background: `linear-gradient(90deg,${slide.color},transparent)` }} />

        {/* Description */}
        <p
          className="text-white/50 leading-relaxed text-xs sm:text-[13px] flex-1"
          style={{ animation: entering ? `fadeUp .42s ease ${delay + 0.2}s both` : "none" }}
        >
          {slide.desc}
        </p>

        {/* Bottom status row */}
        <div className="mt-3 pt-2 flex items-center gap-2 flex-shrink-0"
          style={{ borderTop: `1px solid ${slide.color}15` }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: slide.color, boxShadow: `0 0 6px ${slide.color}` }} />
          <span className="text-[9px] uppercase tracking-widest" style={{ color: slide.color, fontFamily: "'Rajdhani',sans-serif" }}>
            Active Module
          </span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [pairIndex, setPairIndex] = useState(0);
  const [prevPairIndex, setPrevPairIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const total = SLIDES.length;
  const pairCount = Math.ceil(total / 2); // 11 pairs for 22 slides

  const go = useCallback((nextPair) => {
    if (animating || nextPair === pairIndex) return;
    setDirection(nextPair > pairIndex ? 1 : -1);
    setPrevPairIndex(pairIndex);
    setPairIndex(nextPair);
    setAnimating(true);
    setTimeout(() => { setPrevPairIndex(null); setAnimating(false); }, 700);
  }, [animating, pairIndex]);

  const goNext = useCallback(() => go((pairIndex + 1) % pairCount), [go, pairIndex, pairCount]);
  const goPrev = useCallback(() => go((pairIndex - 1 + pairCount) % pairCount), [go, pairIndex, pairCount]);

  // Always auto-advance — no pause on hover
  useEffect(() => {
    timerRef.current = setTimeout(goNext, 4200);
    return () => clearTimeout(timerRef.current);
  }, [pairIndex, goNext]);

  const leftIdx = (pairIndex * 2) % total;
  const rightIdx = (pairIndex * 2 + 1) % total;
  const slideLeft = SLIDES[leftIdx];
  const slideRight = SLIDES[rightIdx];
  const bgSlide = slideLeft; // background driven by left card

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;1,400&display=swap');

        @keyframes pairInR   { from{transform:translateX(100%) scale(.97);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        @keyframes pairInL   { from{transform:translateX(-100%) scale(.97);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        @keyframes pairOutL  { from{transform:translateX(0) scale(1);opacity:1} to{transform:translateX(-105%) scale(.97);opacity:0} }
        @keyframes pairOutR  { from{transform:translateX(0) scale(1);opacity:1} to{transform:translateX(105%) scale(.97);opacity:0} }

        @keyframes bgKenBurns { from{transform:scale(1.08)} to{transform:scale(1.0)} }
        @keyframes bgWipeR    { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes bgWipeL    { from{clip-path:inset(0 0 0 100%)} to{clip-path:inset(0 0 0 0%)} }

        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes iconBounce { 0%{transform:scale(0) rotate(-20deg);opacity:0} 65%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes barFill    { from{width:0%} to{width:100%} }
        @keyframes scanMove   { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes logoPulse  { 0%,100%{filter:drop-shadow(0 0 8px rgba(245,158,11,0.4))} 50%{filter:drop-shadow(0 0 20px rgba(245,158,11,0.7))} }
        @keyframes splitGlow  { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.9;transform:scale(1.4)} }

        .pair-in-r  { animation: pairInR  .65s cubic-bezier(.2,1,.3,1) both; }
        .pair-in-l  { animation: pairInL  .65s cubic-bezier(.2,1,.3,1) both; }
        .pair-out-l { animation: pairOutL .52s cubic-bezier(.6,0,.8,.6) both; }
        .pair-out-r { animation: pairOutR .52s cubic-bezier(.6,0,.8,.6) both; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div
        className="relative w-full min-h-screen overflow-hidden flex flex-col"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#050709" }}
      >

        {/* ═══ BACKGROUND ═══ */}
        <div className="absolute inset-0 z-0">
          <div
            key={`bg-${pairIndex}`}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgSlide.img})`,
              backgroundSize: "cover", backgroundPosition: "center",
              animation: `bgKenBurns 7s ease-out forwards, ${direction > 0 ? "bgWipeR" : "bgWipeL"} 0.7s ease both`,
            }}
          />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right,rgba(0,0,0,0.93) 0%,rgba(0,0,0,0.62) 60%,rgba(0,0,0,0.87) 100%)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top,rgba(0,0,0,0.88) 0%,transparent 50%,rgba(0,0,0,0.52) 100%)" }} />
          <div className="absolute inset-0 transition-all duration-1000"
            style={{ background: `radial-gradient(ellipse at 50% 50%,${bgSlide.color}1a 0%,transparent 70%)` }} />
          <div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg,transparent,${bgSlide.color}55,transparent)`, animation: "scanMove 8s linear infinite" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)`,
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.6) 100%)" }} />
        </div>

        {/* ═══ HEADER ═══ */}
        <div
          className="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-4 pb-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-2 flex-wrap">
            {["IoT in Mining", "GPS & IoT Sensors", "Drones", "App Dev"].map((t, i) => (
              <span key={i}
                className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
                style={{ background: `${bgSlide.color}18`, border: `1px solid ${bgSlide.color}35`, color: bgSlide.accent, fontFamily: "'Rajdhani',sans-serif", transition: "all .5s" }}>
                {t}
              </span>
            ))}
          </div>
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className="text-white/40 text-[11px] tracking-widest" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              📧 info@transglobalgeomatics.com
            </span>
            <span className="text-white/40 text-[11px] tracking-widest" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              📞 +91-9849252434 / 9866479962
            </span>
          </div>
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch min-h-0">

          {/* ── LEFT SIDEBAR ── */}
          <div
            className="lg:w-[280px] xl:w-[320px] flex-shrink-0 flex flex-col justify-center px-5 sm:px-7 py-4 gap-4"
            style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center gap-2" style={{ animation: "fadeIn 1s ease both" }}>
              <div style={{ animation: "logoPulse 3s ease-in-out infinite" }}>
                <img src={logo} alt="Trans Global Geomatics Logo" width={52} />
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-base leading-tight"
                  style={{ fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.1em" }}>
                  TRANS GLOBAL GEOMATICS
                </div>
                <div className="text-xs tracking-[.2em] uppercase"
                  style={{ color: bgSlide.accent, fontFamily: "'Rajdhani',sans-serif" }}>
                  Pvt. Ltd.
                </div>
              </div>
              <div className="w-20 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${bgSlide.color},transparent)` }} />
            </div>

            {/* About */}
            <div className="rounded-xl p-3"
              style={{ background: "rgba(0,0,0,0.38)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <p className="text-white/55 text-[12px] leading-relaxed">
                At <span className="font-bold" style={{ color: bgSlide.accent }}>TGG Pvt Ltd</span>, we prioritize maximizing the productivity of every piece of equipment. Our operations follow strict protocols with live vehicle monitoring powered by advanced video telematics, GPS tracking, and IoT solutions.
              </p>
            </div>

            {/* Why Trans Global */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${bgSlide.color},transparent)` }} />
                <span className="text-[9px] font-bold uppercase tracking-[.25em] whitespace-nowrap"
                  style={{ color: bgSlide.color, fontFamily: "'Rajdhani',sans-serif" }}>
                  Why Trans Global?
                </span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,${bgSlide.color})` }} />
              </div>
              <div className="grid grid-cols-1 gap-1">
                {WHY_POINTS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-xs flex-shrink-0">{p.icon}</span>
                    <span className="text-white/60 text-[11px] leading-tight">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: DUAL CAROUSEL ── */}
          <div className="flex-1 flex flex-col justify-between py-4 px-3 sm:px-5 min-h-0 overflow-hidden">

            {/* Counter row */}
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded-full" style={{ background: bgSlide.color }} />
                <span className="text-[10px] uppercase tracking-[.3em] text-white/40"
                  style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                  Platform Features
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/30 text-[10px]" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                  Showing{" "}
                  <span style={{ color: slideLeft.color, fontWeight: 700 }}>{leftIdx + 1}</span>
                  {" "}&amp;{" "}
                  <span style={{ color: slideRight.color, fontWeight: 700 }}>{rightIdx + 1}</span>
                  {" "}of {total}
                </span>
                <div className="font-black text-lg" style={{ fontFamily: "'Rajdhani',sans-serif", color: bgSlide.color }}>
                  {String(pairIndex + 1).padStart(2, "0")}
                  <span className="text-white/20 text-sm font-normal">/{String(pairCount).padStart(2, "0")}</span>
                </div>
              </div>
            </div>

            {/* ── DUAL CARD STAGE ── */}
            <div className="relative flex-1 overflow-hidden" style={{ minHeight: 240 }}>

              {/* Exiting pair */}
              {prevPairIndex !== null && (() => {
                const pL = SLIDES[(prevPairIndex * 2) % total];
                const pR = SLIDES[(prevPairIndex * 2 + 1) % total];
                return (
                  <div className={`absolute inset-0 flex gap-2 sm:gap-3 items-stretch ${direction > 0 ? "pair-out-l" : "pair-out-r"}`}>
                    <MiniCard slide={pL} entering={false} delay={0} />
                    <div className="flex-shrink-0 w-3 sm:w-4" />
                    <MiniCard slide={pR} entering={false} delay={0} />
                  </div>
                );
              })()}

              {/* Entering pair */}
              <div
                key={`pair-${pairIndex}`}
                className={`absolute inset-0 flex gap-2 sm:gap-3 items-stretch ${animating ? (direction > 0 ? "pair-in-r" : "pair-in-l") : ""}`}
              >
                <MiniCard slide={slideLeft} entering={true} delay={0} />

                {/* Center divider */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1 w-3 sm:w-4">
                  <div className="flex-1 w-px"
                    style={{ background: `linear-gradient(to bottom,transparent,${slideLeft.color}50,${slideRight.color}50,transparent)` }} />
                  <div className="w-2 h-2 rounded-full"
                    style={{ background: bgSlide.color, animation: "splitGlow 2s ease-in-out infinite", boxShadow: `0 0 8px ${bgSlide.color}` }} />
                  <div className="flex-1 w-px"
                    style={{ background: `linear-gradient(to bottom,transparent,${slideRight.color}50,${slideLeft.color}50,transparent)` }} />
                </div>

                <MiniCard slide={slideRight} entering={true} delay={0.09} />
              </div>
            </div>

            {/* Dual progress bar */}
            <div className="mt-3 mb-2 flex-shrink-0 flex gap-1">
              <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div key={`l-${pairIndex}`} className="h-full rounded-full"
                  style={{ background: slideLeft.color, animation: "barFill 4.2s linear forwards" }} />
              </div>
              <div className="flex-shrink-0 w-3 sm:w-4" />
              <div className="flex-1 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div key={`r-${pairIndex}`} className="h-full rounded-full"
                  style={{ background: slideRight.color, animation: "barFill 4.2s linear forwards 0.09s" }} />
              </div>
            </div>

            {/* Arrows + pair dots */}
            <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <button onClick={goPrev}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg text-white/50 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>‹</button>

              {/* Paired dots — each pair = two colored dots side by side */}
              <div className="flex items-center gap-2 flex-wrap justify-center" style={{ maxWidth: 360 }}>
                {Array.from({ length: pairCount }).map((_, i) => {
                  const sl = SLIDES[(i * 2) % total];
                  const sr = SLIDES[(i * 2 + 1) % total];
                  const isCurrent = i === pairIndex;
                  return (
                    <button key={i} onClick={() => go(i)}
                      className="flex items-center gap-0.5 transition-all duration-300"
                      title={`${sl.title} & ${sr.title}`}
                    >
                      <div className="rounded-full transition-all duration-300"
                        style={{
                          width: isCurrent ? 10 : 5, height: 5,
                          background: isCurrent ? sl.color : "rgba(255,255,255,0.15)",
                          boxShadow: isCurrent ? `0 0 6px ${sl.color}` : "none",
                        }} />
                      <div className="rounded-full transition-all duration-300"
                        style={{
                          width: isCurrent ? 10 : 5, height: 5,
                          background: isCurrent ? sr.color : "rgba(255,255,255,0.15)",
                          boxShadow: isCurrent ? `0 0 6px ${sr.color}` : "none",
                        }} />
                    </button>
                  );
                })}
              </div>

              <button onClick={goNext}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg text-white/50 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>›</button>
            </div>

            {/* Thumbnail strip — paired thumbnails */}
            <div className="overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-2 pb-1" style={{ width: "max-content" }}>
                {Array.from({ length: pairCount }).map((_, i) => {
                  const sl = SLIDES[(i * 2) % total];
                  const sr = SLIDES[(i * 2 + 1) % total];
                  const isCurrent = i === pairIndex;
                  return (
                    <button key={i} onClick={() => go(i)}
                      className="flex gap-px rounded overflow-hidden relative"
                      style={{
                        opacity: isCurrent ? 1 : 0.35,
                        transform: isCurrent ? "scale(1.06)" : "scale(1)",
                        transition: "all .35s ease",
                      }}>
                      {/* Left thumb */}
                      <div className="relative overflow-hidden"
                        style={{
                          width: isCurrent ? 36 : 24, height: 30,
                          borderRadius: "4px 0 0 4px",
                          border: `2px solid ${isCurrent ? sl.color : "transparent"}`,
                          borderRight: "none",
                          boxShadow: isCurrent ? `0 0 8px ${sl.color}50` : "none",
                          transition: "all .35s",
                        }}>
                        <img src={sl.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0"
                          style={{ background: isCurrent ? `${sl.color}28` : "rgba(0,0,0,0.5)" }} />
                        {isCurrent && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: sl.color }} />}
                      </div>
                      {/* Right thumb */}
                      <div className="relative overflow-hidden"
                        style={{
                          width: isCurrent ? 36 : 24, height: 30,
                          borderRadius: "0 4px 4px 0",
                          border: `2px solid ${isCurrent ? sr.color : "transparent"}`,
                          borderLeft: "none",
                          boxShadow: isCurrent ? `0 0 8px ${sr.color}50` : "none",
                          transition: "all .35s",
                        }}>
                        <img src={sr.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0"
                          style={{ background: isCurrent ? `${sr.color}28` : "rgba(0,0,0,0.5)" }} />
                        {isCurrent && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: sr.color }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div
          className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.6)" }}
        >
          <a href="https://transglobalgeomatics.com/" target="_blank" rel="noopener noreferrer" className="m-0">
            <span className="text-white/90 text-[9px] tracking-widest uppercase"
              style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              © 2026 Trans Global Geomatics Pvt. Ltd. — All Rights Reserved
            </span>
          </a>
          <div className="sm:hidden flex flex-col gap-0.5">
            <span className="text-white/45 text-[9px]">📧 info@transglobalgeomatics.com</span>
            <span className="text-white/45 text-[9px]">📞 +91-9849252434 / 9866479962</span>
          </div>
          <div className="flex gap-3">
            {["IoT", "GPS", "Drones", "Mining"].map((t, i) => (
              <span key={i} className="text-[9px] uppercase tracking-widest"
                style={{ color: bgSlide.color, fontFamily: "'Rajdhani',sans-serif" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}