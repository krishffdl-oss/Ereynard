import { useNavigate } from 'react-router-dom';
import { SVC_DATA } from '../data/index.js';

export default function ServiceModal({ svcKey, onClose }) {
  const navigate = useNavigate();
  if (!svcKey) return null;
  const d = SVC_DATA[svcKey]; if (!d) return null;

  return (
    <div className="svc-ov open" onClick={e => e.target.classList.contains('svc-ov') && onClose()}>
      <div className="svc-modal">
        <div className="sm-head">
          <div><div className="sm-num">{d.num}</div><div className="sm-title">{d.title}</div></div>
          <div className="sm-icon">{d.icon}</div>
          <button className="sm-close" onClick={onClose}>✕</button>
        </div>
        <div className="sm-body">
          <p className="sm-desc">{d.desc}</p>
          <div className="sm-feats">
            {d.feats.map((f, i) => (
              <div key={i} className="sm-feat">
                <div className="sm-feat-icon">{f.i}</div>
                <div className="sm-feat-txt"><strong>{f.t}</strong><span>{f.d}</span></div>
              </div>
            ))}
          </div>
          <div className="sm-results">
            {d.res.map((r, i) => (
              <div key={i}><div className="sm-r-n">{r.n}</div><div className="sm-r-l">{r.l}</div></div>
            ))}
          </div>
          <button className="sm-cta" onClick={() => { onClose(); navigate('/contact'); }}>
            Get a Free Proposal →
          </button>
        </div>
      </div>
    </div>
  );
}