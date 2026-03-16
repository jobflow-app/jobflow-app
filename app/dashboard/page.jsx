'use client'

export default function SuperadminDashboardPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <p style={styles.kicker}>JOBFLOW SAAS</p>
        <h1 style={styles.title}>Superadmin Dashboard</h1>
        <p style={styles.text}>
          Dashboard radi. Sada možemo dalje dodati statistike, firme, radnike i MRR.
        </p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '720px',
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
  },
  kicker: {
    color: '#38bdf8',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.16em',
    marginBottom: '12px',
  },
  title: {
    color: '#fff',
    fontSize: '34px',
    fontWeight: '900',
    marginBottom: '12px',
  },
  text: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: '16px',
    lineHeight: 1.6,
  },
}
