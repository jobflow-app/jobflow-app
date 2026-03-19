'use client'

import WorkersMap from '@/components/WorkersMap'

export default function AdminMapPage() {
  return (
    <main style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>
        Live Workers Map
      </h1>

      <p style={{ marginBottom: '20px', color: '#64748b' }}>
        Übersicht der Mitarbeiterstandorte.
      </p>

      <WorkersMap />
    </main>
  )
}
