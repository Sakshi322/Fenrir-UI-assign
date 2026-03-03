import { useState } from 'react';
import { TH } from './theme';
import Sidebar from './components/SideBar';
import Toast from './components/atoms/Toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanDetail from './pages/ScanDetail';
import NewScanModal from './pages/NewScanModal';

export default function App() {
  const [screen,     setScreen]     = useState('login');
  const [theme,      setTheme]      = useState('dark');
  const [activeScan, setActiveScan] = useState({id: 1});
  const [activeNav,  setActiveNav]  = useState('dashboard');
  const [toast,      setToast]      = useState(null);
  const [modal,      setModal]      = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);

  const showToast   = msg => setToast(msg);
  const toggleTheme = ()  => setTheme(p => p === 'dark' ? 'light' : 'dark');

  const handleNav = id => {
    setActiveNav(id);
    if (id === 'dashboard' || id === 'scans') setActiveScan(null);
  };

  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', fontFamily:"'DM Sans',system-ui,sans-serif", background: TH[theme].bg }}>
      {screen === 'login' ? (
        <Login
          onLogin={() => setScreen('app')}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      ) : (
        <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
          <Sidebar
            theme={theme}
            active={activeNav}
            onNav={handleNav}
            toggleTheme={toggleTheme}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />

          {activeScan ? (
            <ScanDetail
              theme={theme}
              onBack={() => setActiveScan(null)}
              showToast={showToast}
            />
          ) : (
            <Dashboard
              theme={theme}
              onScanClick={s => { setActiveScan(s); setActiveNav('scans'); }}
              onNewScan={() => setModal(true)}
              showToast={showToast}
            />
          )}
        </div>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      {modal  && (
        <NewScanModal
          theme={theme}
          onClose={() => setModal(false)}
          onConfirm={(n, tp) => {
            setModal(false);
            showToast(`Scan "${n || 'New Scan'}" (${tp}) created!`);
          }}
        />
      )}
    </div>
  );
}