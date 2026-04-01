import { useState, useEffect } from 'react';

export default function Loader({ onDone }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHide(true);
      setTimeout(onDone, 640);
    }, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div id="loader" className={hide ? 'hide' : ''}>
      <img src="/logo.jpg" alt="Ereynard" className="ld-fox" style={{ width:'80px', height:'80px', objectFit:'contain', borderRadius:'12px' }} />
      <div className="ld-brand">
        {'EREYNARD.'.split('').map((c, i) => (
          <span key={i} className={`ld-c ${i % 2 === 0 ? 'y' : 'o'}`} style={{ animationDelay: `${i * .065 + .1}s` }}>
            {c}
          </span>
        ))}
      </div>
      <div className="ld-tagline">Smart like a fox. Sharp in digital.</div>
      <div className="ld-bar-wrap">
        <div className="ld-bar" />
      </div>
    </div>
  );
}