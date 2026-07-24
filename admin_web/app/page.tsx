export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#020617', color: 'white', padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gap: 16 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>cocok.in Admin Web</h1>
        <p style={{ color: '#cbd5e1' }}>Admin web siap dideploy ke Vercel dengan panel sederhana untuk memantau marketplace.</p>
        <div style={{ border: '1px solid #1e293b', borderRadius: 16, padding: 20, background: '#0f172a' }}>
          <p style={{ margin: 0 }}>Status: Live</p>
          <p style={{ margin: '8px 0 0', color: '#38bdf8' }}>Backend data nyata berjalan dari server lokal di port 3000.</p>
        </div>
      </div>
    </main>
  );
}
