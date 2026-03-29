import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../data/index.js';

/* ═══════════════════════════════════════════
   CANVAS — particle network
═══════════════════════════════════════════ */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let cW, cH, raf;
    const rsz = () => { cW = cv.width = cv.offsetWidth; cH = cv.height = cv.offsetHeight; };
    rsz(); window.addEventListener('resize', rsz);
    class Pt {
      constructor() { this.reset(); }
      reset() { this.x = Math.random() * cW; this.y = Math.random() * cH; this.vx = (Math.random() - .5) * .38; this.vy = (Math.random() - .5) * .38; this.sz = Math.random() * 1.8 + .3; this.a = Math.random() * .4 + .1; this.col = Math.random() > .65 ? '#f0c845' : 'rgba(240,200,69,.45)'; }
      update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > cW || this.y < 0 || this.y > cH) this.reset(); }
      draw() { ctx.save(); ctx.globalAlpha = this.a; ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    }
    const pts = []; for (let i = 0; i < 100; i++) pts.push(new Pt());
    const lines = () => { for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 105) { ctx.save(); ctx.globalAlpha = (1 - d / 105) * .06; ctx.strokeStyle = '#f0c845'; ctx.lineWidth = .35; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore(); } } };
    const loop = () => { ctx.clearRect(0, 0, cW, cH); pts.forEach(p => { p.update(); p.draw(); }); lines(); raf = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener('resize', rsz); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
}

/* ═══════════════════════════════════════════
   TEXT SCRAMBLE
═══════════════════════════════════════════ */
function useScramble(text, trigger) {
  const [display, setDisplay] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    let raf;
    const total = text.length * 3;
    const animate = () => {
      const progress = frame / total;
      const revealed = Math.floor(progress * text.length);
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealed) result += text[i];
        else if (i < revealed + 4) result += chars[Math.floor(Math.random() * chars.length)];
        else result += text[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(result);
      frame++;
      if (frame <= total + 6) raf = requestAnimationFrame(animate);
      else setDisplay(text);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [text, trigger]);
  return display;
}

