import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAQS_DATA } from '../data/index.js';
import { useReveal } from '../hooks/useReveal.js';

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  useReveal();

  return (
    <div className="faq-bg">
      <section className="sec on-navy">
        <div className="reveal">
          <div className="sec-label"><span>Got Questions?</span></div>
          <h2 className="sec-title">Frequently <span className="out">Asked</span></h2>
        </div>
        <div className="faq-grid">
          <div className="rev-l">
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.44)', marginTop: '12px' }}>
              Can't find what you're looking for? Our team is always ready to answer questions about services, pricing, or process.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: 'rgba(240,200,69,.44)', marginTop: '11px' }}>
              As <strong style={{ color: 'var(--Y)' }}>India's sharpest digital agency</strong>, we believe in full transparency — no jargon, no fluff.
            </p>
            <div style={{ marginTop: '22px' }}>
              <button className="btn-p" onClick={() => navigate('/contact')}><span>Ask Us Directly</span><span>→</span></button>
            </div>
            <div style={{ marginTop: '26px' }} className="reveal">
              <div className="faq-c-item">📍 Udaipur, Rajasthan, India</div>
              <div className="faq-c-item">📧 <a href="mailto:hello@ereynard.com">hello@ereynard.com</a></div>
              <div className="faq-c-item">📞 <a href="tel:+919876543210">+91 98765 43210</a></div>
            </div>
          </div>

          <div className="faq-list rev-r">
            {FAQS_DATA.map((f, i) => (
              <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-q-txt">{f.q}</span>
                  <div className="faq-ico">+</div>
                </div>
                <div className="faq-a" style={{ maxHeight: open === i ? '260px' : '0' }}>
                  <div className="faq-a-inner" dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}