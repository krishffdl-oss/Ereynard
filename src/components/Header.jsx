import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ openContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const pages = [
    { k: '/', l: 'Home' },
    { k: '/about', l: 'About' },
    { k: '/services', l: 'Services' },
    { k: '/projects', l: 'Work' },
    { k: '/clients', l: 'Clients' },
    { k: '/blog', l: 'Blog' },
  ];

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setMob(false);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={scrolled ? 'sc' : ''}>
        <button className="nav-logo" onClick={() => goTo('/')}>
          <span>🦊</span>Ereynard<span style={{ opacity: .3 }}>.</span>
        </button>
        <ul className="nav-links">
          {pages.map(p => (
            <li key={p.k}>
              <button className={isActive(p.k) ? 'active' : ''} onClick={() => goTo(p.k)}>
                {p.l}
              </button>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={openContact}>
          <span>Enquire Now →</span>
        </button>
        <button className={`hburg ${mob ? 'open' : ''}`} onClick={() => setMob(v => !v)}>
          <i /><i /><i />
        </button>
      </nav>

      <div className={`mob-menu ${mob ? 'open' : ''}`}>
        {pages.map(p => (
          <button key={p.k} onClick={() => goTo(p.k)}>{p.l}</button>
        ))}
        <button onClick={() => { openContact(); setMob(false); }}>Contact</button>
      </div>
    </>
  );
}