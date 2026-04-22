import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const SERVICES = [
  { k:'seo',         url:'/services/seo',                      i:'🔍', t:'Search Engine Optimisation', d:'Rank #1 & drive organic traffic'         },
  { k:'social',      url:'/services/social-media-marketing',   i:'📱', t:'Social Media Marketing',     d:'Build community & grow followers'        },
  { k:'performance', url:'/services/performance-advertising',  i:'🎯', t:'Performance Advertising',    d:'Google & Meta ads that convert'          },
  { k:'content',     url:'/services/content-strategy',         i:'✍️', t:'Content Strategy & Creation',d:'Content that educates & sells'           },
  { k:'web',         url:'/services/web-design-development',   i:'🌐', t:'Web Design & Development',   d:'Fast, beautiful, high-converting sites'  },
  { k:'analytics',   url:'/services/analytics-reporting',      i:'📊', t:'Analytics & Reporting',      d:'Dashboards & real ROI clarity'           },
  { k:'branding',    url:'/services/branding-identity',        i:'🎨', t:'Branding & Identity',        d:'Logos, systems & brand guidelines'       },
  { k:'email',       url:'/services/email-marketing',          i:'📧', t:'Email & CRM Marketing',      d:'Automations with 42% open rates'         },
  { k:'influencer',  url:'/services/influencer-marketing',     i:'🤝', t:'Influencer Marketing',       d:'500+ creators, 12x campaign ROAS'        },
];

const TOOLS = [
  { k:'/roi-calculator',  i:'🧮', t:'ROI Calculator',   d:'Calculate your marketing return on investment' },
  { k:'/marketing-roast', i:'🔥', t:'Marketing Roast',  d:'Get brutally honest score for your marketing'  },
];

