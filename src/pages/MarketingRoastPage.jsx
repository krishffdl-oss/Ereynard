import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROASTS = [
  {
    max: 30,
    emoji: '😭',
    title: 'Marketing ICU',
    msg: 'Bhai tumhara marketing plan ICU mein hai. Doctor ne bol diya — "critical condition". Ek post week mein, followers double digits mein, aur ads? Sunna bhi nahi.',
    color: '#e74c3c',
    bg: 'rgba(231,76,60,.08)',
    border: 'rgba(231,76,60,.3)',
  },
  {
    max: 50,
    emoji: '😬',
    title: 'Thoda Zinda, Thoda Nahi',
    msg: 'Zindagi hai, par barely. Tumhara competitor roz post kar raha hai aur tum soch rahe ho "kal karte hain". Kal kabhi nahi aata bhai.',
    color: '#e67e22',
    bg: 'rgba(230,126,34,.08)',
    border: 'rgba(230,126,34,.3)',
  },
  {
    max: 70,
    emoji: '😅',
    title: 'Average Hai Yaar',
    msg: 'Thoda effort aur daal bhai, warna growth slow hi rahegi. Tum average se upar ho — lekin "average" se koi viral nahi hota.',
    color: '#f0c845',
    bg: 'rgba(240,200,69,.08)',
    border: 'rgba(240,200,69,.3)',
  },
  {
    max: 85,
    emoji: '😎',
    title: 'Nice! Par Pro Dur Hai',
    msg: 'Accha hai bhai! But abhi bhi pro level door hai. Ek aur push chahiye — aur Ereynard wahi karta hai. 😏',
    color: '#3498db',
    bg: 'rgba(52,152,219,.08)',
    border: 'rgba(52,152,219,.3)',
  },
  {
    max: 100,
    emoji: '🔥',
    title: 'Beast Mode!',
    msg: 'Bhai tu toh already fire hai! Seriously impressive. Bas scale karna baaki hai — aur uske liye tujhe pata hai kahan aana hai. 🦊',
    color: '#2ecc71',
    bg: 'rgba(46,204,113,.08)',
    border: 'rgba(46,204,113,.3)',
  },
];

function getRoast(score) {
  return ROASTS.find(r => score <= r.max) || ROASTS[ROASTS.length - 1];
}

function calcScore({ followers, postsPerWeek, adsRunning, hasWebsite, hasStrategy }) {
  let s = 0;
  const f = parseInt(followers) || 0;
  const p = parseInt(postsPerWeek) || 0;

  // Followers (max 30)
  if (f > 10000) s += 30;
  else if (f > 5000) s += 25;
  else if (f > 1000) s += 15;
  else if (f > 500) s += 8;
  else s += 3;

  // Posts/week (max 25)
  if (p >= 7) s += 25;
  else if (p >= 5) s += 20;
  else if (p >= 3) s += 14;
  else if (p >= 1) s += 7;
  else s += 0;

  // Ads (max 20)
  if (adsRunning === 'yes') s += 20;
  else if (adsRunning === 'sometimes') s += 10;

  // Website (max 15)
  if (hasWebsite === 'yes') s += 15;
  else if (hasWebsite === 'basic') s += 7;

  // Strategy (max 10)
  if (hasStrategy === 'yes') s += 10;
  else if (hasStrategy === 'kinda') s += 5;

  return Math.min(s, 100);
}

