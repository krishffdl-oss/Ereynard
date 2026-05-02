import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero.jsx';
import ImageBand from '../components/ImageBand.jsx';
import Stats from '../components/Stats.jsx';
import FAQ from '../components/FAQ.jsx';
import { SVC_DATA } from '../data/index.js';
import { SVC_CARD_ICONS } from '../components/SvcIcons.jsx';
import { useReveal, useTilt, useRipple, useScrollSection } from '../hooks/useReveal.js';

// ── Full URL map ──
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

function ServicesFull() {
  useReveal(); useTilt();
  const navigate = useNavigate();
  const svcs = Object.entries(SVC_DATA).map(([k, v]) => ({ k, ...v }));

  return (
    <div className="svc-bg">
      <style>{`
        .si-wrap {
          width:50px; height:50px;
          background:rgba(240,200,69,.08); border:1px solid rgba(240,200,69,.16);
          display:flex; align-items:center; justify-content:center;
          color:var(--Y); margin-bottom:18px;
          transition:background .4s,border-color .4s,color .4s;
        }
        .scard:hover .si-wrap { background:rgba(14,16,75,.15); border-color:rgba(14,16,75,.25); color:var(--B); }
        .sdr-icon-wrap {
          width:36px; height:36px; flex-shrink:0;
          background:rgba(240,200,69,.07); border:1px solid rgba(240,200,69,.12);
          display:flex; align-items:center; justify-content:center; color:var(--Y);
        }
      `}</style>
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Complete Service Offering</span></div>
          <h2 className="sec-title">Everything We <span className="out">Deliver</span></h2>
          <p className="sec-intro">9 specialised services, each a complete growth engine. Click any service to see the full breakdown.</p>
        </div>
        <div className="svc-full-grid">
          {svcs.filter(s => s.k !== 'strategy').map(s => (
            <div key={s.k} className="scard reveal" onClick={() => navigate(SVC_URL[s.k])}>
              <div className="sn">{s.num}</div>
              <div className="si-wrap">{SVC_CARD_ICONS[s.k]}</div>
              <h3 className="st">{s.title}</h3>
              <p className="sd">{s.desc}</p>
              <span className="sa">Full Details →</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop:'56px' }}>
          <div className="sec-label" style={{ marginBottom:'6px' }}><span>Service Details</span></div>
          <h3 style={{ fontFamily:'var(--FM)', fontWeight:800, fontSize:'28px', color:'var(--Y)', marginBottom:'4px' }}>What's Included in Each Service</h3>
          <p style={{ fontSize:'13px', color:'rgba(240,200,69,.44)', marginBottom:'0' }}>Click any row to see full scope, deliverables, and results.</p>
        </div>
        <div className="svc-detail-list">
          {svcs.map(s => (
            <div key={s.k} className="svc-detail-row reveal" onClick={() => navigate(SVC_URL[s.k])}>
              <div className="sdr-left">
                <div className="sdr-icon-wrap">{SVC_CARD_ICONS[s.k]}</div>
                <div>
                  <div className="sdr-num">{s.num}</div>
                  <div className="sdr-name">{s.title}</div>
                </div>
              </div>
              <div className="sdr-desc">{s.desc}</div>
              <div className="sdr-tags">{s.tags.map((tag,i) => <span key={i} className="sdr-tag">{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProcessFull() {
  useReveal();
  useScrollSection('process');
  const steps = [
    { img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80', n:'01', t:'Discover',   d:"We don't assume — we investigate. Comprehensive brand audit, audience analysis, competitor mapping, and goal-setting workshop.", items:['Brand & digital audit','Audience persona research','Competitor gap analysis','Goal setting & KPI definition','Budget allocation planning'] },
    { img:'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop&q=80', n:'02', t:'Strategise', d:'Every brand gets a bespoke digital roadmap — not a template. We map each channel, content type, and campaign to specific business outcomes.', items:['Channel selection & mix','90-day content roadmap','Campaign architecture','Creative strategy brief','Attribution framework setup'] },
    { img:'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format&fit=crop&q=80', n:'03', t:'Execute',    d:'Our specialists roll out every element with precision — no cutting corners, no skipped steps. Quality-checked before launch.', items:['Campaign launch & QA','Creative production','Landing page development','Tracking & pixel setup','Cross-channel coordination'] },
    { img:'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=80', n:'04', t:'Optimise',   d:'We analyse continuously, refine relentlessly, and scale what works. Monthly strategy reviews ensure your campaign evolves.', items:['Weekly performance analysis','A/B testing ongoing','Budget reallocation','Monthly strategy review','Quarterly growth planning'] },
  ];
  return (
    <div id="process" className="process-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Our Methodology</span></div>
          <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
          <p className="sec-intro">Four deliberate steps that transform brands into category leaders. Every phase is documented, measurable, and built for compounding results.</p>
        </div>
        <div className="proc-steps-full">
          {steps.map((s,i) => (
            <div key={i} className="pstep-f reveal">
              <div className="pstep-f-img"><img src={s.img} alt={s.t} loading="lazy" decoding="async" /></div>
              <div className="pstep-f-body">
                <div className="pstep-f-num">STEP {s.n}</div>
                <div className="pstep-f-title">{s.t}</div>
                <p className="pstep-f-desc">{s.d}</p>
                <div className="pstep-f-items">{s.items.map((item,j) => <div key={j} className="pstep-f-item">{item}</div>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  useTilt(); useRipple();
  return (
    <>
      <Helmet>
        <title>Digital Marketing Services — SEO, Ads, Social Media & More | Ereynard</title>
        <meta name="description" content="Ereynard ke 9 specialised digital marketing services — SEO, Google Ads, Meta Ads, Social Media, Content Strategy, Web Design, Branding, Email Marketing aur Influencer Marketing. India ka sharpest digital agency, Udaipur." />
        <meta name="keywords" content="digital marketing services india, SEO agency india, google ads agency, meta ads agency, social media marketing india, content strategy, web design agency udaipur, branding agency india, email marketing, influencer marketing india, ereynard services" />
        <meta name="author" content="Ereynard" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ereynard.com/services" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Digital Marketing Services — SEO, Ads, Social Media & More | Ereynard" />
        <meta property="og:description" content="9 specialised digital marketing services by Ereynard — SEO, Google Ads, Meta Ads, Social Media, Content, Web Design, Branding, Email & Influencer Marketing. India's sharpest agency." />
        <meta property="og:url" content="https://www.ereynard.com/services" />
        <meta property="og:site_name" content="Ereynard" />
        <meta property="og:image" content="https://www.ereynard.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Services | Ereynard" />
        <meta name="twitter:description" content="SEO, Google Ads, Meta Ads, Social Media, Content, Web Design, Branding & more — 9 services by Ereynard, India's sharpest digital agency." />
        <meta name="twitter:image" content="https://www.ereynard.com/og-image.jpg" />

        {/* Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Digital Marketing Services by Ereynard",
          "description": "9 specialised digital marketing services including SEO, Performance Advertising, Social Media Marketing, Content Strategy, Web Design, Branding, Email Marketing and Influencer Marketing.",
          "provider": {
            "@type": "Organization",
            "name": "Ereynard",
            "url": "https://www.ereynard.com",
            "logo": "https://www.ereynard.com/logo.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Udaipur",
              "addressRegion": "Rajasthan",
              "addressCountry": "IN"
            }
          },
          "url": "https://www.ereynard.com/services",
          "areaServed": "IN"
        })}</script>
      </Helmet>

      <PageHero
        label="What We Do"
        title="Services & Process"
        strokeWord="Process"
        sub="9 specialised services + the Fox Method — every tool and tactic we use to grow your brand."
      />
      <ServicesFull />
      <ImageBand />
      <div style={{ background:'var(--B3)' }}>
        <section className="sec on-navy" style={{ paddingBottom:'24px' }}>
          <div className="reveal" style={{ textAlign:'center' }}>
            <div className="sec-label" style={{ justifyContent:'center' }}><span>How It All Works</span></div>
            <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
            <p style={{ fontFamily:'var(--FI)', fontStyle:'italic', fontSize:'15px', color:'rgba(240,200,69,.42)', marginTop:'8px', maxWidth:'540px', margin:'8px auto 0' }}>Every service follows the same four-phase framework that turns strategy into compounding results.</p>
          </div>
        </section>
      </div>
      <ProcessFull />
      <Stats />
      <FAQ />
    </>
  );
}