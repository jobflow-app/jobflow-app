'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'

type JobRow = {
  id: string
  title: string | null
  address: string | null
  status: string | null
  priority: string | null
  worker_name: string | null
  company_id: string
  updated_at: string | null
}

type ProfileRow = {
  company_id: string | null
}

const statusStyles: Record<string, React.CSSProperties> = {
  pending: {
    background: '#fff7ed',
    color: '#c2410c',
  },
  assigned: {
    background: '#eff6ff',
    color: '#1d4ed8',
  },
  'in progress': {
    background: '#ecfeff',
    color: '#0f766e',
  },
  done: {
    background: '#ecfdf5',
    color: '#15803d',
  },
  cancelled: {
    background: '#fef2f2',
    color: '#b91c1c',
  },
}

const priorityStyles: Record<string, React.CSSProperties> = {
  low: {
    background: '#f3f4f6',
    color: '#374151',
  },
  medium: {
    background: '#fef3c7',
    color: '#92400e',
  },
  high: {
    background: '#fee2e2',
    color: '#b91c1c',
  },
  urgent: {
    background: '#dc2626',
    color: '#ffffff',
  },
}

function formatStatus(status: string | null) {
  if (!status) return 'Unknown'

  const normalized = status.replace(/_/g, ' ').trim().toLowerCase()

  if (normalized === 'in progress') return 'In Progress'
  if (normalized === 'pending') return 'Pending'
  if (normalized === 'assigned') return 'Assigned'
  if (normalized === 'done') return 'Done'
  if (normalized === 'cancelled') return 'Cancelled'

  return status
}

function formatPriority(priority: string | null) {
  if (!priority) return 'Normal'

  const normalized = priority.trim().toLowerCase()

  if (normalized === 'low') return 'Low'
  if (normalized === 'medium') return 'Medium'
  if (normalized === 'high') return 'High'
  if (normalized === 'urgent') return 'Urgent'

  return priority
}

