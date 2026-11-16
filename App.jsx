import { useState, useEffect, useRef } from "react";
import {
  motion, AnimatePresence, useReducedMotion, useScroll, useTransform,
  useMotionValue, useSpring,
} from "framer-motion";
import { Instagram, X, ArrowUpRight, Moon, Copy, Check } from "lucide-react";
import * as IMG from "./images";
import { C, T, SERVICES, GALLERY, WA_LINK, IG_LINK } from "./content";
import ChatWidget, { WhatsAppIcon } from "./ChatWidget";

const EASE = [0.76, 0, 0.24, 1];
const SOFT = [0.22, 1, 0.36, 1];
const RATIO = { wedding: 0.75, kids: 0.667, together: 0.75, chapter: 0.75, birthday: 1.15 };
const SERVICE_IMG = ["wedding", "kids", "together", "chapter", "wedding", "kids"];

const X_ = {
  sq: {
    statement: "Çdo festë ka një çast që nuk përsëritet. Ne e veshim me lule, dritë dhe detaje, që ju të mendoni vetëm të jeni aty.",
    scroll: "Zbrit", talk: "Na shkruani", copy: "Kopjo numrin", copied: "Numri u kopjua",
    more: "Më shumë në Instagram", drag: "Skrollo për të parë punët",
  },
  en: {
    statement: "Every celebration has a moment that never repeats. We dress it in flowers, light and detail, so all you have to do is be there.",
    scroll: "Scroll", talk: "Let's talk", copy: "Copy number", copied: "Number copied",
    more: "More on Instagram", drag: "Scroll to see our work",
  },
};

/* ---------- helpers ---------- */
function Cursor() {
  const [fine, setFine] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32 });
  const sy = useSpring(y, { stiffness: 380, damping: 32 });
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    setFine(true);
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest?.("a,button,[data-hover]")); };
    window.addEventListener("mousemove", mv);
    return () => window.removeEventListener("mousemove", mv);
  }, [x, y]);
  if (!fine) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-white"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }}
      animate={{ scale: big ? 1.9 : 1, backgroundColor: big ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" }}
      transition={{ duration: 0.3 }}
    />
  );
}

