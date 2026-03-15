'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '../../components/AppLayout'
import { getCurrentUserWithRole } from '../../lib/auth'

export default function WorkerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)

  const [job, setJob] = useState({
    client: 'Müller',
    address: 'Salzburg 12',
    description: 'Türöffnung / Schlüsselnotdienst',
    status: 'planned',
  })

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

  function updateStatus(newStatus) {
    setJob((prev) => ({
      ...prev,
      status: newStatus,
    }))
  }

  function handleNavigate() {
    const query = encodeURIComponent(job.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }

  function handlePhoto() {
    alert('Photo feature comes next.')
  }

  function handleSignature() {
    alert('Signature feature comes next.')
  }

  function handleInvoice() {
    alert('Invoice sending feature comes next.')
  }

  if (loading) {
    return <main style={loadingStyles.page}>Loading...</main>
  }

  if (!allowed) return null

  return (
    <AppLayout
      role="worker"
      title="Worker App"
      subtitle="Einfacher Einsatz-Workflow"
    >
      <div style={styles.wrapper}>
        <div style={styles.jobCard}>
          <h2 style={styles.client}>{job.client}</h2>
          <p style={styles.address}>{job.address}</p>
          <p style={styles.description}>{job.description}</p>

          <div style={styles.statusBox}>
            <span style={styles.statusLabel}>Status:</span>
            <span style={styles.statusValue}>{job.status}</span>
          </div>
        </div>

        <div style={styles.grid}>
          <button style={styles.primaryBtn} onClick={handleNavigate}>
            Navigieren
          </button>

          <button
            style={styles.actionBtn}
            onClick={() => updateStatus('on_the_way')}
          >
            Bin unterwegs
          </button>

          <button
            style={styles.actionBtn}
            onClick={() => updateStatus('arrived')}
          >
            Angekommen
          </button>

          <button
            style={styles.actionBtn}
            onClick={() => updateStatus('started')}
          >
            Arbeit gestartet
          </button>

          <button
            style={styles.actionBtn}
            onClick={() => updateStatus('completed')}
          >
            Arbeit beendet
          </button>

          <button style={styles.secondaryBtn} onClick={handlePhoto}>
            Foto
          </button>

          <button style={styles.secondaryBtn} onClick={handleSignature}>
            Unterschrift
          </button>

          <button style={styles.primaryWideBtn} onClick={handleInvoice}>
            Rechnung senden
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

const loadingStyles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eef2f7',
  },
}

const styles = {
  wrapper: {
    display: 'grid',
    gap: '18px',
    maxWidth: '720px',
  },
  jobCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '22px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
  client: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '800',
    color: '#163b7a',
  },
  address: {
    marginTop: '8px',
    marginBottom: '6px',
    color: '#374151',
    fontSize: '18px',
    fontWeight: '600',
  },
  description: {
    margin: 0,
    color: '#6b7280',
  },
  statusBox: {
    marginTop: '16px',
    padding: '14px',
    borderRadius: '14px',
    background: '#eef2f7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontWeight: '700',
    color: '#374151',
  },
  statusValue: {
    fontWeight: '800',
    color: '#163b7a',
    textTransform: 'capitalize',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '14px',
  },
  primaryBtn: {
    padding: '18px',
    border: 'none',
    borderRadius: '16px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '800',
    fontSize: '16px',
    cursor: 'pointer',
  },
  primaryWideBtn: {
    gridColumn: 'span 2',
    padding: '18px',
    border: 'none',
    borderRadius: '16px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '800',
    fontSize: '16px',
    cursor: 'pointer',
  },
  actionBtn: {
    padding: '18px',
    border: 'none',
    borderRadius: '16px',
    background: '#ffffff',
    color: '#163b7a',
    fontWeight: '800',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
  secondaryBtn: {
    padding: '18px',
    border: 'none',
    borderRadius: '16px',
    background: '#dbe7ff',
    color: '#163b7a',
    fontWeight: '800',
    fontSize: '16px',
    cursor: 'pointer',
  },
}
