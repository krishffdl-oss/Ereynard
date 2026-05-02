import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero.jsx';
import { useReveal, useTilt, useRipple } from '../hooks/useReveal.js';

const projects = [
  { k: 'novabrand', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80', tag: 'Performance Marketing', title: 'NovaBrand — 10x ROI', meta: 'Google Ads · Meta Ads · Landing Page · Analytics', feat: true },
  { k: 'luxethreads', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80', tag: 'Social Media', title: 'LuxeThreads — 340% Sales', meta: 'Instagram · Reels · Influencer · Content' },
  { k: 'technest', img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&auto=format&fit=crop&q=80', tag: 'SEO + Content', title: 'TechNest — 225x Traffic', meta: 'Technical SEO · Blog Strategy · Link Building' },
  { k: 'growfast', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop&q=80', tag: 'Performance Ads', title: 'GrowFast — -60% CPL', meta: 'Google Ads · Meta Ads · CRO · Analytics' },
  { k: 'eduspark', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80', tag: 'Content + SEO', title: 'EduSpark — 225x Blog Growth', meta: 'Content Strategy · SEO · Blog · 6 Months' },
];

function WorkSection({ openCamp }) {
  useReveal();
  return (
    <div className="work-bg">
      <section className="sec on-yellow">
        <div className="reveal" style={{ marginBottom: '32px' }}>
          <div className="sec-label"><span>Selected Work</span></div>
          <h2 className="sec-title">Our <span className="out">Campaigns</span></h2>
          <p className="sec-sub">Real brands. Real results. Real growth — click any campaign for the full case study.</p>
        </div>
        <div className="work-grid">
          {projects.map(p => (
            <div key={p.k} className={`wi reveal ${p.feat ? 'feat' : ''}`} onClick={() => openCamp(p.k)}>
              <div className="wi-bg"><img src={p.img} alt={p.title} loading="lazy" decoding="async" /></div>
              <div className="wi-ov">
                <span className="wi-tag">{p.tag}</span>
                <h3 className="wi-title">{p.title}</h3>
                <p className="wi-meta">{p.meta}</p>
              </div>
              <div className="wi-arr">→</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage({ openCamp }) {
  useTilt(); useRipple();
  return (
    <>
      <Helmet>
        <title>Our Work & Case Studies | Ereynard — India's Sharpest Digital Agency</title>
        <meta name="description" content="Ereynard ke real client campaigns aur case studies dekho. NovaBrand 10x ROI, LuxeThreads 340% sales, TechNest 225x traffic. Real brands, real results — India's sharpest digital marketing agency." />
        <meta name="keywords" content="ereynard case studies, digital marketing results india, performance marketing campaigns, seo results india, social media growth india, google ads results, ereynard projects" />
        <meta name="author" content="Ereynard" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ereynard.com/projects" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Work & Case Studies | Ereynard — India's Sharpest Digital Agency" />
        <meta property="og:description" content="Real brands. Real results. See how Ereynard delivered 10x ROI, 340% sales growth and 225x traffic for Indian brands. India's sharpest digital marketing agency." />
        <meta property="og:url" content="https://www.ereynard.com/projects" />
        <meta property="og:site_name" content="Ereynard" />
        <meta property="og:image" content="https://www.ereynard.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Work & Case Studies | Ereynard" />
        <meta name="twitter:description" content="Real brands. Real results. 10x ROI, 340% sales, 225x traffic — see Ereynard's client campaigns." />
        <meta name="twitter:image" content="https://www.ereynard.com/og-image.jpg" />

        {/* Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Ereynard Case Studies & Campaigns",
          "description": "Real digital marketing case studies from Ereynard — India's sharpest digital agency. Performance marketing, SEO, social media and branding results.",
          "url": "https://www.ereynard.com/projects",
          "publisher": {
            "@type": "Organization",
            "name": "Ereynard",
            "url": "https://www.ereynard.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.ereynard.com/logo.jpg"
            }
          }
        })}</script>
      </Helmet>

      <PageHero
        label="Selected Work"
        title="Our Campaigns"
        strokeWord="Campaigns"
        sub="Real brands. Real results. Real growth."
      />
      <WorkSection openCamp={openCamp} />
    </>
  );
}