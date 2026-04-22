import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SVC_DATA } from '../data/index.js';
import { SVC_CARD_ICONS, FEAT_ICONS } from '../components/SvcIcons.jsx';
import { useReveal } from '../hooks/useReveal.js';

// ── URL slug → data key mapping ──
const SLUG_TO_KEY = {
  'seo':                       'seo',
  'social-media-marketing':    'social',
  'performance-advertising':   'performance',
  'content-strategy':          'content',
  'web-design-development':    'web',
  'analytics-reporting':       'analytics',
  'branding-identity':         'branding',
  'email-marketing':           'email',
  'influencer-marketing':      'influencer',
  'digital-strategy':          'strategy',
  // Backward compat — old short slugs still work
  'social':      'social',
  'performance': 'performance',
  'content':     'content',
  'web':         'web',
  'analytics':   'analytics',
  'branding':    'branding',
  'email':       'email',
  'influencer':  'influencer',
  'strategy':    'strategy',
};

// ── Ordered keys for prev/next navigation ──
const SVC_ORDER = [
  'seo',
  'social-media-marketing',
  'performance-advertising',
  'content-strategy',
  'web-design-development',
  'analytics-reporting',
  'branding-identity',
  'email-marketing',
  'influencer-marketing',
  'digital-strategy',
];

// ── Canonical URLs ──
const SVC_URL = {
  seo:         '/services/seo',
  social:      '/services/social-media-marketing',
  performance: '/services/performance-advertising',
  content:     '/services/content-strategy',
  web:         '/services/web-design-development',
  analytics:   '/services/analytics-reporting',
  branding:    '/services/branding-identity',
  email:       '/services/email-marketing',
  influencer:  '/services/influencer-marketing',
  strategy:    '/services/digital-strategy',
};

const SVC_CAMPAIGNS = {
  seo:         { key:'technest',    label:'TechNest — 225x Traffic Growth' },
  social:      { key:'luxethreads', label:'LuxeThreads — 340% Sales Increase' },
  performance: { key:'novabrand',   label:'NovaBrand — 10x ROI' },
  content:     { key:'eduspark',    label:'EduSpark — 225x Blog Growth' },
  web:         { key:'novabrand',   label:'NovaBrand — Full Rebuild' },
  analytics:   { key:'growfast',    label:'GrowFast — 60% CPL Cut' },
  branding:    { key:'luxethreads', label:'LuxeThreads — Brand Explosion' },
  email:       { key:'eduspark',    label:'EduSpark — 380% Enrollment Lift' },
  influencer:  { key:'luxethreads', label:'LuxeThreads — 18M Reach' },
  strategy:    { key:'novabrand',   label:'NovaBrand — Full Strategy' },
};

const SVC_META = {
  seo: {
    title:       'SEO in Udaipur | Google SEO Expert & SEO Agency | Ereynard',
    description: 'Get expert SEO services in Udaipur from a Google SEO expert and SEO agency offering SEO marketing and search engine marketing solutions.',
  },
};

