import { useEffect, useRef, useState } from 'react';

// ── Aggressive Fox cursor SVG — sharp ears, intense eyes, dark ──
const FOX_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <!-- Sharp left ear -->
  <polygon points="2,16 0,0 14,10" fill="#f0c845"/>
  <polygon points="3,15 1,3 12,10" fill="#c8541a"/>
  <!-- Sharp right ear -->
  <polygon points="38,16 40,0 26,10" fill="#f0c845"/>
  <polygon points="37,15 39,3 28,10" fill="#c8541a"/>
  <!-- Face base -->
  <ellipse cx="20" cy="26" rx="16" ry="13" fill="#f0c845"/>
  <ellipse cx="20" cy="26" rx="16" ry="13" fill="none" stroke="#0e104b" stroke-width="1.2"/>
  <!-- White muzzle -->
  <ellipse cx="20" cy="30" rx="8" ry="6" fill="#fff5d6"/>
  <!-- Angry left eye -->
  <ellipse cx="13" cy="23" rx="3.5" ry="2" fill="#0e104b" transform="rotate(-14,13,23)"/>
  <circle cx="14.2" cy="22.4" r="0.8" fill="white"/>
  <!-- Angry right eye -->
  <ellipse cx="27" cy="23" rx="3.5" ry="2" fill="#0e104b" transform="rotate(14,27,23)"/>
  <circle cx="28.2" cy="22.4" r="0.8" fill="white"/>
  <!-- Heavy angry brows -->
  <line x1="9" y1="19" x2="16" y2="21.5" stroke="#0e104b" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="31" y1="19" x2="24" y2="21.5" stroke="#0e104b" stroke-width="2.2" stroke-linecap="round"/>
  <!-- Nose -->
  <ellipse cx="20" cy="28" rx="2" ry="1.4" fill="#0e104b"/>
  <!-- Stern mouth -->
  <path d="M15.5 31.5 Q20 30 24.5 31.5" fill="none" stroke="#0e104b" stroke-width="1.3" stroke-linecap="round"/>
  <!-- Cheek slash marks -->
  <line x1="5" y1="25" x2="9.5" y2="26.5" stroke="#c8541a" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
  <line x1="35" y1="25" x2="30.5" y2="26.5" stroke="#c8541a" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
</svg>
`;

// ── Paw print SVG ──
const PAW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 100 100">
  <ellipse cx="50" cy="65" rx="22" ry="18" fill="currentColor"/>
  <ellipse cx="22" cy="42" rx="11" ry="9" fill="currentColor"/>
  <ellipse cx="40" cy="32" rx="11" ry="9" fill="currentColor"/>
  <ellipse cx="60" cy="32" rx="11" ry="9" fill="currentColor"/>
  <ellipse cx="78" cy="42" rx="11" ry="9" fill="currentColor"/>
</svg>
`;

const FOX_URL = `data:image/svg+xml;base64,${btoa(FOX_SVG)}`;

export default function Cursor() {
  const cursorRef  = useRef(null);
  const dotRef     = useRef(null);
  const posRef     = useRef({ x: -100, y: -100 });
  const smoothRef  = useRef({ x: -100, y: -100 });
  const lastPawRef = useRef({ x: -100, y: -100 });
  const rafRef     = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    const dot    = dotRef.current;
    if (!cursor || !dot) return;

    document.body.style.cursor            = 'none';
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const dx   = e.clientX - lastPawRef.current.x;
      const dy   = e.clientY - lastPawRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 65) {
        spawnPaw(e.clientX, e.clientY, Math.atan2(dy, dx));
        lastPawRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onEnter = () => { cursor.style.opacity = '1'; dot.style.opacity = '1'; };
    const onLeave = () => { cursor.style.opacity = '0'; dot.style.opacity = '0'; };

    const onOver = (e) => {
      const el = e.target.closest('a,button,[role="button"],input,select,textarea');
      if (el) {
        cursor.style.transform = 'translate(-50%,-50%) scale(1.35) rotate(-10deg)';
        dot.style.background   = '#c8541a';
        dot.style.boxShadow    = '0 0 8px rgba(200,84,26,1)';
      }
    };
    const onOut = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)';
      dot.style.background   = '#f0c845';
      dot.style.boxShadow    = '0 0 6px rgba(240,200,69,0.9)';
    };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);

    const animate = () => {
      const ease = 0.11;
      smoothRef.current.x += (posRef.current.x - smoothRef.current.x) * ease;
      smoothRef.current.y += (posRef.current.y - smoothRef.current.y) * ease;
      cursor.style.left = smoothRef.current.x + 'px';
      cursor.style.top  = smoothRef.current.y + 'px';
      dot.style.left    = posRef.current.x + 'px';
      dot.style.top     = posRef.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor            = '';
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const spawnPaw = (x, y, angle) => {
    const paw    = document.createElement('div');
    const isLeft = Math.random() > 0.5;
    const offset = isLeft ? -14 : 14;
    const perpX  = Math.cos(angle + Math.PI / 2) * offset;
    const perpY  = Math.sin(angle + Math.PI / 2) * offset;
    const rotDeg = (angle * 180 / Math.PI) + 90 + (isLeft ? -18 : 18);

    paw.style.cssText = `
      position:fixed;
      left:${x + perpX}px;
      top:${y + perpY}px;
      width:16px;height:16px;
      pointer-events:none;
      z-index:999990;
      transform:translate(-50%,-50%) rotate(${rotDeg}deg);
      opacity:0.7;
      color:#f0c845;
      transition:opacity 1.4s ease,transform 1.4s ease;
      filter:drop-shadow(0 0 4px rgba(240,200,69,0.7));
    `;
    paw.innerHTML = PAW_SVG;
    document.body.appendChild(paw);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        paw.style.opacity   = '0';
        paw.style.transform = `translate(-50%,-50%) rotate(${rotDeg}deg) scale(0.4)`;
      });
    });
    setTimeout(() => paw.remove(), 1500);
  };

  if (isMobile) return null;

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        #fox-cursor {
          position:fixed;
          pointer-events:none;
          z-index:999999;
          transform:translate(-50%,-50%) scale(1) rotate(0deg);
          transition:transform 0.2s cubic-bezier(.34,1.56,.64,1), opacity 0.2s;
          opacity:0;
          will-change:left,top;
        }

        #fox-dot {
          position:fixed;
          width:5px;height:5px;
          background:#f0c845;
          border-radius:50%;
          pointer-events:none;
          z-index:1000000;
          transform:translate(-50%,-50%);
          opacity:0;
          transition:opacity 0.2s,background 0.2s,box-shadow 0.2s;
          will-change:left,top;
          box-shadow:0 0 6px rgba(240,200,69,0.9);
        }

        @keyframes foxBreath {
          0%,100% { filter:drop-shadow(0 2px 10px rgba(240,200,69,0.5)) drop-shadow(0 0 4px rgba(14,16,75,0.5)); }
          50%     { filter:drop-shadow(0 3px 14px rgba(240,200,69,0.85)) drop-shadow(0 0 6px rgba(14,16,75,0.6)); }
        }
        #fox-cursor img { animation:foxBreath 2s ease-in-out infinite; display:block; }
      `}</style>

      <div id="fox-cursor" ref={cursorRef}>
        <img src={FOX_URL} width={40} height={40} alt="" draggable={false} />
      </div>
      <div id="fox-dot" ref={dotRef} />
    </>
  );
}