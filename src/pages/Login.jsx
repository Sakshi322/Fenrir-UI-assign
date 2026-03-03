import { useState } from 'react';



const Field = ({ ph, fk, type = 'text', f, setF, errs }) => (
  <input
    type={type}
    placeholder={ph}
    value={f[fk]}
    onChange={e => setF(p => ({ ...p, [fk]: e.target.value }))}
    onFocus={e => e.target.style.borderColor = '#0CC8A8'}
    onBlur={e => e.target.style.borderColor = errs[fk] ? '#ef4444' : '#e0e0e0'}
    style={{
      width:'100%',
      padding:'11px 13px',
      border:`1.5px solid ${errs[fk] ? '#ef4444' : '#e0e0e0'}`,
      borderRadius:8,
      fontSize:13,
      color:'#111',
      outline:'none',
      background:'#fafafa',
      fontFamily:'inherit',
      transition:'border-color .15s',
    }}
  />
);

export default function Login({ onLogin, theme, toggleTheme }) {
  const [f, setF] = useState({ first:'', last:'', email:'', pw:'' });
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errs, setErrs] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const e = {};
    if (!f.first.trim()) e.first = true;
    if (!f.last.trim())  e.last  = true;
    if (!f.email.includes('@')) e.email = true;
    if (f.pw.length < 8) e.pw = true;
    if (!agreed) e.agreed = true;
    setErrs(e);
    if (!Object.keys(e).length) {
      setLoading(true);
      setTimeout(onLogin, 900);
    }
  };

  

  return (
    <div style={{ minHeight:'100vh', display:'flex', position:'relative', background:'#07090a', overflow:'hidden' }}>
      {/* Gradient blobs */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse at 14% 88%,rgba(12,200,168,.25) 0%,transparent 44%), radial-gradient(ellipse at 80% 12%,rgba(239,68,68,.18) 0%,transparent 44%), radial-gradient(ellipse at 56% 52%,rgba(245,158,11,.09) 0%,transparent 54%)',
      }} />

      {/* ── LEFT ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'36px 52px', position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#0CC8A8,#0a9b82)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width:11, height:11, background:'#fff', borderRadius:'50%' }} />
          </div>
          <span style={{ fontWeight:700, fontSize:20, color:'#fff' }}>aps</span>
        </div>

        {/* Hero */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:520 }}>
          <h1 style={{ fontSize:50, fontWeight:700, color:'#fff', lineHeight:1.12, marginBottom:36 }}>
            Expert level Cybersecurity in{' '}
            <span style={{ color:'#0CC8A8' }}>hours</span> not weeks.
          </h1>
          <p style={{ fontSize:11, fontWeight:600, color:'#555', textTransform:'uppercase', letterSpacing:1.3, marginBottom:20 }}>
            What's included
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              'Effortlessly spider and map targets to uncover hidden security flaws',
              'Deliver high-quality, validated findings in hours, not weeks.',
              'Generate professional, enterprise-grade security reports automatically.',
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <span style={{ color:'#0CC8A8', fontSize:14, marginTop:2, flexShrink:0 }}>✓</span>
                <span style={{ color:'#bbb', fontSize:14, lineHeight:1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trustpilot */}
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
            <span style={{ color:'#22c55e' }}>★</span>
            <span style={{ color:'#fff', fontSize:13, fontWeight:500 }}>Trustpilot</span>
          </div>
          <div style={{ fontSize:13, color:'#777' }}>
            <strong style={{ color:'#fff' }}>Rated 4.5/5.0</strong> (100k+ reviews)
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ width:488, display:'flex', alignItems:'center', justifyContent:'center', padding:40, position:'relative', zIndex:1 }}>
        <div style={{ background:'#fff', borderRadius:16, padding:'42px 38px', width:'100%', boxShadow:'0 28px 80px rgba(0,0,0,.58)' }}>
          <h2 style={{ fontSize:27, fontWeight:700, color:'#111', textAlign:'center', marginBottom:8 }}>Sign up</h2>
          <p style={{ fontSize:13, color:'#888', textAlign:'center', marginBottom:30 }}>
            Already have an account?{' '}
            <span style={{ color:'#0CC8A8', cursor:'pointer', fontWeight:500 }}>Log in</span>
          </p>

          {/* Name row */}
          <div style={{ display:'flex', gap:12, marginBottom:13 }}>
            <div style={{ flex:1 }}><Field ph="First name*" fk="first" f={f} setF={setF} errs={errs} /></div>
            <div style={{ flex:1 }}><Field ph="Last name*" fk="last" f={f} setF={setF} errs={errs} /></div>
          </div>

          {/* Email */}
          <div style={{ marginBottom:13 }}>
            <Field ph="Email address*" fk="email" type="email" f={f} setF={setF} errs={errs} />
          </div>

          {/* Password */}
          <div style={{ position:'relative', marginBottom:20 }}>
            <Field 
  ph="Password (8+ characters)*"
  fk="pw"
  type={showPw ? 'text' : 'password'}
  f={f}
  setF={setF}
  errs={errs}
/>
            <button
              onClick={() => setShowPw(p => !p)}
              style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#aaa', fontSize:16 }}
            >
              {showPw ? '🙈' : '👁'}
            </button>
          </div>

          {/* Terms */}
          <label style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:24, cursor:'pointer' }}>
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              style={{ marginTop:3, accentColor:'#0CC8A8', width:14, height:14, flexShrink:0 }} />
            <span style={{ fontSize:12, color: errs.agreed ? '#ef4444' : '#666', lineHeight:1.6 }}>
              I agree to Aps's{' '}
              <span style={{ color:'#0CC8A8', textDecoration:'underline', cursor:'pointer' }}>Terms &amp; Conditions</span>
              {' '}and acknowledge the{' '}
              <span style={{ color:'#0CC8A8', textDecoration:'underline', cursor:'pointer' }}>Privacy Policy</span>
            </span>
          </label>

          {/* CTA */}
          <button
            onClick={submit} disabled={loading}
            style={{ width:'100%', padding:'13px', background:'linear-gradient(135deg,#0CC8A8,#0aab8f)', color:'#fff', border:'none', borderRadius:8, fontSize:15, fontWeight:600, cursor: loading ? 'default' : 'pointer', marginBottom:16, fontFamily:'inherit', opacity: loading ? .82 : 1, transition:'opacity .15s' }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          {/* Social */}
          <div style={{ display:'flex', gap:10 }}>
            {[
              { l:'🍎', bg:'#000',    c:'#fff' },
              { l:'G',  bg:'#f5f5f5', c:'#333', b:'1px solid #ddd' },
              { l:'f',  bg:'#1877f2', c:'#fff' },
            ].map((s, i) => (
              <button key={i}
                onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                style={{ flex:1, padding:'11px', background:s.bg, color:s.c, border:s.b||'none', borderRadius:8, cursor:'pointer', fontSize:15, fontFamily:'inherit', transition:'opacity .15s' }}
              >
                {s.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{ position:'absolute', top:20, right:20, zIndex:10, background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', color:'#fff', padding:'6px 14px', borderRadius:20, cursor:'pointer', fontSize:12, fontWeight:500, fontFamily:'inherit' }}
      >
        {theme === 'dark' ? '☀ Light' : '☾ Dark'}
      </button>
    </div>
  );
}