'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type WorkerRow = {
  id: string
  full_name: string | null
  company_id: string
}

type JobRow = {
  id: string
  title: string | null
  address: string | null
  status: string | null
  priority: string | null
  worker_name: string | null
  worker_id?: string | null
  notes?: string | null
}

type Props = {
  open: boolean
  onClose: () => void
  onSaved: () => void
  companyId: string | null
  job: JobRow | null
}

const statusOptions = ['pending', 'assigned', 'in_progress', 'done', 'cancelled']
const priorityOptions = ['low', 'medium', 'high', 'urgent']

export default function JobDetailsModal({
  open,
  onClose,
  onSaved,
  companyId,
  job,
}: Props) {
  const [workers, setWorkers] = useState<WorkerRow[]>([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState('pending')
  const [priority, setPriority] = useState('medium')
  const [workerId, setWorkerId] = useState('')
  const [workerName, setWorkerName] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!open || !job) return

    setTitle(job.title || '')
    setAddress(job.address || '')
    setStatus(job.status || 'pending')
    setPriority(job.priority || 'medium')
    setWorkerId(job.worker_id || '')
    setWorkerName(job.worker_name || '')
    setNotes(job.notes || '')
    setErrorMessage('')
  }, [open, job])

  useEffect(() => {
    if (!open || !companyId) return

    const loadWorkers = async () => {
      setLoadingWorkers(true)

      const { data, error } = await supabase
        .from('workers')
        .select('id, full_name, company_id')
        .eq('company_id', companyId)
        .order('full_name', { ascending: true })

      if (error) {
        setErrorMessage(error.message)
        setLoadingWorkers(false)
        return
      }

      setWorkers((data as WorkerRow[]) || [])
      setLoadingWorkers(false)
    }

    loadWorkers()
  }, [open, companyId])

  if (!open || !job) return null

  const handleSave = async () => {
    if (!job?.id) return

    setSaving(true)
    setErrorMessage('')

    const selectedWorker =
      workers.find((worker) => worker.id === workerId) || null

    const finalWorkerName =
      selectedWorker?.full_name ||
      workerName ||
      null

    const finalStatus =
      workerId && status === 'pending' ? 'assigned' : status

    const { error } = await supabase
      .from('jobs')
      .update({
        title: title || null,
        address: address || null,
        status: finalStatus,
        priority: priority || null,
        worker_id: workerId || null,
        worker_name: finalWorkerName,
        notes: notes || null,
      })
      .eq('id', job.id)

    if (error) {
      setErrorMessage(error.message)
      setSaving(false)
      return
    }

    setSaving(false)
    onSaved()
    onClose()
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Job Details</h2>
            <p style={styles.subtitle}>Edit job, assign worker and update status.</p>
          </div>

          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.body}>
          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Job Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                placeholder="Job title"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.input}
                placeholder="Address"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={styles.select}
              >
                {statusOptions.map((item) => (
                  <option key={item} value={item}>
                    {formatLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={styles.select}
              >
                {priorityOptions.map((item) => (
                  <option key={item} value={item}>
                    {formatLabel(item)}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Assigned Worker</label>
              <select
                value={workerId}
                onChange={(e) => {
                  const newWorkerId = e.target.value
                  setWorkerId(newWorkerId)

                  const selected = workers.find((w) => w.id === newWorkerId)
                  setWorkerName(selected?.full_name || '')
                }}
                style={styles.select}
              >
                <option value="">Unassigned</option>
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.full_name || 'Unnamed worker'}
                  </option>
                ))}
              </select>

              {loadingWorkers && (
                <span style={styles.helperText}>Loading workers...</span>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Worker Name (fallback)</label>
              <input
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                style={styles.input}
                placeholder="Worker name"
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={styles.textarea}
              placeholder="Notes, details, instructions..."
            />
          </div>

          {errorMessage ? (
            <div style={styles.errorBox}>{errorMessage}</div>
          ) : null}
        </div>

        <div style={styles.footer}>
          <button style={styles.secondaryBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            style={styles.primaryBtn}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function formatLabel(value: string) {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 9999,
  },
  modal: {
    width: '100%',
    maxWidth: '820px',
    background: '#ffffff',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
  },
  header: {
    padding: '22px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
  },
  title: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 800,
    color: '#163b7a',
  },
  subtitle: {
    margin: '6px 0 0 0',
    color: '#6b7280',
    fontSize: '14px',
  },
  closeBtn: {
    border: 'none',
    background: '#f1f5f9',
    borderRadius: '12px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 700,
  },
  body: {
    padding: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 700,
    color: '#334155',
  },
  input: {
    height: '46px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    padding: '0 14px',
    outline: 'none',
    fontSize: '14px',
  },
  select: {
    height: '46px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    padding: '0 14px',
    outline: 'none',
    fontSize: '14px',
    background: '#fff',
  },
  textarea: {
    minHeight: '130px',
    borderRadius: '14px',
    border: '1px solid #d1d5db',
    padding: '14px',
    outline: 'none',
    fontSize: '14px',
    resize: 'vertical',
  },
  helperText: {
    fontSize: '12px',
    color: '#64748b',
  },
  errorBox: {
    marginTop: '12px',
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    padding: '12px 14px',
    borderRadius: '12px',
    fontSize: '14px',
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  secondaryBtn: {
    border: 'none',
    background: '#e5e7eb',
    color: '#111827',
    padding: '12px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
  },
  primaryBtn: {
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    padding: '12px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
  },
}
