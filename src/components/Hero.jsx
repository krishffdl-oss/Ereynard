import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../data/index.js';

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

    const lines = () => {
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 105) { ctx.save(); ctx.globalAlpha = (1 - d / 105) * .06; ctx.strokeStyle = '#f0c845'; ctx.lineWidth = .35; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); ctx.restore(); }
      }
    };
    const loop = () => { ctx.clearRect(0, 0, cW, cH); pts.forEach(p => { p.update(); p.draw(); }); lines(); raf = requestAnimationFrame(loop); };
    loop();
    return () => { window.removeEventListener('resize', rsz); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" />;
}

export default function Hero({ openContact }) {
  const [slide, setSlide] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const goTo = useCallback((idx) => { setSlide(idx); setKey(k => k + 1); }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [goTo]);

  const handleArrow = (dir) => {
    clearInterval(timerRef.current);
    goTo((slide + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    timerRef.current = setInterval(() => goTo(s => (s + 1) % HERO_SLIDES.length), 6000);
  };

  const s = HERO_SLIDES[slide];

  return (
    <div className="hero-wrap" style={{ paddingTop: '72px' }}> {/* ← SIRF YE LINE ADD KI */}
      {HERO_SLIDES.map((sl, i) => (
        <div key={i} className={`hero-slide ${i === slide ? 'active' : ''}`}>
          <img className="hs-bg" src={sl.bg} alt="" />
          <div className="hs-ov" />
        </div>
      ))}
      <HeroCanvas />
      <div className="h-grid" />
      <svg className="h-deco h-deco1" width="96" height="96" viewBox="0 0 96 96"><rect x="2" y="2" width="92" height="92" stroke="#f0c845" strokeWidth="1" strokeDasharray="4 5" fill="none" opacity=".8" /><rect x="15" y="15" width="66" height="66" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".4" /></svg>
      <svg className="h-deco h-deco2" width="62" height="62" viewBox="0 0 62 62"><circle cx="31" cy="31" r="29" stroke="#f0c845" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity=".7" /><circle cx="31" cy="31" r="15" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".35" /></svg>
      <svg className="h-deco h-deco3" width="48" height="48" viewBox="0 0 48 48"><polygon points="24,2 46,46 2,46" stroke="#f0c845" strokeWidth="1" fill="none" opacity=".55" /></svg>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <p className="hero-eyebrow"><span>{s.kicker}</span></p>
          <div key={key}>
            <h1 className="hero-headline slide-line" style={{ animationDelay: '.2s' }}>
              {s.headline.map((word, i) => (
                <span key={i}>
                  <span className={i === s.strokeIdx ? 'stroke-txt' : ''}>{word}</span>
                  {i < s.headline.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero-sub slide-line" style={{ animationDelay: '.4s' }}>{s.sub}</p>
          </div>
          <div className="hero-actions">
            <button className="btn-p" onClick={openContact}><span>Start a Project</span><span>→</span></button>
            <button className="btn-g" onClick={() => navigate('/projects')}>View Our Work ↓</button>
          </div>
          <div className="hero-stats-row">
            {[['200+', 'Brands Scaled'], ['₹50Cr+', 'Ad Spend Managed'], ['98%', 'Client Retention'], ['7+', 'Years of Excellence']].map(([n, l], i) => (
              <div key={i} className="hs-stat">
                <div className="hs-stat-n">{n}</div>
                <div className="hs-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="slider-nav">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} className={`sn-dot ${i === slide ? 'active' : ''}`} onClick={() => handleArrow(i - slide)} />
        ))}
      </div>
      <div className="slider-arrows">
        <button className="sl-arr" onClick={() => handleArrow(-1)}>←</button>
        <button className="sl-arr" onClick={() => handleArrow(1)}>→</button>
      </div>
      <div className="hero-scroll"><div className="h-scl" /><span>Scroll</span></div>
    </div>
  );
}