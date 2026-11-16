/* ---------- Config ---------- */
export const WHATSAPP = "355684005525";
export const WA_LINK = `https://wa.me/${WHATSAPP}`;
export const IG_LINK = "https://instagram.com/moonlight_eventsgift";

export const C = {
  ivory: "#FBF7F1",
  cream: "#F3EBE0",
  rose: "#E8D5CC",
  lavender: "#B7A8CC",
  ink: "#3D3441",
  mute: "#7C7280",
  gold: "#B8975C",
};

/* ---------- Content (SQ / EN) ---------- */
export const T = {
  sq: {
    nav: { services: "Shërbimet", gallery: "Galeria", contact: "Kontakt" },
    slogan: "Making every moment unforgettable",
    sub: "Dekorime për dasma, ditëlindje dhe surpriza që mbahen mend gjatë.",
    cta: "Na shkruani në WhatsApp",
    servicesTitle: "Shërbimet tona",
    servicesIntro: "Çdo dekor krijohet sipas ëndrrës dhe hapësirës suaj.",
    galleryTitle: "Nga punët tona",
    galleryIntro: "Disa nga momentet që kemi dekoruar.",
    contactTitle: "Le ta planifikojmë së bashku",
    contactText: "Na tregoni datën dhe idenë tuaj, dhe do t'ju kthejmë përgjigje sa më shpejt.",
    footer: "Të gjitha të drejtat e rezervuara.",
    chatTitle: "Asistenti Moonlight",
    chatHello: "Përshëndetje! Zgjidhni një pyetje më poshtë, ose shkruani në WhatsApp.",
    chatOpen: "Hap asistentin",
    close: "Mbyll",
    wa: "Hap WhatsApp",
  },
  en: {
    nav: { services: "Services", gallery: "Gallery", contact: "Contact" },
    slogan: "Making every moment unforgettable",
    sub: "Decoration for weddings, birthdays and surprises people remember.",
    cta: "Message us on WhatsApp",
    servicesTitle: "Our services",
    servicesIntro: "Every decor is designed around your dream and your space.",
    galleryTitle: "Our work",
    galleryIntro: "A few of the moments we have decorated.",
    contactTitle: "Let's plan it together",
    contactText: "Tell us your date and your idea, and we will reply as soon as we can.",
    footer: "All rights reserved.",
    chatTitle: "Moonlight assistant",
    chatHello: "Hello! Pick a question below, or message us on WhatsApp.",
    chatOpen: "Open assistant",
    close: "Close",
    wa: "Open WhatsApp",
  },
};

export const SERVICES = [
  { sq: ["Dekor dasmash", "Skena, lule dhe ndriçim për ditën tuaj më të veçantë."], en: ["Wedding Decoration", "Stages, flowers and lighting for your most special day."] },
  { sq: ["Ditëlindje", "Tema për të vegjël dhe të rritur, deri te detaji i fundit."], en: ["Birthday Decoration", "Themes for kids and adults, down to the last detail."] },
  { sq: ["Surpriza online", "Dekor dhe dhurata të dërguara aty ku jeton personi që doni."], en: ["Online Surprises", "Decor and gifts delivered to the person you love."] },
  { sq: ["Shkrime në rrugë me tullumbace", "Mesazhi juaj me tullumbace, i lexueshëm nga larg."], en: ["Balloon Street Writings", "Your message in balloons, readable from afar."] },
  { sq: ["Buqeta lulesh", "Buqeta të punuara me dorë për çdo rast."], en: ["Flower Bouquets", "Hand-made bouquets for every occasion."] },
  { sq: ["Animacion", "Argëtim dhe lojëra që mbajnë të vegjlit të gëzuar."], en: ["Event Animation", "Entertainment and games that keep the little ones happy."] },
];

export const GALLERY = [
  { src: "wedding", sq: "Skena e dasmës", en: "Wedding stage" },
  { src: "kids", sq: "Tavolina e festës për fëmijë", en: "Kids' party table" },
  { src: "together", sq: "Surprizë në natyrë", en: "Outdoor surprise" },
  { src: "chapter", sq: "Ditëlindje me tullumbace", en: "Balloon birthday" },
  { src: "birthday", sq: "Ditëlindje në perëndim", en: "Sunset birthday" },
];

export const FAQ = [
  {
    id: "avail",
    sq: ["A jeni të lirë në datën time?", "Disponueshmëria varet nga data. Na dërgoni datën dhe vendin në WhatsApp dhe ju konfirmojmë shpejt."],
    en: ["Are you available on my date?", "Availability depends on the date. Send us the date and venue on WhatsApp and we will confirm quickly."],
  },
  {
    id: "quote",
    sq: ["Si mund të marr një ofertë?", "Na tregoni llojin e eventit, numrin e të ftuarve dhe idenë tuaj. Do t'ju japim një ofertë të personalizuar."],
    en: ["How do I get a quote?", "Tell us the event type, guest count and your idea. We will send you a custom quote."],
  },
  {
    id: "types",
    sq: ["Çfarë lloj dekorimesh bëni?", "Dekor dasmash, ditëlindje, surpriza online, shkrime me tullumbace, buqeta lulesh dhe animacion."],
    en: ["What types of decor do you do?", "Wedding and birthday decor, online surprises, balloon writings, flower bouquets and event animation."],
  },
  {
    id: "notice",
    sq: ["Sa kohë më parë duhet të rezervoj?", "Sa më herët aq më mirë, sidomos për dasma. Për surpriza të vogla mund të na shkruani edhe disa ditë përpara."],
    en: ["How far ahead should I book?", "The earlier the better, especially for weddings. For smaller surprises, a few days ahead can work."],
  },
  {
    id: "contact",
    sq: ["Si mund t'ju kontaktoj?", `Na shkruani në WhatsApp te +${WHATSAPP.replace(/^(\d{3})(\d{3})(\d{6})$/, "$1 $2 $3")} ose në Instagram @moonlight_eventsgift.`],
    en: ["How can I contact you?", `Message us on WhatsApp at +${WHATSAPP.replace(/^(\d{3})(\d{3})(\d{6})$/, "$1 $2 $3")} or on Instagram @moonlight_eventsgift.`],
  },
];

