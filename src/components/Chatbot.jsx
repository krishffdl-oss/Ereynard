import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SYS = `You are Foxy, the friendly and witty AI assistant for Ereynard Digital — a premium full-service digital marketing agency based in Udaipur, Rajasthan, India. Use fox metaphors occasionally. Keep responses concise — max 4-5 sentences or a short list. Be warm and conversational.
AGENCY: Ereynard Digital | "Smart like a fox. Sharp in digital." | Udaipur, Rajasthan | hello@ereynard.com | +91 98765 43210 | 7+ years | 200+ brands | 98% retention | ₹50 Cr+ ad spend
SERVICES: SEO, Social Media, Performance Ads, Content Strategy, Web Design, Analytics, Branding, Email/CRM, Influencer Marketing
FOX METHOD: Discover → Strategise → Execute → Optimise
CASE STUDIES: NovaBrand 10x ROI, LuxeThreads 340% sales, TechNest 225x traffic, GrowFast -60% CPL
LANGUAGE: Auto-detect. Hindi → Hindi. English → English. Hinglish → Hinglish.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [busy, setBusy] = useState(false);
  const [badge, setBadge] = useState(true);
  const [lang, setLang] = useState('auto');
  const [langLbl, setLangLbl] = useState('हिं/EN');
  const [first, setFirst] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const scroll = () => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; };
  const addMsg = (role, text) => { setMsgs(m => [...m, { role, text }]); setTimeout(scroll, 50); };

  const toggle = () => {
    setOpen(v => !v); setBadge(false);
    if (!first) {
      setFirst(true);
      setTimeout(() => addMsg('bot', '🦊 Namaste! Main hoon **Foxy** — Ereynard Digital ka AI assistant!\n\nServices, pricing, case studies — **English ya Hindi** dono mein baat karo! 😊\n\nBatao, kya jaanna chahte ho?'), 480);
    }
  };

  const cycleLang = () => {
    if (lang === 'auto') { setLang('hindi'); setLangLbl('→ हिंदी'); addMsg('bot', 'अब मैं सिर्फ **हिंदी** में जवाब दूंगा! 🦊'); }
    else if (lang === 'hindi') { setLang('english'); setLangLbl('→ EN'); addMsg('bot', 'Switched to **English** mode! 🦊'); }
    else { setLang('auto'); setLangLbl('हिं/EN'); addMsg('bot', 'Auto-detect on! 🦊 Dono chalega!'); }
  };

  const send = async (text) => {
    const txt = (text || inp).trim(); if (!txt || busy) return;
    setInp(''); addMsg('user', txt); setBusy(true); addMsg('typing', '...');
    const history = [...msgs.filter(m => m.role !== 'typing'), { role: 'user', content: txt }];
    let sys = SYS;
    if (lang === 'hindi') sys += '\n\nCRITICAL: Respond ONLY in Hindi (Devanagari script).';
    else if (lang === 'english') sys += '\n\nCRITICAL: Respond ONLY in English.';
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514', max_tokens: 500, system: sys,
          messages: history.slice(-12).map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text || m.content || '' })).filter(m => m.content),
        }),
      });
      const data = await res.json();
      const reply = (data.content || []).map(b => b.type === 'text' ? b.text : '').join('') || 'Oops! Network issue. Try again! 🦊';
      setMsgs(m => m.filter(x => x.role !== 'typing')); addMsg('bot', reply);
    } catch {
      setMsgs(m => m.filter(x => x.role !== 'typing')); addMsg('bot', 'Thoda network issue 🦊 Direct contact: **hello@ereynard.com**');
    }
    setBusy(false);
  };

  const rnd = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

  return (
    <>
      <button id="bot-btn" className={open ? 'open' : ''} onClick={toggle}>
        {!open ? <span style={{ fontSize: '24px' }}>🦊</span> : <span style={{ fontSize: '17px', color: 'var(--Y)' }}>✕</span>}
        {badge && <span className="bb-badge">1</span>}
      </button>

      <div id="bot-win" className={open ? 'open' : ''}>
        <div className="bh">
          <div className="bh-fox">🦊</div>
          <div className="bh-info">
            <div className="bh-nm">Foxy — Ereynard AI</div>
            <div className="bh-st"><span className="bh-dot" />Online · Replies instantly</div>
          </div>
          <button className="bh-lang" onClick={cycleLang}>{langLbl}</button>
          <button className="bh-cl" onClick={toggle}>✕</button>
        </div>
        <div className="bq">
          {[['What services do you offer?', 'Services'], ['Pricing?', 'Pricing'], ['Case studies', 'Case Studies'], ['Contact info', 'Contact'], ['SEO kya hota hai?', 'SEO क्या है?']].map(([q, l], i) => (
            <button key={i} className="bqc" onClick={() => send(q)}>{l}</button>
          ))}
        </div>
        <div id="bot-msgs" ref={ref}>
          {msgs.map((m, i) => m.role === 'typing' ? (
            <div key={i} className="cmsg bot"><div className="c-av">🦊</div><div className="typing"><span /><span /><span /></div></div>
          ) : (
            <div key={i} className={`cmsg ${m.role}`}>
              <div className="c-av">{m.role === 'bot' ? '🦊' : '👤'}</div>
              <div className="c-bbl" dangerouslySetInnerHTML={{ __html: rnd(m.text) }} />
            </div>
          ))}
        </div>
        <div className="bi">
          <input id="bot-inp" type="text" placeholder="English ya Hindi mein poochho..." value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} />
          <button id="bot-send" onClick={() => send()} disabled={busy}>➤</button>
        </div>
        <div className="bot-powered">Powered by Ereynard AI 🦊</div>
      </div>
    </>
  );
}