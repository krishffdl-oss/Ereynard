import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../data/index.js';

// Reduced image quality for faster load — same visual result
const OPTIMIZED_SLIDES = HERO_SLIDES.map(sl => ({
  ...sl,
  bg: sl.bg.replace('w=1920', 'w=1280').replace('q=70', 'q=65').replace(/&q=\d+/, '&q=65'),
}));

function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let cW, cH, raf, lastTime = 0;
    const FPS_INTERVAL = 1000 / 30; // cap at 30fps — halves GPU work vs 60fps

    const rsz = () => {
      cW = cv.width = cv.offsetWidth;
      cH = cv.height = cv.offsetHeight;
    };
    rsz();

    // ResizeObserver is more efficient than window resize event
    const ro = new ResizeObserver(rsz);
    ro.observe(cv);

    class Pt {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * cW;
        this.y = Math.random() * cH;
        this.vx = (Math.random() - .5) * .38;
        this.vy = (Math.random() - .5) * .38;
        this.sz = Math.random() * 1.8 + .3;
        this.a = Math.random() * .4 + .1;
        this.col = Math.random() > .65 ? '#f0c845' : 'rgba(240,200,69,.45)';
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

    // 60 particles instead of 100 — fewer O(n²) line checks per frame
    const pts = Array.from({ length: 60 }, () => new Pt());
    const MAX_DIST_SQ = 105 * 105; // pre-compute to avoid sqrt in hot loop

    const drawLines = () => {
      ctx.strokeStyle = '#f0c845';
      ctx.lineWidth = .35;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST_SQ) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / 105) * .06;
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
      if (ts - lastTime < FPS_INTERVAL) return; // skip frame if under 30fps cap
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
  }, []);

  return <canvas ref={ref} className="hero-canvas" />;
}

export default function Hero({ openContact }) {
  const [slide, setSlide] = useState(0);
  const slideRef = useRef(0);     // stable ref — avoids stale closure in interval
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Stable advance function — never changes reference
  const advance = useCallback(() => {
    const next = (slideRef.current + 1) % OPTIMIZED_SLIDES.length;
    slideRef.current = next;
    setSlide(next);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(advance, 6000);
    return () => clearInterval(timerRef.current);
  }, [advance]); // advance is stable so this runs exactly once

  const goTo = useCallback((idx) => {
    clearInterval(timerRef.current);
    slideRef.current = idx;
    setSlide(idx);
    timerRef.current = setInterval(advance, 6000);
  }, [advance]);

  const handleArrow = useCallback((dir) => {
    goTo((slideRef.current + dir + OPTIMIZED_SLIDES.length) % OPTIMIZED_SLIDES.length);
  }, [goTo]);

  const s = OPTIMIZED_SLIDES[slide];

  return (
    <div className="hero-wrap" style={{ paddingTop: '72px' }}>

      {OPTIMIZED_SLIDES.map((sl, i) => {
        const isActive = i === slide;
        const isNext = i === (slide + 1) % OPTIMIZED_SLIDES.length;
        // Only render img tag for current and next slide — saves ~4 image fetches on load
        const shouldLoad = isActive || isNext;
        return (
          <div key={i} className={`hero-slide ${isActive ? 'active' : ''}`}>
            {shouldLoad && (
              <img
                className="hs-bg"
                src={sl.bg}
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

      <HeroCanvas />
      <div className="h-grid" />

      <svg className="h-deco h-deco1" width="96" height="96" viewBox="0 0 96 96">
        <rect x="2" y="2" width="92" height="92" stroke="#f0c845" strokeWidth="1" strokeDasharray="4 5" fill="none" opacity=".8" />
        <rect x="15" y="15" width="66" height="66" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".4" />
      </svg>
      <svg className="h-deco h-deco2" width="62" height="62" viewBox="0 0 62 62">
        <circle cx="31" cy="31" r="29" stroke="#f0c845" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity=".7" />
        <circle cx="31" cy="31" r="15" stroke="#f0c845" strokeWidth=".5" fill="none" opacity=".35" />
      </svg>
      <svg className="h-deco h-deco3" width="48" height="48" viewBox="0 0 48 48">
        <polygon points="24,2 46,46 2,46" stroke="#f0c845" strokeWidth="1" fill="none" opacity=".55" />
      </svg>

      <div className="hero-content-wrap">
        <div className="hero-content">
          <p className="hero-eyebrow"><span>{s.kicker}</span></p>

          {/*
            No key prop on headline — avoids React unmounting + remounting the
            subtree on every slide change. Text updates in-place; CSS handles fade.
          */}
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
        {OPTIMIZED_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`sn-dot ${i === slide ? 'active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="slider-arrows">
        <button className="sl-arr" onClick={() => handleArrow(-1)}>←</button>
        <button className="sl-arr" onClick={() => handleArrow(1)}>→</button>
      </div>

      <div className="hero-scroll">
        <div className="h-scl" />
        <span>Scroll</span>
      </div>
    </div>
  );
}