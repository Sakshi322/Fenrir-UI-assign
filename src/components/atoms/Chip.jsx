export default function Chip({ status }) {
  const map = {
    Completed: { bg:'rgba(34,197,94,.1)',   c:'#22c55e', b:'rgba(34,197,94,.3)'   },
    Scheduled: { bg:'rgba(156,163,175,.1)', c:'#9ca3af', b:'rgba(156,163,175,.3)' },
    Failed:    { bg:'rgba(239,68,68,.1)',   c:'#ef4444', b:'rgba(239,68,68,.3)'   },
  };
  const s = map[status] || map.Scheduled;
  return (
    <span style={{
      background: s.bg, color: s.c,
      border: `1px solid ${s.b}`,
      fontSize: 12, fontWeight: 500,
      padding: '3px 12px', borderRadius: 20,
      whiteSpace: 'nowrap', display: 'inline-block',
    }}>
      {status}
    </span>
  );
}