import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReveal, useRipple } from '../hooks/useReveal.js';
import { CLIENT_TESTIMONIALS } from '../data/index.js';

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const CLIENTS = [
  {
    name: 'NovaBrand India',
    logo: 'NB',
    industry: 'E-Commerce',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    result: '10x ROI',
    color: '#f0c845',
  },
  {
    name: 'LuxeThreads',
    logo: 'LT',
    industry: 'Fashion & Lifestyle',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
    result: '340% Sales',
    color: '#f0c845',
  },
  {
    name: 'TechNest Solutions',
    logo: 'TN',
    industry: 'B2B SaaS',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=80',
    result: '225x Traffic',
    color: '#f0c845',
  },
  {
    name: 'GrowFast',
    logo: 'GF',
    industry: 'SaaS / Tech',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    result: '-60% CPL',
    color: '#f0c845',
  },
  {
    name: 'EduSpark Academy',
    logo: 'ES',
    industry: 'EdTech',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    result: '225x Blog',
    color: '#f0c845',
  },
  {
    name: 'WellnessHive',
    logo: 'WH',
    industry: 'Health & Wellness',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80',
    result: '98% Retention',
    color: '#f0c845',
  },
  {
    name: 'BrandCraft Co.',
    logo: 'BC',
    industry: 'D2C Brand',
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&auto=format&fit=crop&q=80',
    result: '4x Recall',
    color: '#f0c845',
  },
  {
    name: 'DigitalX Media',
    logo: 'DX',
    industry: 'Media & Publishing',
    img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&auto=format&fit=crop&q=80',
    result: '3x Traffic',
    color: '#f0c845',
  },
  {
    name: 'NexaRise',
    logo: 'NR',
    industry: 'Fintech',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&auto=format&fit=crop&q=80',
    result: '8x ROAS',
    color: '#f0c845',
  },
];

const STATS = [
  { n: '200', s: '+', label: 'Brands Scaled' },
  { n: '98',  s: '%', label: 'Client Retention' },
  { n: '7',   s: '+', label: 'Years Experience' },
  { n: '50',  s: 'Cr+', label: 'Ad Spend Managed' },
];

