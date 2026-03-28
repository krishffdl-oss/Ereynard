import { useEffect, useRef, useState } from 'react';

export default function Stats() {
  const ref = useRef(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const co = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting || counted) return;
        setCounted(true);
        e.target.querySelectorAll('.s-num').forEach(el => {
          const t = +el.dataset.t, s = el.dataset.s || '';
          let c = 0, inc = t / 65;
          const id = setInterval(() => { c = Math.min(c + inc, t); el.textContent = Math.floor(c) + s; if (c >= t) clearInterval(id); }, 14);
        });
        co.unobserve(e.target);
      });
    }, { threshold: .3 });
    if (ref.current) co.observe(ref.current);
    return () => co.disconnect();
  }, [counted]);

  return (
    <div className="stats-bg" ref={ref}>
      <div className="stats-grid">
        {[{ t: 200, s: '+', l: 'Brands Scaled' }, { t: 7, s: '+', l: 'Years of Expertise' }, { t: 98, s: '%', l: 'Client Retention' }, { t: 50, s: 'Cr+', l: 'Ad Spend Managed' }].map((s, i) => (
          <div key={i} className="s-item">
            <div className="s-num" data-t={s.t} data-s={s.s}>0</div>
            <div className="s-lbl">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}