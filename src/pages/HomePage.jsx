import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Stats from '../components/Stats.jsx';
import ImageBand from '../components/ImageBand.jsx';
import FAQ from '../components/FAQ.jsx';
import { useReveal, useTilt, useRipple } from '../hooks/useReveal.js';

// ── Clean SVG Icons for each service ──
const SVC_ICONS = {
  seo: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      <path d="M11 8v6M8 11h6" strokeWidth="1.5"/>
    </svg>
  ),
  social: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  performance: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z"/>
    </svg>
  ),
  content: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  web: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  analytics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  branding: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/>
      <circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/>
      <path d="M12 20c-4.418 0-8-1.79-8-4s3.582-4 8-4 8 1.79 8 4-3.582 4-8 4z"/>
    </svg>
  ),
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  influencer: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
};

function AboutSection({ openSvc }) {
  const navigate = useNavigate();
  useReveal();
  return (
    <div className="about-bg">
      <section className="sec on-yellow">
        <div className="ab-grid">
          <div className="ab-vis rev-l">
            <div className="ab-img-a shimmer">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80" alt="Agency team" />
            </div>
            <div className="ab-stat-a"><div className="ab-stat-n">7+</div><div className="ab-stat-l">Years</div></div>
            <div className="ab-badge">🦊</div>
            <div className="ab-img-b shimmer">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80" alt="Analytics" />
            </div>
            <div className="ab-stat-b"><div className="ab-stat-n">200+</div><div className="ab-stat-l">Brands Scaled</div></div>
          </div>
          <div className="ab-txt rev-r">
            <div className="sec-label"><span>Who We Are</span></div>
            <h2 className="sec-title">We Hunt <span className="out">Results.</span></h2>
            <p style={{ marginTop: '16px' }}>At <strong>Ereynard</strong>, we don't just run campaigns — we engineer growth. Like a fox in the digital wild, we're cunning, precise, and always a few moves ahead.</p>
            <p>A full-service agency built on <strong>data-driven strategy</strong>, sharp creative thinking, and an obsession with your brand's success.</p>
            <div className="pills">
              {[['strategy', 'Strategy First'], ['analytics', 'Data-Driven'], ['branding', 'Creative Bold'], ['performance', 'Results Focused']].map(([k, l]) => (
                <button key={k} className="pill" onClick={() => openSvc(k)}>{l}</button>
              ))}
            </div>
            <div style={{ marginTop: '18px' }}>
              <button className="btn-out" onClick={() => navigate('/about-us')}><span>Our Full Story</span><span>→</span></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BrandStory() {
  const navigate = useNavigate();
  useReveal();
  return (
    <div className="bs-bg">
      <section className="sec on-navy">
        <div className="bs-bg-txt">31 FLAVORS</div>
        <div className="reveal" style={{ position: 'relative', zIndex: 1, marginBottom: '48px' }}>
          <div className="sec-label"><span>Our Origin</span></div>
          <h2 className="sec-title">The Brand <span className="out">Story</span></h2>
        </div>
        <div className="bs-two reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-img-wrap rev-l">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&auto=format&fit=crop&q=80" alt="Old way" />
            <div className="bs-img-lbl">The Old Way</div>
          </div>
          <div className="rev-r">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '11px' }}>
              <span style={{ width: '18px', height: '1.5px', background: 'rgba(240,200,69,.36)', display: 'inline-block' }} />
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(240,200,69,.42)' }}>The Problem</span>
            </div>
            <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(30px,3.8vw,50px)', color: 'var(--Y)', lineHeight: '1.05', marginBottom: '16px' }}>
              Settling for <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,200,69,.3)' }}>Vanilla</span>
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)', marginBottom: '11px' }}>
              Too many businesses are served the same thing: <strong style={{ color: 'var(--Y)' }}>Vanilla Content.</strong> Endless posts, generic strategies, high invoices — but zero engagement, no new customers, stagnant sales.
            </p>
          </div>
        </div>
        <div className="bs-inspo reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-1945">1945</div>
          <div className="bs-inspo-inner">
            <div className="bs-inspo-icon">🍨</div>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(14,16,75,.38)', marginBottom: '8px' }}>The Inspiration</p>
              <div className="bs-inspo-title">The Joy of 31 Flavors</div>
              <p className="bs-inspo-text" style={{ marginBottom: '9px' }}>In 1945, Baskin & Robbins transformed ice cream by offering 31 Flavors — a different choice for every day of the month. They promised variety, quality, and the perfect fit for every craving.</p>
              <p className="bs-inspo-text"><strong style={{ color: 'var(--B)' }}>At Ereynard Digital, we believe your brand deserves that same commitment.</strong></p>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ marginBottom: '34px', position: 'relative', zIndex: 1 }}>
          <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,62px)', color: 'var(--Y)', lineHeight: '1.05' }}>Three Scoops <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,200,69,.22)' }}>of Growth</span></h3>
        </div>
        <div className="bs-scoops reveal" style={{ position: 'relative', zIndex: 1 }}>
          {[{ bg: '💰', icon: '💰', n: 'Scoop 01', t: 'Pocket-Friendly', sub: 'Partnership', d: 'Premium agency expertise without the inflated cost. Genuine ROI delivered.', a: 'Value & ROI →' }, { bg: '👑', icon: '👑', n: 'Scoop 02', t: 'Quality', sub: 'Obsession', d: "We don't do content volume — we do engagement quality that converts.", a: 'Trust & Depth →' }, { bg: '🎨', icon: '🎨', n: 'Scoop 03', t: 'Custom', sub: 'Strategy', d: 'Every brand is unique. We refuse templates. Built for you.', a: 'Clarity & Results →' }].map((s, i) => (
            <div key={i} className="bs-scoop">
              <div className="bs-sc-bg">{s.bg}</div>
              <div className="bs-icon-w">{s.icon}</div>
              <div className="bs-sc-n">{s.n}</div>
              <h4 className="bs-sc-t">{s.t}<br />{s.sub}</h4>
              <p className="bs-sc-d">{s.d}</p>
              <div className="bs-sc-a">{s.a}</div>
            </div>
          ))}
        </div>
        <div className="bs-promise reveal" style={{ position: 'relative', zIndex: 1 }}>
          <div className="bs-promise-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(30px,4vw,54px)', color: 'var(--Y)', lineHeight: '1.05', marginBottom: '16px' }}>The Ereynard <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(240,200,69,.24)' }}>Difference</span></h3>
              <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.48)', marginBottom: '22px' }}>We are the <strong style={{ color: 'var(--Y)' }}>"31 Flavours"</strong> for your brand's digital existence — every ingredient chosen with purpose.</p>
              <button className="btn-p" onClick={() => navigate('/contact-us')}><span>Start Your Flavour</span><span>→</span></button>
            </div>
            <div>
              {[{ i: '🥄', t: 'We Give You the Pink Spoon', d: 'We constantly test, analyse, and refine — ensuring every rupee invested delivers the highest conversion rates.' }, { i: '🍦', t: 'We Deliver the Full Cone', d: "Our focus is never post count — it's the new customer, increased sales, and growth that compounds." }].map((p, i) => (
                <div key={i} className="bs-p-item"><div className="bs-p-icon">{p.i}</div><div><div className="bs-p-title">{p.t}</div><p className="bs-p-txt">{p.d}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesMini() {
  const navigate = useNavigate();
  useReveal();
  const svcs = [
    { k:'seo',         t:'SEO'                 },
    { k:'social',      t:'Social Media'         },
    { k:'performance', t:'Performance Ads'      },
    { k:'content',     t:'Content Strategy'     },
    { k:'web',         t:'Web Design'           },
    { k:'analytics',   t:'Analytics'            },
    { k:'branding',    t:'Branding'             },
    { k:'email',       t:'Email Marketing'      },
    { k:'influencer',  t:'Influencer Marketing' },
  ];
  return (
    <div className="svc-bg">
      <style>{`
        .svc-mini-icon-wrap {
          width: 38px; height: 38px; flex-shrink: 0;
          background: rgba(240,200,69,.08);
          border: 1px solid rgba(240,200,69,.15);
          display: flex; align-items: center; justify-content: center;
          color: var(--Y);
          transition: background .3s, border-color .3s;
        }
        .svc-mini-card:hover .svc-mini-icon-wrap {
          background: var(--Y);
          border-color: var(--Y);
          color: var(--B);
        }
      `}</style>
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>What We Do</span></div>
          <h2 className="sec-title">Our <span className="out">Services</span></h2>
        </div>
        <div className="svc-mini">
          {svcs.map(s => (
            <div key={s.k} className="svc-mini-card reveal" onClick={() => navigate(`/services/${s.k}`)}>
              <div className="svc-mini-icon-wrap">
                {SVC_ICONS[s.k]}
              </div>
              <span className="svc-mini-name">{s.t}</span>
              <span className="svc-mini-arrow">→</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <button className="btn-p" onClick={() => navigate('/services')}><span>Explore All Services</span><span>→</span></button>
        </div>
      </section>
    </div>
  );
}

function ProcessShort() {
  useReveal();
  const steps = [
    { n: '01', t: 'Discover',   d: 'Deep-dive into your brand, audience, and goals. Only intelligence from real data.' },
    { n: '02', t: 'Strategise', d: 'A bespoke digital roadmap tailored to your objectives. Every move intentional.' },
    { n: '03', t: 'Execute',    d: 'Our specialists launch campaigns with precision across all chosen channels.' },
    { n: '04', t: 'Optimise',   d: 'Track, refine, scale. What works gets amplified. Growth never stops.' },
  ];
  return (
    <div className="process-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>How We Work</span></div>
          <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
        </div>
        <div className="proc-steps-short">
          {steps.map((s, i) => (
            <div key={i} className="pstep-s reveal">
              <div className="ps-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function WorkTeaser() {
  const navigate = useNavigate();
  useReveal();
  const kpis = [
    { icon: '🎯', tag: 'Performance Marketing', num: '10x',  desc: 'Average ROAS delivered across Google & Meta campaigns for our clients.' },
    { icon: '📈', tag: 'Social Media Growth',   num: '340%', desc: 'Average sales increase for D2C brands we manage social media for.' },
    { icon: '🔍', tag: 'SEO & Content',         num: '225x', desc: 'Blog traffic growth achieved for a client in 6 months from scratch.' },
    { icon: '💸', tag: 'Paid Ads Efficiency',   num: '-60%', desc: 'Average reduction in cost-per-lead after we rebuild ad campaigns.' },
  ];
  return (
    <div className="wt-bg">
      <section className="sec on-navy">
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '8px' }}>
          <div>
            <div className="sec-label"><span>Real Results</span></div>
            <h2 className="sec-title">Our Work <span className="out">Speaks.</span></h2>
            <p className="sec-sub">5 campaigns. 200+ brands. Numbers that don't lie.</p>
          </div>
          <button className="btn-p" onClick={() => navigate('/projects')}><span>View All Campaigns</span><span>→</span></button>
        </div>
        <div className="wt-inner reveal">
          {kpis.map((k, i) => (
            <div key={i} className="wt-kpi">
              <span className="wt-kpi-icon">{k.icon}</span>
              <div className="wt-kpi-tag">{k.tag}</div>
              <div className="wt-kpi-num">{k.num}</div>
              <p className="wt-kpi-desc">{k.desc}</p>
            </div>
          ))}
        </div>
        <div className="wt-quote reveal">
          <p className="wt-quote-txt">"Working with Ereynard felt like having a world-class team in-house. Every step deliberate, data-backed, and they exceeded every expectation."</p>
          <p className="wt-quote-by">— Aryan Desai, CEO, TechNest Solutions · 225x Traffic Growth</p>
        </div>
        <div className="wt-cta-row reveal">
          <button className="btn-g" onClick={() => navigate('/projects')}>Explore 5 Case Studies →</button>
          <button className="btn-g" onClick={() => navigate('/clients')}>Meet Our Clients →</button>
        </div>
      </section>
    </div>
  );
}

export default function HomePage({ openContact }) {
  useTilt(); useRipple();
  return (
    <>
      <Helmet>
        <title>Best Digital Marketing Agency & Company | Expert Internet Marketing Services - Ereynard</title>
        <meta name="description" content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best Digital Marketing Agency & Company | Expert Internet Marketing Services - Ereynard" />
        <meta property="og:description" content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Digital Marketing Agency & Company | Expert Internet Marketing Services - Ereynard" />
        <meta name="twitter:description" content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more." />
        <link rel="canonical" href="https://ereynard.com/" />
      </Helmet>
      <Hero openContact={openContact} />
      <Marquee />
      <AboutSection />
      <BrandStory />
      <ServicesMini />
      <Stats />
      <ImageBand />
      <ProcessShort />
      <WorkTeaser />
      <FAQ />
    </>
  );
}