import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero.jsx';
import { BLOG_POSTS } from '../data/index.js';
import { useReveal, useRipple } from '../hooks/useReveal.js';

// ── Blog List ──
function BlogList() {
  const navigate = useNavigate();
  useReveal();

  return (
    <div className="blog-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Fox Intelligence</span></div>
          <h2 className="sec-title">From <span className="out">The Den</span></h2>
          <p className="sec-intro">Sharp insights, real data, and no-fluff strategies from India's sharpest digital minds.</p>
        </div>
        <div className="blog-grid">
          {BLOG_POSTS.map((p, i) => (
            <div
              key={p.id}
              className={`blog-card reveal ${i === 0 ? 'featured' : ''}`}
              onClick={() => navigate(`/blog/${p.id}`)}
            >
              <div className="blog-img">
                <img src={p.img} alt={p.title} />
                <div className="blog-img-ov" />
                <span className="blog-cat">{p.cat}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta">
                  <span>{p.date}</span><span>·</span><span>{p.read}</span>
                </div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-excerpt">{p.excerpt}</p>
                <span className="blog-read">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Blog Post Page ──
export function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === postId);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [postId]);

  // ── 404 state ──
  if (!post) return (
    <>
      <Helmet>
        <title>Post Not Found — Ereynard Digital Blog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--B3)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--Y)', fontSize: '48px', marginBottom: '16px' }}>🦊</p>
          <p style={{ color: 'rgba(240,200,69,.6)', fontFamily: 'var(--FM)' }}>Post not found.</p>
          <button className="btn-g" style={{ marginTop: '16px' }} onClick={() => navigate('/blog')}>← Back to Blog</button>
        </div>
      </div>
    </>
  );

  // ── Content renderer ──
  const renderContent = (c) => c.map((block, i) => {
    if (block.h2) return (
      <h2 key={i} style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '24px', color: 'var(--Y)', margin: '32px 0 12px' }}>
        {block.h2}
      </h2>
    );
    if (block.h3) return (
      <h3 key={i} style={{ fontFamily: 'var(--FM)', fontWeight: 700, fontSize: '18px', color: 'var(--Y)', margin: '22px 0 10px' }}>
        {block.h3}
      </h3>
    );
    if (block.blockquote) return (
      <blockquote key={i} style={{
        borderLeft: '2px solid var(--Y)',
        background: 'rgba(240,200,69,.04)',
        padding: '16px 20px',
        margin: '24px 0',
        fontFamily: 'var(--FI)',
        fontStyle: 'italic',
        fontSize: '15px',
        color: 'rgba(240,200,69,.62)',
      }}>
        {block.blockquote}
      </blockquote>
    );
    if (block.p) return (
      <p key={i}
        style={{ fontSize: '14px', lineHeight: '1.86', color: 'rgba(240,200,69,.52)', marginBottom: '16px' }}
        dangerouslySetInnerHTML={{ __html: block.p }}
      />
    );
    return null;
  });

  // ── Canonical URL ──
  const canonicalUrl = `https://www.ereynard.com/blog/${post.id}`;

  return (
    <>
      {/* ── SSR Meta Tags — inject on server via react-helmet-async ── */}
      <Helmet>
        <title>{post.title} — Ereynard Digital</title>
        <meta name="description" content={post.excerpt} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} — Ereynard Digital`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.img} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Ereynard Digital" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.cat} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} — Ereynard Digital`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.img} />

        {/* Article Schema */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.img,
          "datePublished": post.date,
          "author": {
            "@type": "Organization",
            "name": "Ereynard Digital",
            "url": "https://www.ereynard.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Ereynard Digital",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.ereynard.com/logo.jpg"
            }
          },
          "url": canonicalUrl,
          "articleSection": post.cat,
        })}</script>
      </Helmet>

      {/* ── Article Content ── */}
      <div style={{ background: 'var(--B3)' }}>
        {/* Hero Image */}
        <div style={{ height: '50vh', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
          <img
            src={post.img}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.32) contrast(1.1)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,var(--B3) 0%,rgba(14,16,75,.55) 60%,transparent)' }} />
        </div>

        {/* Article Body */}
        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '48px 32px 80px' }}>
          {/* Category Tag */}
          <span style={{
            fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase',
            color: 'var(--Y)', background: 'rgba(240,200,69,.1)', border: '1px solid rgba(240,200,69,.28)',
            padding: '4px 10px', display: 'inline-block', marginBottom: '14px',
          }}>
            {post.cat}
          </span>

          {/* Title — H1 for SEO */}
          <h1 style={{
            fontFamily: 'var(--FM)', fontWeight: 800,
            fontSize: 'clamp(30px,4.5vw,58px)', color: 'var(--Y)',
            lineHeight: '1.1', marginBottom: '12px',
          }}>
            {post.title}
          </h1>

          {/* Meta */}
          <div style={{
            fontSize: '10px', fontWeight: 600, color: 'rgba(240,200,69,.33)',
            letterSpacing: '.06em', display: 'flex', gap: '12px', marginBottom: '28px',
            paddingBottom: '22px', borderBottom: '1px solid rgba(240,200,69,.07)',
          }}>
            <span>{post.date}</span><span>·</span><span>{post.read}</span>
          </div>

          {/* Lead paragraph */}
          <p style={{
            fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: '17px',
            lineHeight: '1.7', color: 'rgba(240,200,69,.62)', marginBottom: '26px',
          }}>
            {post.lead}
          </p>

          <div style={{ height: '1px', background: 'rgba(240,200,69,.07)', margin: '28px 0' }} />

          {/* Main content */}
          <div>{renderContent(post.content)}</div>

          {/* Back button */}
          <div style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(240,200,69,.07)' }}>
            <button className="btn-g" onClick={() => navigate('/blog')}>← Back to All Articles</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Blog Index Page ──
export default function BlogPage() {
  useRipple();
  return (
    <>
      <Helmet>
        <title>Digital Marketing Blog — Insights & Strategy | Ereynard Digital</title>
        <meta name="description" content="Sharp insights on SEO, social media, performance ads, branding and email marketing from Ereynard Digital — India's sharpest digital agency." />
        <link rel="canonical" href="https://www.ereynard.com/blog" />
        <meta property="og:title" content="Digital Marketing Blog — Ereynard Digital" />
        <meta property="og:description" content="Sharp insights on SEO, social media, performance ads, branding and email marketing from India's sharpest digital agency." />
        <meta property="og:url" content="https://www.ereynard.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.ereynard.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digital Marketing Blog — Ereynard Digital" />
        <meta name="twitter:description" content="Sharp insights on SEO, social media, performance ads, branding and email marketing." />
        <meta name="twitter:image" content="https://www.ereynard.com/og-image.jpg" />
      </Helmet>
      <PageHero
        label="Fox Intelligence"
        title="From The Den"
        strokeWord="Den"
        sub="Sharp insights, real data, no-fluff strategies from India's sharpest digital minds."
      />
      <BlogList />
    </>
  );
}

