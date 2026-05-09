import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero.jsx';
import { useReveal, useTilt, useRipple } from '../hooks/useReveal.js';

const projects = [
  { k: 'novabrand',   img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80', imgW: 1600, imgH: 1067, tag: 'Performance Marketing', title: 'NovaBrand — 10x ROI',          meta: 'Google Ads · Meta Ads · Landing Page · Analytics', feat: true },
  { k: 'luxethreads', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80',  imgW: 900,  imgH: 600,  tag: 'Social Media',          title: 'LuxeThreads — 340% Sales',    meta: 'Instagram · Reels · Influencer · Content' },
  { k: 'technest',    img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&auto=format&fit=crop&q=80',  imgW: 900,  imgH: 600,  tag: 'SEO + Content',         title: 'TechNest — 225x Traffic',     meta: 'Technical SEO · Blog Strategy · Link Building' },
  { k: 'growfast',    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&auto=format&fit=crop&q=80',  imgW: 900,  imgH: 600,  tag: 'Performance Ads',       title: 'GrowFast — -60% CPL',         meta: 'Google Ads · Meta Ads · CRO · Analytics' },
  { k: 'eduspark',    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&auto=format&fit=crop&q=80',  imgW: 900,  imgH: 600,  tag: 'Content + SEO',         title: 'EduSpark — 225x Blog Growth',  meta: 'Content Strategy · SEO · Blog · 6 Months' },
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
              <div className="wi-bg">
                <img
                  src={p.img}
                  alt={p.title}
                  width={p.imgW}
                  height={p.imgH}
                  loading="lazy"
                  decoding="async"
                />
              </div>
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
        <title>Case Studies & Results | Ereynard</title>
        <meta name="description" content="Ereynard's real results — 10x ROI, 340% sales growth, 225x traffic. Digital marketing case studies across SEO, Google Ads, Meta Ads & Social Media India." />
        <meta name="keywords" content="ereynard case studies, digital marketing results india, performance marketing, seo results india, social media growth, google ads campaigns" />
        <meta name="author" content="Ereynard" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ereynard.com/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Case Studies & Results | Ereynard" />
        <meta property="og:description" content="10x ROI, 340% sales, 225x traffic — real results from Ereynard's campaigns across India." />
        <meta property="og:url" content="https://www.ereynard.com/projects" />
        <meta property="og:site_name" content="Ereynard" />
        <meta property="og:image" content="https://www.ereynard.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Case Studies & Results | Ereynard" />
        <meta name="twitter:description" content="10x ROI, 340% sales, 225x traffic — real results by Ereynard, India's sharpest digital agency." />
        <meta name="twitter:image" content="https://www.ereynard.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Ereynard Case Studies",
          "description": "Real digital marketing case studies — SEO, performance ads, social media results by Ereynard.",
          "url": "https://www.ereynard.com/projects",
          "publisher": {
            "@type": "Organization",
            "name": "Ereynard",
            "url": "https://www.ereynard.com",
            "logo": { "@type": "ImageObject", "url": "https://www.ereynard.com/logo.jpg" }
          }
        })}</script>
      </Helmet>

      <PageHero label="Selected Work" title="Our Campaigns" strokeWord="Campaigns" sub="Real brands. Real results. Real growth." />
      <WorkSection openCamp={openCamp} />
    </>
  );
}