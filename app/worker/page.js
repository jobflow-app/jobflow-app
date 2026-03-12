export default function WorkerPage() {
  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Worker App</h1>
        <p style={styles.subtitle}>Today’s jobs</p>
      </div>

      <div style={styles.list}>
        <div style={styles.jobCard}>
          <h3>Müller</h3>
          <p>Salzburg 12</p>
          <div style={styles.actions}>
            <button style={styles.btn}>Navigate</button>
            <button style={styles.btn}>Start Job</button>
          </div>
        </div>

        <div style={styles.jobCard}>
          <h3>Schmidt</h3>
          <p>Bad Reichenhall</p>
          <div style={styles.actions}>
            <button style={styles.btn}>Navigate</button>
            <button style={styles.btn}>Start Job</button>
          </div>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#163b7a',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  jobCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
  btn: {
    padding: '12px 14px',
    borderRadius: '12px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
  },
}
