import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById('cur');
    const curR = document.getElementById('cur-r');
    let mx = 0, my = 0, rx = 0, ry = 0;

    const mm = e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    };
    document.addEventListener('mousemove', mm);

    const tEls = [];
    for (let i = 0; i < 10; i++) {
      const t = document.createElement('div');
      t.className = 'ctr';
      const sz = Math.max(2, 5.5 - i * .45);
      t.style.cssText = `width:${sz}px;height:${sz}px;background:rgba(240,200,69,${(1 - i / 10) * .18})`;
      document.body.appendChild(t);
      tEls.push({ el: t, x: 0, y: 0 });
    }
    const tpos = [];
    const tm = e => { tpos.push({ x: e.clientX, y: e.clientY }); if (tpos.length > 24) tpos.shift(); };
    document.addEventListener('mousemove', tm);

    let raf;
    const rl = () => { rx += (mx - rx) * .1; ry += (my - ry) * .1; curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; raf = requestAnimationFrame(rl); };
    rl();

    const tl = () => {
      tEls.forEach((t, i) => {
        const idx = Math.max(0, tpos.length - 1 - Math.floor(i * 2.3));
        if (tpos[idx]) { t.x += (tpos[idx].x - t.x) * .26; t.y += (tpos[idx].y - t.y) * .26; t.el.style.left = t.x + 'px'; t.el.style.top = t.y + 'px'; }
      });
      requestAnimationFrame(tl);
    };
    tl();

    const hov = () => document.body.classList.add('hov');
    const unhov = () => document.body.classList.remove('hov');
    const hovEls = document.querySelectorAll('a,button,.scard,.wi,.tm-card,.ib-item,.bs-scoop,.blog-card,.svc-mini-card,.svc-detail-row,.wt-kpi');
    hovEls.forEach(el => { el.addEventListener('mouseenter', hov); el.addEventListener('mouseleave', unhov); });

    return () => {
      document.removeEventListener('mousemove', mm);
      document.removeEventListener('mousemove', tm);
      cancelAnimationFrame(raf);
      tEls.forEach(t => t.el.remove());
    };
  }, []);

  return (
    <>
      <div id="cur" />
      <div id="cur-r" />
    </>
  );
}