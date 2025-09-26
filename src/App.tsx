import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Send,
  Phone,
  ExternalLink,
  Sparkles,
  FileDown,
  X,
} from "lucide-react";

/* ================================
   Данные (редактируй тут)
================================== */
const portfolioData = {
  name: "Руслан",
  title: "AI / Automation Specialist",
  tagline:
    "Автоматизация, парсинг, чат-боты и AI-контент. Делаю рабочие решения с упором на качество.",
  contacts: {
    email: "rustop0578@gmail.com",
    telegram: "https://t.me/Rus_Ivanych",
    phone: "+7 (913) 303-12-14",
    resumeUrl: "#",
  },
  portraitUrl: "/images/portrait.png",
  skills: [
    "Python","Node.js","Playwright","Selenium","LLM (OpenRouter)",
    "Telegram Bot API","Google Sheets API","Proxy/Parsing","TailwindCSS",
    "ChatGPT","Sora","ElevenLabs","Claude","Grok","DeepSeek",
    "NotebookLM","Gemini","Perplexity","Ideogram","Midjourney","Veo 3","Nana Banana",
  ],
  cases: [
    {
      id: 1,
      title: "Автоматизация отчётов о пропущенных звонках (ВАТС Reporter)",
      stack: ["Node.js","Playwright","Telegram"],
      task: "Снять ручной труд администраторов по ежедневным отчётам о пропущенных звонках.",
      solution: "Логин в ВАТС → сбор пропущенных за сутки → CSV → отправка в Telegram. Автозапуск через планировщик Windows.",
      result: "Экономия 30–40 мин/день, отчёт в 00:01, быстрее реакция на пропуски.",
      image: "/images/case1_vats.png",
    },
    {
      id: 2,
      title: "Kalina Standalone — мониторинг цен конкурентов",
      stack: ["Python","HTML Dashboard","RealtyCalendar"],
      task: "Следить за ценами конкурентов и оперативно корректировать свои тарифы.",
      solution: "Парсинг публичных API RealtyCalendar. Python-парсер + автономный HTML-дашборд; офлайн-данные; сортировки; ‘На карте’; автообновление каждые 6 ч.",
      result: "Быстрый конкурентный анализ без ручного мониторинга.",
      image: "/images/case2_kalina.png",
    },
    {
      id: 3,
      title: "Мониторинг рынка аренды в Сочи",
      stack: ["Python","Proxy","Selenium","Telegram"],
      task: "Видеть картину по районам и конкурентов на посуточном рынке.",
      solution: "Парсинг Sutochno.ru и Ostrovok.ru; прокси и полная эмуляция браузера; авто-отчёты и графики в Telegram.",
      result: "Ежедневные сводки и быстрая реакция на рынок.",
    },
    {
      id: 4,
      title: "Telegram Expense Bot — учёт расходов",
      stack: ["Python","OCR","LLM GPT-4o","Google Sheets"],
      task: "Автоматизировать личные финансы через Telegram.",
      solution: "Текст/голос/фото (OCR) → парсинг и категоризация LLM → запись в Google Sheets → отчёты и графики.",
      result: "Путь ‘чек → запись → отчёт’ в одном чате.",
    },
    {
      id: 5,
      title: "Booking Hub Assistant — ИИ-ассистент для аренды жилья",
      stack: ["Telegram","OpenRouter","Render.com","SQLite"],
      task: "Разгрузить администраторов и ускорить ответы.",
      solution: "Telegram-бот + веб-виджет; 3 направления; короткий системный промпт + внешняя БЗ; история в SQLite.",
      result: "24/7-поддержка и единообразные ответы.",
      image: "/images/assistant_bh.png",
    },
    {
      id: 6,
      title: "Персонализированные стикеры для Telegram/WhatsApp",
      stack: ["Design","Vector","Brand"],
      task: "Уникальные наборы стикеров для личного бренда.",
      solution: "Стикерпак 10–30+ позиций: от фото к векторным персонажам; оптимизация под Telegram/WhatsApp.",
      result: "Рост узнаваемости и вовлечённости.",
      image: "/images/sticker_collage.png",
    },
    {
      id: 7,
      title: "Каталогизация маркетплейса ‘Охота, рыбалка, туризм’",
      stack: ["Excel","Taxonomy","E-commerce"],
      task: "Построить масштабируемую структуру каталога.",
      solution: "1200+ категорий/подкатегорий; иерархия; бренды/модели; фильтры.",
      result: "Готово к загрузке и масштабированию; улучшение поиска и UX.",
	  image: "/images/catalog.png",
    },
    {
      id: 8,
      title: "Custom Video Avatars в HeyGen",
      stack: ["HeyGen","Studio Shoot","Video"],
      task: "Сделать персонализированные видеоаватары.",
      solution: "Студийная съёмка → custom avatar → серия видео.",
      result: "Реалистичные аватары, экономия на видеопроизводстве.",
      image: "/images/heygen_thumb.png",
    },
  ],
};

/* ================================
   UI-компоненты
================================== */
const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium opacity-90 whitespace-nowrap">
    {children}
  </span>
);

const Section: React.FC<{ id?: string; title: string; children: React.ReactNode }>
  = ({ id, title, children }) => (
  <section id={id} className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 py-8 sm:py-10">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-4 sm:mb-6">{title}</h2>
    {children}
  </section>
);