const INDUSTRIES = [
  'All', 'E-Commerce', 'Fashion & Lifestyle', 'B2B SaaS',
  'SaaS / Tech', 'EdTech', 'Health & Wellness', 'D2C Brand',
  'Media & Publishing', 'Fintech',
];

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════ */
function Counter({ n, s, label, delay = 0 }) {
  const [num, setNum] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); io.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const target = parseInt(n) || 0;
    let cur = 0;
    const t = setTimeout(() => {
      const step = Math.max(target / 55, 1);
      const id = setInterval(() => {
        cur = Math.min(cur + step, target);
        setNum(Math.floor(cur));
        if (cur >= target) clearInterval(id);
      }, 22);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [started, n, delay]);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--FM)', fontWeight: 900, fontSize: 'clamp(44px,5vw,72px)', color: 'var(--Y)', lineHeight: 1 }}>
        {num}{s}
      </div>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(240,200,69,.4)', marginTop: '6px' }}>
        {label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIAL CARD — auto rotating
═══════════════════════════════════════════ */
function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive(a => (a + 1) % CLIENT_TESTIMONIALS.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  const t = CLIENT_TESTIMONIALS[active];

  return (
    <div style={{ position: 'relative' }}>
      {/* Big quote mark */}
      <div style={{ position: 'absolute', top: '-20px', left: '20px', fontFamily: 'Georgia,serif', fontSize: '120px', color: 'rgba(240,200,69,.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>

      {/* Card */}
      <div style={{
        background: 'var(--B4)', border: '1px solid rgba(240,200,69,.1)',
        padding: '40px', position: 'relative', zIndex: 1,
        clipPath: 'polygon(0 0,calc(100% - 20px) 0,100% 20px,100% 100%,0 100%)',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(12px)' : 'none',
        transition: 'opacity .3s ease, transform .3s ease',
      }}>
        {/* Author top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <img src={t.img} alt={t.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--Y)', filter: 'saturate(.6)' }} />
          <div>
            <div style={{ fontFamily: 'var(--FM)', fontWeight: 700, fontSize: '15px', color: 'var(--Y)' }}>{t.name}</div>
            <div style={{ fontSize: '11px', color: 'rgba(240,200,69,.4)', marginTop: '2px' }}>{t.role}</div>
          </div>
          {/* Metric badge */}
          <div style={{ marginLeft: 'auto', background: 'var(--Y)', padding: '10px 18px', clipPath: 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '22px', color: 'var(--B)', lineHeight: 1 }}>{t.metric}</div>
            <div style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(14,16,75,.55)', marginTop: '2px' }}>{t.metricLabel}</div>
          </div>
        </div>

        {/* Quote */}
        <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: 'clamp(14px,1.6vw,18px)', lineHeight: 1.75, color: 'rgba(240,200,69,.7)', marginBottom: '0' }}>
          {t.quote}
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '18px', justifyContent: 'center' }}>
        {CLIENT_TESTIMONIALS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === active ? '36px' : '20px', height: '3px',
            background: i === active ? 'var(--Y)' : 'rgba(240,200,69,.2)',
            border: 'none', cursor: 'pointer',
            transition: 'all .4s cubic-bezier(.22,1,.36,1)',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CLIENT CARD
═══════════════════════════════════════════ */
function ClientCard({ client, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'default',
        aspectRatio: '4/3',
        opacity: 0, transform: 'translateY(28px)',
        animation: `clientCardIn .6s ${delay}s cubic-bezier(.22,1,.36,1) forwards`,
      }}
    >
      {/* BG Image */}
      <img src={client.img} alt={client.name} style={{
        width: '100%', height: '100%', objectFit: 'cover',
        filter: hovered ? 'saturate(.7) contrast(1.05)' : 'saturate(.15) contrast(1.2)',
        transform: hovered ? 'scale(1.07)' : 'scale(1)',
        transition: 'filter .6s ease, transform .6s ease',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(14,16,75,.96) 0%, rgba(14,16,75,.3) 60%, transparent 100%)'
          : 'linear-gradient(to top, rgba(14,16,75,.88) 0%, rgba(14,16,75,.55) 100%)',
        transition: 'background .5s ease',
      }} />

      {/* Logo circle — top left */}
      <div style={{
        position: 'absolute', top: '14px', left: '14px',
        width: '42px', height: '42px', borderRadius: '50%',
        background: 'var(--Y)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '13px', color: 'var(--B)',
        border: '2px solid rgba(255,255,255,.15)',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform .4s cubic-bezier(.34,1.56,.64,1)',
        zIndex: 2,
      }}>
        {client.logo}
      </div>

      {/* Industry tag — top right */}
      <div style={{
        position: 'absolute', top: '14px', right: '14px',
        fontSize: '8px', fontWeight: 700, letterSpacing: '.12em',
        textTransform: 'uppercase', color: 'rgba(240,200,69,.7)',
        background: 'rgba(14,16,75,.7)', border: '1px solid rgba(240,200,69,.2)',
        padding: '3px 8px', backdropFilter: 'blur(8px)', zIndex: 2,
      }}>
        {client.industry}
      </div>

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px', zIndex: 2 }}>
        <div style={{
          fontFamily: 'var(--FM)', fontWeight: 800,
          fontSize: 'clamp(14px,1.4vw,18px)', color: 'var(--Y)',
          marginBottom: '6px',
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'transform .4s ease',
        }}>
          {client.name}
        </div>

        {/* Result badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'var(--Y)', color: 'var(--B)',
          fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '12px',
          padding: '4px 12px',
          transform: hovered ? 'translateY(0) scale(1)' : 'translateY(8px) scale(.9)',
          opacity: hovered ? 1 : 0,
          transition: 'all .35s cubic-bezier(.34,1.56,.64,1)',
        }}>
          ✦ {client.result}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE LOGOS
═══════════════════════════════════════════ */
function LogoMarquee() {
  const names = ['NOVABRAND', 'LUXETHREADS', 'TECHNEST', 'GROWFAST', 'EDUSPARK', 'WELLNESSHIVE', 'BRANDCRAFT', 'DIGITALX', 'NEXARISE'];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(240,200,69,.07)', borderBottom: '1px solid rgba(240,200,69,.07)', padding: '18px 0', background: 'rgba(240,200,69,.02)' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'logoScroll 22s linear infinite' }}>
        {[...names, ...names, ...names].map((n, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '22px', padding: '0 28px', whiteSpace: 'nowrap' }}>
            <span style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '13px', letterSpacing: '.12em', color: 'rgba(240,200,69,.22)', textTransform: 'uppercase', transition: 'color .3s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,200,69,.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,200,69,.22)'}
            >{n}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(240,200,69,.15)', flexShrink: 0, display: 'inline-block' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function ClientsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  useRipple();

  const filtered = activeFilter === 'All'
    ? CLIENTS
    : CLIENTS.filter(c => c.industry === activeFilter);

  return (
    <>
      <style>{`
        @keyframes clientCardIn {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes logoScroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-33.33%); }
        }
        @keyframes heroTextIn {
          from { opacity:0; transform:translateY(32px); }
          to   { opacity:1; transform:none; }
        }
        @keyframes heroBadgeIn {
          from { opacity:0; transform:scale(.8) rotate(-6deg); }
          to   { opacity:1; transform:scale(1) rotate(0); }
        }

        .filter-btn {
          font-family:var(--FM); font-size:10px; font-weight:700;
          letter-spacing:.1em; text-transform:uppercase;
          padding:7px 16px; border:1px solid rgba(240,200,69,.18);
          background:none; color:rgba(240,200,69,.45); cursor:pointer;
          transition:all .25s; white-space:nowrap;
        }
        .filter-btn:hover { border-color:rgba(240,200,69,.4); color:var(--Y); }
        .filter-btn.active {
          background:var(--Y); color:var(--B);
          border-color:var(--Y);
        }

        .trust-item {
          display:flex; align-items:flex-start; gap:14px;
          padding:22px; border:1px solid rgba(240,200,69,.07);
          background:var(--B4); transition:all .35s;
        }
        .trust-item:hover {
          border-color:rgba(240,200,69,.22);
          background:rgba(240,200,69,.05);
          transform:translateY(-4px);
        }

        @media(max-width:1100px) {
          .clients-grid { grid-template-columns:repeat(2,1fr) !important; }
          .stats-strip  { grid-template-columns:repeat(2,1fr) !important; }
          .trust-grid   { grid-template-columns:1fr 1fr !important; }
          .bottom-grid  { grid-template-columns:1fr !important; }
        }
        @media(max-width:640px) {
          .clients-grid { grid-template-columns:1fr !important; }
          .filter-row   { gap:6px !important; }
          .filter-btn   { font-size:9px; padding:5px 10px; }
        }
      `}</style>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <div style={{ minHeight: '55vh', background: 'var(--B3)', display: 'flex', alignItems: 'flex-end', padding: '120px 56px 56px', position: 'relative', overflow: 'hidden' }}>
        {/* Grid bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(240,200,69,.014) 1px,transparent 1px),linear-gradient(90deg,rgba(240,200,69,.014) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        {/* Orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(240,200,69,.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(14,16,75,.5)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', fontWeight: 700, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(240,200,69,.36)', marginBottom: '16px', animation: 'heroTextIn .6s .1s both' }}>
            <span style={{ width: '18px', height: '1.5px', background: 'rgba(240,200,69,.36)', display: 'inline-block' }} />
            Trusted By 200+ Brands
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              {/* Big headline */}
              <div style={{ fontFamily: 'var(--FM)', fontWeight: 900, fontSize: 'clamp(52px,7.5vw,108px)', lineHeight: 1.0, letterSpacing: '-.025em', animation: 'heroTextIn .7s .2s both', opacity: 0 }}>
                <span style={{ color: 'var(--Y)', display: 'block' }}>Our</span>
                <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(240,200,69,.28)', display: 'block' }}>Clients.</span>
              </div>
              <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: '16px', color: 'rgba(240,200,69,.42)', marginTop: '14px', maxWidth: '440px', lineHeight: 1.65, animation: 'heroTextIn .7s .4s both', opacity: 0 }}>
                200+ brands chose to outfox the competition with us. Here's their story.
              </p>
            </div>

            {/* Floating badge */}
            <div style={{ animation: 'heroBadgeIn .8s .6s cubic-bezier(.34,1.56,.64,1) both', opacity: 0, flexShrink: 0 }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'var(--Y)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 0 0 16px rgba(240,200,69,.08)' }}>
                <div style={{ fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '42px', color: 'var(--B)', lineHeight: 1 }}>98%</div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(14,16,75,.6)', marginTop: '4px', textAlign: 'center' }}>Client<br />Retention</div>
                {/* Rotating ring */}
                <div style={{ position: 'absolute', inset: '-14px', borderRadius: '50%', border: '1px dashed rgba(240,200,69,.25)', animation: 'rotateSpin 18s linear infinite' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          LOGO MARQUEE
      ══════════════════════════════ */}
      <LogoMarquee />

      {/* ══════════════════════════════
          STATS STRIP
      ══════════════════════════════ */}
      <div style={{ background: 'var(--Y)' }}>
        <div className="stats-strip" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '32px 20px', borderRight: i < STATS.length - 1 ? '1px solid rgba(14,16,75,.12)' : 'none', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(14,16,75,.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <Counter n={s.n} s={s.s} label={s.label} delay={i * 100} />
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════
          CLIENT GRID + FILTER
      ══════════════════════════════ */}
      <div style={{ background: 'var(--B)' }}>
        <section className="sec on-navy">
          <div className="reveal">
            <div className="sec-label"><span>Our Client Portfolio</span></div>
            <h2 className="sec-title">Brands We've <span className="out">Scaled</span></h2>
            <p className="sec-intro">Every brand here has a growth story. Click to explore.</p>
          </div>

          {/* Filter buttons */}
          <div className="filter-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '28px', marginBottom: '32px' }}>
            {INDUSTRIES.map(ind => (
              <button key={ind} className={`filter-btn ${activeFilter === ind ? 'active' : ''}`} onClick={() => setActiveFilter(ind)}>
                {ind}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px' }}>
            {filtered.map((c, i) => (
              <ClientCard key={c.name} client={c} delay={i * 0.07} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(240,200,69,.3)', fontFamily: 'var(--FM)' }}>
              No clients in this category yet 🦊
            </div>
          )}
        </section>
      </div>

      {/* ══════════════════════════════
          TESTIMONIALS + TRUST
      ══════════════════════════════ */}
      <div style={{ background: 'var(--B3)' }}>
        <section className="sec on-navy">
          <div className="bottom-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '56px', alignItems: 'start' }}>

            {/* Left — Testimonials */}
            <div>
              <div className="reveal">
                <div className="sec-label"><span>What They Say</span></div>
                <h2 className="sec-title">Client <span className="out">Stories</span></h2>
                <p className="sec-intro" style={{ marginBottom: '28px' }}>Real words from real brands we've grown.</p>
              </div>
              <div className="reveal">
                <TestimonialSlider />
              </div>
            </div>

            {/* Right — Trust signals */}
            <div>
              <div className="reveal">
                <div className="sec-label"><span>Why They Trust Us</span></div>
                <h2 className="sec-title">Our <span className="out">Promise</span></h2>
              </div>
              <div className="trust-grid reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2px', marginTop: '24px' }}>
                {[
                  { i: '🏆', t: '98% Client Retention', d: '7 years running — clients stay because results keep coming.' },
                  { i: '📊', t: 'Full Transparency', d: 'Real-time dashboards. Monthly reports. No black boxes, ever.' },
                  { i: '⚡', t: '48hr Proposal', d: 'Free custom strategy proposal delivered within 48 hours.' },
                  { i: '🦊', t: 'The Fox Method', d: 'Our proprietary 4-step framework: Discover → Strategise → Execute → Optimise.' },
                  { i: '🇮🇳', t: 'Built for India', d: 'Deep cultural intelligence — D2C, regional markets, festive cycles.' },
                ].map((item, i) => (
                  <div key={i} className="trust-item reveal">
                    <div style={{ fontSize: '26px', flexShrink: 0, lineHeight: 1, marginTop: '2px' }}>{item.i}</div>
                    <div>
                      <div style={{ fontFamily: 'var(--FM)', fontWeight: 700, fontSize: '14px', color: 'var(--Y)', marginBottom: '4px' }}>{item.t}</div>
                      <div style={{ fontSize: '12px', lineHeight: 1.68, color: 'rgba(240,200,69,.42)' }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════
          CTA SECTION
      ══════════════════════════════ */}
      <div style={{ background: 'var(--Y)', padding: '72px 56px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(14,16,75,.42)', marginBottom: '14px' }}>
            Join 200+ Brands
          </div>
          <h2 style={{ fontFamily: 'var(--FM)', fontWeight: 900, fontSize: 'clamp(32px,4.5vw,64px)', color: 'var(--B)', lineHeight: 1.05, marginBottom: '14px' }}>
            Ready to Become<br />Our Next Success Story?
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(14,16,75,.55)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            Free proposal. No commitment. Just a clear plan to grow your brand — delivered in 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-p" onClick={() => navigate('/contact')} style={{ background: 'var(--B)' }}>
              <span style={{ color: 'var(--Y)' }}>Get Free Proposal</span>
              <span style={{ color: 'var(--Y)' }}>→</span>
            </button>
            <button className="btn-out" onClick={() => navigate('/projects')}>
              <span>See Case Studies</span><span>→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}