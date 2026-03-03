import { useState } from 'react';
import { TH } from '../theme';
import { SCANS } from '../data/mockData';
import TopBar from '../components/TopBar';
import Chip from '../components/atoms/Chip';
import VulnBadges from '../components/atoms/VulnBadges';
import ProgressBar from '../components/atoms/ProgressBar';
import Button from '../components/atoms/Button';

export default function Dashboard({ theme, onScanClick, onNewScan, showToast }) {
  const t = TH[theme];
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER = 15;

  const filtered = SCANS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );
  const paged = filtered.slice((page - 1) * PER, page * PER);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', background:t.bg }}>
      <TopBar theme={theme} showToast={showToast} />

      {/* Org bar */}
      <div style={{ padding:'0 24px', background:t.sidebar, borderBottom:`1px solid ${t.border}`, display:'flex', alignItems:'center', height:42, overflowX:'auto', flexShrink:0 }}>
        {[
          { l:'Org:',          v:'Project X'  },
          { l:'Owner:',        v:'Nammagiri'  },
          { l:'Total Scans:',  v:'100'        },
          { l:'Scheduled:',    v:'1000'       },
          { l:'Rescans:',      v:'100'        },
          { l:'Failed Scans:', v:'100'        },
        ].map((item, i, arr) => (
          <span key={i} style={{ display:'contents' }}>
            <span style={{ fontSize:12, color:t.muted, whiteSpace:'nowrap', padding:'0 16px' }}>
              {item.l} <strong style={{ color:t.text, fontWeight:600 }}>{item.v}</strong>
            </span>
            {i < arr.length - 1 && <span style={{ color:t.border }}>|</span>}
          </span>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:t.muted, whiteSpace:'nowrap', paddingLeft:16, display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ color:'#0CC8A8', fontSize:13 }}>↻</span> 10 mins ago
        </span>
      </div>

      {/* Severity counters */}
      <div style={{ background:t.sidebar, borderBottom:`1px solid ${t.border}`, display:'grid', gridTemplateColumns:'repeat(4,1fr)', flexShrink:0 }}>
        {[
          { label:'Critical Severity', count:86, up:true,  change:'+2% increase than yesterday',   icon:'🚫' },
          { label:'High Severity',     count:16, up:true,  change:'+0.9% increase than yesterday', icon:'⚠️' },
          { label:'Medium Severity',   count:26, up:false, change:'+0.9% decrease than yesterday', icon:'⚠️' },
          { label:'Low Severity',      count:16, up:true,  change:'+0.9% increase than yesterday', icon:'🔍' },
        ].map((s, i) => (
          <div key={i} style={{ padding:'18px 24px', borderRight: i < 3 ? `1px solid ${t.border}` : 'none' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
              <span style={{ fontSize:12, color:t.muted, fontWeight:500 }}>{s.label}</span>
              <span style={{ fontSize:22 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize:36, fontWeight:700, color:t.text, lineHeight:1, marginBottom:6 }}>{s.count}</div>
            <div style={{ fontSize:11, color: s.up ? '#ef4444' : '#22c55e', display:'flex', alignItems:'center', gap:3 }}>
              <span>{s.up ? '↑' : '↓'}</span><span>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Table area */}
      <div style={{ flex:1, padding:'20px 24px', overflow:'auto' }}>
        {/* Toolbar */}
        <div style={{ display:'flex', gap:10, marginBottom:16, alignItems:'center' }}>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:10, background:t.input, border:`1px solid ${t.border}`, borderRadius:8, padding:'8px 14px' }}>
            <span style={{ color:t.muted, fontSize:14 }}>🔍</span>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search scans by name or type..."
              style={{ flex:1, background:'none', border:'none', outline:'none', color:t.text, fontSize:13, fontFamily:'inherit' }}
            />
          </div>
          <Button label="⚡ Filter" variant="outline" theme={theme} onClick={() => showToast('Filter options')} />
          <Button label="⊞ Column" variant="outline" theme={theme} onClick={() => showToast('Column picker')} />
          <Button label="+ New scan" variant="primary" theme={theme} onClick={onNewScan} />
        </div>

        {/* Table */}
        <div style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:10, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${t.border}` }}>
                {['Scan Name','Type','Status','Progress','Vulnerability','Last Scan'].map(h => (
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:12, color:t.muted, fontWeight:500, whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((scan, i) => (
                <tr
                  key={scan.id}
                  onClick={() => onScanClick(scan)}
                  onMouseEnter={e => e.currentTarget.style.background = t.hover}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  style={{ borderBottom: i < paged.length - 1 ? `1px solid ${t.border}` : 'none', cursor:'pointer', transition:'background .1s' }}
                >
                  <td style={{ padding:'13px 16px', fontSize:13, fontWeight:600, color:t.text }}>{scan.name}</td>
                  <td style={{ padding:'13px 16px', fontSize:13, color:t.muted }}>{scan.type}</td>
                  <td style={{ padding:'13px 16px' }}><Chip status={scan.status} /></td>
                  <td style={{ padding:'13px 16px', minWidth:160 }}><ProgressBar value={scan.progress} theme={theme} /></td>
                  <td style={{ padding:'13px 16px' }}><VulnBadges counts={scan.vuln} /></td>
                  <td style={{ padding:'13px 16px', fontSize:12, color:t.muted, whiteSpace:'nowrap' }}>{scan.last}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{ padding:'12px 16px', borderTop:`1px solid ${t.border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:12, color:t.muted }}>Showing {paged.length} of {filtered.length} Scans</span>
            <div style={{ display:'flex', gap:6 }}>
              {[
                { l:'‹', d: page === 1,                   fn: () => setPage(p => p - 1) },
                { l:'›', d: page * PER >= filtered.length, fn: () => setPage(p => p + 1) },
              ].map((b, i) => (
                <button key={i} onClick={b.fn} disabled={b.d}
                  style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${t.border}`, borderRadius:6, background:'none', color: b.d ? t.dim : t.text, cursor: b.d ? 'default' : 'pointer', fontSize:16, fontFamily:'inherit' }}>
                  {b.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}