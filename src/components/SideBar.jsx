import { TH } from '../theme';

export default function Sidebar({ theme, active, onNav, toggleTheme, collapsed, setCollapsed }) {
  const t = TH[theme];

  const TOP = [
    { id:'dashboard',     label:'Dashboard',     ico:'⊟' },
    { id:'projects',      label:'Projects',      ico:'⊡' },
    { id:'scans',         label:'Scans',         ico:'◉' },
    { id:'schedule',      label:'Schedule',      ico:'▦' },
  ];
  const BOT = [
    { id:'notifications', label:'Notifications', ico:'🔔' },
    { id:'settings',      label:'Settings',      ico:'⚙'  },
    { id:'support',       label:'Support',       ico:'◎' },
  ];

  function NavItem({ item }) {
    const on = active === item.id;
    return (
      <button
        onClick={() => onNav(item.id)}
        onMouseEnter={e => { if (!on) e.currentTarget.style.color = t.text; }}
        onMouseLeave={e => { if (!on) e.currentTarget.style.color = t.muted; }}
        style={{
          width: '100%',
          padding: collapsed ? '10px 0' : '10px 16px',
          background: on ? (theme==='dark' ? 'rgba(12,200,168,.1)' : 'rgba(12,200,168,.08)') : 'none',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 11,
          color: on ? '#0CC8A8' : t.muted,
          fontSize: 13, fontWeight: on ? 600 : 400,
          borderLeft: on ? '3px solid #0CC8A8' : '3px solid transparent',
          fontFamily: 'inherit',
          justifyContent: collapsed ? 'center' : 'flex-start',
          transition: 'color .1s, background .1s',
        }}
      >
        <span style={{ fontSize:15, flexShrink:0 }}>{item.ico}</span>
        {!collapsed && <span>{item.label}</span>}
      </button>
    );
  }

  return (
    <div style={{
      width: collapsed ? 60 : 200,
      minWidth: collapsed ? 60 : 200,
      height: '100%',
      background: t.sidebar,
      borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width .22s, min-width .22s',
      overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 0' : '18px 16px', display:'flex', alignItems:'center', gap:10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#0CC8A8,#0a9b82)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <div style={{ width:10, height:10, background:'#fff', borderRadius:'50%' }} />
        </div>
        {!collapsed && <span style={{ fontWeight:700, fontSize:18, color:t.text }}>aps</span>}
      </div>

      {/* Top nav */}
      <nav style={{ flex:1, paddingTop:2 }}>
        {TOP.map(i => <NavItem key={i.id} item={i} />)}
      </nav>

      {/* Bottom nav */}
      <div style={{ borderTop:`1px solid ${t.border}`, paddingTop:4 }}>
        {BOT.map(i => <NavItem key={i.id} item={i} />)}
      </div>

      {/* Theme + User + Collapse */}
      <div style={{ borderTop:`1px solid ${t.border}`, padding:'10px 0' }}>
        <button
          onClick={toggleTheme}
          onMouseEnter={e => e.currentTarget.style.color = t.text}
          onMouseLeave={e => e.currentTarget.style.color = t.muted}
          style={{ width:'100%', padding: collapsed?'8px 0':'8px 16px', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:10, color:t.muted, fontSize:12, fontFamily:'inherit', justifyContent: collapsed?'center':'flex-start' }}
        >
          <span style={{ fontSize:14 }}>{theme==='dark' ? '☀' : '☾'}</span>
          {!collapsed && <span>{theme==='dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <div style={{ padding: collapsed?'10px 0':'10px 14px', display:'flex', alignItems:'center', gap:10, justifyContent: collapsed?'center':'flex-start' }}>
          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#ef4444)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#fff' }}>A</span>
          </div>
          {!collapsed && (
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12, fontWeight:600, color:t.text, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>admin@edu.com</div>
              <div style={{ fontSize:11, color:t.muted }}>Security Lead</div>
            </div>
          )}
          {!collapsed && <span style={{ color:t.muted, fontSize:14 }}>›</span>}
        </div>

        <button
          onClick={() => setCollapsed(p => !p)}
          style={{ width:'100%', padding:'4px 0', background:'none', border:'none', cursor:'pointer', color:t.muted, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'inherit' }}
        >
          <span style={{ fontSize:18, transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform .2s', display:'inline-block' }}>‹</span>
        </button>
      </div>
    </div>
  );
}