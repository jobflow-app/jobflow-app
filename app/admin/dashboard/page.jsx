'use client'

export default function DashboardPage() {
  return (
    <main style={styles.page}>
      
      <h1 style={styles.title}>Dashboard</h1>

      {/* STATS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Active Jobs</h3>
          <p style={styles.number}>24</p>
        </div>

        <div style={styles.card}>
          <h3>Completed</h3>
          <p style={styles.number}>56</p>
        </div>

        <div style={styles.card}>
          <h3>Pending</h3>
          <p style={styles.number}>12</p>
        </div>

        <div style={styles.card}>
          <h3>Revenue</h3>
          <p style={styles.number}>€18,750</p>
        </div>
      </div>

      {/* SECOND ROW */}
      <div style={styles.grid2}>
        <div style={styles.bigCard}>
          <h3>Job Overview</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Grafik dolazi kasnije
          </p>
        </div>

        <div style={styles.bigCard}>
          <h3>Recent Activity</h3>
          <ul>
            <li>✔ Job Completed</li>
            <li>➕ New Job Created</li>
            <li>📄 Invoice Sent</li>
          </ul>
        </div>
      </div>

    </main>
  )
}

const styles = {
  page: {
    padding: '20px',
  },

  title: {
    fontSize: '32px',
    fontWeight: '900',
    marginBottom: '20px',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },

  card: {
    background: 'var(--card)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow)',
  },

  number: {
    fontSize: '28px',
    fontWeight: '900',
  },

  grid2: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginTop: '20px',
  },

  bigCard: {
    background: 'var(--card)',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: 'var(--shadow)',
  },
}
