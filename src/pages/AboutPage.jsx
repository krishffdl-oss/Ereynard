import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { useReveal, useRipple, useScrollSection } from '../hooks/useReveal.js';
import { TEAM } from '../data/index.js';
import { Helmet } from 'react-helmet-async';
function TeamSection({ showAll = false }) {
  useReveal();
  useScrollSection('team'); // ← scroll karo → URL /about#team ho jaayega
  const members = showAll ? TEAM : TEAM.slice(0, 4);
  return (
    <div id="team" className="team-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>The Pack</span></div>
          <h2 className="sec-title">Meet The <span className="out">Foxes</span></h2>
          <p className="sec-sub">25+ specialists. One shared obsession — your brand's growth.</p>
        </div>
        <div className="team-grid">
          {members.map((t, i) => (
            <div key={i} className="tm-card reveal">
              <img className="tm-img" src={t.img} alt={t.name} />
              <div className="tm-info">
                <div className="tm-nm">{t.name}</div>
                <div className="tm-rl">{t.role}</div>
                <div className="tm-lnks">
                  {t.links.map((l, j) => (
                    <a key={j} href={l.url} target="_blank" rel="noopener noreferrer" className="tm-lnk">{l.l}</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AboutPage({ openContact }) {
  const navigate = useNavigate();
  useRipple();

  const values = [
    { icon: '🎯', title: 'Results Above All', desc: 'Every decision, every campaign, every rupee — optimised for measurable outcomes. Vanity metrics are not our currency.' },
    { icon: '🦊', title: 'Cunning by Nature', desc: 'We move fast, think three steps ahead, and find the angles others miss. Being sharp is not just a tagline — it is our operating system.' },
    { icon: '🤝', title: 'Radical Transparency', desc: 'You see everything: reports, data, strategy, spend. No black boxes, no jargon. Just clear numbers and honest insights.' },
    { icon: '🌱', title: 'Growth That Compounds', desc: "We build systems, not one-offs. The brands that work with us long-term don't just grow — they compound." },
    { icon: '🏆', title: 'Obsessive Quality', desc: "We would rather do fewer things brilliantly than many things adequately. Every deliverable goes through the same standard we'd hold our own brand to." },
    { icon: '🇮🇳', title: 'Built for India', desc: 'Deep understanding of Indian consumer psychology, regional markets, festive cycles, and the D2C landscape.' },
  ];

  return (
    <>
      <PageHero label="Who We Are" title="The Ereynard Story" strokeWord="Ereynard" sub="Not just an agency — a growth partner obsessed with making Indian brands unstoppable." />
      <Helmet>
        <title>Best SEO Services Agency in Udaipur | Expert SEO Agency & Optimization Company</title>
        <meta
          name="description"
          content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more."
        />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best SEO Services Agency in Udaipur | Expert SEO Agency & Optimization Company" />
        <meta property="og:description" content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more." />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Digital Marketing Agency & Company | Expert Internet Marketing Services - Ereynard" />
        <meta name="twitter:description" content="Looking for the best digital marketing agency or firm? We help your business grow with result-driven strategies, ✓SEO ✓Social Media Marketing ✓SMO and more." />
        {/* Canonical */}
        <link rel="canonical" href="https://ereynard.com/" />
      </Helmet>
      {/* Identity */}
      <div style={{ background: 'var(--B3)' }}>
        <section className="sec on-navy">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div className="rev-l">
              <div className="sec-label"><span>Our Identity</span></div>
              <h2 className="sec-title">Born to <span className="out">Outfox.</span></h2>
              <p style={{ fontSize: '14px', lineHeight: '1.86', color: 'rgba(240,200,69,.52)', marginTop: '16px', marginBottom: '14px' }}>
                Ereynard Digital was founded in Udaipur, Rajasthan with one belief: <strong style={{ color: 'var(--Y)' }}>Indian brands deserve world-class digital strategy without world-class price tags.</strong>
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.86', color: 'rgba(240,200,69,.52)', marginBottom: '14px' }}>
                Our name is rooted in Reynard — the cunning fox of European folklore. Like Reynard, we use intelligence, agility, and strategy to outmanoeuvre bigger, slower competitors. Seven years, 200+ brands, ₹50Cr+ later — the fox still wins.
              </p>
              <p style={{ fontSize: '14px', lineHeight: '1.86', color: 'rgba(240,200,69,.52)' }}>
                We are not a vendor. We are the external growth team that thinks like a founder, works like a startup, and delivers like an enterprise.
              </p>
              <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-p" onClick={openContact}><span>Work With Us</span><span>→</span></button>
                <button className="btn-g" onClick={() => navigate('/projects')}>See Our Work ↓</button>
              </div>
            </div>
            <div className="rev-r" style={{ position: 'relative' }}>
              <div style={{ overflow: 'hidden', clipPath: 'polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%)', height: '380px' }}>
                <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop&q=80" alt="Team collaboration" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.5) contrast(1.1)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '-18px', left: '-18px', background: 'var(--Y)', padding: '18px 24px' }}>
                <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '40px', color: 'var(--B)', lineHeight: 1 }}>2017</div>
                <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(14,16,75,.52)', marginTop: '3px' }}>Founded in Udaipur</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mission & Vision */}
      <div style={{ background: 'var(--Y)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(14,16,75,.04) 1px,transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />
        <section className="sec on-yellow" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '52px' }}>
            <div className="sec-label" style={{ justifyContent: 'center' }}><span>What Drives Us</span></div>
            <h2 className="sec-title">Mission & <span className="out">Vision</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
            <div className="rev-l" style={{ background: '#0e104b', padding: '48px', clipPath: 'polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-12px', right: '-8px', fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '130px', color: 'rgba(240,200,69,.024)', userSelect: 'none', lineHeight: 1 }}>M</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'var(--Y)', fontSize: '24px', marginBottom: '20px' }}>🎯</div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(240,200,69,.38)', marginBottom: '10px' }}>Our Mission</div>
              <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(22px,2.8vw,38px)', color: 'var(--Y)', lineHeight: 1.1, marginBottom: '18px' }}>Make Every Indian Brand Impossible to Ignore</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.84, color: 'rgba(240,200,69,.52)' }}>To democratise world-class digital marketing for Indian businesses — by delivering custom strategies, transparent execution, and ROI that actually moves the needle.</p>
            </div>
            <div className="rev-r" style={{ background: '#0e104b', padding: '48px', border: '1px solid rgba(240,200,69,.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-12px', right: '-8px', fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '130px', color: 'rgba(240,200,69,.024)', userSelect: 'none', lineHeight: 1 }}>V</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'var(--Y)', fontSize: '24px', marginBottom: '20px' }}>🌟</div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(240,200,69,.38)', marginBottom: '10px' }}>Our Vision</div>
              <h3 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(22px,2.8vw,38px)', color: 'var(--Y)', lineHeight: 1.1, marginBottom: '18px' }}>India's Most Trusted Growth Partner by 2030</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.84, color: 'rgba(240,200,69,.52)' }}>To be the agency that 1,000+ Indian brands credit as the inflection point in their growth story — synonymous with sharp thinking, relentless execution, and results that compound.</p>
            </div>
          </div>
          <div className="reveal" style={{ marginTop: '3px', background: '#0e104b', padding: '32px 48px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px' }}>
            {[['7+', 'Years in Business'], ['200+', 'Brands Scaled'], ['₹50Cr+', 'Ad Spend Managed'], ['98%', 'Client Retention']].map(([n, l], i) => (
              <div key={i} style={{ textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(240,200,69,.09)' : 'none', padding: '8px 16px' }}>
                <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(28px,3.5vw,48px)', color: 'var(--Y)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(240,200,69,.36)', marginTop: '5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Values */}
      <div style={{ background: 'var(--B)' }}>
        <section className="sec on-navy">
          <div className="reveal">
            <div className="sec-label"><span>How We Operate</span></div>
            <h2 className="sec-title">Our Core <span className="out">Values</span></h2>
            <p className="sec-intro">Six principles that guide every decision, every campaign, every client relationship.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', marginTop: '40px' }}>
            {values.map((v, i) => (
              <div key={i} className="reveal" style={{ background: 'var(--B4)', border: '1px solid rgba(240,200,69,.07)', padding: '32px 28px', transition: 'all .3s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(240,200,69,.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(240,200,69,.07)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '14px', lineHeight: 1 }}>{v.icon}</div>
                <h4 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '16px', color: 'var(--Y)', marginBottom: '9px' }}>{v.title}</h4>
                <p style={{ fontSize: '13px', lineHeight: 1.76, color: 'rgba(240,200,69,.42)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Team */}
      <TeamSection showAll={true} />

      {/* CTA */}
      <div className="reveal" style={{ background: 'var(--B3)', padding: '72px 56px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: 'clamp(17px,2.2vw,26px)', color: 'rgba(240,200,69,.46)', marginBottom: '8px', lineHeight: 1.5 }}>
          A fox never chases. It positions, waits, and strikes perfectly.
        </p>
        <p style={{ fontFamily: 'var(--FM)', fontWeight: 700, fontSize: 'clamp(22px,3vw,38px)', color: 'var(--Y)', marginBottom: '28px', lineHeight: 1.15 }}>
          Ready to be in the right position?
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-p" onClick={openContact}><span>Start a Project</span><span>→</span></button>
          <button className="btn-g" onClick={() => navigate('/clients')}>Meet Our Clients →</button>
        </div>
      </div>
    </>
  );
}