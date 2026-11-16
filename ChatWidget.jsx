import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Moon } from "lucide-react";
import { C, T, FAQ, WA_LINK } from "./content";

export const WhatsAppIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path
      fill="currentColor"
      d="M16.6 14.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-1.3-.6-2.200-1.200-3-2.600-.2-.4.2-.4.6-1.200.1-.1 0-.3 0-.4l-.7-1.600c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.300-.2.200-.8.800-.8 1.900s.8 2.200.9 2.400c.1.200 1.600 2.500 3.900 3.400 1.900.7 2.300.6 2.700.5.400-.1 1.400-.6 1.600-1.100.2-.5.200-1 .1-1.100-.1-.1-.2-.1-.4-.2z"
    />
  </svg>
);


/* ---------- Chat widget ---------- */
export default function ChatWidget({ lang }) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState([]); // [{id}] stored by id so text follows the active language
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [log, open]);

  const ask = (id) => setLog((l) => [...l, { id }]);

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={t.chatTitle}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[70vh] w-[min(92vw,360px)] flex-col overflow-hidden rounded-[28px] border border-[#E8D5CC] bg-[#FBF7F1] shadow-[0_24px_60px_-24px_rgba(61,52,65,0.35)]"
          >
            <header className="flex items-center justify-between px-5 py-4" style={{ background: C.cream }}>
              <div className="flex items-center gap-2" style={{ color: C.ink }}>
                <Moon size={16} style={{ color: C.gold }} />
                <span className="font-display text-lg">{t.chatTitle}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t.close} className="rounded-full p-1 transition hover:bg-black/5">
                <X size={18} style={{ color: C.mute }} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4 text-[15px] leading-relaxed">
              <p className="max-w-[85%] rounded-2xl rounded-tl-md px-4 py-3" style={{ background: C.cream, color: C.ink }}>
                {t.chatHello}
              </p>
              {log.map((m, i) => {
                const f = FAQ.find((x) => x.id === m.id)[lang];
                return (
                  <div key={i} className="space-y-3">
                    <p className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md px-4 py-3 text-white" style={{ background: C.lavender }}>
                      {f[0]}
                    </p>
                    <p className="max-w-[85%] rounded-2xl rounded-tl-md px-4 py-3" style={{ background: C.cream, color: C.ink }}>
                      {f[1]}
                    </p>
                  </div>
                );
              })}
              <div ref={endRef} />
            </div>

            <div className="space-y-2 border-t border-[#E8D5CC] px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {FAQ.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => ask(q.id)}
                    className="rounded-full border px-3 py-1.5 text-left text-[13px] transition hover:bg-[#F3EBE0]"
                    style={{ borderColor: C.lavender, color: C.ink }}
                  >
                    {q[lang][0]}
                  </button>
                ))}
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full py-2.5 text-sm text-white transition hover:opacity-90"
                style={{ background: C.ink }}
              >
                <Send size={14} /> {t.wa}
              </a>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.chatOpen}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8D5CC] bg-[#FBF7F1] shadow-[0_10px_30px_-10px_rgba(61,52,65,0.35)] transition hover:scale-105"
        style={{ color: C.ink }}
      >
        {open ? <X size={20} /> : <Sparkles size={20} style={{ color: C.gold }} />}
      </button>
    </div>
  );
}

