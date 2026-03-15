'use client'

import WorkersMap from '@/components/WorkersMap'

export default function MapPage() {
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Map</h1>

      <WorkersMap />
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '30px',
    background: '#eef2f7',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '20px',
  },
}
