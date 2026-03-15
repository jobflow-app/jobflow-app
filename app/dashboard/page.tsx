'use client'

import DashboardJobsList from '@/components/DashboardJobsList'

export default function DashboardPage() {
  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>
          Live pregled poslova i statusa u realnom vremenu.
        </p>
      </div>

      <DashboardJobsList />
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
    fontSize: '34px',
    fontWeight: 800,
    color: '#163b7a',
    margin: 0,
  },
  subtitle: {
    marginTop: '8px',
    color: '#6b7280',
    fontSize: '15px',
  },
}
