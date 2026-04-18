import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ROICalculatorPage() {
  const navigate = useNavigate();
  const [investment, setInvestment] = useState('');
  const [revenue, setRevenue] = useState('');
  const [roi, setRoi] = useState(null);
  const [error, setError] = useState('');
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    setError('');
    setRoi(null);
    setCalculated(false);

    const inv = parseFloat(investment);
    const rev = parseFloat(revenue);

    if (!investment || !revenue) {
      setError('Please fill in both fields.');
      return;
    }
    if (inv <= 0 || rev < 0) {
      setError('Values must be greater than zero.');
      return;
    }

    const result = ((rev - inv) / inv) * 100;
    setRoi(result.toFixed(2));
    setCalculated(true);
  };

  const isPositive = roi >= 0;

  return (
    <div style={{ background: 'var(--B3, #0e104b)', minHeight: '100vh', paddingTop: '80px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 24px 40px' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '10px', fontWeight: 700, letterSpacing: '.22em',
          textTransform: 'uppercase', color: 'rgba(240,200,69,.55)',
          border: '1px solid rgba(240,200,69,.18)',
          padding: '6px 16px', marginBottom: '20px'
        }}>
          Free Tool
        </div>
        <h1 style={{
          fontFamily: 'var(--FM)', fontWeight: 900,
          fontSize: 'clamp(36px, 6vw, 72px)',
          color: 'var(--Y, #f0c845)', lineHeight: 1.05, marginBottom: '16px'
        }}>
          ROI <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(240,200,69,0.3)' }}>Calculator</span>
        </h1>
        <p style={{
          fontSize: '15px', color: 'rgba(240,200,69,.45)',
          maxWidth: '480px', margin: '0 auto', lineHeight: 1.7
        }}>
          Find out exactly how much your marketing investment is returning. Enter your numbers below.
        </p>
      </div>

      {/* Calculator Card */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 20px 80px' }}>
        <div style={{
          background: 'rgba(240,200,69,.04)',
          border: '1px solid rgba(240,200,69,.12)',
          borderTop: '3px solid var(--Y, #f0c845)',
          padding: '40px 36px',
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Background text */}
          <div style={{
            position: 'absolute', bottom: '-20px', right: '-10px',
            fontFamily: 'var(--FM)', fontWeight: 900,
            fontSize: '100px', color: 'rgba(240,200,69,.03)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none'
          }}>ROI</div>

          {/* Input: Investment */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{
              display: 'block', fontSize: '10px', fontWeight: 700,
              letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'rgba(240,200,69,.5)', marginBottom: '10px'
            }}>
              Total Investment (₹)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px', color: 'rgba(240,200,69,.4)',
                fontFamily: 'var(--FM)', fontWeight: 700
              }}>₹</span>
              <input
                type="number"
                min="0"
                placeholder="50000"
                value={investment}
                onChange={e => setInvestment(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(240,200,69,.06)',
                  border: '1px solid rgba(240,200,69,.15)',
                  color: 'var(--Y, #f0c845)',
                  fontSize: '18px', fontFamily: 'var(--FM)', fontWeight: 700,
                  padding: '14px 16px 14px 36px',
                  outline: 'none',
                  transition: 'border .2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(240,200,69,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(240,200,69,.15)'}
              />
            </div>
          </div>

          {/* Input: Revenue */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block', fontSize: '10px', fontWeight: 700,
              letterSpacing: '.18em', textTransform: 'uppercase',
              color: 'rgba(240,200,69,.5)', marginBottom: '10px'
            }}>
              Revenue Generated (₹)
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px', color: 'rgba(240,200,69,.4)',
                fontFamily: 'var(--FM)', fontWeight: 700
              }}>₹</span>
              <input
                type="number"
                min="0"
                placeholder="200000"
                value={revenue}
                onChange={e => setRevenue(e.target.value)}
                style={{
                  width: '100%', boxSizing: 'border-box',
                  background: 'rgba(240,200,69,.06)',
                  border: '1px solid rgba(240,200,69,.15)',
                  color: 'var(--Y, #f0c845)',
                  fontSize: '18px', fontFamily: 'var(--FM)', fontWeight: 700,
                  padding: '14px 16px 14px 36px',
                  outline: 'none',
                  transition: 'border .2s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(240,200,69,.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(240,200,69,.15)'}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(192,57,43,.12)', border: '1px solid rgba(192,57,43,.3)',
              color: '#e74c3c', fontSize: '12px', padding: '10px 14px',
              marginBottom: '18px', fontWeight: 600
            }}>
              ⚠ {error}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={calculate}
            className="btn-p"
            style={{ width: '100%', justifyContent: 'center', fontSize: '14px', padding: '16px' }}
          >
            <span>Calculate My ROI</span>
            <span>→</span>
          </button>

          {/* Formula hint */}
          <p style={{
            fontSize: '10px', color: 'rgba(240,200,69,.25)',
            marginTop: '12px', textAlign: 'center', letterSpacing: '.05em'
          }}>
            Formula: ((Revenue − Investment) ÷ Investment) × 100
          </p>
        </div>

        {/* Result Card */}
        {calculated && roi !== null && (
          <div style={{
            marginTop: '24px',
            background: isPositive ? 'rgba(26,138,54,.08)' : 'rgba(192,57,43,.08)',
            border: `1px solid ${isPositive ? 'rgba(26,138,54,.3)' : 'rgba(192,57,43,.3)'}`,
            borderLeft: `4px solid ${isPositive ? '#1a8a36' : '#c0392b'}`,
            padding: '32px 36px',
            animation: 'fadeUp .4s ease',
          }}>
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div style={{
              fontSize: '10px', fontWeight: 700, letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: isPositive ? 'rgba(26,138,54,.7)' : 'rgba(192,57,43,.7)',
              marginBottom: '8px'
            }}>
              Your ROI Result
            </div>

            <div style={{
              fontFamily: 'var(--FM)', fontWeight: 900,
              fontSize: 'clamp(48px, 8vw, 80px)',
              color: isPositive ? '#2ecc71' : '#e74c3c',
              lineHeight: 1, marginBottom: '12px'
            }}>
              {isPositive ? '+' : ''}{roi}%
            </div>

            <p style={{
              fontSize: '13px', lineHeight: 1.7,
              color: isPositive ? 'rgba(46,204,113,.6)' : 'rgba(231,76,60,.6)',
              marginBottom: '24px'
            }}>
              {isPositive
                ? `For every ₹100 invested, you earned ₹${(100 + parseFloat(roi)).toFixed(0)} back. ${parseFloat(roi) >= 100 ? '🔥 Outstanding performance!' : parseFloat(roi) >= 50 ? '✅ Solid returns!' : '📈 Room to grow further.'}`
                : `You're losing money on this investment. Let's fix that with a smarter strategy.`
              }
            </p>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px', marginBottom: '28px'
            }}>
              {[
                { l: 'Invested', v: `₹${parseFloat(investment).toLocaleString('en-IN')}` },
                { l: 'Revenue', v: `₹${parseFloat(revenue).toLocaleString('en-IN')}` },
                { l: 'Net Profit', v: `₹${(parseFloat(revenue) - parseFloat(investment)).toLocaleString('en-IN')}` },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(240,200,69,.04)',
                  border: '1px solid rgba(240,200,69,.08)',
                  padding: '12px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9px', color: 'rgba(240,200,69,.35)', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{s.l}</div>
                  <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '13px', color: 'var(--Y, #f0c845)' }}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className="btn-p"
              onClick={() => navigate('/contact-us')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{isPositive ? 'Scale These Results Further' : 'Fix My ROI with Ereynard'}</span>
              <span>→</span>
            </button>
            <p style={{ fontSize: '10px', color: 'rgba(240,200,69,.25)', marginTop: '10px', textAlign: 'center' }}>
              Free consultation · No commitment
            </p>
          </div>
        )}

        {/* Bottom trust strip */}
        <div style={{
          marginTop: '40px', display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
          background: 'rgba(240,200,69,.06)',
          border: '1px solid rgba(240,200,69,.08)'
        }}>
          {[
            { i: '🎯', t: '10x ROAS', d: 'Avg. Google & Meta' },
            { i: '📈', t: '340%', d: 'Avg. sales growth' },
            { i: '🔍', t: '225x', d: 'Blog traffic growth' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '20px 12px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(240,200,69,.06)' : 'none'
            }}>
              <div style={{ fontSize: '22px', marginBottom: '6px' }}>{s.i}</div>
              <div style={{ fontFamily: 'var(--FM)', fontWeight: 800, fontSize: '14px', color: 'var(--Y)', marginBottom: '2px' }}>{s.t}</div>
              <div style={{ fontSize: '10px', color: 'rgba(240,200,69,.35)' }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}