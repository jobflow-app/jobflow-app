'use client'

import AppLayout from '../../../components/AppLayout'
import WorkersMap from '../../../components/WorkersMap'

export default function AdminMapPage() {
  return (
    <AppLayout>
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '16px' }}>Workers Map</h1>
        <WorkersMap />
      </div>
    </AppLayout>
  )
}
