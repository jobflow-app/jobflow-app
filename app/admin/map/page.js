'use client'

import WorkersMap from '@/components/WorkersMap'

export default function MapPage() {
  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Map</h1>
        <p style={styles.subtitle}>Live Workers Map</p>
      </div>

      <WorkersMap title="Workers Location" />
    </main>
  )
}

const styles = {
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
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#6b7280',
  },
}
