'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '../../components/AppLayout'
import { getCurrentUserWithRole } from '../../lib/auth'
import { supabase } from '../../lib/supabase'

export default function WorkerPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [workerProfile, setWorkerProfile] = useState(null)
  const [workerRow, setWorkerRow] = useState(null)
  const [job, setJob] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadWorkerJob() {
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

      if (!supabase) {
        setMessage('Supabase is not connected.')
        setLoading(false)
        return
      }

      setWorkerProfile(profile)

      const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .select('*')
        .eq('email', user.email)
        .maybeSingle()

      if (workerError) {
        setMessage(workerError.message)
        setLoading(false)
        return
      }

      if (!workerData) {
        setMessage('Worker record not found.')
        setLoading(false)
        return
      }

      setWorkerRow(workerData)

      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('worker_id', workerData.id)
        .in('status', ['planned', 'on_the_way', 'arrived', 'started'])
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle()

      if (jobError) {
        setMessage(jobError.message)
        setLoading(false)
        return
      }

      setJob(jobData || null)
      setAllowed(true)
      setLoading(false)
    }

    loadWorkerJob()
  }, [router])

  async function updateStatus(newStatus) {
    if (!supabase || !job) return

    setMessage('Saving...')

    const { error } = await supabase
      .from('jobs')
      .update({ status: newStatus })
      .eq('id', job.id)

    if (error) {
      setMessage(error.message)
      return
    }

    const { error: historyError } = await supabase
      .from('job_history')
      .insert({
        job_id: job.id,
        company_id: job.company_id,
        status: newStatus,
        note: `Status changed to ${newStatus}`,
      })

    if (historyError) {
      setMessage(historyError.message)
      return
    }

    setJob((prev) => ({
      ...prev,
      status: newStatus,
    }))

    setMessage('Status updated successfully.')
  }

  function handleNavigate() {
    if (!job?.address) return

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
        {!job ? (
          <div style={styles.jobCard}>
            <h2 style={styles.client}>No active job</h2>
            <p style={styles.description}>
              There is currently no assigned active job for this worker.
            </p>
            {message ? <p style={styles.message}>{message}</p> : null}
          </div>
        ) : (
          <>
            <div style={styles.jobCard}>
              <h2 style={styles.client}>{job.client_name || 'Client'}</h2>
              <p style={styles.address}>{job.address || '-'}</p>
              <p style={styles.description}>{job.description || '-'}</p>

              <div style={styles.statusBox}>
                <span style={styles.statusLabel}>Status:</span>
                <span style={styles.statusValue}>{job.status}</span>
              </div>

              <div style={styles.metaBox}>
                <p><strong>Worker:</strong> {workerRow?.name || workerRow?.email || '-'}</p>
                <p><strong>Company ID:</strong> {workerProfile?.company_id || '-'}</p>
                <p><strong>Job ID:</strong> {job.id}</p>
              </div>

              {message ? <p style={styles.message}>{message}</p> : null}
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
          </>
        )}
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
  metaBox: {
    marginTop: '16px',
    padding: '14px',
    borderRadius: '14px',
    background: '#f8fafc',
    lineHeight: '1.8',
    color: '#374151',
  },
  message: {
    marginTop: '14px',
    color: '#163b7a',
    fontWeight: '600',
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
