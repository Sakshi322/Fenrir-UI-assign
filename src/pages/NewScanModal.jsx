import { useState } from 'react';
import { TH } from '../theme';
import Button from '../components/atoms/Button';

export default function NewScanModal({ theme, onClose, onConfirm }) {
  const t = TH[theme];
  const [name,   setName]   = useState('');
  const [type,   setType]   = useState('Greybox');
  const [target, setTarget] = useState('');

  const IS = {
    width:'100%', padding:'10px 13px',
    background:t.input, border:`1px solid ${t.border}`,
    borderRadius:8, color:t.text,
    fontSize:13, fontFamily:'inherit', outline:'none',
  };

  return (
    <>
      <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}`}</style>
      <div
        onClick={e => e.target === e.currentTarget && onClose()}
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.65)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, animation:'modalIn .22s ease' }}
      >
        <div style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:12, padding:32, width:440, boxShadow:'0 24px 70px rgba(0,0,0,.55)' }}>
          <h3 style={{ fontSize:18, fontWeight:700, color:t.text, marginBottom:6 }}>Create New Scan</h3>
          <p style={{ fontSize:13, color:t.muted, marginBottom:24 }}>Configure your scan parameters below.</p>

          <label style={{ fontSize:12, color:t.muted, display:'block', marginBottom:6 }}>Scan Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Web App Servers"
            style={{ ...IS, marginBottom:16 }}
            onFocus={e => e.target.style.borderColor = '#0CC8A8'}
            onBlur={e  => e.target.style.borderColor = t.border}
          />

          <label style={{ fontSize:12, color:t.muted, display:'block', marginBottom:6 }}>Target URL</label>
          <input value={target} onChange={e => setTarget(e.target.value)} placeholder="e.g. https://example.com"
            style={{ ...IS, marginBottom:16 }}
            onFocus={e => e.target.style.borderColor = '#0CC8A8'}
            onBlur={e  => e.target.style.borderColor = t.border}
          />

          <label style={{ fontSize:12, color:t.muted, display:'block', marginBottom:6 }}>Scan Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ ...IS, marginBottom:28 }}>
            <option>Greybox</option>
            <option>Blackbox</option>
            <option>Whitebox</option>
          </select>

          <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
            <Button label="Cancel"      variant="outline"  theme={theme} onClick={onClose} />
            <Button label="Create Scan" variant="primary"  theme={theme} onClick={() => onConfirm(name, type)} />
          </div>
        </div>
      </div>
    </>
  );
}