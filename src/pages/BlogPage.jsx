import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { BLOG_POSTS } from '../data/index.js';
import { useReveal, useRipple } from '../hooks/useReveal.js';

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
            <div key={p.id} className={`blog-card reveal ${i === 0 ? 'featured' : ''}`} onClick={() => navigate(`/blog/${p.id}`)}>
              <div className="blog-img">
                <img src={p.img} alt={p.title} />
                <div className="blog-img-ov" />
                <span className="blog-cat">{p.cat}</span>
              </div>
              <div className="blog-body">
                <div className="blog-meta"><span>{p.date}</span><span>·</span><span>{p.read}</span></div>
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

export function BlogPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === postId);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [postId]);

  if (!post) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--B3)' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--Y)', fontSize: '48px', marginBottom: '16px' }}>🦊</p>
        <p style={{ color: 'rgba(240,200,69,.6)', fontFamily: 'var(--FM)' }}>Post not found.</p>
        <button className="btn-g" style={{ marginTop: '16px' }} onClick={() => navigate('/blog')}>← Back to Blog</button>
      </div>
    </div>
  );

  const renderContent = (c) => c.map((block, i) => {
    if (block.h2) return <h2 key={i} style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '24px', color: 'var(--Y)', margin: '28px 0 11px' }}>{block.h2}</h2>;
    if (block.h3) return <h3 key={i} style={{ fontFamily: 'var(--FM)', fontWeight: 700, fontSize: '18px', color: 'var(--Y)', margin: '20px 0 9px' }}>{block.h3}</h3>;
    if (block.blockquote) return (
      <blockquote key={i} style={{ borderLeft: '2px solid var(--Y)', background: 'rgba(240,200,69,.04)', padding: '16px 20px', margin: '22px 0', fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: '15px', color: 'rgba(240,200,69,.62)' }}>
        {block.blockquote}
      </blockquote>
    );
    if (block.p) return <p key={i} style={{ fontSize: '14px', lineHeight: '1.86', color: 'rgba(240,200,69,.52)', marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: block.p }} />;
    return null;
  });

  return (
    <div style={{ background: 'var(--B3)' }}>
      <div style={{ height: '50vh', overflow: 'hidden', position: 'relative', paddingTop: '80px' }}>
        <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(.32) contrast(1.1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,var(--B3) 0%,rgba(14,16,75,.55) 60%,transparent)' }} />
      </div>
      <div style={{ maxWidth: '740px', margin: '0 auto', padding: '48px 32px 80px' }}>
        <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--Y)', background: 'rgba(240,200,69,.1)', border: '1px solid rgba(240,200,69,.28)', padding: '4px 10px', display: 'inline-block', marginBottom: '14px' }}>{post.cat}</span>
        <h1 style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: 'clamp(30px,4.5vw,58px)', color: 'var(--Y)', lineHeight: '1.1', marginBottom: '12px' }}>{post.title}</h1>
        <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(240,200,69,.33)', letterSpacing: '.06em', display: 'flex', gap: '12px', marginBottom: '28px', paddingBottom: '22px', borderBottom: '1px solid rgba(240,200,69,.07)' }}>
          <span>{post.date}</span><span>·</span><span>{post.read}</span>
        </div>
        <p style={{ fontFamily: 'var(--FI)', fontStyle: 'italic', fontSize: '17px', lineHeight: '1.7', color: 'rgba(240,200,69,.62)', marginBottom: '26px' }}>{post.lead}</p>
        <div style={{ height: '1px', background: 'rgba(240,200,69,.07)', margin: '28px 0' }} />
        <div>{renderContent(post.content)}</div>
        <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(240,200,69,.07)' }}>
          <button className="btn-g" onClick={() => navigate('/blog')}>← Back to All Articles</button>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  useRipple();
  return (
    <>
      <PageHero label="Fox Intelligence" title="From The Den" strokeWord="Den" sub="Sharp insights, real data, no-fluff strategies from India's sharpest digital minds." />
      <BlogList />
    </>
  );
}