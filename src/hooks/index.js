// hooks.js
// ─────────────────────────────────────────────────────────────
// Shared React hooks used across multiple components.
// Import only what each component needs.
// ─────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

// Fires IntersectionObserver to add class 'v' to .reveal elements,
// then stagger-animates card children inside each section.
export function useReveal() {
  useEffect(() => {
    const CARD_CLASSES = [
      'scard','rcard','pstep-s','pstep-f','s-item','wi','tm-card',
      'bs-scoop','blog-card','svc-mini-card','award-card','svc-detail-row'
    ];
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('v');
        CARD_CLASSES.forEach(cls => {
          e.target.querySelectorAll('.' + cls).forEach((c, i) => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(26px)';
            c.style.transition = `opacity .6s ${i * .07}s ease,transform .6s ${i * .07}s ease`;
            setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'none'; }, 40);
          });
        });
      });
    }, { threshold: .06 });
    document.querySelectorAll('.reveal,.rev-l,.rev-r,.rev-scale').forEach(el => ro.observe(el));
    return () => ro.disconnect();
  });
}

// Returns true once user has scrolled > 50px (for nav shrink).
export function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return scrolled;
}

// 3D tilt effect on .scard and .bs-scoop elements.
export function useTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll('.scard,.bs-scoop');
    const hs = [];
    cards.forEach(c => {
      const mm = e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = `perspective(560px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(4px) translateY(-6px)`;
      };
      const ml = () => c.style.transform = '';
      c.addEventListener('mousemove', mm);
      c.addEventListener('mouseleave', ml);
      hs.push({ c, mm, ml });
    });
    return () => hs.forEach(({ c, mm, ml }) => {
      c.removeEventListener('mousemove', mm);
      c.removeEventListener('mouseleave', ml);
    });
  });
}

// Ripple click effect on .btn-p, .btn-sub, .nav-cta elements.
export function useRipple() {
  useEffect(() => {
    const btns = document.querySelectorAll('.btn-p,.btn-sub,.nav-cta');
    const hs = [];
    btns.forEach(btn => {
      const fn = e => {
        const r = btn.getBoundingClientRect();
        const rp = document.createElement('span');
        rp.className = 'ripple';
        const sz = Math.max(r.width, r.height) * 2;
        rp.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX - r.left - sz / 2}px;top:${e.clientY - r.top - sz / 2}px`;
        btn.appendChild(rp);
        setTimeout(() => rp.remove(), 620);
      };
      btn.addEventListener('click', fn);
      hs.push({ btn, fn });
    });
    return () => hs.forEach(({ btn, fn }) => btn.removeEventListener('click', fn));
  });
}