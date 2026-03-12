export default function DashboardPage() {
  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Company Dashboard</h1>
        <p style={styles.subtitle}>Starter Plan • Trial 30 days</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>Jobs</div>
        <div style={styles.card}>Customers</div>
        <div style={styles.card}>Invoices</div>
        <div style={styles.card}>Workers</div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '32px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },
  card: {
    background: '#fff',
    padding: '28px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    fontWeight: '700',
    color: '#1f2937',
  },
}