export default function ServiceDetailPage({ openCamp, openContact }) {
  const { serviceId } = useParams();
  const navigate      = useNavigate();
  useReveal();

  useEffect(() => { window.scrollTo({ top:0, behavior:'instant' }); }, [serviceId]);

  // Resolve data key from URL slug
  const dataKey   = SLUG_TO_KEY[serviceId] || serviceId;
  const d         = SVC_DATA[dataKey];
  const meta      = SVC_META[dataKey] || null;
  const featIcons = FEAT_ICONS[dataKey] || [];

  if (!d) return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--B3)', gap:'20px' }}>
      <p style={{ fontSize:'64px' }}>🦊</p>
      <h2 style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'28px', color:'var(--Y)' }}>Service Not Found</h2>
      <p style={{ color:'rgba(240,200,69,.5)', fontSize:'14px' }}>"{serviceId}" exist nahi karta.</p>
      <button className="btn-p" onClick={() => navigate('/services')}><span>Back to All Services</span><span>→</span></button>
    </div>
  );

  const currentIdx = SVC_ORDER.indexOf(serviceId);
  const prevSlug   = currentIdx > 0                    ? SVC_ORDER[currentIdx - 1] : null;
  const nextSlug   = currentIdx < SVC_ORDER.length - 1 ? SVC_ORDER[currentIdx + 1] : null;
  const prevKey    = prevSlug ? SLUG_TO_KEY[prevSlug] : null;
  const nextKey    = nextSlug ? SLUG_TO_KEY[nextSlug] : null;
  const campaign   = SVC_CAMPAIGNS[dataKey];

  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description"        content={meta.description} />
          <meta property="og:title"       content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta name="twitter:title"      content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <link rel="canonical" href={`https://ereynard.com${SVC_URL[dataKey]}`} />
        </Helmet>
      )}

      <style>{`
        .sdp-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:32px; }
        .sdp-feat-card { background:var(--B4); border:1px solid rgba(240,200,69,.07); padding:26px 22px; transition:all .35s; cursor:default; }
        .sdp-feat-card:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.22); transform:translateY(-4px); }
        .sdp-feat-icon-wrap {
          width:42px; height:42px;
          background:rgba(240,200,69,.08); border:1px solid rgba(240,200,69,.14);
          display:flex; align-items:center; justify-content:center;
          color:var(--Y); margin-bottom:14px;
          transition:background .3s,border-color .3s,color .3s;
        }
        .sdp-feat-card:hover .sdp-feat-icon-wrap { background:var(--Y); border-color:var(--Y); color:var(--B); }
        .sdp-feat-title { font-family:var(--FM); font-weight:700; font-size:14px; color:var(--Y); margin-bottom:5px; }
        .sdp-feat-desc  { font-size:12px; line-height:1.72; color:rgba(240,200,69,.42); }
        .sdp-all-grid   { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; margin-top:28px; }
        .sdp-all-card   { background:var(--B4); border:1px solid rgba(240,200,69,.07); padding:16px 18px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:all .25s; text-decoration:none; }
        .sdp-all-card:hover { background:rgba(240,200,69,.07); border-color:rgba(240,200,69,.22); transform:translateX(4px); }
        .sdp-all-card.current { border-color:var(--Y); background:rgba(240,200,69,.06); pointer-events:none; }
        .sdp-all-icon { width:32px; height:32px; flex-shrink:0; background:rgba(240,200,69,.07); border:1px solid rgba(240,200,69,.12); display:flex; align-items:center; justify-content:center; color:var(--Y); }
        .sdp-all-card.current .sdp-all-icon { background:rgba(240,200,69,.18); border-color:rgba(240,200,69,.4); }
        .sdp-cta-box { background:var(--Y); padding:56px; display:grid; grid-template-columns:1fr auto; gap:32px; align-items:center; }
        .sdp-nav-row { display:flex; justify-content:space-between; align-items:center; padding:24px 56px; background:var(--B2); border-top:1px solid rgba(240,200,69,.07); gap:12px; flex-wrap:wrap; }
        .sdp-nav-btn { display:flex; align-items:center; gap:12px; background:none; border:1px solid rgba(240,200,69,.14); padding:14px 20px; cursor:pointer; transition:all .3s; }
        .sdp-nav-btn:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.3); }
        .sdp-nav-label { font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(240,200,69,.36); display:block; margin-bottom:3px; }
        .sdp-nav-title { font-family:var(--FM); font-weight:700; font-size:13px; color:var(--Y); display:block; }
        .sdp-nav-icon  { width:26px; height:26px; flex-shrink:0; background:rgba(240,200,69,.07); border:1px solid rgba(240,200,69,.14); display:flex; align-items:center; justify-content:center; color:var(--Y); }
        @media(max-width:1100px){
          .sdp-feat-grid { grid-template-columns:1fr 1fr; }
          .sdp-cta-box   { grid-template-columns:1fr; gap:20px; padding:36px 20px; }
          .sdp-nav-row   { padding:18px 20px; }
        }
        @media(max-width:640px){
          .sdp-feat-grid { grid-template-columns:1fr; }
          .sdp-all-grid  { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero" style={{ minHeight:'48vh' }}>
        <div className="ph-orb ph-orb1" /><div className="ph-orb ph-orb2" />
        <div style={{ position:'absolute', top:'96px', left:'56px', display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'rgba(240,200,69,.35)', fontFamily:'var(--FM)', zIndex:2, flexWrap:'wrap' }}>
          <Link to="/" style={{ color:'rgba(240,200,69,.35)', textDecoration:'none' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--Y)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(240,200,69,.35)'}
          >Home</Link>
          <span style={{ opacity:.4 }}>/</span>
          <Link to="/services" style={{ color:'rgba(240,200,69,.35)', textDecoration:'none' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--Y)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(240,200,69,.35)'}
          >Services</Link>
          <span style={{ opacity:.4 }}>/</span>
          <span style={{ color:'var(--Y)' }}>{d.title}</span>
        </div>
        <div className="page-hero-content" style={{ position:'relative', zIndex:2 }}>
          <div className="page-hero-label">Service {d.num}</div>
          <div style={{ display:'flex', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
            <div style={{ width:'70px', height:'70px', flexShrink:0, background:'rgba(240,200,69,.1)', border:'1px solid rgba(240,200,69,.22)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--Y)' }}>
              <span style={{ transform:'scale(1.7)', display:'flex' }}>{SVC_CARD_ICONS[dataKey]}</span>
            </div>
            <div className="page-hero-title"><span className="solid">{d.title}</span></div>
          </div>
          <p className="page-hero-sub">{d.desc}</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'16px' }}>
            {d.tags.map((tag,i) => (
              <span key={i} style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(240,200,69,.6)', background:'rgba(240,200,69,.08)', border:'1px solid rgba(240,200,69,.18)', padding:'4px 10px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS STRIP ── */}
      <div style={{ background:'var(--Y)' }}>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${d.res.length},1fr)` }}>
          {d.res.map((r,i) => (
            <div key={i} style={{ padding:'28px 24px', textAlign:'center', borderRight:i<d.res.length-1?'1px solid rgba(14,16,75,.12)':'none' }}>
              <div style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'clamp(32px,4vw,56px)', color:'var(--B)', lineHeight:1 }}>{r.n}</div>
              <div style={{ fontSize:'10px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(14,16,75,.5)', marginTop:'6px' }}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ background:'var(--B)' }}>
        <section className="sec on-navy">
          <div className="reveal">
            <div className="sec-label"><span>What's Included</span></div>
            <h2 className="sec-title">Full <span className="out">Scope</span></h2>
            <p className="sec-intro">Every deliverable you get when you partner with us for {d.title}.</p>
          </div>
          <div className="sdp-feat-grid">
            {d.feats.map((f,i) => (
              <div key={i} className="sdp-feat-card reveal">
                <div className="sdp-feat-icon-wrap">
                  {featIcons[i] || <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div className="sdp-feat-title">{f.t}</div>
                <p className="sdp-feat-desc">{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── RELATED CAMPAIGN ── */}
      {campaign && (
        <div style={{ background:'var(--B2)' }}>
          <section className="sec on-navy">
            <div className="reveal">
              <div className="sec-label"><span>Real Result</span></div>
              <h2 className="sec-title">See It In <span className="out">Action</span></h2>
              <p className="sec-intro">A real campaign we ran using this exact service.</p>
            </div>
            <div className="reveal" style={{ marginTop:'28px', background:'var(--B4)', border:'1px solid rgba(240,200,69,.1)', padding:'32px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px', flexWrap:'wrap', cursor:'pointer', transition:'all .3s' }}
              onClick={() => openCamp && openCamp(campaign.key)}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(240,200,69,.32)'; e.currentTarget.style.background='rgba(240,200,69,.04)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(240,200,69,.1)'; e.currentTarget.style.background='var(--B4)'; }}
            >
              <div>
                <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(240,200,69,.36)', marginBottom:'8px' }}>Case Study</div>
                <div style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'clamp(18px,2.5vw,28px)', color:'var(--Y)', marginBottom:'12px' }}>{campaign.label}</div>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {d.res.map((r,i) => <span key={i} style={{ background:'var(--Y)', color:'var(--B)', fontSize:'10px', fontWeight:800, padding:'4px 10px', fontFamily:'var(--FM)' }}>{r.n} {r.l}</span>)}
                </div>
              </div>
              <div style={{ width:'52px', height:'52px', background:'var(--Y)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', color:'var(--B)', flexShrink:0 }}>→</div>
            </div>
          </section>
        </div>
      )}

      {/* ── ALL SERVICES ── */}
      <div style={{ background:'var(--B3)' }}>
        <section className="sec on-navy">
          <div className="reveal">
            <div className="sec-label"><span>Explore More</span></div>
            <h2 className="sec-title">All <span className="out">Services</span></h2>
          </div>
          <div className="sdp-all-grid">
            {Object.entries(SVC_URL).map(([k, url]) => {
              const v = SVC_DATA[k];
              if (!v) return null;
              const isCurrent = k === dataKey;
              return (
                <Link key={k} to={url} className={`sdp-all-card ${isCurrent ? 'current' : ''}`}>
                  <div className="sdp-all-icon">{SVC_CARD_ICONS[k]}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(240,200,69,.3)', marginBottom:'3px' }}>{v.num}</div>
                    <div style={{ fontFamily:'var(--FM)', fontWeight:700, fontSize:'13px', color: isCurrent ? 'var(--Y)' : 'rgba(240,200,69,.7)', lineHeight:1.3 }}>{v.title}</div>
                  </div>
                  {isCurrent
                    ? <span style={{ fontSize:'9px', fontWeight:700, color:'var(--Y)', background:'rgba(240,200,69,.1)', padding:'3px 8px', whiteSpace:'nowrap', flexShrink:0 }}>Current</span>
                    : <span style={{ color:'rgba(240,200,69,.3)', flexShrink:0 }}>→</span>
                  }
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── CTA ── */}
      <div className="sdp-cta-box">
        <div>
          <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(14,16,75,.45)', marginBottom:'10px' }}>Ready to Start?</div>
          <h2 style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'clamp(26px,3.5vw,48px)', color:'var(--B)', lineHeight:1.1, marginBottom:'10px' }}>
            Let's Build Your<br />{d.title} Strategy
          </h2>
          <p style={{ fontSize:'14px', lineHeight:1.8, color:'rgba(14,16,75,.58)', maxWidth:'480px' }}>
            Free custom proposal within 48 hours. No commitment, no jargon — just a clear plan to grow your brand.
          </p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px', alignItems:'flex-start' }}>
          <button className="btn-p" onClick={openContact} style={{ background:'var(--B)' }}>
            <span style={{ color:'var(--Y)' }}>Get Free Proposal</span>
            <span style={{ color:'var(--Y)' }}>→</span>
          </button>
          <button className="btn-out" onClick={() => navigate('/services')}>
            <span>View All Services</span><span>→</span>
          </button>
        </div>
      </div>

      {/* ── PREV / NEXT ── */}
      <div className="sdp-nav-row">
        {prevSlug ? (
          <button className="sdp-nav-btn" onClick={() => navigate(SVC_URL[prevKey])}>
            <span style={{ fontSize:'18px', color:'rgba(240,200,69,.5)' }}>←</span>
            <div style={{ textAlign:'left' }}>
              <span className="sdp-nav-label">Previous</span>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'3px' }}>
                <div className="sdp-nav-icon">{SVC_CARD_ICONS[prevKey]}</div>
                <span className="sdp-nav-title">{SVC_DATA[prevKey]?.title}</span>
              </div>
            </div>
          </button>
        ) : <div />}
        <button className="btn-g" onClick={() => navigate('/services')}>All Services →</button>
        {nextSlug ? (
          <button className="sdp-nav-btn" onClick={() => navigate(SVC_URL[nextKey])}>
            <div style={{ textAlign:'right' }}>
              <span className="sdp-nav-label">Next</span>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'3px', justifyContent:'flex-end' }}>
                <span className="sdp-nav-title">{SVC_DATA[nextKey]?.title}</span>
                <div className="sdp-nav-icon">{SVC_CARD_ICONS[nextKey]}</div>
              </div>
            </div>
            <span style={{ fontSize:'18px', color:'rgba(240,200,69,.5)' }}>→</span>
          </button>
        ) : <div />}
      </div>
    </>
  );
}