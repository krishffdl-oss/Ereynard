import { useState, useRef } from 'react';

// ─────────────────────────────────────────
// 👇 SIRF YE LINE CHANGE KARO — apna number daalo
const WA_NUMBER = '918619189335'; // Format: 91 + 10 digit number
// ─────────────────────────────────────────

const QUICK_REPLIES = [
  { label: 'Services',       msg: 'Hi! I want to know about your services.' },
  { label: 'Pricing',        msg: 'Hi! Can you share your pricing details?' },
  { label: 'Case Studies',   msg: 'Hi! I would like to see your case studies.' },
  { label: 'Free Proposal',  msg: 'Hi! I want a free proposal for my brand.' },
  { label: 'SEO',            msg: 'Hi! I am interested in your SEO services.' },
  { label: 'Social Media',   msg: 'Hi! I need help with Social Media Marketing.' },
];

const GREETING = `Namaste! 🦊 I'm Foxy — your Ereynard Digital assistant.

How can we help grow your brand today? Type your message below or pick a quick option — I'll connect you directly on WhatsApp!`;

export default function Chatbot() {
  const [open,    setOpen]    = useState(false);
  const [badge,   setBadge]   = useState(true);
  const [input,   setInput]   = useState('');
  const [msgs,    setMsgs]    = useState([
    { role: 'bot', text: GREETING }
  ]);
  const msgsRef = useRef(null);

  const scrollBottom = () => {
    setTimeout(() => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, 50);
  };

  const toggle = () => {
    setOpen(v => !v);
    setBadge(false);
  };

  // Open WhatsApp with message
  const openWhatsApp = (message) => {
    const encoded = encodeURIComponent(message.trim());
    const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  };

  // User sends a message → show it → open WhatsApp
  const send = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput('');

    // Show user message
    setMsgs(m => [...m, { role: 'user', text: msg }]);
    scrollBottom();

    // Show bot reply after short delay
    setTimeout(() => {
      setMsgs(m => [...m, {
        role: 'bot',
        text: `Got it! 🦊 Opening WhatsApp now — just hit Send and we'll reply within minutes!`,
        isWa: true,
        waMsg: msg,
      }]);
      scrollBottom();
      // Auto open WhatsApp
      openWhatsApp(msg);
    }, 600);
  };

  const rnd = (t) =>
    t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');

  return (
    <>
      <style>{`
        #wa-btn {
          position:fixed; bottom:26px; right:26px; z-index:9000;
          width:58px; height:58px;
          background:#25D366;
          border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer;
          box-shadow:0 6px 32px rgba(37,211,102,.4);
          transition:transform .32s cubic-bezier(.34,1.56,.64,1), box-shadow .32s;
          border:none;
          animation:waPop .6s 3s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes waPop {
          from { transform:scale(0) rotate(-25deg); opacity:0; }
          to   { transform:scale(1); opacity:1; }
        }
        #wa-btn:hover {
          transform:scale(1.1) rotate(-5deg);
          box-shadow:0 11px 44px rgba(37,211,102,.55);
        }
        #wa-btn.open {
          background:var(--B4);
          border:2px solid rgba(240,200,69,.32);
          box-shadow:0 6px 32px rgba(0,0,0,.3);
        }
        #wa-btn.open:hover { transform:scale(1.05); }

        .wa-badge {
          position:absolute; top:-3px; right:-3px;
          width:18px; height:18px;
          background:#e74c3c; border-radius:50%;
          border:2px solid var(--B3);
          display:flex; align-items:center; justify-content:center;
          font-size:9px; font-weight:700; color:#fff;
          animation:waPulse 2s infinite;
        }
        @keyframes waPulse {
          0%,100% { box-shadow:0 0 0 0 rgba(231,76,60,.5); }
          50%     { box-shadow:0 0 0 7px rgba(231,76,60,0); }
        }

        #wa-win {
          position:fixed; bottom:96px; right:26px; z-index:8999;
          width:360px;
          background:var(--B3);
          border:1px solid rgba(240,200,69,.15);
          display:flex; flex-direction:column;
          clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,0 100%);
          box-shadow:0 20px 65px rgba(0,0,0,.6);
          transform:scale(.88) translateY(20px);
          transform-origin:bottom right;
          opacity:0; pointer-events:none;
          transition:transform .34s cubic-bezier(.34,1.56,.64,1), opacity .28s;
          max-height:520px; overflow:hidden;
        }
        #wa-win.open {
          transform:scale(1) translateY(0);
          opacity:1; pointer-events:all;
        }

        /* Header */
        .wa-head {
          background:#075E54;
          padding:13px 16px;
          display:flex; align-items:center; gap:11px;
          flex-shrink:0;
        }
        .wa-head-avatar {
          width:40px; height:40px; border-radius:50%;
          background:#128C7E;
          display:flex; align-items:center; justify-content:center;
          font-size:20px; flex-shrink:0;
          border:2px solid rgba(255,255,255,.2);
        }
        .wa-head-info { flex:1; min-width:0; }
        .wa-head-name {
          font-family:var(--FM); font-weight:700;
          font-size:14px; color:#fff; line-height:1;
        }
        .wa-head-status {
          font-size:10px; color:rgba(255,255,255,.65);
          display:flex; align-items:center; gap:4px; margin-top:2px;
        }
        .wa-online-dot {
          width:6px; height:6px; border-radius:50%;
          background:#25D366; flex-shrink:0;
          animation:waDotPulse 2s infinite;
        }
        @keyframes waDotPulse {
          0%,100% { opacity:1; }
          50%     { opacity:.3; }
        }
        .wa-head-close {
          width:26px; height:26px;
          background:rgba(255,255,255,.1); border:none;
          cursor:pointer; display:flex; align-items:center;
          justify-content:center; font-size:13px; color:#fff;
          border-radius:50%; transition:background .2s; flex-shrink:0;
        }
        .wa-head-close:hover { background:rgba(255,255,255,.22); }

        /* Quick replies */
        .wa-quick {
          padding:8px 10px;
          display:flex; gap:5px; flex-wrap:wrap;
          border-bottom:1px solid rgba(240,200,69,.06);
          flex-shrink:0;
          background:rgba(14,16,75,.4);
        }
        .wa-qbtn {
          background:rgba(37,211,102,.1);
          border:1px solid rgba(37,211,102,.25);
          color:rgba(37,211,102,.9);
          font-size:9px; font-weight:700; letter-spacing:.04em;
          padding:4px 9px; cursor:pointer; white-space:nowrap;
          transition:all .2s; font-family:var(--FM); border-radius:12px;
        }
        .wa-qbtn:hover {
          background:rgba(37,211,102,.2);
          border-color:rgba(37,211,102,.5);
          color:#25D366;
        }

        /* Messages */
        #wa-msgs {
          flex:1; overflow-y:auto;
          padding:12px 10px;
          display:flex; flex-direction:column; gap:8px;
          scrollbar-width:thin;
          scrollbar-color:rgba(240,200,69,.12) transparent;
          min-height:160px; max-height:260px;
          background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%230a0c42'/%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(240,200,69,0.03)'/%3E%3Ccircle cx='60' cy='40' r='1' fill='rgba(240,200,69,0.03)'/%3E%3Ccircle cx='80' cy='80' r='1' fill='rgba(240,200,69,0.03)'/%3E%3C/svg%3E");
        }

        .wa-msg { display:flex; animation:waMsgPop .25s cubic-bezier(.34,1.56,.64,1); }
        @keyframes waMsgPop {
          from { opacity:0; transform:translateY(8px) scale(.95); }
          to   { opacity:1; transform:none; }
        }
        .wa-msg.bot  { justify-content:flex-start; }
        .wa-msg.user { justify-content:flex-end; }

        .wa-bubble {
          max-width:80%; padding:8px 12px;
          font-size:12px; line-height:1.58;
          word-break:break-word; position:relative;
        }
        .wa-msg.bot .wa-bubble {
          background:#1F2C34;
          color:rgba(255,255,255,.85);
          border-radius:0 10px 10px 10px;
          border:1px solid rgba(255,255,255,.06);
        }
        .wa-msg.user .wa-bubble {
          background:#005C4B;
          color:rgba(255,255,255,.92);
          border-radius:10px 0 10px 10px;
          font-weight:500;
        }
        .wa-bubble strong { color:#25D366; }
        .wa-msg.user .wa-bubble strong { color:#fff; }

        /* WA open button inside bubble */
        .wa-open-btn {
          display:inline-flex; align-items:center; gap:6px;
          margin-top:8px; background:#25D366; color:#fff;
          font-family:var(--FM); font-size:10px; font-weight:700;
          letter-spacing:.05em; padding:6px 14px; border:none;
          cursor:pointer; border-radius:16px; transition:all .2s;
          width:100%;
          justify-content:center;
        }
        .wa-open-btn:hover { background:#128C7E; transform:translateY(-1px); }

        /* Input area */
        .wa-input-row {
          padding:9px 10px;
          border-top:1px solid rgba(240,200,69,.07);
          display:flex; gap:7px; align-items:center;
          flex-shrink:0;
          background:rgba(14,16,75,.6);
        }
        #wa-inp {
          flex:1;
          background:rgba(255,255,255,.07);
          border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.85);
          padding:8px 12px; font-family:var(--FM); font-size:12px;
          outline:none; transition:border-color .3s;
          border-radius:20px;
        }
        #wa-inp::placeholder { color:rgba(255,255,255,.28); }
        #wa-inp:focus { border-color:rgba(37,211,102,.4); }

        #wa-send {
          width:36px; height:36px;
          background:#25D366; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          font-size:14px; color:#fff; border-radius:50%;
          transition:all .25s; flex-shrink:0;
        }
        #wa-send:hover { background:#128C7E; transform:scale(1.08); }

        /* Powered by */
        .wa-powered {
          text-align:center;
          font-size:8px; font-weight:600; letter-spacing:.08em;
          color:rgba(255,255,255,.15);
          padding:5px 0 6px; flex-shrink:0;
          background:rgba(14,16,75,.6);
        }
        .wa-powered span { color:#25D366; }

        @media(max-width:640px) {
          #wa-win  { right:7px; left:7px; width:auto; bottom:76px; }
          #wa-btn  { right:12px; bottom:14px; width:52px; height:52px; }
        }
      `}</style>

      {/* ── Floating Button ── */}
      <button id="wa-btn" className={open ? 'open' : ''} onClick={toggle}>
        {!open ? (
          /* WhatsApp icon SVG */
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        ) : (
          <span style={{ fontSize:'16px', color:'var(--Y)' }}>✕</span>
        )}
        {badge && <span className="wa-badge">1</span>}
      </button>

      {/* ── Chat Window ── */}
      <div id="wa-win" className={open ? 'open' : ''}>

        {/* Header */}
        <div className="wa-head">
          <div className="wa-head-avatar">🦊</div>
          <div className="wa-head-info">
            <div className="wa-head-name">Ereynard Digital</div>
            <div className="wa-head-status">
              <span className="wa-online-dot" />
              <span>Typically replies in minutes</span>
            </div>
          </div>
          <button className="wa-head-close" onClick={toggle}>✕</button>
        </div>

        {/* Quick replies */}
        <div className="wa-quick">
          {QUICK_REPLIES.map((qr, i) => (
            <button key={i} className="wa-qbtn" onClick={() => send(qr.msg)}>
              {qr.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div id="wa-msgs" ref={msgsRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`wa-msg ${m.role}`}>
              <div className="wa-bubble" dangerouslySetInnerHTML={{ __html:
                m.isWa
                  ? `${m.text}<br/><button class="wa-open-btn" onclick="window.open('https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(m.waMsg || '')}','_blank')">
                      <svg width='14' height='14' viewBox='0 0 24 24' fill='white'><path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/></svg>
                      Open WhatsApp
                    </button>`
                  : m.text.replace(/\n/g, '<br/>')
              }} />
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="wa-input-row">
          <input
            id="wa-inp"
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          />
          <button id="wa-send" onClick={() => send()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>

        <div className="wa-powered">
          Chat with us on <span>WhatsApp</span> 🦊
        </div>
      </div>
    </>
  );
}