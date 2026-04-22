import { useNavigate } from 'react-router-dom';
import { SVC_DATA } from '../data/index.js';
import { SVC_CARD_ICONS, FEAT_ICONS } from './SvcIcons.jsx';

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

export default function ServiceModal({ svcKey, onClose }) {
  const navigate = useNavigate();
  if (!svcKey) return null;
  const d = SVC_DATA[svcKey];
  if (!d) return null;
  const featIcons = FEAT_ICONS[svcKey] || [];

  return (
    <div className="svc-ov open" onClick={e => e.target.classList.contains('svc-ov') && onClose()}>
      <div className="svc-modal">
        <div className="sm-head">
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <div style={{ width:'52px', height:'52px', flexShrink:0, background:'rgba(14,16,75,.12)', border:'1px solid rgba(14,16,75,.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--B)' }}>
              <span style={{ transform:'scale(1.5)', display:'flex' }}>{SVC_CARD_ICONS[svcKey]}</span>
            </div>
            <div>
              <div className="sm-num">{d.num}</div>
              <div className="sm-title">{d.title}</div>
            </div>
          </div>
          <button className="sm-close" onClick={onClose}>✕</button>
        </div>
        <div className="sm-body">
          <p className="sm-desc">{d.desc}</p>
          <div className="sm-feats">
            {d.feats.map((f,i) => (
              <div key={i} className="sm-feat">
                <div style={{ width:'36px', height:'36px', flexShrink:0, background:'rgba(240,200,69,.08)', border:'1px solid rgba(240,200,69,.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--Y)' }}>
                  {featIcons[i] || <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <div className="sm-feat-txt"><strong>{f.t}</strong><span>{f.d}</span></div>
              </div>
            ))}
          </div>
          <div className="sm-results">
            {d.res.map((r,i) => (
              <div key={i}><div className="sm-r-n">{r.n}</div><div className="sm-r-l">{r.l}</div></div>
            ))}
          </div>
          <button className="sm-cta" onClick={() => { onClose(); navigate('/contact-us'); }}>
            Get a Free Proposal →
          </button>
        </div>
      </div>
    </div>
  );
}