import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import ImageBand from '../components/ImageBand.jsx';
import Stats from '../components/Stats.jsx';
import FAQ from '../components/FAQ.jsx';
import { SVC_DATA } from '../data/index.js';
import { useReveal, useTilt, useRipple } from '../hooks/useReveal.js';

function ServicesFull({ openSvc }) {
  useReveal(); useTilt();
  const svcs = Object.entries(SVC_DATA).map(([k, v]) => ({ k, ...v }));
  return (
    <div className="svc-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Complete Service Offering</span></div>
          <h2 className="sec-title">Everything We <span className="out">Deliver</span></h2>
          <p className="sec-intro">9 specialised services, each a complete growth engine. Click any service to see the full breakdown.</p>
        </div>
        <div className="svc-full-grid">
          {svcs.filter(s => s.k !== 'strategy').map(s => (
            <div key={s.k} className="scard reveal" onClick={() => openSvc(s.k)}>
              <div className="sn">{s.num}</div>
              <span className="si">{s.icon}</span>
              <h3 className="st">{s.title}</h3>
              <p className="sd">{s.desc}</p>
              <span className="sa">Full Details →</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '56px' }}>
          <div className="sec-label" style={{ marginBottom: '6px' }}><span>Service Details</span></div>
          <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '28px', color: 'var(--Y)', marginBottom: '4px' }}>What's Included in Each Service</h3>
          <p style={{ fontSize: '13px', color: 'rgba(240,200,69,.44)', marginBottom: '0' }}>Click any row to see full scope, deliverables, and results.</p>
        </div>
        <div className="svc-detail-list">
          {svcs.map(s => (
            <div key={s.k} className="svc-detail-row reveal" onClick={() => openSvc(s.k)}>
              <div className="sdr-left">
                <span className="sdr-icon">{s.icon}</span>
                <div><div className="sdr-num">{s.num}</div><div className="sdr-name">{s.title}</div></div>
              </div>
              <div className="sdr-desc">{s.desc}</div>
              <div className="sdr-tags">{s.tags.map((tag, i) => <span key={i} className="sdr-tag">{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProcessFull() {
  useReveal();
  const steps = [
    { img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80', n: '01', t: 'Discover', d: "We don't assume — we investigate. Comprehensive brand audit, audience analysis, competitor mapping, and goal-setting workshop.", items: ['Brand & digital audit', 'Audience persona research', 'Competitor gap analysis', 'Goal setting & KPI definition', 'Budget allocation planning'] },
    { img: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop&q=80', n: '02', t: 'Strategise', d: 'Every brand gets a bespoke digital roadmap — not a template. We map each channel, content type, and campaign to specific business outcomes.', items: ['Channel selection & mix', '90-day content roadmap', 'Campaign architecture', 'Creative strategy brief', 'Attribution framework setup'] },
    { img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&auto=format&fit=crop&q=80', n: '03', t: 'Execute', d: 'Our specialists roll out every element with precision — no cutting corners, no skipped steps. Quality-checked before launch.', items: ['Campaign launch & QA', 'Creative production', 'Landing page development', 'Tracking & pixel setup', 'Cross-channel coordination'] },
    { img: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop&q=80', n: '04', t: 'Optimise', d: 'We analyse continuously, refine relentlessly, and scale what works. Monthly strategy reviews ensure your campaign evolves.', items: ['Weekly performance analysis', 'A/B testing ongoing', 'Budget reallocation', 'Monthly strategy review', 'Quarterly growth planning'] },
  ];
  return (
    <div className="process-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Our Methodology</span></div>
          <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
          <p className="sec-intro">Four deliberate steps that transform brands into category leaders. Every phase is documented, measurable, and built for compounding results.</p>
        </div>
        <div className="proc-steps-full">
          {steps.map((s, i) => (
            <div key={i} className="pstep-f reveal">
              <div className="pstep-f-img"><img src={s.img} alt={s.t} /></div>
              <div className="pstep-f-body">
                <div className="pstep-f-num">STEP {s.n}</div>
                <div className="pstep-f-title">{s.t}</div>
                <p className="pstep-f-desc">{s.d}</p>
                <div className="pstep-f-items">{s.items.map((item, j) => <div key={j} className="pstep-f-item">{item}</div>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage({ openSvc }) {
  useTilt(); useRipple();
  return (
    <>
      <PageHero label="What We Do" title="Services & Process" strokeWord="Process" sub="9 specialised services + the Fox Method — every tool and tactic we use to grow your brand." />
      <ServicesFull openSvc={openSvc} />
      <ImageBand />
      <div style={{ background: 'var(--B3)' }}>
        <section className="sec on-navy" style={{ paddingBottom: '24px' }}>
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>How It All Works</span></div>
            <h2 className="sec-title">The Fox <span className="out">Method</span></h2>
            <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: '15px', color: 'rgba(240,200,69,.42)', marginTop: '8px', maxWidth: '540px', margin: '8px auto 0' }}>Every service follows the same four-phase framework that turns strategy into compounding results.</p>
          </div>
        </section>
      </div>
      <ProcessFull />
      <Stats />
      <FAQ />
    </>
  );
}