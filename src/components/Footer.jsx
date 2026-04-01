import { useNavigate } from 'react-router-dom';

export default function Footer({ openSvc }) {
  const navigate = useNavigate();
  const goTo = (path) => { navigate(path); window.scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <footer>
      <div className="ft-grid">
        <div className="ft-brand">
          <button className="ft-logo" onClick={() => goTo('/')} style={{ display:'flex', alignItems:'center', gap:'9px' }}>
            <img src="/logo.jpg" alt="Ereynard" style={{ height:'36px', width:'36px', objectFit:'contain', borderRadius:'5px' }} />
            <span>ereynard.</span>
          </button>
          <p>Smart like a fox. Sharp in digital. We build brands that dominate the digital landscape.</p>
          <div className="ft-soc">
            {[['in', 'https://linkedin.com'], ['ig', 'https://instagram.com'], ['fb', 'https://facebook.com'], ['yt', 'https://youtube.com']].map(([l, u]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" className="ft-sl">{l}</a>
            ))}
          </div>
        </div>
        <div className="ft-col">
          <h4>Services</h4>
          <ul>
            {[['SEO', 'seo'], ['Social Media', 'social'], ['Performance Ads', 'performance'], ['Content Strategy', 'content'], ['Web Design', 'web'], ['Branding', 'branding']].map(([l, k]) => (
              <li key={k}><button onClick={() => openSvc(k)}>{l}</button></li>
            ))}
          </ul>
        </div>
        <div className="ft-col">
          <h4>Company</h4>
          <ul>
            {[['About Us', '/about'], ['Our Work', '/projects'], ['Services & Process', '/services'], ['Clients', '/clients'], ['Blog', '/blog']].map(([l, p]) => (
              <li key={p}><button onClick={() => goTo(p)}>{l}</button></li>
            ))}
          </ul>
        </div>
        <div className="ft-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:ereynardofficial@gmail.com">ereynardofficial@gmail.com</a></li>
            <li><a href="tel:+918619189335">+91 8619189335</a></li>
            <li><span style={{ color: 'rgba(14,16,75,.46)', fontSize: '12px' }}>Udaipur, Rajasthan</span></li>
            <li><button onClick={() => goTo('/contact')}>Enquire Now</button></li>
          </ul>
        </div>
      </div>
      <div className="ft-bot">
        <span>© 2025 <strong>Ereynard</strong>. All rights reserved.</span>
        <span>Smart like a fox. <strong>Sharp in digital.</strong></span>
      </div>
    </footer>
  );
}