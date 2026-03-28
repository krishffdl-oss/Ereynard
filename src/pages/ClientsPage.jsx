import { useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { CLIENT_TESTIMONIALS } from '../data/index.js';
import { useReveal, useRipple } from '../hooks/useReveal.js';

const clients = [
  { n: 'NOVABRAND' }, { n: 'LUXETHREADS' }, { n: 'TECHNEST' }, { n: 'GROWFAST' },
  { n: 'EDUSPARK' }, { n: 'WELLNESSHIVE' }, { n: 'BRANDCRAFT' }, { n: 'DIGITALX' }, { n: 'NEXARISE' },
];

const awards = [
  { i: '🏆', t: '98% Client Retention', sub: '7 years running' },
  { i: '⭐', t: 'Top Digital Agency', sub: 'Rajasthan 2024' },
  { i: '📈', t: '₹50Cr+ Managed', sub: 'In ad spend across clients' },
  { i: '🎯', t: '200+ Brands Scaled', sub: 'Across India' },
  { i: '🦊', t: 'Fox Method Certified', sub: 'Proprietary 4-step framework' },
  { i: '🌟', t: 'Google & Meta Partner', sub: 'Certified performance agency' },
];

function ClientsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useReveal();

  return (
    <div className="clients-bg">
      <p className="cl-lbl reveal">Trusted by forward-thinking brands across India</p>
      <div className="cl-row reveal">
        {clients.map((c, i) => <span key={i} className="clogo">{c.n}</span>)}
      </div>

      <div className="ct-carousel reveal">
        <div className="ct-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
          {CLIENT_TESTIMONIALS.map((t, i) => (
            <div key={i} className="ct-slide">
              <div className="ct-card">
                <div>
                  <p className="ct-quote">{t.quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={t.img} alt={t.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', filter: 'saturate(.3)' }} />
                    <div>
                      <div className="ct-auth-name">{t.name}</div>
                      <div className="ct-auth-role">{t.role}</div>
                    </div>
                  </div>
                </div>
                <div className="ct-metric">
                  <div className="ct-metric-n">{t.metric}</div>
                  <div className="ct-metric-l">{t.metricLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ct-nav">
          {CLIENT_TESTIMONIALS.map((_, i) => (
            <button key={i} className={`ct-dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <p style={{ textAlign: 'center', fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: 'rgba(14,16,75,.36)', marginBottom: '20px' }}>Why Brands Trust Us</p>
        <div className="awards-grid">
          {awards.map((a, i) => (
            <div key={i} className="award-card reveal">
              <span className="award-icon">{a.i}</span>
              <div className="award-title">{a.t}</div>
              <div className="award-sub">{a.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  useRipple();
  return (
    <>
      <PageHero label="Trusted By" title="Our Clients" strokeWord="Clients" sub="200+ brands across India that chose to outfox the competition." />
      <ClientsSection />
    </>
  );
}