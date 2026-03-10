import { useState, useEffect, useRef, useCallback } from "react";
import image1 from "./assets/images/hero-mining.jpg";
import logo from "./assets/images/tgg_logo.png";

const SLIDES = [
  {
    id: 1, icon: "🎯", title: "Trip Count & Lead Distance", subtitle: "100% Accuracy",
    desc: "Capture every trip with pinpoint precision. Know exact lead distances, cycle times, and payload counts — zero guesswork, total control.",
    tag: "Fleet Intelligence", color: "#f59e0b", accent: "#fbbf24",
    img: image1,
  },
  {
    id: 2, icon: "📡", title: "Track Every Vehicle", subtitle: "Measure Every Move",
    desc: "Real-time GPS tracking across your entire fleet. Monitor position, speed, idle time, and route deviation from a single command center.",
    tag: "Live Tracking", color: "#10b981", accent: "#34d399",
    img: image1,
  },
  {
    id: 3, icon: "🔗", title: "Excavator–Dumper Association", subtitle: "Smart Pairing Engine",
    desc: "Automatically link excavators with dumpers per trip. Identify bottlenecks, optimize loading queues, and eliminate dead haul time.",
    tag: "Association", color: "#3b82f6", accent: "#60a5fa",
    img: image1,
  },
  {
    id: 4, icon: "📹", title: "Two-Way Audio Video", subtitle: "On-Demand Communication",
    desc: "Instant live video and voice between operators, supervisors, and control rooms. No delays, no third-party apps — built right in.",
    tag: "Communication", color: "#8b5cf6", accent: "#a78bfa",
    img: image1,
  },
  {
    id: 5, icon: "⛽", title: "Monitor Fuel Use", subtitle: "Every Trip, Every Day",
    desc: "CAN bus & fuel sensor integration for trip-level and daily consumption analytics. Detect theft, idle burns, and inefficiency instantly.",
    tag: "Fuel Analytics", color: "#ef4444", accent: "#f87171",
    img: image1,
  },
  {
    id: 6, icon: "🪪", title: "Know Who's Behind the Wheel", subtitle: "Driver Identification",
    desc: "RFID & biometric driver login ensures accountability. Know the exact operator for every machine, every shift, every second.",
    tag: "Driver ID", color: "#f59e0b", accent: "#fcd34d",
    img: image1,
  },
  {
    id: 7, icon: "📊", title: "Driver & Machine Efficiency", subtitle: "Measured Together",
    desc: "Correlate operator behavior with machine output. Score productivity, benchmark against peers, and coach for peak performance.",
    tag: "Efficiency", color: "#10b981", accent: "#6ee7b7",
    img: "https://cdn.pixabay.com/photo/2020/02/04/20/05/mining-4819487_1280.jpg",
  },
  {
    id: 8, icon: "🤳", title: "Smart Facial Attendance", subtitle: "Seamless Shift Control",
    desc: "AI-powered face recognition for attendance and shift handover. Eliminate buddy punching and manual registers forever.",
    tag: "Attendance", color: "#06b6d4", accent: "#22d3ee",
    img: "https://cdn.pixabay.com/photo/2016/11/14/04/45/mining-1822428_1280.jpg",
  },
  {
    id: 9, icon: "🛢️", title: "Fuel Fillings & Consumption", subtitle: "Trip-wise & Day-wise",
    desc: "Log every refuel event. Compare filled vs. consumed quantities by trip and shift. Full fuel lifecycle transparency.",
    tag: "Fuel Tracking", color: "#f97316", accent: "#fb923c",
    img: "https://cdn.pixabay.com/photo/2017/05/09/03/46/oil-2297347_1280.jpg",
  },
  {
    id: 10, icon: "🔧", title: "Alert for Breakdowns", subtitle: "Monitoring & Analysis",
    desc: "Predictive breakdown alerts, downtime logs, and maintenance analysis dashboards. Reduce unplanned stops and extend machine life.",
    tag: "Maintenance", color: "#dc2626", accent: "#f87171",
    img: "https://cdn.pixabay.com/photo/2015/09/05/20/02/machinery-925750_1280.jpg",
  },
  {
    id: 11, icon: "⛏️", title: "Depth-wise Excavation Tracking", subtitle: "Shovel Deployment Assist",
    desc: "Monitor excavation depth in real time and generate data-driven shovel deployment plans. Maximize bench utilization.",
    tag: "Excavation", color: "#d97706", accent: "#fbbf24",
    img: "https://cdn.pixabay.com/photo/2016/11/18/12/51/mining-1834857_1280.jpg",
  },
  {
    id: 12, icon: "📈", title: "Track Every KPI", subtitle: "Boost Every Ton",
    desc: "From OEE to payload per hour — all critical mining KPIs in one unified dashboard. Drive continuous improvement with data.",
    tag: "KPI Dashboard", color: "#7c3aed", accent: "#8b5cf6",
    img: "https://cdn.pixabay.com/photo/2019/04/12/19/53/quarry-4123268_1280.jpg",
  },
  {
    id: 13, icon: "🚛", title: "Vehicle Health & Output", subtitle: "Every Unit, Every Day",
    desc: "Engine hours, fault codes, tyre pressure, battery vitals — comprehensive health monitoring for every machine in your fleet.",
    tag: "Health Monitor", color: "#059669", accent: "#10b981",
    img: "https://cdn.pixabay.com/photo/2014/07/05/08/20/truck-384563_1280.jpg",
  },
  {
    id: 14, icon: "👷", title: "Operator Productivity", subtitle: "See How Operators Drive It",
    desc: "Visualize individual operator performance trends. Identify top performers and those needing intervention before output drops.",
    tag: "Operator Analytics", color: "#b45309", accent: "#f59e0b",
    img: "https://cdn.pixabay.com/photo/2016/04/01/10/10/worker-1299138_1280.jpg",
  },
  {
    id: 15, icon: "🚜", title: "Dedicated Reports", subtitle: "Dozers · Graders · Water Tankers",
    desc: "Purpose-built report modules for auxiliary equipment. Track blade hours, grading passes, and water dispatch independently.",
    tag: "Aux Equipment", color: "#0284c7", accent: "#38bdf8",
    img: "https://cdn.pixabay.com/photo/2019/09/29/22/06/bulldozer-4514090_1280.jpg",
  },
  {
    id: 16, icon: "🚁", title: "Drone-Based Live Maps", subtitle: "Aerial Intelligence",
    desc: "Real-time orthomosaic maps from drone feeds overlaid on pit plans. See the mine from above — updated continuously.",
    tag: "Drone Mapping", color: "#6d28d9", accent: "#7c3aed",
    img: "https://cdn.pixabay.com/photo/2016/01/20/11/10/drone-1151313_1280.jpg",
  },
  {
    id: 17, icon: "🗺️", title: "Depth-wise Excavation", subtitle: "& Trip Monitoring",
    desc: "Combine spatial depth data with trip counts for a complete excavation progress picture. Know exactly what's been moved where.",
    tag: "Geo-Analytics", color: "#065f46", accent: "#059669",
    img: "https://cdn.pixabay.com/photo/2018/08/23/07/35/excavator-3625117_1280.jpg",
  },
  {
    id: 18, icon: "⚫", title: "Waste & Coal Modules", subtitle: "Mineral Management",
    desc: "Separate tracking workflows for overburden and mineral hauls. Precise stripping ratios, coal dispatch, and grade management.",
    tag: "Material Modules", color: "#6b7280", accent: "#9ca3af",
    img: "https://cdn.pixabay.com/photo/2014/08/08/21/39/coal-413487_1280.jpg",
  },
  {
    id: 19, icon: "⚖️", title: "Weigh Bridge Integration", subtitle: "& Dispatch Sync",
    desc: "Live data exchange with weighbridges and dispatch systems. Eliminate double-entry, ensure payload accuracy at every gate.",
    tag: "Integration", color: "#1d4ed8", accent: "#3b82f6",
    img: "https://cdn.pixabay.com/photo/2017/08/10/08/34/truck-2619498_1280.jpg",
  },
  {
    id: 20, icon: "🏭", title: "Material Management", subtitle: "Workshop & Inventory",
    desc: "Track spares, lubricants, tyres, and components from PO to consumption. Keep workshops running without stock-outs.",
    tag: "Inventory", color: "#92400e", accent: "#b45309",
    img: "https://cdn.pixabay.com/photo/2017/09/07/08/54/crane-2724086_1280.jpg",
  },
  {
    id: 21, icon: "📱", title: "Mobile Apps", subtitle: "Built for Your Business",
    desc: "Android & iOS apps tailored to your operational roles — supervisor, operator, admin. Everything accessible from the field.",
    tag: "Mobile First", color: "#0891b2", accent: "#06b6d4",
    img: "https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-594090_1280.jpg",
  },
  {
    id: 22, icon: "🤝", title: "Customer-Specific Scope", subtitle: "Based on Affordability",
    desc: "Modular pricing. Start with what you need, scale as you grow. Every mine is different — your solution should be too.",
    tag: "Flexible Plans", color: "#15803d", accent: "#22c55e",
    img: "https://cdn.pixabay.com/photo/2017/10/10/21/49/joystick-2836842_1280.jpg",
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

function TGGLogo({ color = "#f59e0b", size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke={color} strokeWidth="2" fill="rgba(0,0,0,0.4)" />
      <text x="32" y="26" textAnchor="middle" fill={color} fontSize="14" fontWeight="900" fontFamily="'Rajdhani',sans-serif" letterSpacing="1">TGG</text>
      <text x="32" y="40" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="'Rajdhani',sans-serif" letterSpacing="1.5" opacity="0.85">TRANSGLOBAL</text>
      <text x="32" y="49" textAnchor="middle" fill="white" fontSize="5" fontFamily="'Rajdhani',sans-serif" letterSpacing="1" opacity="0.6">GEOMATICS PVT LTD</text>
      <line x1="14" y1="31" x2="50" y2="31" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function SlideCard({ slide, entering }) {
  return (
    <div className="w-full max-w-xl relative" style={{ filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.7))" }}>
      <div className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(0,0,0,0.42)", border: `1px solid rgba(255,255,255,0.08)`, backdropFilter: "blur(28px)" }}>
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg,${slide.color},${slide.accent} 50%,transparent)` }} />
        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-3 mb-4"
            style={{ animation: entering ? "fadeUp .4s ease .05s both" : "none" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: `${slide.color}22`, border: `1px solid ${slide.color}55`, animation: entering ? "iconBounce .5s ease .05s both" : "none" }}>
              {slide.icon}
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-[.25em]"
              style={{ background: `${slide.color}22`, border: `1px solid ${slide.color}44`, color: slide.accent, fontFamily: "'Rajdhani',sans-serif" }}>
              {slide.tag}
            </span>
          </div>
          <h2 className="font-bold leading-tight mb-1 text-white"
            style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: "clamp(22px,4vw,42px)", animation: entering ? "fadeUp .42s ease .12s both" : "none" }}>
            {slide.title}
          </h2>
          <div className="italic font-light text-sm sm:text-base mb-4"
            style={{ color: slide.accent, animation: entering ? "fadeUp .42s ease .18s both" : "none" }}>
            {slide.subtitle}
          </div>
          <div className="h-px w-14 mb-4 rounded-full"
            style={{ background: `linear-gradient(90deg,${slide.color},transparent)`, animation: entering ? "fadeUp .42s ease .22s both" : "none" }} />
          <p className="text-white/50 leading-relaxed text-xs sm:text-sm max-w-md"
            style={{ animation: entering ? "fadeUp .42s ease .28s both" : "none" }}>
            {slide.desc}
          </p>
        </div>
        <div className="absolute bottom-3 right-4 font-black leading-none select-none pointer-events-none"
          style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 70, color: `${slide.color}10` }}>
          {String(slide.id).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const [stack, setStack] = useState([]);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const go = useCallback((next) => {
    if (animating || next === current) return;
    setDirection(next > current ? 1 : -1);
    setStack([current]);
    setCurrent(next);
    setAnimating(true);
    setTimeout(() => { setStack([]); setAnimating(false); }, 700);
  }, [animating, current]);

  const goNext = useCallback(() => go((current + 1) % total), [go, current, total]);
  const goPrev = useCallback(() => go((current - 1 + total) % total), [go, current, total]);

  useEffect(() => {
    timerRef.current = setTimeout(goNext, 4200);
    return () => clearTimeout(timerRef.current);
  }, [current, goNext]);

  const slide = SLIDES[current];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;1,400&display=swap');
        @keyframes slideInFromRight { from{transform:translateX(110%) scale(.97);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        @keyframes slideInFromLeft  { from{transform:translateX(-110%) scale(.97);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        @keyframes slideOutToLeft   { from{transform:translateX(0) scale(1);opacity:1} to{transform:translateX(-110%) scale(.97);opacity:0} }
        @keyframes slideOutToRight  { from{transform:translateX(0) scale(1);opacity:1} to{transform:translateX(110%) scale(.97);opacity:0} }
        @keyframes bgKenBurns { from{transform:scale(1.1)} to{transform:scale(1.0)} }
        @keyframes bgWipeR    { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes bgWipeL    { from{clip-path:inset(0 0 0 100%)} to{clip-path:inset(0 0 0 0%)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes iconBounce { 0%{transform:scale(0) rotate(-20deg);opacity:0} 65%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes barFill    { from{width:0%} to{width:100%} }
        @keyframes scanMove   { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes logoPulse  { 0%,100%{filter:drop-shadow(0 0 8px rgba(245,158,11,0.4))} 50%{filter:drop-shadow(0 0 20px rgba(245,158,11,0.7))} }
        @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .card-in-r  { animation: slideInFromRight .65s cubic-bezier(.2,1,.3,1) both; }
        .card-in-l  { animation: slideInFromLeft  .65s cubic-bezier(.2,1,.3,1) both; }
        .card-out-l { animation: slideOutToLeft   .55s cubic-bezier(.6,0,.8,.6) both; }
        .card-out-r { animation: slideOutToRight  .55s cubic-bezier(.6,0,.8,.6) both; }
        ::-webkit-scrollbar { display:none; }
      `}</style>

      <div className="relative w-full min-h-screen overflow-hidden flex flex-col"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", background: "#050709" }}>

        {/* ═══ BACKGROUND ═══ */}
        <div className="absolute inset-0 z-0">
          <div key={`bg-${current}`} className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.img})`, backgroundSize: "cover", backgroundPosition: "center",
              animation: `bgKenBurns 7s ease-out forwards, ${direction > 0 ? "bgWipeR" : "bgWipeL"} 0.7s ease both`,
            }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.6) 60%,rgba(0,0,0,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 50%,rgba(0,0,0,0.5) 100%)" }} />
          <div className="absolute inset-0 transition-all duration-1000" style={{ background: `radial-gradient(ellipse at 40% 50%,${slide.color}22 0%,transparent 65%)` }} />
          <div className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg,transparent,${slide.color}60,transparent)`, animation: "scanMove 8s linear infinite" }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
              backgroundSize: "56px 56px",
            }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center,transparent 35%,rgba(0,0,0,0.65) 100%)" }} />
        </div>

        {/* ═══ HEADER NAV ═══ */}
        <div className="relative z-20 flex items-center justify-between px-4 sm:px-8 pt-4 pb-2"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Left: Tags */}
          <div className="flex gap-2 flex-wrap">
            {["IoT in Mining", "GPS & IoT Sensors", "Drones", "App Dev"].map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
                style={{ background: `${slide.color}18`, border: `1px solid ${slide.color}35`, color: slide.accent, fontFamily: "'Rajdhani',sans-serif", transition: "all .5s" }}>
                {t}
              </span>
            ))}
          </div>
          {/* Right: Contact */}
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className="text-white/40 text-[12px] tracking-widest" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              📧 info@transglobalgeomatics.com
            </span>
            <span className="text-white/40 text-[12px] tracking-widest" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
              📞 +91-9849252434 / 9866479962
            </span>
          </div>
        </div>

        {/* ═══ MAIN CONTENT ═══ */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch">

          {/* ── LEFT PANEL: About + Why ── */}
          <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0 flex flex-col justify-center px-5 sm:px-8 py-6 gap-5"
            style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>

            {/* LOGO centered */}
            <div className="flex flex-col items-center gap-2" style={{ animation: "fadeIn 1s ease both" }}>
              <div style={{ animation: "logoPulse 3s ease-in-out infinite" }}>
                <img src={logo} alt="Trans Global Geomatics Logo" width={50} />
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-base sm:text-lg leading-tight" style={{ fontFamily: "'Rajdhani',sans-serif", letterSpacing: "0.1em" }}>
                  TRANS GLOBAL GEOMATICS
                </div>
                <div className="text-xs tracking-[.2em] uppercase" style={{ color: slide.accent, fontFamily: "'Rajdhani',sans-serif" }}>
                  Pvt. Ltd.
                </div>
              </div>
              {/* Divider */}
              <div className="w-24 h-px" style={{ background: `linear-gradient(90deg,transparent,${slide.color},transparent)` }} />
            </div>

            {/* About text */}
            <div className="rounded-xl p-4"
              style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
              <p className="text-white/55 text-md leading-relaxed">
                At <span className="font-bold" style={{ color: slide.accent }}>TGG Pvt Ltd</span>, we prioritize maximizing the productivity of every piece of equipment. Our operations follow strict protocols with live vehicle monitoring powered by advanced video telematics, GPS tracking, and IoT solutions. Combined with continuous training, these measures help minimize risks and drive higher efficiency.
              </p>
            </div>

            {/* Why Trans Global */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,${slide.color},transparent)` }} />
                <span className="text-[10px] font-bold uppercase tracking-[.25em] whitespace-nowrap"
                  style={{ color: slide.color, fontFamily: "'Rajdhani',sans-serif" }}>
                  Why Trans Global?
                </span>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,${slide.color})` }} />
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {WHY_POINTS.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-sm flex-shrink-0">{p.icon}</span>
                    <span className="text-white/65 text-[13px] leading-tight">{p.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Carousel ── */}
          <div className="flex-1 flex flex-col justify-between py-4 px-4 sm:px-6 min-h-0">

            {/* Feature counter */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ background: slide.color }} />
                <span className="text-[10px] uppercase tracking-[.3em] text-white/40" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                  Platform Features
                </span>
              </div>
              <div className="font-black text-xl" style={{ fontFamily: "'Rajdhani',sans-serif", color: slide.color }}>
                {String(current + 1).padStart(2, "0")}
                <span className="text-white/20 text-sm font-normal">/{String(total).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Card stage */}
            <div className="relative flex-1 flex items-center" style={{ minHeight: 260 }}>
              {stack.map(idx => (
                <div key={`out-${idx}`} className={`absolute inset-0 flex items-center ${direction > 0 ? "card-out-l" : "card-out-r"}`}>
                  <SlideCard slide={SLIDES[idx]} entering={false} />
                </div>
              ))}
              <div key={`in-${current}`} className={`w-full ${animating ? (direction > 0 ? "card-in-r" : "card-in-l") : ""}`}>
                <SlideCard slide={slide} entering={true} />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 mb-3">
              <div className="w-full h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div key={current} className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg,${slide.color},${slide.accent})`, animation: "barFill 4.2s linear forwards" }} />
              </div>
            </div>

            {/* Arrows + dots */}
            <div className="flex items-center justify-between mb-3">
              <button onClick={goPrev}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg text-white/50 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>‹</button>
              <div className="flex items-center gap-1.5 flex-wrap justify-center" style={{ maxWidth: 320 }}>
                {SLIDES.map((s, i) => (
                  <button key={i} onClick={() => go(i)} className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 20 : 5, height: 5,
                      background: i === current ? slide.color : "rgba(255,255,255,0.15)",
                      boxShadow: i === current ? `0 0 8px ${slide.color}` : "none",
                    }} />
                ))}
              </div>
              <button onClick={goNext}
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg text-white/50 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>›</button>
            </div>

            {/* Thumbnail strip */}
            <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <div className="flex gap-1.5 pb-1" style={{ width: "max-content" }}>
                {SLIDES.map((s, i) => (
                  <button key={i} onClick={() => go(i)} className="flex-shrink-0 rounded overflow-hidden relative transition-all duration-300"
                    style={{
                      width: i === current ? 72 : 44, height: 34,
                      border: `2px solid ${i === current ? s.color : "transparent"}`,
                      opacity: i === current ? 1 : 0.35,
                      boxShadow: i === current ? `0 0 12px ${s.color}60` : "none",
                    }}>
                    <img src={s.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0"
                      style={{ background: i === current ? `${s.color}30` : "rgba(0,0,0,0.45)" }} />
                    {i === current && <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: s.color }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM MARQUEE ═══ */}
        {/* <div className="relative z-20 overflow-hidden py-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.5)" }}>
          <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
            {Array(2).fill(
              " IoT in Mining   •   GPS Tracking  •   Drone Maps  •   AI Analytics  •   ERP Integration  •   Mobile Apps  •   Fuel Monitoring  •   Trip Accuracy  •   Breakdown Alerts  •   Operator Analytics  •  "
            ).join("").split("").map((ch, i) => (
              <span key={i} className="text-white/25 text-[10px] tracking-[.2em]" style={{ fontFamily: "'Rajdhani',sans-serif" }}>{ch}</span>
            ))}
          </div>
        </div> */}

        {/* ═══ FOOTER ═══ */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.6)" }}>
          <a href="" className="m-0"><span className="text-white/90 text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
            © 2026 Trans Global Geomatics Pvt. Ltd. — All Rights Reserved
          </span></a>
          <div className="sm:hidden flex flex-col gap-0.5">
            <span className="text-white/45 text-[9px]">📧 info@transglobalgeomatics.com</span>
            <span className="text-white/45 text-[9px]">📞 +91-9849252434 / 9866479962</span>
          </div>
          <div className="flex gap-3">
            {["IoT", "GPS", "Drones", "Mining"].map((t, i) => (
              <span key={i} className="text-[9px] uppercase tracking-widest" style={{ color: slide.color, fontFamily: "'Rajdhani',sans-serif" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}