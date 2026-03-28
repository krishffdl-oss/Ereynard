import { useNavigate } from 'react-router-dom';
import { CAMP_DATA } from '../data/index.js';

export default function CampaignModal({ campKey, onClose }) {
  const navigate = useNavigate();
  if (!campKey) return null;
  const d = CAMP_DATA[campKey]; if (!d) return null;

  return (
    <div className="camp-ov open" onClick={e => e.target.classList.contains('camp-ov') && onClose()}>
      <div className="camp-modal">
        <div className="camp-hero-img">
          <img src={d.img} alt={d.ttl} />
          <button className="camp-close" onClick={onClose}>✕</button>
          <div className="camp-hero-bot">
            <span className="camp-tag">{d.tag}</span>
            <div className="camp-ttl">{d.ttl}</div>
            <div className="camp-sub">{d.sub}</div>
          </div>
        </div>
        <div className="camp-body">
          <div className="camp-kpis">
            {d.kpis.map((k, i) => (
              <div key={i} className="kpi"><div className="kpi-n">{k.n}</div><div className="kpi-l">{k.l}</div></div>
            ))}
          </div>
          <div className="camp-div" />
          <p className="camp-ov-txt">{d.ov}</p>
          <div className="camp-sh">Challenges We Solved</div>
          <div className="camp-chals">
            {d.chals.map((c, i) => (
              <div key={i} className="camp-chal"><div className="camp-chal-i">{c.i}</div><div className="camp-chal-t">{c.t}</div></div>
            ))}
          </div>
          <div className="camp-sh">Services Used</div>
          <div className="camp-svcs">
            {d.svcs.map((s, i) => <span key={i} className="camp-svc-t">{s}</span>)}
          </div>
          <div className="camp-sh">How We Did It</div>
          <div className="camp-tl">
            {d.tl.map((t, i) => (
              <div key={i} className="camp-tl-item"><div className="camp-tl-ph">{t.p}</div><div className="camp-tl-ac">{t.a}</div></div>
            ))}
          </div>
          <div className="camp-q">
            <div className="camp-q-t">{d.q}</div>
            <div className="camp-q-by">{d.qby}</div>
          </div>
          <div className="camp-cta-row">
            <button className="sm-cta" onClick={() => { onClose(); navigate('/contact'); }}>Start a Similar Campaign →</button>
            <button className="btn-ghost" onClick={() => { onClose(); navigate('/projects'); }}>View All Campaigns</button>
          </div>
        </div>
      </div>
    </div>
  );
}