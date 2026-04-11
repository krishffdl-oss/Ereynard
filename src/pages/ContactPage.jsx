import { useState } from 'react';
import emailjs from '@emailjs/browser';
import PageHero from '../components/PageHero.jsx';
import { useReveal, useRipple } from '../hooks/useReveal.js';

const EMAILJS_SERVICE_ID  = 'service_h1x022q';  
const EMAILJS_TEMPLATE_ID = 'template_8rvl82t';  
const EMAILJS_PUBLIC_KEY  = 'o6gfi1Mjf6Y8oKd7W'; 
function ContactForm() {
  const [status, setStatus] = useState(null);
  useReveal(); useRipple();

  const handle = async () => {
    const nm     = document.getElementById('f-name')?.value.trim();
    const em     = document.getElementById('f-email')?.value.trim();
    const co     = document.getElementById('f-co')?.value.trim();
    const ph     = document.getElementById('f-ph')?.value.trim();
    const svc    = document.getElementById('f-svc')?.value;
    const budget = document.getElementById('f-budget')?.value;
    const msg    = document.getElementById('f-msg')?.value.trim();

    if (!nm || !em) {
      setStatus('validation');
      setTimeout(() => setStatus(null), 2500);
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: nm,
          from_email: em,
          company:   co     || 'Not provided',
          phone:     ph     || 'Not provided',
          service:   svc    || 'Not selected',
          budget:    budget || 'Not selected',
          message:   msg    || 'No message provided',
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      // Form clear
      ['f-name','f-co','f-email','f-ph','f-msg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      ['f-svc','f-budget'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = 0;
      });
      setTimeout(() => setStatus(null), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const btnStyle =
    status === 'validation' ? { background: '#c0392b' } :
    status === 'error'      ? { background: '#c0392b' } :
    status === 'success'    ? { background: '#1a8a36' } :
    status === 'sending'    ? { opacity: 0.7, pointerEvents: 'none' } :
    {};

  const btnLabel =
    status === 'validation' ? '⚠ Please fill name & email' :
    status === 'sending'    ? 'Sending...' :
    status === 'success'    ? "✓ We'll be in touch shortly!" :
    status === 'error'      ? '✗ Failed. Please try again.' :
    'Send Enquiry';

  return (
    <div className="contact-bg">
      <section className="sec on-navy" style={{ overflow: 'hidden' }}>
        <div className="eq-grid">
          {/* Left */}
          <div className="rev-l">
            <div className="sec-label"><span>Get In Touch</span></div>
            <h2 className="sec-title">Let's Build <span className="out">Together.</span></h2>
            <p style={{ fontSize: '14px', lineHeight: '1.78', color: 'rgba(240,200,69,.48)', marginTop: '14px' }}>
              Ready to outfox your competition? Tell us about your brand and we'll craft a strategy that gets you there — faster, sharper, smarter.
            </p>
            <div className="eq-det reveal">
              <div className="eq-di">📍 Udaipur, Rajasthan, India</div>
              <div className="eq-di">📧 <a href="mailto:ereynardofficial@gmail.com">ereynardofficial@gmail.com</a></div>
              <div className="eq-di">📞 <a href="tel:+918619189335">+91 86191 89335</a></div>
              <div className="eq-di">💬 <a href="https://wa.me/918619189335" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div>
            </div>
            <div className="eq-img-wrap shimmer reveal">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&auto=format&fit=crop&q=80" alt="Team" />
            </div>

            {/* Office Hours */}
            <div className="reveal" style={{ marginTop: '22px', padding: '18px 20px', background: 'rgba(240,200,69,.04)', border: '1px solid rgba(240,200,69,.08)', borderLeft: '2px solid var(--Y)' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(240,200,69,.36)', marginBottom: '8px' }}>Office Hours</div>
              <div style={{ fontSize: '13px', color: 'rgba(240,200,69,.55)', lineHeight: 1.7 }}>
                Mon – Fri: 9:30 AM – 7:00 PM IST<br />
                Sat: 10:00 AM – 3:00 PM IST<br />
                <span style={{ color: 'rgba(240,200,69,.32)', fontSize: '11px' }}>Response within 2 business hours</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="eq-form rev-r">
            <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '20px', color: 'var(--B)', marginBottom: '20px', lineHeight: 1.2 }}>
              Get a Free Proposal 🦊
            </div>

            <div className="frow">
              <div className="fg">
                <label>Your Name *</label>
                <input type="text" id="f-name" placeholder="John Doe" />
              </div>
              <div className="fg">
                <label>Company</label>
                <input type="text" id="f-co" placeholder="Brand Name" />
              </div>
            </div>
            <div className="frow">
              <div className="fg">
                <label>Email *</label>
                <input type="email" id="f-email" placeholder="hello@brand.com" />
              </div>
              <div className="fg">
                <label>Phone</label>
                <input type="tel" id="f-ph" placeholder="+91 00000 00000" />
              </div>
            </div>
            <div className="fg">
              <label>Service You Need</label>
              <select id="f-svc">
                <option value="">Select a service...</option>
                <option>SEO</option>
                <option>Social Media Marketing</option>
                <option>Performance Advertising</option>
                <option>Content Strategy</option>
                <option>Web Design & Development</option>
                <option>Branding & Identity</option>
                <option>Email & CRM Marketing</option>
                <option>Influencer Marketing</option>
                <option>Full Digital Strategy</option>
              </select>
            </div>
            <div className="fg">
              <label>Monthly Budget</label>
              <select id="f-budget">
                <option value="">Select budget range...</option>
                <option>Under ₹25,000</option>
                <option>₹25,000 – ₹75,000</option>
                <option>₹75,000 – ₹2,00,000</option>
                <option>₹2,00,000+</option>
              </select>
            </div>
            <div className="fg">
              <label>Tell Us About Your Project</label>
              <textarea id="f-msg" placeholder="Share your goals, challenges, and what success looks like for your brand..." />
            </div>

            <button
              className="btn-sub"
              onClick={handle}
              style={btnStyle}
            >
              <span>{btnLabel}</span>
              {!status && <span>→</span>}
            </button>

            <p style={{ fontSize: '10px', color: 'rgba(14,16,75,.38)', marginTop: '10px', lineHeight: 1.5 }}>
              🔒 Your information is safe. We never share your data with third parties.
            </p>
          </div>
        </div>
        <div className="eq-bg-txt">EREYNARD</div>
      </section>

      {/* Why Choose Us strip */}
      <div style={{ background: 'var(--Y)', padding: '40px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '2px' }}>
          {[
            { i: '⚡', t: '48hr Turnaround', d: 'Custom proposal in 48 hours' },
            { i: '💸', t: 'No Hidden Fees',  d: 'Transparent pricing always' },
            { i: '📊', t: 'Data-First',      d: 'Every decision backed by data' },
            { i: '🦊', t: 'Fox Method',      d: 'Our proven 4-step framework' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '20px 16px', borderRight: i < 3 ? '1px solid rgba(14,16,75,.1)' : 'none' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.i}</div>
              <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '14px', color: 'var(--B)', marginBottom: '4px' }}>{item.t}</div>
              <div style={{ fontSize: '11px', color: 'rgba(14,16,75,.5)' }}>{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero label="Get In Touch" title="Let's Build Together" strokeWord="Together" sub="Ready to outfox your competition? Let's start the conversation." />
      <ContactForm />
    </>
  );
}