'use client'

export default function DashboardPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.text}>JobFlow radi.</p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '24px',
  },
  card: {
    background: '#fff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '12px',
  },
  text: {
    color: '#374151',
  },
}