function formatDate(dateString: string | null) {
  if (!dateString) return '-'

  const date = new Date(dateString)

  return new Intl.DateTimeFormat('de-DE', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

export default function DashboardJobsList() {
  const [jobs, setJobs] = useState<JobRow[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [companyId, setCompanyId] = useState<string | null>(null)

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const aTime = a.updated_at ? new Date(a.updated_at).getTime() : 0
      const bTime = b.updated_at ? new Date(b.updated_at).getTime() : 0
      return bTime - aTime
    })
  }, [jobs])

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null

    const loadJobs = async () => {
      setLoading(true)
      setErrorMessage('')

      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          setErrorMessage(authError.message)
          setLoading(false)
          return
        }

        if (!user) {
          setErrorMessage('User not found.')
          setLoading(false)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('email', user.email)
          .single<ProfileRow>()

        if (profileError) {
          setErrorMessage(profileError.message)
          setLoading(false)
          return
        }

        if (!profile?.company_id) {
          setErrorMessage('Company ID not found for this admin.')
          setLoading(false)
          return
        }

        setCompanyId(profile.company_id)

        const { data: jobsData, error: jobsError } = await supabase
          .from('jobs')
          .select(
            'id, title, address, status, priority, worker_name, company_id, updated_at'
          )
          .eq('company_id', profile.company_id)
          .order('updated_at', { ascending: false })

        if (jobsError) {
          setErrorMessage(jobsError.message)
          setLoading(false)
          return
        }

        setJobs((jobsData as JobRow[]) || [])

        channel = supabase
          .channel(`dashboard-jobs-${profile.company_id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'jobs',
              filter: `company_id=eq.${profile.company_id}`,
            },
            async () => {
              const { data: refreshedJobs, error: refreshError } = await supabase
                .from('jobs')
                .select(
                  'id, title, address, status, priority, worker_name, company_id, updated_at'
                )
                .eq('company_id', profile.company_id)
                .order('updated_at', { ascending: false })

              if (!refreshError) {
                setJobs((refreshedJobs as JobRow[]) || [])
              }
            }
          )
          .subscribe()

        setLoading(false)
      } catch (error) {
        setErrorMessage('Unexpected error while loading jobs.')
        setLoading(false)
      }
    }

    loadJobs()

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  if (loading) {
    return (
      <div style={styles.card}>
        <div style={styles.topRow}>
          <h2 style={styles.cardTitle}>Live Jobs</h2>
          <span style={styles.liveDot}>Loading...</span>
        </div>
        <p style={styles.subtext}>Loading jobs...</p>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div style={styles.card}>
        <div style={styles.topRow}>
          <h2 style={styles.cardTitle}>Live Jobs</h2>
        </div>
        <p style={{ ...styles.subtext, color: '#b91c1c' }}>{errorMessage}</p>
      </div>
    )
  }

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div>
          <h2 style={styles.cardTitle}>Live Jobs</h2>
          <p style={styles.subtext}>
            Company jobs update automatically without refresh.
          </p>
        </div>

        <div style={styles.liveWrap}>
          <span style={styles.livePulse} />
          <span style={styles.liveText}>LIVE</span>
        </div>
      </div>

      {sortedJobs.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={styles.emptyTitle}>No jobs yet</p>
          <p style={styles.emptyText}>
            When a new job is created, it will appear here instantly.
          </p>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Job</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Worker</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Updated</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedJobs.map((job) => {
                const normalizedStatus = (job.status || '').replace(/_/g, ' ').toLowerCase()
                const normalizedPriority = (job.priority || '').toLowerCase()

                return (
                  <tr key={job.id} style={styles.tr}>
                    <td style={styles.tdStrong}>{job.title || 'Untitled job'}</td>
                    <td style={styles.td}>{job.address || '-'}</td>
                    <td style={styles.td}>{job.worker_name || 'Unassigned'}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          ...(statusStyles[normalizedStatus] || styles.defaultBadge),
                        }}
                      >
                        {formatStatus(job.status)}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          ...(priorityStyles[normalizedPriority] || styles.defaultBadge),
                        }}
                      >
                        {formatPriority(job.priority)}
                      </span>
                    </td>
                    <td style={styles.td}>{formatDate(job.updated_at)}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn}>Open</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div style={styles.footerInfo}>
        <span>Company ID: {companyId || '-'}</span>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    width: '100%',
    overflow: 'hidden',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#163b7a',
    margin: 0,
  },
  subtext: {
    margin: '6px 0 0 0',
    color: '#6b7280',
    fontSize: '14px',
  },
  liveWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ecfdf5',
    color: '#15803d',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '13px',
    fontWeight: 700,
  },
  livePulse: {
    width: '10px',
    height: '10px',
    borderRadius: '999px',
    background: '#22c55e',
    display: 'inline-block',
  },
  liveText: {
    letterSpacing: '0.5px',
  },
  liveDot: {
    color: '#6b7280',
    fontWeight: 700,
    fontSize: '14px',
  },
  tableWrap: {
    width: '100%',
    overflowX: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: '18px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '950px',
    background: '#fff',
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    background: '#f8fafc',
    color: '#475569',
    fontSize: '13px',
    fontWeight: 700,
    borderBottom: '1px solid #e5e7eb',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '16px',
    color: '#334155',
    fontSize: '14px',
    verticalAlign: 'middle',
  },
  tdStrong: {
    padding: '16px',
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: 700,
    verticalAlign: 'middle',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  defaultBadge: {
    background: '#f1f5f9',
    color: '#334155',
  },
  actionBtn: {
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    padding: '10px 14px',
    borderRadius: '12px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  emptyBox: {
    border: '1px dashed #cbd5e1',
    borderRadius: '18px',
    padding: '32px',
    textAlign: 'center',
    background: '#f8fafc',
  },
  emptyTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 800,
    color: '#163b7a',
  },
  emptyText: {
    marginTop: '8px',
    color: '#64748b',
    fontSize: '14px',
  },
  footerInfo: {
    marginTop: '16px',
    fontSize: '12px',
    color: '#94a3b8',
  },
}
