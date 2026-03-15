'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUserWithRole } from '../lib/auth'

export default function AdminPage() {
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

      if (profile.role !== 'superadmin') {
        router.push('/dashboard')
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
      <div style={styles.card}>
        <h1 style={styles.title}>JobFlow Superadmin</h1>
        <p style={styles.text}>Welcome, superadmin.</p>
        <p style={styles.text}>Here you manage companies, plans and trials.</p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '700px',
    background: '#fff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '16px',
  },
  text: {
    color: '#374151',
    marginBottom: '10px',
  },
}