function Preloader({ ready }) {
  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
          style={{ background: C.ink, color: C.ivory }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <motion.div initial={{ opacity: 0, scale: 0.6, rotate: -25 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, ease: SOFT }}>
            <Moon size={44} strokeWidth={1} style={{ color: C.gold }} />
          </motion.div>
          <div className="flex overflow-hidden font-display text-4xl font-light sm:text-6xl" aria-label="Moonlight Events">
            {"Moonlight".split("").map((ch, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.3 + i * 0.05, ease: SOFT }}>{ch}</motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Word({ children, p, range }) {
  const o = useTransform(p, range, [0.14, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{children}</motion.span>;
}

function Statement({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="mx-auto max-w-5xl font-display text-[2rem] font-light leading-[1.15] sm:text-5xl lg:text-6xl">
      {words.map((w, i) => (
        <Word key={i + text} p={scrollYProgress} range={[(i / words.length) * 0.85, (i / words.length) * 0.85 + 0.15]}>{w}</Word>
      ))}
    </p>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [lang, setLang] = useState("sq");
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(null);
  const [hover, setHover] = useState(null);
  const [copied, setCopied] = useState(false);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();
  const t = T[lang], x_ = X_[lang];

  const heroRef = useRef(null), galRef = useRef(null), trackRef = useRef(null);
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yA = useTransform(hp, [0, 1], [0, -180]);
  const yB = useTransform(hp, [0, 1], [0, -340]);
  const yC = useTransform(hp, [0, 1], [0, -90]);
  const yArch = useTransform(hp, [0, 1], [0, 110]);
  const yTitle = useTransform(hp, [0, 1], [0, -50]);
  const { scrollYProgress: gp } = useScroll({ target: galRef, offset: ["start start", "end end"] });
  const gx = useTransform(gp, [0, 1], [0, -dist]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 22 }), sy = useSpring(my, { stiffness: 160, damping: 22 });

  useEffect(() => { const id = setTimeout(() => setReady(true), reduce ? 200 : 2300); return () => clearTimeout(id); }, [reduce]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    const k = (e) => e.key === "Escape" && setLight(null);
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("keydown", k);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", k); };
  }, []);
  useEffect(() => {
    const m = () => trackRef.current && setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    m(); const id = setTimeout(m, 500);
    window.addEventListener("resize", m);
    return () => { clearTimeout(id); window.removeEventListener("resize", m); };
  }, [lang]);

  const copyNumber = async () => {
    try { await navigator.clipboard.writeText("+355684005525"); } catch (_) {}
    setCopied(true); setTimeout(() => setCopied(false), 2200);
  };

  const hv = (a) => (ready ? { initial: reduce ? false : { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.4, delay: a, ease: SOFT } } : { initial: { opacity: 0 } });

  return (
    <div className="font-body antialiased" style={{ background: C.ivory, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        .font-display{font-family:'Cormorant Garamond',Georgia,serif}
        .font-body{font-family:'Jost',system-ui,sans-serif}
        html{scroll-behavior:smooth} body{margin:0;overflow-x:hidden}
        @media (pointer:fine){ *{cursor:none!important} }
        a:focus-visible,button:focus-visible{outline:2px solid #B7A8CC;outline-offset:3px}
        @keyframes marquee{to{transform:translateX(-50%)}}
        .marquee{animation:marquee 38s linear infinite}
        @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        .floaty{animation:floaty 7s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.marquee,.floaty{animation:none}}
      `}</style>

      <Preloader ready={ready} />
      <Cursor />

      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 transition-all duration-500" style={{ background: scrolled ? "rgba(251,247,241,0.82)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: `1px solid ${scrolled ? C.rose : "transparent"}` }}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-10">
          <a href="#top" className="font-display text-xl sm:text-2xl">Moonlight <span className="italic" style={{ color: C.gold }}>Events</span></a>
          <nav className="flex items-center gap-4 text-sm sm:gap-8">
            {["services", "gallery", "contact"].map((k) => (
              <a key={k} href={`#${k}`} className="hidden transition hover:opacity-50 md:inline" style={{ color: C.mute }}>{t.nav[k]}</a>
            ))}
            <div className="flex overflow-hidden rounded-full border text-xs" style={{ borderColor: C.rose }} role="group" aria-label="Language">
              {[["sq", "SQ"], ["en", "EN"]].map(([k, l]) => (
                <button key={k} onClick={() => setLang(k)} aria-pressed={lang === k} className="px-3 py-1.5 transition" style={{ background: lang === k ? C.ink : "transparent", color: lang === k ? C.ivory : C.mute }}>{l}</button>
              ))}
            </div>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1 rounded-full px-4 py-2 text-xs transition hover:opacity-80 sm:inline-flex" style={{ background: C.ink, color: C.ivory }}>{x_.talk}</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section ref={heroRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0" aria-hidden="true" style={{ background: `radial-gradient(60% 50% at 50% 45%, ${C.rose}88, transparent 70%)` }} />

          {/* floating photos */}
          {[
            { k: "wedding", cls: "left-[3%] top-[16%] w-[26vw] sm:w-[17vw]", y: yA, r: -5 },
            { k: "kids", cls: "right-[3%] top-[12%] w-[24vw] sm:w-[15vw]", y: yB, r: 4 },
            { k: "together", cls: "left-[9%] bottom-[9%] hidden w-[14vw] sm:block", y: yC, r: 3 },
            { k: "birthday", cls: "right-[8%] bottom-[7%] w-[28vw] sm:w-[18vw]", y: yA, r: -3 },
          ].map((f, i) => (
            <motion.div key={f.k} className={`absolute z-10 ${f.cls}`} style={{ y: f.y, rotate: f.r }}
              initial={{ opacity: 0, scale: 0.9 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.4, delay: 0.5 + i * 0.15, ease: SOFT }}>
              <div className="rounded-[14px] p-1.5 shadow-[0_30px_60px_-30px_rgba(61,52,65,0.45)]" style={{ background: C.ivory }}>
                <img src={IMG[f.k]} alt="" className="block h-auto w-full rounded-[10px]" decoding="async" />
              </div>
            </motion.div>
          ))}

          {/* arch: logo ne hyrje */}
          <motion.div style={{ y: yArch }} className="relative z-[5] w-[min(64vw,420px)]">
            <motion.div {...hv(0.1)} className="floaty">
              <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[24px] p-2" style={{ background: C.rose }}>
                <img src={IMG.hero} alt="Moonlight Decor and Gifts" width={1024} height={1024} className="h-full w-full rounded-t-[999px] rounded-b-[18px] object-cover" />
              </div>
            </motion.div>
          </motion.div>

          {/* giant wordmark, inverts over the dark logo */}
          <motion.h1 style={{ y: yTitle, mixBlendMode: "difference" }} className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 text-center font-display font-light leading-[0.8] text-white">
            <span className="block overflow-hidden pb-2 text-[clamp(3.4rem,15.5vw,14rem)]">
              <motion.span className="block" initial={{ y: "105%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.3, delay: 0.2, ease: SOFT }}>Moonlight</motion.span>
            </span>
            <span className="block overflow-hidden pb-3 text-[clamp(3.4rem,15.5vw,14rem)] italic">
              <motion.span className="block" initial={{ y: "105%" }} animate={ready ? { y: 0 } : {}} transition={{ duration: 1.3, delay: 0.4, ease: SOFT }}>Events</motion.span>
            </span>
          </motion.h1>

          <motion.p {...hv(1.2)} className="absolute bottom-16 left-1/2 z-30 w-[90%] -translate-x-1/2 text-center font-display text-xl italic sm:text-3xl">“{t.slogan}”</motion.p>
          <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-xs tracking-wide" style={{ color: C.mute }}>{x_.scroll}</div>
        </section>

        {/* MARQUEE */}
        <section aria-hidden="true" className="overflow-hidden whitespace-nowrap border-y py-7" style={{ borderColor: C.rose, background: C.cream }}>
          <div className="marquee inline-flex">
            {[0, 1].map((n) => (
              <div key={n} className="flex items-center">
                {SERVICES.map((s, i) => (
                  <span key={i} className="flex items-center font-display text-4xl font-light italic sm:text-6xl">
                    <span className="px-8">{s[lang][0]}</span><Moon size={22} strokeWidth={1.2} style={{ color: C.gold }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* STATEMENT */}
        <section className="px-6 py-36 text-center sm:px-10 sm:py-48"><Statement text={x_.statement} /></section>

        {/* SERVICES */}
        <section id="services" className="relative px-5 pb-32 sm:px-10" onMouseMove={(e) => { mx.set(e.clientX); my.set(e.clientY); }}>
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-6xl font-light sm:text-8xl">{t.servicesTitle}</h2>
              <p className="max-w-xs leading-relaxed" style={{ color: C.mute }}>{t.servicesIntro}</p>
            </div>
            <ul onMouseLeave={() => setHover(null)}>
              {SERVICES.map((s, i) => (
                <motion.li key={i} data-hover onMouseEnter={() => setHover(i)}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.9, delay: i * 0.04, ease: SOFT }}
                  className="flex items-center justify-between gap-6 border-t py-7 transition-all duration-500 sm:py-9"
                  style={{ borderColor: C.rose, opacity: hover === null || hover === i ? 1 : 0.3, paddingLeft: hover === i ? 24 : 0 }}>
                  <div>
                    <h3 className="font-display text-4xl font-light sm:text-7xl">{s[lang][0]}</h3>
                    <p className="mt-2 max-w-md text-[15px]" style={{ color: C.mute }}>{s[lang][1]}</p>
                  </div>
                  <img src={IMG[SERVICE_IMG[i]]} alt="" className="h-24 w-20 shrink-0 rounded-[12px] object-cover md:hidden" />
                  <ArrowUpRight className="hidden md:block" size={34} strokeWidth={1} style={{ color: C.gold, opacity: hover === i ? 1 : 0, transition: "opacity .4s" }} />
                </motion.li>
              ))}
              <li className="border-t" style={{ borderColor: C.rose }} aria-hidden="true" />
            </ul>
          </div>
          <AnimatePresence>
            {hover !== null && (
              <motion.div key="prev" className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block" style={{ x: sx, y: sy }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatePresence mode="wait">
                  <motion.img key={hover} src={IMG[SERVICE_IMG[hover]]} alt="" initial={{ opacity: 0, scale: 0.88, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.35, ease: SOFT }}
                    className="-ml-[130px] -mt-[175px] h-[350px] w-[260px] rounded-[16px] border-[6px] object-cover shadow-[0_40px_80px_-30px_rgba(61,52,65,0.6)]" style={{ borderColor: C.ivory }} />
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* GALLERY — pinned horizontal scroll */}
        <section id="gallery" ref={galRef} style={{ height: `calc(100vh + ${dist}px)`, background: C.cream }} className="relative">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div ref={trackRef} style={{ x: gx }} className="flex items-center gap-8 pl-[6vw] pr-[10vw] sm:gap-14">
              <div className="w-[78vw] shrink-0 sm:w-[30vw]">
                <h2 className="font-display text-6xl font-light sm:text-8xl">{t.galleryTitle}</h2>
                <p className="mt-5" style={{ color: C.mute }}>{t.galleryIntro}</p>
                <p className="mt-10 text-xs" style={{ color: C.mute }}>{x_.drag} →</p>
              </div>
              {GALLERY.map((g) => (
                <figure key={g.src} className="shrink-0">
                  <button data-hover onClick={() => setLight(g)} className="group block overflow-hidden rounded-t-[999px] rounded-b-[18px] p-2" style={{ background: C.ivory, border: `1px solid ${C.rose}` }}>
                    <div className="overflow-hidden rounded-t-[999px] rounded-b-[12px]" style={{ height: "62vh", aspectRatio: RATIO[g.src] }}>
                      <img src={IMG[g.src]} alt={g[lang]} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" decoding="async" />
                    </div>
                  </button>
                  <figcaption className="mt-4 text-center font-display text-xl italic" style={{ color: C.mute }}>{g[lang]}</figcaption>
                </figure>
              ))}
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="flex h-[62vh] w-[60vw] shrink-0 flex-col items-center justify-center gap-4 rounded-[18px] border text-center transition hover:bg-white/50 sm:w-[24vw]" style={{ borderColor: C.lavender }}>
                <Instagram size={36} strokeWidth={1.2} />
                <span className="font-display text-3xl italic">{x_.more}</span>
                <span className="text-sm" style={{ color: C.mute }}>@moonlight_eventsgift</span>
              </a>
            </motion.div>
            <motion.div className="absolute bottom-8 left-[6vw] h-px origin-left" style={{ scaleX: gp, width: "88vw", background: C.gold }} />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative overflow-hidden px-6 py-40 text-center sm:px-10">
          <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[110px]" style={{ background: `radial-gradient(circle, ${C.rose}, ${C.lavender}55 60%, transparent 70%)` }} aria-hidden="true" />
          <motion.div className="relative" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: SOFT }}>
            <h2 className="mx-auto max-w-4xl font-display text-6xl font-light leading-[0.95] sm:text-8xl">{t.contactTitle}</h2>
            <p className="mx-auto mt-6 max-w-md leading-relaxed" style={{ color: C.mute }}>{t.contactText}</p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm transition hover:opacity-85" style={{ background: C.ink, color: C.ivory }}><WhatsAppIcon size={18} /> +355 68 400 5525</a>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm transition hover:bg-white/60" style={{ borderColor: C.ink }}><Instagram size={18} /> @moonlight_eventsgift</a>
              <button onClick={copyNumber} className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm transition hover:bg-white/60" style={{ color: C.mute }} aria-live="polite">
                {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? x_.copied : x_.copy}
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="overflow-hidden px-5 pb-8 pt-10 sm:px-10" style={{ background: C.cream }}>
        <div className="select-none text-center font-display font-light leading-[0.85]" style={{ fontSize: "clamp(4rem,21vw,22rem)", color: C.rose }} aria-hidden="true">Moonlight</div>
        <p className="mt-6 text-center text-xs" style={{ color: C.mute }}>© {new Date().getFullYear()} Moonlight Events. {t.footer}</p>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {light && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLight(null)} className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10" style={{ background: "rgba(61,52,65,0.92)" }} role="dialog" aria-modal="true">
            <button className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white" aria-label={t.close}><X size={22} /></button>
            <motion.img initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={IMG[light.src]} alt={light[lang]} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-2xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(37,160,90,0.6)] transition hover:scale-105 sm:right-8" style={{ background: "#3FAE6A" }}>
        <WhatsAppIcon />
      </a>
      <ChatWidget lang={lang} />
    </div>
  );
}
