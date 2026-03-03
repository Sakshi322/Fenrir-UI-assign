import { useState } from 'react';
import { TH } from '../theme';
import { LOGS, FINDINGS } from '../data/mockData';
import TopBar from '../components/TopBar';
import Badge from '../components/atoms/Badge';

export default function ScanDetail({ theme, onBack, showToast }) {
  const t = TH[theme];
  const [tab, setTab] = useState('activity');

  const renderSeg = (s, i) => {
    if (s.k === 'p')     return <span key={i} style={{ whiteSpace:'pre-wrap' }}>{s.v}</span>;
    if (s.k === 'link')  return <span key={i} style={{ color:'#0CC8A8' }}>{s.v}</span>;
    if (s.k === 'amber') return <span key={i} style={{ color:'#f59e0b' }}>{s.v}</span>;
    if (s.k === 'code')  return <span key={i} style={{ background: theme==='dark'?'#2a2a2a':'#e0e0e0', color:t.text, padding:'1px 6px', borderRadius:3, fontFamily:'monospace' }}>{s.v}</span>;
    if (s.k === 'hl')    return <span key={i} style={{ background: theme==='dark'?'rgba(12,200,168,.15)':'rgba(12,200,168,.12)', color:'#0CC8A8', padding:'1px 6px', borderRadius:3 }}>{s.v}</span>;
    if (s.k === 'bold')  return <strong key={i} style={{ color:t.text }}>{s.v}</strong>;
    return null;
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:t.bg }}>
      <TopBar theme={theme} showToast={showToast} onBack={onBack} />

      {/* Overview card */}
      <div style={{ background:t.sidebar, borderBottom:`1px solid ${t.border}`, padding:'24px 28px 0', flexShrink:0 }}>
        <div style={{ display:'flex', gap:40, alignItems:'flex-start' }}>

          {/* Circular progress */}
          <div style={{ flexShrink:0, paddingBottom:20 }}>
            <div style={{ position:'relative', width:112, height:112 }}>
              <svg width={112} height={112} style={{ transform:'rotate(-90deg)' }}>
                <circle cx={56} cy={56} r={44} fill={theme==='dark'?'#1c1c1c':'#efefef'} />
                <circle cx={56} cy={56} r={44} fill="none" stroke={t.border} strokeWidth={7} />
                <circle cx={56} cy={56} r={44} fill="none" stroke="#0CC8A8" strokeWidth={7}
                  strokeDasharray="276.46" strokeDashoffset="276.46" strokeLinecap="round" />
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:22, fontWeight:700, color:t.text }}>0%</span>
                <span style={{ fontSize:10, color:t.muted, marginTop:2 }}>In Progress</span>
              </div>
            </div>
          </div>

          <div style={{ flex:1, minWidth:0 }}>
            {/* Step tracker */}
            <div style={{ display:'flex', alignItems:'center', marginBottom:24 }}>
              {['Spidering','Mapping','Testing','Validating','Reporting'].map((step, i) => (
                <span key={step} style={{ display:'contents' }}>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background: i===0?'#0CC8A8':(theme==='dark'?'#222':'#e8e8e8'), display:'flex', alignItems:'center', justifyContent:'center', border: i===0?'none':`2px solid ${t.border}` }}>
                      <span style={{ fontSize:14, color: i===0?'#fff':t.muted }}>{['🔍','⊟','🧪','✓','📄'][i]}</span>
                    </div>
                    <span style={{ fontSize:11, color: i===0?'#0CC8A8':t.muted, whiteSpace:'nowrap', fontWeight: i===0?600:400 }}>{step}</span>
                  </div>
                  {i < 4 && <div style={{ flex:1, height:1, background:t.border, margin:'0 0 22px' }} />}
                </span>
              ))}
            </div>

            {/* Metadata row */}
            <div style={{ display:'flex', gap:40, paddingBottom:20, flexWrap:'wrap' }}>
              {[
                { l:'Scan Type',    v:'Grey Box'        },
                { l:'Targets',      v:'google.com'      },
                { l:'Started At',   v:'Nov 22, 09:00AM' },
                { l:'Credentials',  v:'2 Active'        },
                { l:'Files',        v:'Control.pdf'     },
                { l:'Checklists',   v:'40/350', teal:true },
              ].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize:11, color:t.muted, marginBottom:4 }}>{m.l}</div>
                  <div style={{ fontSize:13, fontWeight:600, color: m.teal ? '#0CC8A8' : t.text }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Console header */}
      <div style={{ background:t.card, borderBottom:`1px solid ${t.border}`, padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:46, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#0CC8A8', display:'inline-block' }} />
          <span style={{ fontSize:13, fontWeight:600, color:t.text }}>Live Scan Console</span>
          <span style={{ fontSize:11, color:t.muted, border:`1px solid ${t.border}`, padding:'2px 10px', borderRadius:20, display:'flex', alignItems:'center', gap:6 }}>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            <span style={{ display:'inline-block', animation:'spin 2s linear infinite', fontSize:12 }}>⟳</span>
            Running...
          </span>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ background:'none', border:'none', color:t.muted, cursor:'pointer', fontSize:20, lineHeight:1, padding:'0 4px' }}>⌄</button>
          <button style={{ background:'none', border:'none', color:t.muted, cursor:'pointer', fontSize:18, lineHeight:1, padding:'0 4px' }}>✕</button>
        </div>
      </div>

      {/* Console body */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* LEFT: Activity log */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', borderRight:`1px solid ${t.border}`, overflow:'hidden' }}>
          {/* Tabs */}
          <div style={{ display:'flex', background:t.card, borderBottom:`1px solid ${t.border}`, flexShrink:0 }}>
            {[{ id:'activity', label:'Activity Log' }, { id:'loops', label:'Verification Loops' }].map(tb => (
              <button key={tb.id} onClick={() => setTab(tb.id)}
                style={{ padding:'10px 20px', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight: tab===tb.id?600:400, color: tab===tb.id?'#0CC8A8':t.muted, borderBottom: tab===tb.id?'2px solid #0CC8A8':'2px solid transparent', fontFamily:'inherit', transition:'color .15s' }}>
                {tb.label}
              </button>
            ))}
          </div>

          {/* Log lines */}
          <div style={{ flex:1, overflow:'auto', padding:'16px 20px', background:t.console, fontFamily:'monospace', fontSize:12, lineHeight:1.9, color:t.text }}>
            {tab === 'activity'
              ? LOGS.map((line, i) => (
                  <div key={i} style={{ marginBottom:14 }}>
                    <span style={{ color:t.muted }}>[{line.t}]</span>{' '}
                    {line.parts.map((s, j) => renderSeg(s, j))}
                  </div>
                ))
              : <div style={{ color:t.muted, textAlign:'center', marginTop:32, fontSize:13 }}>No verification loops active</div>
            }
          </div>
        </div>

        {/* RIGHT: Finding log */}
        <div style={{ width:390, display:'flex', flexDirection:'column', overflow:'hidden', flexShrink:0 }}>
          <div style={{ padding:'11px 16px', borderBottom:`1px solid ${t.border}`, background:t.card, flexShrink:0 }}>
            <span style={{ fontSize:13, fontWeight:600, color:t.text }}>Finding Log</span>
          </div>
          <div style={{ flex:1, overflow:'auto', padding:12, background:t.console, display:'flex', flexDirection:'column', gap:12 }}>
            {FINDINGS.map((f, i) => (
              <div key={i} style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:8, padding:'14px 16px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:9 }}>
                  <Badge level={f.sev} />
                  <span style={{ fontSize:11, color:t.muted }}>{f.time}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:t.text, marginBottom:5 }}>{f.title}</div>
                <div style={{ fontSize:12, color:'#0CC8A8', marginBottom:8, fontFamily:'monospace' }}>{f.ep}</div>
                <div style={{ fontSize:11, color:t.muted, lineHeight:1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ height:36, background:t.statusBar, borderTop:`1px solid ${t.border}`, display:'flex', alignItems:'center', padding:'0 20px', gap:24, fontSize:11, color:t.muted, flexShrink:0, overflowX:'auto' }}>
        {[
          { l:'Sub-Agents:',         v:'0', c:null       },
          { l:'Parallel Executions:',v:'2', c:null       },
          { l:'Operations:',         v:'1', c:null       },
          { l:'Critical:',           v:'0', c:'#ef4444'  },
          { l:'High:',               v:'0', c:'#f97316'  },
          { l:'Medium:',             v:'0', c:'#f59e0b'  },
          { l:'Low:',                v:'0', c:'#22c55e'  },
        ].map((s, i) => (
          <span key={i} style={{ display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap' }}>
            {s.c && <span style={{ width:6, height:6, borderRadius:'50%', background:s.c, display:'inline-block' }} />}
            {s.l} <strong style={{ color: s.c || t.text }}>{s.v}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}