import { TH } from '../../theme';

export default function ProgressBar({ value, theme }) {
  const t = TH[theme];
  const fill = value === 0 ? 'transparent' : value < 50 ? '#ef4444' : '#0CC8A8';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:145 }}>
      <div style={{ flex:1, height:6, borderRadius:99, background:t.border, overflow:'hidden' }}>
        <div style={{ width:`${value}%`, height:'100%', background:fill, borderRadius:99 }} />
      </div>
      <span style={{ fontSize:12, color:t.muted, width:38, flexShrink:0 }}>{value}%</span>
    </div>
  );
}