import { useEffect } from 'react';

export default function Toast({ msg, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 3000);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <style>{`@keyframes toastIn{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div style={{
        position: 'fixed', bottom: 24, right: 24,
        background: '#0CC8A8', color: '#fff',
        padding: '12px 20px', borderRadius: 8,
        fontSize: 14, fontWeight: 500,
        zIndex: 9999, fontFamily: 'inherit',
        boxShadow: '0 4px 20px rgba(12,200,168,.4)',
        animation: 'toastIn .3s ease',
      }}>
        {msg}
      </div>
    </>
  );
}