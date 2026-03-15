'use client'

import WorkersMap from '@/components/WorkersMap'

export default function DashboardMapPage() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Company Map</h1>
          <p style={styles.subtitle}>Pregled radnika tvoje firme</p>
        </div>

        <WorkersMap title="Company Workers Map" />
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '30px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '16px',
  },
}
