export default function VulnBadges({ counts }) {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#22c55e'];
  if (!counts?.length) return <span style={{ color:'#555', fontSize:12 }}>—</span>;
  return (
    <div style={{ display:'flex', gap:4 }}>
      {counts.map((n, i) => (
        <span key={i} style={{
          background: colors[i], color: '#fff',
          fontSize: 11, fontWeight: 700,
          width: 24, height: 24, borderRadius: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {n}
        </span>
      ))}
    </div>
  );
}