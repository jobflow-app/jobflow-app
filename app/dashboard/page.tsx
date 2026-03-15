'use client'

import WorkersMap from '@/components/WorkersMap'

export default function DashboardMapPage() {
  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Workers Map</h1>
        <p style={styles.subtitle}>Live GPS pregled radnika</p>
      </div>

      <WorkersMap title="Live Workers Map" />
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '30px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#163b7a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#6b7280',
  },
}