/* ═══════════════════════════════════════════
   SPLIT HEADLINE — word-by-word slide up
═══════════════════════════════════════════ */
function SplitHeadline({ words, strokeIdx, animKey }) {
  return (
    <h1 className="hero-headline" key={animKey}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <span
            className={i === strokeIdx ? 'stroke-txt' : ''}
            style={{
              display: 'inline-block',
              animation: 'wordSlideUp 0.75s cubic-bezier(.22,1,.36,1) forwards',
              animationDelay: `${0.1 + i * 0.14}s`,
              opacity: 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* ═══════════════════════════════════════════
   MORPHING BLOB
═══════════════════════════════════════════ */
function MorphBlob() {
  return (
    <div style={{ position:'absolute', top:'-10%', right:'-8%', width:'55vw', maxWidth:'700px', aspectRatio:'1', pointerEvents:'none', zIndex:4, animation:'blobFloat 8s ease-in-out infinite' }} aria-hidden="true">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0c845" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0e104b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path fill="url(#blobGrad)">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="
              M200,80 C270,60 340,130 360,200 C380,270 330,350 260,370 C190,390 110,355 80,285 C50,215 60,130 120,90 C150,70 180,85 200,80 Z;
              M200,70 C290,50 370,120 380,210 C390,300 320,370 230,385 C140,400 70,340 55,250 C40,160 80,90 160,72 C180,67 190,72 200,70 Z;
              M200,90 C260,65 345,115 365,195 C385,275 340,360 265,378 C190,396 100,355 72,278 C44,201 68,115 135,88 C160,77 180,97 200,90 Z;
              M200,80 C270,60 340,130 360,200 C380,270 330,350 260,370 C190,390 110,355 80,285 C50,215 60,130 120,90 C150,70 180,85 200,80 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NOISE / FILM GRAIN
═══════════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <div aria-hidden="true" style={{
      position:'absolute', inset:'-50%', width:'200%', height:'200%',
      opacity:0.032, pointerEvents:'none', zIndex:6,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize:'200px 200px',
      animation:'noiseAnim 0.5s steps(1) infinite',
    }} />
  );
}

/* ═══════════════════════════════════════════
   CURSOR SPOTLIGHT
═══════════════════════════════════════════ */
function CursorSpotlight({ heroRef }) {
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
      el.style.setProperty('--sop', '1');
    };
    const onLeave = () => el.style.setProperty('--sop', '0');
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [heroRef]);
  return null;
}

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
═══════════════════════════════════════════ */
function AnimCounter({ raw, prefix, suffix, delay }) {
  const [num, setNum] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { setStarted(true); io.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    const target = parseInt(raw) || 0;
    let current = 0;
    const timer = setTimeout(() => {
      const step = Math.max(target / 50, 1);
      const id = setInterval(() => {
        current = Math.min(current + step, target);
        setNum(Math.floor(current));
        if (current >= target) clearInterval(id);
      }, 25);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, raw, delay]);
  return <span ref={ref}>{prefix}{num}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   BOTTOM TICKER
═══════════════════════════════════════════ */
function HeroTicker() {
  const items = ['10x ROI','SEO Domination','340% Sales','Social Media','225x Traffic','Performance Ads','₹50Cr Managed','Branding','−60% CPL','Content Strategy'];
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'42px', overflow:'hidden', zIndex:12, borderTop:'1px solid rgba(240,200,69,0.12)', background:'rgba(14,16,75,0.6)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center' }}>
      <div style={{ display:'flex', alignItems:'center', width:'max-content', animation:'tickerScroll 28s linear infinite' }}>
        {[...items,...items,...items].map((item, i) => (
          <span key={i} style={{ fontFamily:'var(--FM)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(240,200,69,0.5)', padding:'0 28px', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ fontSize:'6px', color:'rgba(240,200,69,0.28)' }}>◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════ */
export default function Hero({ openContact }) {
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  const timerRef = useRef(null);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const goTo = useCallback((idx) => {
    setSlide(idx);
    setAnimKey(k => k + 1);
    setScrambleTrigger(t => t + 1);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [goTo]);

  useEffect(() => { setScrambleTrigger(1); }, []);

  const handleArrow = (dir) => {
    clearInterval(timerRef.current);
    goTo((slide + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
  };

  const s = HERO_SLIDES[slide];
  const subText = useScramble(s.sub, scrambleTrigger);

  const stats = [
    { raw:'200', prefix:'', suffix:'+', label:'Brands Scaled' },
    { raw:'50',  prefix:'₹', suffix:'Cr+', label:'Ad Spend Managed' },
    { raw:'98',  prefix:'', suffix:'%', label:'Client Retention' },
    { raw:'7',   prefix:'', suffix:'+', label:'Years of Excellence' },
  ];

  return (
    <>
      <style>{`
        @keyframes wordSlideUp {
          from { opacity:0; transform:translateY(100%); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes eyebrowSlide {
          from { opacity:0; transform:translateX(-28px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes subFadeIn {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes actionsPop {
          from { opacity:0; transform:translateY(22px) scale(.96); }
          to   { opacity:1; transform:none; }
        }
        @keyframes statsFadeUp {
          from { opacity:0; transform:translateY(26px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes tickerScroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-33.33%); }
        }
        @keyframes blobFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50%     { transform:translateY(-28px) scale(1.04); }
        }
        @keyframes noiseAnim {
          0%   { transform:translate(0,0); }
          20%  { transform:translate(3%,1%); }
          40%  { transform:translate(2%,-2%); }
          60%  { transform:translate(1%,3%); }
          80%  { transform:translate(3%,2%); }
          100% { transform:translate(0,0); }
        }
        @keyframes lineGrow {
          from { transform:scaleX(0); }
          to   { transform:scaleX(1); }
        }
        @keyframes scrollPulse {
          0%   { transform:scaleY(0); transform-origin:top; opacity:1; }
          50%  { transform:scaleY(1); transform-origin:top; opacity:1; }
          51%  { transform-origin:bottom; }
          100% { transform:scaleY(0); transform-origin:bottom; opacity:0; }
        }
        .hero-wrap {
          --sx:50%; --sy:50%; --sop:0;
        }
        .hero-wrap::after {
          content:'';
          position:absolute; inset:0;
          background:radial-gradient(480px circle at var(--sx) var(--sy), rgba(240,200,69,0.07) 0%, transparent 70%);
          opacity:var(--sop);
          transition:opacity 0.3s;
          pointer-events:none;
          z-index:7;
        }
        .hs-stat { position:relative; overflow:hidden; cursor:default; transition:background 0.3s; }
        .hs-stat::before { content:''; position:absolute; inset:0; background:rgba(240,200,69,0.06); transform:translateY(100%); transition:transform 0.35s cubic-bezier(.22,1,.36,1); }
        .hs-stat:hover::before { transform:translateY(0); }
        .eyebrow-line { display:inline-block; width:32px; height:1.5px; background:var(--Y); transform-origin:left; animation:lineGrow 0.6s 0.3s cubic-bezier(.22,1,.36,1) both; }
        @media(max-width:768px) { .slide-badge { display:none !important; } }
      `}</style>

      <div className="hero-wrap" ref={heroRef} style={{ paddingBottom:'42px' }}>

        {/* BG Slides */}
        {HERO_SLIDES.map((sl, i) => (
          <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <img className="hs-bg" src={sl.bg} alt="" />
            <div className="hs-ov" />
          </div>
        ))}

        {/* Effect layers */}
        <HeroCanvas />
        <MorphBlob />
        <NoiseOverlay />
        <CursorSpotlight heroRef={heroRef} />
        <div className="h-grid" />

        {/* Slide number watermark */}
        <div className="slide-badge" style={{ position:'absolute', top:'50%', right:'56px', transform:'translateY(-50%)', fontFamily:'var(--FM)', fontWeight:900, fontSize:'clamp(80px,12vw,160px)', color:'rgba(240,200,69,0.04)', lineHeight:1, pointerEvents:'none', zIndex:3, userSelect:'none', transition:'all 0.5s' }}>
          0{slide + 1}
        </div>

        {/* Decorative SVGs */}
        <svg className="h-deco h-deco1" width="96" height="96" viewBox="0 0 96 96"><rect x="2" y="2" width="92" height="92" stroke="#f0c845" strokeWidth="1" strokeDasharray="4 5" fill="none" opacity=".8"/><rect x="15" y="15" width="66" height="66" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".4"/></svg>
        <svg className="h-deco h-deco2" width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r="29" stroke="#f0c845" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity=".7"/><circle cx="31" cy="31" r="15" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".35"/></svg>
        <svg className="h-deco h-deco3" width="48" height="48" viewBox="0 0 48 48"><polygon points="24,2 46,46 2,46" stroke="#f0c845" strokeWidth="1" fill="none" opacity=".55"/></svg>

        {/* Main content */}
        <div className="hero-content-wrap">
          <div className="hero-content">

            {/* Eyebrow */}
            <p className="hero-eyebrow" key={`ey-${animKey}`} style={{ animation:'eyebrowSlide 0.6s cubic-bezier(.22,1,.36,1) both' }}>
              <span className="eyebrow-line" />
              <span>{s.kicker}</span>
            </p>

            {/* Headline — split word reveal */}
            <SplitHeadline words={s.headline} strokeIdx={s.strokeIdx} animKey={animKey} />

            {/* Sub — scramble */}
            <p className="hero-sub" key={`sub-${animKey}`} style={{ animation:'subFadeIn 0.7s 0.55s cubic-bezier(.22,1,.36,1) both', fontFamily:'monospace', letterSpacing:'0.01em' }}>
              {subText || s.sub}
            </p>

            {/* Actions */}
            <div className="hero-actions" key={`act-${animKey}`} style={{ animation:'actionsPop 0.7s 0.8s cubic-bezier(.34,1.56,.64,1) both' }}>
              <button className="btn-p" onClick={openContact}><span>Start a Project</span><span>→</span></button>
              <button className="btn-g" onClick={() => navigate('/projects')}>View Our Work ↓</button>
            </div>

            {/* Animated stat counters */}
            <div className="hero-stats-row" key={`st-${animKey}`} style={{ animation:'statsFadeUp 0.7s 1.1s cubic-bezier(.22,1,.36,1) both' }}>
              {stats.map((st, i) => (
                <div key={i} className="hs-stat">
                  <div className="hs-stat-n">
                    <AnimCounter {...st} delay={i * 120} />
                  </div>
                  <div className="hs-stat-l">{st.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Slide dots */}
        <div className="slider-nav">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`sn-dot ${i === slide ? 'active' : ''}`} onClick={() => handleArrow(i - slide)} />
          ))}
        </div>

        {/* Progress bar */}
        <div key={`prog-${animKey}`} style={{ position:'absolute', bottom:'42px', left:'56px', width:'120px', height:'1px', background:'rgba(240,200,69,0.15)', zIndex:13, overflow:'hidden' }}>
          <div style={{ height:'100%', background:'var(--Y)', transformOrigin:'left', animation:'lineGrow 6s linear forwards' }} />
        </div>

        {/* Arrows */}
        <div className="slider-arrows">
          <button className="sl-arr" onClick={() => handleArrow(-1)}>←</button>
          <button className="sl-arr" onClick={() => handleArrow(1)}>→</button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'52px', left:'50%', transform:'translateX(-50%)', zIndex:12, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px', opacity:0, animation:'statsFadeUp 0.8s 2s forwards' }}>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom,transparent,rgba(240,200,69,0.6))', animation:'scrollPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize:'7px', fontWeight:700, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(240,200,69,0.3)', writingMode:'vertical-rl' }}>Scroll</span>
        </div>

        {/* Bottom ticker */}
        <HeroTicker />
      </div>
    </>
  );
}