export default function Header({ openContact }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [mob,          setMob]          = useState(false);
  const [dropOpen,     setDropOpen]     = useState(false);
  const [toolDropOpen, setToolDropOpen] = useState(false);
  const [mobSvcOpen,   setMobSvcOpen]   = useState(false);
  const [mobToolOpen,  setMobToolOpen]  = useState(false);
  const dropRef     = useRef(null);
  const toolDropRef = useRef(null);
  const navigate    = useNavigate();
  const location    = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
      if (toolDropRef.current && !toolDropRef.current.contains(e.target)) setToolDropOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  useEffect(() => {
    setDropOpen(false); setToolDropOpen(false);
    setMob(false); setMobSvcOpen(false); setMobToolOpen(false);
  }, [location.pathname]);

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top:0, behavior:'instant' });
    setMob(false); setDropOpen(false); setToolDropOpen(false);
    setMobSvcOpen(false); setMobToolOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isServiceActive = location.pathname.startsWith('/services');
  const isToolActive    = TOOLS.some(t => location.pathname.startsWith(t.k));

  const pages = [
    { k:'/',         l:'Home'    },
    { k:'/about-us', l:'About'   },
    { k:'/projects', l:'Work'    },
    { k:'/clients',  l:'Clients' },
    { k:'/blog',     l:'Blog'    },
  ];

  return (
    <>
      <style>{`
        .nav-svc-wrap, .nav-tool-wrap { position:relative; }
        .nav-svc-btn, .nav-tool-btn-dd {
          color:rgba(14,16,75,.55); font-size:11px; letter-spacing:.12em; text-transform:uppercase;
          font-weight:700; transition:color .3s; position:relative;
          background:none; border:none; cursor:pointer; font-family:var(--FM); padding:0;
          display:inline-flex; align-items:center; gap:5px;
        }
        .nav-svc-btn::after, .nav-tool-btn-dd::after {
          content:''; position:absolute; bottom:-3px; left:0;
          width:0; height:1.5px; background:var(--B);
          transition:width .3s cubic-bezier(.4,0,.2,1);
        }
        .nav-svc-btn:hover,.nav-svc-btn.active { color:var(--B); }
        .nav-svc-btn:hover::after,.nav-svc-btn.active::after { width:100%; }

        .nav-tool-btn-dd {
          color:var(--B) !important; background:rgba(240,200,69,.18) !important;
          border:1px solid rgba(240,200,69,.35) !important;
          padding:5px 12px !important; font-size:10px !important;
        }
        .nav-tool-btn-dd:hover,.nav-tool-btn-dd.active { background:var(--Y) !important; }
        .nav-tool-btn-dd::after { display:none; }

        .nav-chevron { font-size:7px; display:inline-block; transition:transform .25s cubic-bezier(.4,0,.2,1); opacity:.55; }
        .nav-svc-btn.open .nav-chevron, .nav-tool-btn-dd.open .nav-chevron { transform:rotate(180deg); opacity:1; }

        .nav-dropdown, .nav-tool-dropdown {
          position:absolute; top:calc(100% + 14px); left:50%;
          transform:translateX(-50%) translateY(-10px);
          background:rgba(10,12,66,0.99); border:1px solid rgba(240,200,69,.16);
          border-top:3px solid var(--Y); backdrop-filter:blur(24px);
          box-shadow:0 28px 72px rgba(0,0,0,.55);
          clip-path:polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,0 100%);
          opacity:0; pointer-events:none; transition:opacity .22s ease,transform .22s ease; z-index:2000;
        }
        .nav-dropdown { width:580px; }
        .nav-tool-dropdown { width:420px; }
        .nav-dropdown.show,.nav-tool-dropdown.show { opacity:1; pointer-events:all; transform:translateX(-50%) translateY(0); }

        .nd-head { padding:13px 18px 10px; border-bottom:1px solid rgba(240,200,69,.08); display:flex; align-items:center; justify-content:space-between; }
        .nd-head-label { font-size:9px; font-weight:700; letter-spacing:.26em; text-transform:uppercase; color:rgba(240,200,69,.36); font-family:var(--FM); }
        .nd-view-all { font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:rgba(240,200,69,.52); background:none; border:none; cursor:pointer; font-family:var(--FM); transition:color .2s; display:flex; align-items:center; gap:5px; }
        .nd-view-all:hover { color:var(--Y); }
        .nd-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; padding:8px; }
        .nd-tool-grid { display:flex; flex-direction:column; gap:2px; padding:8px; }
        .nd-item { display:flex; align-items:flex-start; gap:11px; padding:12px 14px; cursor:pointer; transition:all .2s; background:none; border:1px solid transparent; text-align:left; width:100%; font-family:var(--FM); text-decoration:none; }
        .nd-item:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.14); }
        .nd-item.active-svc { background:rgba(240,200,69,.09); border-color:rgba(240,200,69,.2); }
        .nd-icon { font-size:20px; flex-shrink:0; width:36px; height:36px; background:rgba(240,200,69,.07); border:1px solid rgba(240,200,69,.12); display:flex; align-items:center; justify-content:center; transition:background .2s; }
        .nd-item:hover .nd-icon { background:rgba(240,200,69,.15); }
        .nd-item-title { font-size:12px; font-weight:700; color:var(--Y); line-height:1.2; margin-bottom:3px; display:block; }
        .nd-item-desc { font-size:10px; color:rgba(240,200,69,.38); line-height:1.45; display:block; }
        .nd-foot { padding:10px 18px 13px; border-top:1px solid rgba(240,200,69,.07); display:flex; align-items:center; justify-content:space-between; gap:10px; }
        .nd-foot-txt { font-size:10px; color:rgba(240,200,69,.3); font-family:var(--FM); }
        .nd-foot-cta { background:var(--Y); color:var(--B); font-family:var(--FM); font-size:9px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:7px 16px; border:none; cursor:pointer; clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,0 100%); transition:all .2s; white-space:nowrap; }
        .nd-foot-cta:hover { background:var(--B3); color:var(--Y); }
        .nd-tool-item { display:flex; align-items:center; gap:14px; padding:14px 16px; cursor:pointer; transition:all .2s; background:none; border:1px solid transparent; text-align:left; width:100%; font-family:var(--FM); text-decoration:none; }
        .nd-tool-item:hover { background:rgba(240,200,69,.06); border-color:rgba(240,200,69,.14); }
        .nd-tool-item.active-tool { background:rgba(240,200,69,.09); border-color:rgba(240,200,69,.2); }
        .nd-tool-icon { font-size:22px; flex-shrink:0; width:44px; height:44px; background:rgba(240,200,69,.07); border:1px solid rgba(240,200,69,.12); display:flex; align-items:center; justify-content:center; transition:background .2s; }
        .nd-tool-item:hover .nd-tool-icon { background:rgba(240,200,69,.15); }
        .nd-tool-badge { margin-left:auto; font-size:8px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--B); background:var(--Y); padding:3px 8px; flex-shrink:0; }

        .mob-svc-toggle,.mob-tool-toggle { font-family:var(--FM); font-weight:800; font-size:clamp(32px,6vw,52px); color:var(--Y); letter-spacing:.04em; background:none; border:none; cursor:pointer; text-transform:uppercase; transition:all .3s; display:flex; align-items:center; gap:14px; }
        .mob-svc-toggle:hover,.mob-tool-toggle:hover { color:transparent; -webkit-text-stroke:1.5px var(--Y); }
        .mob-svc-chevron,.mob-tool-chevron { font-size:18px; opacity:.55; transition:transform .3s; }
        .mob-svc-chevron.open,.mob-tool-chevron.open { transform:rotate(180deg); }
        .mob-svc-list,.mob-tool-list { display:flex; flex-direction:column; gap:4px; max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.4,0,.2,1); width:100%; }
        .mob-svc-list.open { max-height:600px; }
        .mob-tool-list.open { max-height:200px; }
        .mob-svc-item,.mob-tool-item { display:flex; align-items:center; gap:10px; padding:10px 20px; cursor:pointer; background:rgba(240,200,69,.05); border:1px solid rgba(240,200,69,.08); font-family:var(--FM); font-size:14px; font-weight:600; color:var(--Y); text-decoration:none; transition:all .2s; width:90%; }
        .mob-svc-item:hover,.mob-tool-item:hover { background:rgba(240,200,69,.12); }
        .mob-tool-item { background:rgba(240,200,69,.08); border-color:rgba(240,200,69,.15); }
      `}</style>

      <nav className={scrolled ? 'sc' : ''}>
        <button className="nav-logo" onClick={() => goTo('/')}>
          <img src="/logo.jpg" alt="Ereynard" style={{ height:'46px', width:'46px', objectFit:'contain', borderRadius:'8px', flexShrink:0 }} />
          <span style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'20px', letterSpacing:'.06em', color:'var(--B)' }}>
            Ereynard<span style={{ opacity:.3 }}>.</span>
          </span>
        </button>

        <ul className="nav-links">
          {pages.map(p => (
            <li key={p.k}>
              <button className={isActive(p.k) ? 'active' : ''} onClick={() => goTo(p.k)}>{p.l}</button>
            </li>
          ))}

          {/* Free Tools dropdown */}
          <li className="nav-tool-wrap" ref={toolDropRef}>
            <button className={`nav-tool-btn-dd ${isToolActive ? 'active' : ''} ${toolDropOpen ? 'open' : ''}`}
              onClick={() => { setToolDropOpen(v => !v); setDropOpen(false); }}>
              🛠 Free Tools <span className="nav-chevron">▼</span>
            </button>
            <div className={`nav-tool-dropdown ${toolDropOpen ? 'show' : ''}`}>
              <div className="nd-head">
                <span className="nd-head-label">Free Marketing Tools</span>
                <span style={{ fontSize:'9px', color:'rgba(240,200,69,.3)', fontFamily:'var(--FM)' }}>100% Free</span>
              </div>
              <div className="nd-tool-grid">
                {TOOLS.map(t => (
                  <Link key={t.k} to={t.k} className={`nd-tool-item ${location.pathname === t.k ? 'active-tool' : ''}`} onClick={() => setToolDropOpen(false)}>
                    <div className="nd-tool-icon">{t.i}</div>
                    <div>
                      <span className="nd-item-title">{t.t}</span>
                      <span className="nd-item-desc">{t.d}</span>
                    </div>
                    <span className="nd-tool-badge">FREE</span>
                  </Link>
                ))}
              </div>
              <div className="nd-foot">
                <span className="nd-foot-txt">🦊 More tools coming soon</span>
                <button className="nd-foot-cta" onClick={() => { openContact(); setToolDropOpen(false); }}>Free Proposal →</button>
              </div>
            </div>
          </li>

          {/* Services dropdown */}
          <li className="nav-svc-wrap" ref={dropRef}>
            <button className={`nav-svc-btn ${isServiceActive ? 'active' : ''} ${dropOpen ? 'open' : ''}`}
              onClick={() => { setDropOpen(v => !v); setToolDropOpen(false); }}>
              Services <span className="nav-chevron">▼</span>
            </button>
            <div className={`nav-dropdown ${dropOpen ? 'show' : ''}`}>
              <div className="nd-head">
                <span className="nd-head-label">Our Services</span>
                <button className="nd-view-all" onClick={() => goTo('/services')}>View All →</button>
              </div>
              <div className="nd-grid">
                {SERVICES.map(s => (
                  <Link key={s.k} to={s.url}
                    className={`nd-item ${location.pathname === s.url ? 'active-svc' : ''}`}
                    onClick={() => setDropOpen(false)}>
                    <div className="nd-icon">{s.i}</div>
                    <div>
                      <span className="nd-item-title">{s.t}</span>
                      <span className="nd-item-desc">{s.d}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="nd-foot">
                <span className="nd-foot-txt">🦊 9 services · 200+ brands scaled</span>
                <button className="nd-foot-cta" onClick={() => { openContact(); setDropOpen(false); }}>Free Proposal →</button>
              </div>
            </div>
          </li>
        </ul>

        <button className="nav-cta" onClick={openContact}><span>Enquire Now →</span></button>
        <button className={`hburg ${mob ? 'open' : ''}`} onClick={() => setMob(v => !v)}><i /><i /><i /></button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${mob ? 'open' : ''}`}>
        {pages.map(p => (
          <button key={p.k} onClick={() => goTo(p.k)}>{p.l}</button>
        ))}

        <button className="mob-tool-toggle" onClick={() => setMobToolOpen(v => !v)}>
          🛠 Free Tools <span className={`mob-tool-chevron ${mobToolOpen ? 'open' : ''}`}>▼</span>
        </button>
        <div className={`mob-tool-list ${mobToolOpen ? 'open' : ''}`}>
          {TOOLS.map(t => (
            <Link key={t.k} to={t.k} className="mob-tool-item" onClick={() => { setMob(false); setMobToolOpen(false); }}>
              <span>{t.i}</span><span>{t.t}</span>
              <span style={{ marginLeft:'auto', fontSize:'9px', background:'var(--Y)', color:'var(--B)', padding:'2px 7px', fontWeight:800 }}>FREE</span>
            </Link>
          ))}
        </div>

        <button className="mob-svc-toggle" onClick={() => setMobSvcOpen(v => !v)}>
          Services <span className={`mob-svc-chevron ${mobSvcOpen ? 'open' : ''}`}>▼</span>
        </button>
        <div className={`mob-svc-list ${mobSvcOpen ? 'open' : ''}`}>
          {SERVICES.map(s => (
            <Link key={s.k} to={s.url} className="mob-svc-item" onClick={() => { setMob(false); setMobSvcOpen(false); }}>
              <span>{s.i}</span><span>{s.t}</span>
            </Link>
          ))}
          <Link to="/services" className="mob-svc-item" style={{ background:'rgba(240,200,69,.1)', fontWeight:800 }}
            onClick={() => { setMob(false); setMobSvcOpen(false); }}>
            <span>📋</span><span>All Services →</span>
          </Link>
        </div>

        <button onClick={() => { openContact(); setMob(false); }}>Contact</button>
      </div>
    </>
  );
}