/* Лайтбокс */
const Lightbox: React.FC<{ src: string; alt?: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow" aria-label="Закрыть">
          <X className="w-5 h-5" />
        </button>
        <img src={src} alt={alt || ""} className="w-full h-auto rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

/* Карточка кейса */
const CaseCard: React.FC<{
  title: string;
  stack: string[];
  task: string;
  solution: string;
  result: string;
  href?: string;
  image?: string;
  onImageClick?: (src: string, alt: string) => void;
}> = ({ title, stack, task, solution, result, href, image, onImageClick }) => {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
      {image && (imgOk ? (
        <button type="button" onClick={() => onImageClick && onImageClick(image, title)} className="block w-full" title="Открыть изображение">
          {/* 3:2 под 1200×800 — без обрезания важной части */}
          <img src={image} alt={title} className="w-full aspect-[3/2] object-cover" onError={() => setImgOk(false)} />
        </button>
      ) : (
        <div className="w-full aspect-[3/2] bg-gradient-to-br from-zinc-200/60 to-zinc-100/40 flex items-center justify-center text-xs opacity-70">
          Нет превью
        </div>
      ))}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">{title}</h3>
          {href && href !== "#" && (
            <a href={href} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* ВСЕГДА перенос, без горизонтального скролла */}
        <div className="mt-2 flex flex-wrap gap-1">
          {stack.map((s, i) => (<Badge key={i}>{s}</Badge>))}
        </div>

        <div className="mt-3 sm:mt-4 space-y-2 text-sm leading-relaxed">
          <p><span className="font-medium">Задача:</span> {task}</p>
          <p><span className="font-medium">Решение:</span> {solution}</p>
          <p><span className="font-medium">Результат:</span> {result}</p>
        </div>
      </div>
    </div>
  );
};

/* ================================
   Страница
================================== */
export default function PortfolioRuslan() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const cases = useMemo(() => portfolioData.cases, []);

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900">
      {/* Header — компактный и устойчивый на мобилке */}
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold truncate max-w-[40vw] sm:max-w-none">{portfolioData.name}</span>
            <span className="opacity-70 hidden xs:inline">· {portfolioData.title}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a className="inline-flex items-center gap-1 underline-offset-2 hover:underline" href={portfolioData.contacts.telegram}>
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a className="inline-flex items-center gap-1 underline-offset-2 hover:underline" href={`mailto:${portfolioData.contacts.email}`}>
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 pt-6 sm:pt-8 md:pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-5 md:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.15]">
              AI/Automation — портфолио
            </h1>
            <p className="mt-3 text-[15px] sm:text-base md:text-lg max-w-3xl opacity-90">{portfolioData.tagline}</p>

            {/* Чипсы — всегда переносятся (без горизонт. скролла) */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {portfolioData.skills.map((s, i) => (<Badge key={i}>{s}</Badge>))}
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
              {portfolioData.contacts.resumeUrl !== "#" && (
                <a href={portfolioData.contacts.resumeUrl} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm hover:shadow">
                  <FileDown className="w-4 h-4" /> Скачать резюме (PDF)
                </a>
              )}
            </div>
          </div>

          <div className="justify-self-center md:justify-self-end">
            <button
              type="button"
              onClick={() => portfolioData.portraitUrl && setLightbox({ src: portfolioData.portraitUrl, alt: "Портрет Руслана" })}
              className="block"
              title="Открыть портрет"
            >
              <HeroPortrait src={portfolioData.portraitUrl} />
            </button>
          </div>
        </div>
      </section>

      {/* Кейсы — 1 колонка мобайл / 2 десктоп */}
      <Section id="cases" title={`Кейсы (${cases.length})`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {cases.map((c) => (
            <CaseCard key={c.id} {...c} onImageClick={(src, alt) => setLightbox({ src, alt })} />
          ))}
        </div>
      </Section>

      {/* Контакты */}
      <Section id="contacts" title="Связаться">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <a href={`mailto:${portfolioData.contacts.email}`} className="rounded-2xl border p-4 sm:p-5 hover:shadow">
            <div className="font-semibold flex items-center gap-2"><Mail className="w-4 h-4" /> Email</div>
            <div className="opacity-80 mt-1 break-all">{portfolioData.contacts.email}</div>
          </a>
          <a href={portfolioData.contacts.telegram} className="rounded-2xl border p-4 sm:p-5 hover:shadow">
            <div className="font-semibold flex items-center gap-2"><Send className="w-4 h-4" /> Telegram</div>
            <div className="opacity-80 mt-1 break-all">{portfolioData.contacts.telegram.replace("https://", "")}</div>
          </a>
          <a href="tel:+79133031214" className="rounded-2xl border p-4 sm:p-5 hover:shadow">
            <div className="font-semibold flex items-center gap-2"><Phone className="w-4 h-4" /> Телефон</div>
            <div className="opacity-80 mt-1">{portfolioData.contacts.phone}</div>
          </a>
        </div>
        <p className="opacity-70 text-sm mt-4">Готов к формату: работа в команде / смешанный формат. Стартовая планка: 150–200 тыс. ₽.</p>
      </Section>

      <footer className="border-t">
        <div className="max-w-5xl mx-auto px-3 sm:px-5 md:px-6 py-6 sm:py-8 text-xs sm:text-sm opacity-70">
          © {new Date().getFullYear()} {portfolioData.name}. Сделано с любовью к простым и рабочим решениям.
        </div>
      </footer>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* Портрет с фолбэком */
const HeroPortrait: React.FC<{ src?: string }> = ({ src }) => {
  const [ok, setOk] = useState(true);
  if (!src || !ok) {
    return (
      <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-zinc-200/60 to-zinc-100/40 flex items-center justify-center text-xs opacity-70">
        Нет фото
      </div>
    );
  }
  return (
    <img
      src={src}
      alt="Портрет Руслана"
      className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-2xl object-cover shadow"
      onError={() => setOk(false)}
    />
  );
};