export default function MarketingRoastPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    followers: '',
    postsPerWeek: '',
    adsRunning: '',
    hasWebsite: '',
    hasStrategy: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError]   = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleRoast = () => {
    if (!form.followers || !form.postsPerWeek || !form.adsRunning || !form.hasWebsite || !form.hasStrategy) {
      setError('Sab fields fill karo bhai 😤');
      setTimeout(() => setError(''), 2500);
      return;
    }
    const score = calcScore(form);
    setResult(score);
  };

  const handleShare = () => {
    const roast = getRoast(result);
    const text = `Mera Marketing Score: ${result}/100 ${roast.emoji}\n"${roast.msg}"\n\nCheck yours at ereynard.com/marketing-roast 🦊`;
    if (navigator.share) {
      navigator.share({ title: 'My Marketing Roast Score', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard! Share karo 🚀');
    }
  };

  const roast = result !== null ? getRoast(result) : null;

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(240,200,69,.06)',
    border: '1px solid rgba(240,200,69,.15)',
    color: 'var(--Y, #f0c845)',
    fontSize: '15px', fontFamily: 'var(--FM)', fontWeight: 600,
    padding: '13px 16px', outline: 'none',
  };

  const labelStyle = {
    display: 'block', fontSize: '10px', fontWeight: 700,
    letterSpacing: '.18em', textTransform: 'uppercase',
    color: 'rgba(240,200,69,.5)', marginBottom: '8px',
  };

  const fields = [
    {
      key: 'followers', label: 'Instagram Followers kitne hain?',
      type: 'number', placeholder: 'e.g. 2500',
    },
    {
      key: 'postsPerWeek', label: 'Posts per week kitne karte ho?',
      type: 'number', placeholder: 'e.g. 3',
    },
    {
      key: 'adsRunning', label: 'Ads run karte ho?',
      type: 'select',
      options: [
        { v: '', l: 'Select...' },
        { v: 'yes', l: '✅ Haan, regularly' },
        { v: 'sometimes', l: '🤏 Kabhi kabhi' },
        { v: 'no', l: '❌ Nahi bilkul' },
      ],
    },
    {
      key: 'hasWebsite', label: 'Website hai tumhari?',
      type: 'select',
      options: [
        { v: '', l: 'Select...' },
        { v: 'yes', l: '✅ Haan, professional' },
        { v: 'basic', l: '🤏 Basic si hai' },
        { v: 'no', l: '❌ Nahi hai' },
      ],
    },
    {
      key: 'hasStrategy', label: 'Marketing strategy hai koi?',
      type: 'select',
      options: [
        { v: '', l: 'Select...' },
        { v: 'yes', l: '✅ Haan, proper plan hai' },
        { v: 'kinda', l: '🤏 Thodi bahut hai' },
        { v: 'no', l: '❌ Sochenge baad mein' },
      ],
    },
  ];

  return (
    <div style={{ background: 'var(--B3, #0e104b)', minHeight: '100vh', paddingTop: '80px' }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scoreCount {
          from { opacity: 0; transform: scale(.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        .roast-input:focus { border-color: rgba(240,200,69,.5) !important; }
        .roast-select option { background: #0e104b; color: #f0c845; }
      `}</style>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 24px 36px' }}>
        <div style={{
          display: 'inline-block', fontSize: '10px', fontWeight: 700,
          letterSpacing: '.22em', textTransform: 'uppercase',
          color: 'rgba(240,200,69,.55)', border: '1px solid rgba(240,200,69,.18)',
          padding: '6px 16px', marginBottom: '20px'
        }}>Free Tool 🔥</div>
        <h1 style={{
          fontFamily: 'var(--FM)', fontWeight: 900,
          fontSize: 'clamp(32px, 6vw, 68px)',
          color: 'var(--Y, #f0c845)', lineHeight: 1.05, marginBottom: '14px'
        }}>
          Check Your <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,200,69,.35)' }}>Marketing</span> Score 😂
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(240,200,69,.4)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
          5 sawaal. 30 second. Brutal honesty. Pata chalo tumhari marketing kitni strong — ya kitni pathetic — hai.
        </p>
      </div>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 20px 80px' }}>

        {/* Form Card */}
        {result === null && (
          <div style={{
            background: 'rgba(240,200,69,.04)',
            border: '1px solid rgba(240,200,69,.12)',
            borderTop: '3px solid var(--Y)',
            padding: '36px 32px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: '-20px', right: '-10px',
              fontFamily: 'var(--FM)', fontWeight: 900, fontSize: '110px',
              color: 'rgba(240,200,69,.03)', pointerEvents: 'none', userSelect: 'none',
              lineHeight: 1
            }}>😂</div>

            {fields.map((f, i) => (
              <div key={f.key} style={{ marginBottom: i < fields.length - 1 ? '20px' : '28px' }}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === 'number' ? (
                  <input
                    type="number" min="0"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    className="roast-input"
                    style={inputStyle}
                  />
                ) : (
                  <select
                    value={form[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    className="roast-input roast-select"
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    {f.options.map(o => (
                      <option key={o.v} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}

            {error && (
              <div style={{
                background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.3)',
                color: '#e74c3c', fontSize: '12px', fontWeight: 700,
                padding: '10px 14px', marginBottom: '16px'
              }}>{error}</div>
            )}

            <button className="btn-p" onClick={handleRoast} style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}>
              <span>Roast My Marketing 🔥</span>
              <span>→</span>
            </button>

            <p style={{ fontSize: '10px', color: 'rgba(240,200,69,.2)', marginTop: '12px', textAlign: 'center' }}>
              No signup · No spam · Pure brutal honesty
            </p>
          </div>
        )}

        {/* Result Card */}
        {result !== null && roast && (
          <div style={{ animation: 'fadeUp .5s ease' }}>

            {/* Score */}
            <div style={{
              background: roast.bg,
              border: `1px solid ${roast.border}`,
              borderTop: `4px solid ${roast.color}`,
              padding: '40px 32px', textAlign: 'center', marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '.22em',
                textTransform: 'uppercase', color: 'rgba(240,200,69,.4)', marginBottom: '20px'
              }}>
                Tumhara Marketing Score
              </div>

              {/* Big score */}
              <div style={{ animation: 'scoreCount .6s cubic-bezier(.34,1.56,.64,1)', marginBottom: '8px' }}>
                <span style={{
                  fontFamily: 'var(--FM)', fontWeight: 900,
                  fontSize: 'clamp(72px, 15vw, 120px)',
                  color: roast.color, lineHeight: 1,
                }}>{result}</span>
                <span style={{
                  fontFamily: 'var(--FM)', fontWeight: 700,
                  fontSize: 'clamp(28px, 5vw, 44px)',
                  color: 'rgba(240,200,69,.3)', marginLeft: '4px'
                }}>/100</span>
              </div>

              <div style={{
                fontFamily: 'var(--FM)', fontWeight: 800,
                fontSize: '20px', color: roast.color, marginBottom: '4px'
              }}>
                {roast.emoji} {roast.title}
              </div>

              <p style={{
                fontSize: '14px', color: 'rgba(240,200,69,.55)',
                lineHeight: 1.8, maxWidth: '400px', margin: '16px auto 0',
                fontStyle: 'italic'
              }}>
                "{roast.msg}"
              </p>
            </div>

            {/* Breakdown */}
            <div style={{
              background: 'rgba(240,200,69,.03)',
              border: '1px solid rgba(240,200,69,.08)',
              padding: '20px 24px', marginBottom: '16px'
            }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(240,200,69,.35)', marginBottom: '14px' }}>
                Score Breakdown
              </div>
              {[
                { l: 'Instagram Presence', v: parseInt(form.followers) > 5000 ? 30 : parseInt(form.followers) > 1000 ? 15 : parseInt(form.followers) > 500 ? 8 : 3, max: 30 },
                { l: 'Content Consistency', v: parseInt(form.postsPerWeek) >= 7 ? 25 : parseInt(form.postsPerWeek) >= 5 ? 20 : parseInt(form.postsPerWeek) >= 3 ? 14 : parseInt(form.postsPerWeek) >= 1 ? 7 : 0, max: 25 },
                { l: 'Paid Advertising',    v: form.adsRunning === 'yes' ? 20 : form.adsRunning === 'sometimes' ? 10 : 0, max: 20 },
                { l: 'Web Presence',        v: form.hasWebsite === 'yes' ? 15 : form.hasWebsite === 'basic' ? 7 : 0, max: 15 },
                { l: 'Strategy & Planning', v: form.hasStrategy === 'yes' ? 10 : form.hasStrategy === 'kinda' ? 5 : 0, max: 10 },
              ].map((item, i) => {
                const pct = (item.v / item.max) * 100;
                const c   = pct >= 70 ? '#2ecc71' : pct >= 40 ? '#f0c845' : '#e74c3c';
                return (
                  <div key={i} style={{ marginBottom: i < 4 ? '12px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(240,200,69,.55)' }}>{item.l}</span>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: c }}>{item.v}/{item.max}</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(240,200,69,.08)' }}>
                      <div style={{ height: '100%', background: c, width: `${pct}%`, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn-p" onClick={() => navigate('/contact-us')} style={{ width: '100%', justifyContent: 'center' }}>
                <span>Fix My Marketing 🚀</span><span>→</span>
              </button>
              <button onClick={handleShare} style={{
                width: '100%', background: 'rgba(240,200,69,.08)',
                border: '1px solid rgba(240,200,69,.2)',
                color: 'var(--Y)', padding: '13px',
                fontFamily: 'var(--FM)', fontWeight: 700, fontSize: '13px',
                cursor: 'pointer', letterSpacing: '.06em', transition: 'all .2s'
              }}>
                📤 Share My Score
              </button>
              <button onClick={() => setResult(null)} style={{
                background: 'none', border: 'none',
                color: 'rgba(240,200,69,.3)', fontSize: '11px',
                cursor: 'pointer', fontFamily: 'var(--FM)', fontWeight: 600,
                padding: '8px', letterSpacing: '.1em', textTransform: 'uppercase'
              }}>
                ↩ Dobara Try Karo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}