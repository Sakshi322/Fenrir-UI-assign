export default function Badge({ level }) {
  const colors = {
    Critical: '#ef4444',
    High:     '#f97316',
    Medium:   '#f59e0b',
    Low:      '#22c55e',
  };
  return (
    <span style={{
      background: colors[level] || '#22c55e',
      color: '#fff', fontSize: 11, fontWeight: 600,
      padding: '3px 9px', borderRadius: 4,
      display: 'inline-block', lineHeight: 1.5,
    }}>
      {level}
    </span>
  );
}