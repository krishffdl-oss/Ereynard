import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../data/index.js';

// ── Mobile-optimized image sizes ──
// Mobile: w=640, Tablet: w=960, Desktop: w=1280
// (was w=1920 everywhere — mobile was loading 3x bigger images than needed)
function getOptimizedSrc(url, isMobile) {
  const w = isMobile ? 640 : 1280;
  return url
    .replace(/w=\d+/, `w=${w}`)
    .replace(/q=\d+/, 'q=65')
    .replace(/&q=\d+/, '&q=65');
}

// ── Canvas: disabled on mobile entirely ──
// Mobile GPUs can't handle 60 particles + O(n²) line checks
// We show a static dot grid instead on mobile
function HeroCanvas({ isMobile }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isMobile) return; // skip canvas on mobile — biggest perf win

    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let cW, cH, raf, lastTime = 0;
    const FPS_INTERVAL = 1000 / 24; // 24fps on desktop (was 60fps)

    const rsz = () => {
      cW = cv.width = cv.offsetWidth;
      cH = cv.height = cv.offsetHeight;
    };
    rsz();
    const ro = new ResizeObserver(rsz);
    ro.observe(cv);

    class Pt {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * cW;
        this.y = Math.random() * cH;
        this.vx = (Math.random() - .5) * .3;
        this.vy = (Math.random() - .5) * .3;
        this.sz = Math.random() * 1.6 + .3;
        this.a = Math.random() * .35 + .08;
        this.col = Math.random() > .65 ? '#f0c845' : 'rgba(240,200,69,.4)';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > cW || this.y < 0 || this.y > cH) this.reset();
      }
      draw() {
        ctx.globalAlpha = this.a;
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 50 particles on desktop (was 100)
    const pts = Array.from({ length: 50 }, () => new Pt());
    const MAX_DIST_SQ = 100 * 100;

    const drawLines = () => {
      ctx.strokeStyle = '#f0c845';
      ctx.lineWidth = .3;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST_SQ) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / 100) * .05;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      if (ts - lastTime < FPS_INTERVAL) return;
      lastTime = ts;
      ctx.clearRect(0, 0, cW, cH);
      ctx.save();
      pts.forEach(p => { p.update(); p.draw(); });
      ctx.restore();
      drawLines();
    };

    raf = requestAnimationFrame(loop);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  if (isMobile) return null; // no canvas DOM on mobile at all
  return <canvas ref={ref} className="hero-canvas" />;
}

export default function Hero({ openContact }) {
  const [slide, setSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideRef = useRef(0);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Detect mobile once on mount
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    const mq = window.matchMedia('(max-width: 768px)');
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  const advance = useCallback(() => {
    const next = (slideRef.current + 1) % HERO_SLIDES.length;
    slideRef.current = next;
    setSlide(next);
  }, []);

  useEffect(() => {
    // Longer interval on mobile — less work, saves battery
    const interval = isMobile ? 7000 : 6000;
    timerRef.current = setInterval(advance, interval);
    return () => clearInterval(timerRef.current);
  }, [advance, isMobile]);

  const goTo = useCallback((idx) => {
    clearInterval(timerRef.current);
    slideRef.current = idx;
    setSlide(idx);
    const interval = isMobile ? 7000 : 6000;
    timerRef.current = setInterval(advance, interval);
  }, [advance, isMobile]);

  const handleArrow = useCallback((dir) => {
    goTo((slideRef.current + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [goTo]);

  const s = HERO_SLIDES[slide];

  return (
    <div className="hero-wrap" style={{ paddingTop: '72px' }}>

      {HERO_SLIDES.map((sl, i) => {
        const isActive = i === slide;
        const isNext = i === (slide + 1) % HERO_SLIDES.length;
        // Mobile: only load active slide. Desktop: active + next
        const shouldLoad = isMobile ? isActive : (isActive || isNext);

        return (
          <div key={i} className={`hero-slide ${isActive ? 'active' : ''}`}>
            {shouldLoad && (
              <img
                className="hs-bg"
                src={getOptimizedSrc(sl.bg, isMobile)}
                alt=""
                loading={isActive ? 'eager' : 'lazy'}
                decoding="async"
                fetchpriority={isActive ? 'high' : 'low'}
              />
            )}
            <div className="hs-ov" />
          </div>
        );
      })}

      <HeroCanvas isMobile={isMobile} />
      <div className="h-grid" />

      {/* Decorative SVGs — hidden on mobile via CSS to avoid render cost */}
      <svg className="h-deco h-deco1" width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        <rect x="2" y="2" width="92" height="92" stroke="#f0c845" strokeWidth="1" strokeDasharray="4 5" fill="none" opacity=".8" />
        <rect x="15" y="15" width="66" height="66" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".4" />
      </svg>
      <svg className="h-deco h-deco2" width="62" height="62" viewBox="0 0 62 62" aria-hidden="true">
        <circle cx="31" cy="31" r="29" stroke="#f0c845" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity=".7" />
        <circle cx="31" cy="31" r="15" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".35" />
      </svg>
      <svg className="h-deco h-deco3" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        <polygon points="24,2 46,46 2,46" stroke="#f0c845" strokeWidth="1" fill="none" opacity=".55" />
      </svg>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <p className="hero-eyebrow"><span>{s.kicker}</span></p>
          <h1 className="hero-headline slide-line" style={{ animationDelay: '.2s' }}>
            {s.headline.map((word, i) => (
              <span key={i}>
                <span className={i === s.strokeIdx ? 'stroke-txt' : ''}>{word}</span>
                {i < s.headline.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-sub slide-line" style={{ animationDelay: '.4s' }}>{s.sub}</p>

          <div className="hero-actions">
            <button className="btn-p" onClick={openContact}>
              <span>Start a Project</span><span>→</span>
            </button>
            <button className="btn-g" onClick={() => navigate('/projects')}>
              View Our Work ↓
            </button>
          </div>

          <div className="hero-stats-row">
            {[
              ['200+', 'Brands Scaled'],
              ['₹50Cr+', 'Ad Spend Managed'],
              ['98%', 'Client Retention'],
              ['7+', 'Years of Excellence'],
            ].map(([n, l], i) => (
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
          <button
            key={i}
            className={`sn-dot ${i === slide ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="slider-arrows">
        <button className="sl-arr" onClick={() => handleArrow(-1)} aria-label="Previous slide">←</button>
        <button className="sl-arr" onClick={() => handleArrow(1)} aria-label="Next slide">→</button>
      </div>

      <div className="hero-scroll">
        <div className="h-scl" />
        <span>Scroll</span>
      </div>
    </div>
  );
}