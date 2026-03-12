export default function AdminPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>JobFlow Superadmin</h1>
        <p style={styles.text}>Manage companies, plans and 30-day trials.</p>

        <div style={styles.grid}>
          <div style={styles.box}>Companies</div>
          <div style={styles.box}>Active Trials</div>
          <div style={styles.box}>Plans</div>
          <div style={styles.box}>Revenue</div>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '32px',
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
    marginBottom: '10px',
  },
  text: {
    color: '#4b5563',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  box: {
    background: '#eef2f7',
    padding: '24px',
    borderRadius: '16px',
    fontWeight: '700',
    color: '#1f2937',
  },
}
