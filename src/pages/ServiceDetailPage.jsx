import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SVC_DATA } from '../data/index.js';
import { useReveal } from '../hooks/useReveal.js';

const SVC_KEYS = ['seo','social','performance','content','web','analytics','branding','email','influencer','strategy'];

const PROCESS_STEPS = [
  { n:'01', t:'Discovery',  d:'We audit your current presence, understand goals, audience, and competitive landscape before touching a single tool.' },
  { n:'02', t:'Strategy',   d:'A bespoke roadmap built for this service — channels, content, targeting, budget, and milestones all mapped out.' },
  { n:'03', t:'Execution',  d:'Our specialists execute every deliverable with precision. Quality-checked before anything goes live.' },
  { n:'04', t:'Optimise',   d:"Continuous analysis, A/B testing, and refinement. We scale what works and cut what doesn't — every single month." },
];

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

export default function ServiceDetailPage({ openCamp, openContact }) {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  useReveal();

  useEffect(() => { window.scrollTo({ top:0, behavior:'instant' }); }, [serviceId]);

  const d = SVC_DATA[serviceId];

  if (!d) return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--B3)', gap:'20px' }}>
      <p style={{ fontSize:'64px' }}>🦊</p>
      <h2 style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'28px', color:'var(--Y)' }}>Service Not Found</h2>
      <p style={{ color:'rgba(240,200,69,.5)', fontSize:'14px' }}>"{serviceId}" exist nahi karta.</p>
      <button className="btn-p" onClick={() => navigate('/services')}><span>Back to All Services</span><span>→</span></button>
    </div>
  );

  const currentIdx = SVC_KEYS.indexOf(serviceId);
  const prevKey    = currentIdx > 0                   ? SVC_KEYS[currentIdx - 1] : null;
  const nextKey    = currentIdx < SVC_KEYS.length - 1 ? SVC_KEYS[currentIdx + 1] : null;
  const campaign   = SVC_CAMPAIGNS[serviceId];

  return (
    <>
      <style>{`
        .sdp-feat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-top:32px; }
        .sdp-feat-card { background:var(--B4); border:1px solid rgba(240,200,69,.07); padding:26px 22px; transition:all .35s; cursor:default; }
        .sdp-feat-card:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.22); transform:translateY(-4px); }
        .sdp-feat-icon  { font-size:26px; margin-bottom:12px; display:block; }
        .sdp-feat-title { font-family:var(--FM); font-weight:700; font-size:14px; color:var(--Y); margin-bottom:5px; }
        .sdp-feat-desc  { font-size:12px; line-height:1.72; color:rgba(240,200,69,.42); }
        .sdp-proc-grid  { display:grid; grid-template-columns:repeat(4,1fr); gap:2px; margin-top:32px; }
        .sdp-proc-step  { background:var(--B4); border:1px solid rgba(240,200,69,.07); padding:28px 22px; position:relative; overflow:hidden; cursor:default; }
        .sdp-proc-step::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--Y); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.22,1,.36,1); }
        .sdp-proc-step:hover::after { transform:scaleX(1); }
        .sdp-proc-num   { font-family:var(--FM); font-weight:900; font-size:52px; color:rgba(240,200,69,.06); line-height:1; margin-bottom:10px; }
        .sdp-proc-title { font-family:var(--FM); font-weight:800; font-size:16px; color:var(--Y); margin-bottom:7px; }
        .sdp-proc-desc  { font-size:12px; line-height:1.7; color:rgba(240,200,69,.36); }
        .sdp-all-grid   { display:grid; grid-template-columns:repeat(2,1fr); gap:2px; margin-top:28px; }
        .sdp-all-card   { background:var(--B4); border:1px solid rgba(240,200,69,.07); padding:16px 18px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:all .25s; text-decoration:none; }
        .sdp-all-card:hover { background:rgba(240,200,69,.07); border-color:rgba(240,200,69,.22); transform:translateX(4px); }
        .sdp-all-card.current { border-color:var(--Y); background:rgba(240,200,69,.06); pointer-events:none; }
        .sdp-cta-box    { background:var(--Y); padding:56px; display:grid; grid-template-columns:1fr auto; gap:32px; align-items:center; }
        .sdp-nav-row    { display:flex; justify-content:space-between; align-items:center; padding:24px 56px; background:var(--B2); border-top:1px solid rgba(240,200,69,.07); gap:12px; flex-wrap:wrap; }
        .sdp-nav-btn    { display:flex; align-items:center; gap:12px; background:none; border:1px solid rgba(240,200,69,.14); padding:14px 20px; cursor:pointer; transition:all .3s; font-family:var(--FM); }
        .sdp-nav-btn:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.3); }
        .sdp-nav-label  { font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:rgba(240,200,69,.36); display:block; margin-bottom:3px; }
        .sdp-nav-title  { font-family:var(--FM); font-weight:700; font-size:13px; color:var(--Y); display:block; }
        @media(max-width:1100px) {
          .sdp-feat-grid { grid-template-columns:1fr 1fr; }
          .sdp-proc-grid { grid-template-columns:1fr 1fr; }
          .sdp-cta-box   { grid-template-columns:1fr; gap:20px; padding:36px 20px; }
          .sdp-nav-row   { padding:18px 20px; }
        }
        @media(max-width:640px) {
          .sdp-feat-grid { grid-template-columns:1fr; }
          .sdp-proc-grid { grid-template-columns:1fr; }
          .sdp-all-grid  { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── PAGE HERO ── */}
      <div className="page-hero" style={{ minHeight:'48vh' }}>
        <div className="ph-orb ph-orb1" />
        <div className="ph-orb ph-orb2" />

        {/* Breadcrumb */}
        <div style={{ position:'absolute', top:'96px', left:'56px', display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'rgba(240,200,69,.35)', fontFamily:'var(--FM)', zIndex:2, flexWrap:'wrap' }}>
          <Link to="/" style={{ color:'rgba(240,200,69,.35)', textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--Y)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(240,200,69,.35)'}
          >Home</Link>
          <span style={{ opacity:.4 }}>/</span>
          <Link to="/services" style={{ color:'rgba(240,200,69,.35)', textDecoration:'none', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--Y)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(240,200,69,.35)'}
          >Services</Link>
          <span style={{ opacity:.4 }}>/</span>
          <span style={{ color:'var(--Y)' }}>{d.title}</span>
        </div>

        <div className="page-hero-content" style={{ position:'relative', zIndex:2 }}>
          <div className="page-hero-label">Service {d.num}</div>
          <div style={{ display:'flex', alignItems:'center', gap:'18px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'clamp(52px,7vw,92px)', lineHeight:1 }}>{d.icon}</span>
            <div className="page-hero-title">
              <span className="solid">{d.title}</span>
            </div>
          </div>
          <p className="page-hero-sub">{d.desc}</p>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'16px' }}>
            {d.tags.map((tag,i) => (
              <span key={i} style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(240,200,69,.6)', background:'rgba(240,200,69,.08)', border:'1px solid rgba(240,200,69,.18)', padding:'4px 10px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESULTS STRIP ── */}
      <div style={{ background:'var(--Y)' }}>
        <div style={{ display:'grid', gridTemplateColumns:`repeat(${d.res.length},1fr)` }}>
          {d.res.map((r,i) => (
            <div key={i} style={{ padding:'28px 24px', textAlign:'center', borderRight:i < d.res.length-1 ? '1px solid rgba(14,16,75,.12)' : 'none' }}>
              <div style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'clamp(32px,4vw,56px)', color:'var(--B)', lineHeight:1 }}>{r.n}</div>
              <div style={{ fontSize:'10px', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(14,16,75,.5)', marginTop:'6px' }}>{r.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES / SCOPE ── */}
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
                <span className="sdp-feat-icon">{f.i}</span>
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
                  {d.res.map((r,i) => (
                    <span key={i} style={{ background:'var(--Y)', color:'var(--B)', fontSize:'10px', fontWeight:800, padding:'4px 10px', fontFamily:'var(--FM)' }}>{r.n} {r.l}</span>
                  ))}
                </div>
              </div>
              <div style={{ width:'52px', height:'52px', background:'var(--Y)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px', color:'var(--B)', flexShrink:0 }}>→</div>
            </div>
          </section>
        </div>
      )}

      {/* ── ALL SERVICES LIST ── */}
      <div style={{ background:'var(--B3)' }}>
        <section className="sec on-navy">
          <div className="reveal">
            <div className="sec-label"><span>Explore More</span></div>
            <h2 className="sec-title">All <span className="out">Services</span></h2>
          </div>
          <div className="sdp-all-grid">
            {Object.entries(SVC_DATA).map(([k,v]) => (
              <Link key={k} to={`/services/${k}`} className={`sdp-all-card ${k===serviceId ? 'current' : ''}`}>
                <span style={{ fontSize:'22px', flexShrink:0 }}>{v.icon}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(240,200,69,.3)', marginBottom:'3px' }}>{v.num}</div>
                  <div style={{ fontFamily:'var(--FM)', fontWeight:700, fontSize:'13px', color: k===serviceId ? 'var(--Y)' : 'rgba(240,200,69,.7)', lineHeight:1.3 }}>{v.title}</div>
                </div>
                {k===serviceId
                  ? <span style={{ fontSize:'9px', fontWeight:700, letterSpacing:'.1em', color:'var(--Y)', background:'rgba(240,200,69,.1)', padding:'3px 8px', whiteSpace:'nowrap', flexShrink:0 }}>Current</span>
                  : <span style={{ color:'rgba(240,200,69,.3)', flexShrink:0 }}>→</span>
                }
              </Link>
            ))}
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
        {prevKey ? (
          <button className="sdp-nav-btn" onClick={() => navigate(`/services/${prevKey}`)}>
            <span style={{ fontSize:'18px', color:'rgba(240,200,69,.5)' }}>←</span>
            <div style={{ textAlign:'left' }}>
              <span className="sdp-nav-label">Previous</span>
              <span className="sdp-nav-title">{SVC_DATA[prevKey]?.icon} {SVC_DATA[prevKey]?.title}</span>
            </div>
          </button>
        ) : <div />}
        <button className="btn-g" onClick={() => navigate('/services')}>All Services →</button>
        {nextKey ? (
          <button className="sdp-nav-btn" onClick={() => navigate(`/services/${nextKey}`)}>
            <div style={{ textAlign:'right' }}>
              <span className="sdp-nav-label">Next</span>
              <span className="sdp-nav-title">{SVC_DATA[nextKey]?.icon} {SVC_DATA[nextKey]?.title}</span>
            </div>
            <span style={{ fontSize:'18px', color:'rgba(240,200,69,.5)' }}>→</span>
          </button>
        ) : <div />}
      </div>
    </>
  );
}