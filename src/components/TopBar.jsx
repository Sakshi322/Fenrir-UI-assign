import { TH } from '../theme';
import Button from './atoms/Button';

export default function TopBar({ theme, showToast, onBack }) {
  const t = TH[theme];
  return (
    <div style={{
      height: 52, padding: '0 24px',
      background: t.sidebar, borderBottom:`1px solid ${t.border}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      flexShrink: 0,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13 }}>
        <span style={{ fontWeight:600, color:t.text }}>Scan</span>
        <span style={{ color:t.dim }}>›</span>
        <span
          onClick={onBack}
          onMouseEnter={e => { if (onBack) e.currentTarget.style.color = t.text; }}
          onMouseLeave={e => e.currentTarget.style.color = t.muted}
          style={{ color:t.muted, cursor: onBack ? 'pointer' : 'default' }}
        >
          Private Assets
        </span>
        <span style={{ color:t.dim }}>›</span>
        <span style={{ color:'#0CC8A8', fontWeight:500 }}>New Scan</span>
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <Button label="Export Report" variant="outline" theme={theme} onClick={() => showToast('Generating report...')} />
        <Button label="Stop Scan"     variant="danger"  theme={theme} onClick={() => showToast('Scan stopped')} />
      </div>
    </div>
  );
}