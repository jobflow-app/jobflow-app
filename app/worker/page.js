'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserWithRole } from '../../lib/auth'

export default function WorkerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      const { user, profile } = await getCurrentUserWithRole()

      if (!user || !profile) {
        router.push('/')
        return
      }

      if (profile.role === 'superadmin') {
        router.push('/admin')
        return
      }

      if (profile.role === 'admin') {
        router.push('/dashboard')
        return
      }

      if (profile.role !== 'worker') {
        router.push('/')
        return
      }

      setAllowed(true)
      setLoading(false)
    }

    checkAccess()
  }, [router])

  if (loading) {
    return (
      <main style={styles.page}>
        <p>Loading...</p>
      </main>
    )
  }

  if (!allowed) return null

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
    background: '#eef2f7',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#163b7a',
  },
  subtitle: {
    color: '#6b7280',
  },
  list: {
    display: 'grid',
    gap: '16px',
  },
  jobCard: {
    background: '#fff',
    borderRadius: '18px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '12px',
  },
  btn: {
    padding: '10px 14px',
    border: 'none',
    borderRadius: '10px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },
}
