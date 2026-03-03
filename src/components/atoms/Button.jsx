import { TH } from '../../theme';

export default function Button({ label, variant, theme, onClick, disabled }) {
  const t = TH[theme];
  const styles = {
    primary: { background:'#0CC8A8', color:'#fff', border:'none' },
    outline: { background:'none', color:t.text, border:`1px solid ${t.border}` },
    danger:  { background:'none', color:'#ef4444', border:'1px solid rgba(239,68,68,.4)' },
  };
  const s = styles[variant] || styles.outline;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = '.78'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      style={{
        padding: '8px 16px', borderRadius: 7,
        cursor: disabled ? 'default' : 'pointer',
        fontSize: 13, fontWeight: 500,
        whiteSpace: 'nowrap', fontFamily: 'inherit',
        transition: 'opacity .15s',
        opacity: disabled ? .6 : 1,
        ...s,
      }}
    >
      {label}
    </button>
  );
}