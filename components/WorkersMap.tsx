'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function WorkersMap({ title = 'Live Workers Map' }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadGps = async () => {
      setError('')

      const { data, error } = await supabase
        .from('worker_gps_status')
        .select(`
          id,
          worker_id,
          company_id,
          current_job_id,
          latitude,
          longitude,
          last_update,
          workers (
            id,
            full_name
          ),
          jobs:current_job_id (
            id,
            title,
            status
          )
        `)
        .order('last_update', { ascending: false })

      if (!active) return

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setRows(data || [])
      setLoading(false)
    }

    loadGps()

    const channel = supabase
      .channel('worker-gps-live')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'worker_gps_status',
        },
        () => {
          loadGps()
        }
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.subtitle}>Live GPS pregled radnika</p>
      </div>

      {loading && <p style={styles.info}>Učitavanje...</p>}
      {error && <p style={styles.error}>Greška: {error}</p>}

      {!loading && !error && rows.length === 0 && (
        <p style={styles.info}>Nema GPS podataka.</p>
      )}

      {!loading && !error && rows.length > 0 && (
        <div style={styles.list}>
          {rows.map((row) => (
            <div key={row.id} style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <h3 style={styles.name}>
                    {row.workers?.full_name || 'Worker'}
                  </h3>
                  <p style={styles.meta}>
                    Job: {row.jobs?.title || 'Nema aktivnog joba'}
                  </p>
                  <p style={styles.meta}>
                    Status: {row.jobs?.status || 'idle'}
                  </p>
                </div>

                <div style={styles.badge}>
                  Live
                </div>
              </div>

              <div style={styles.coords}>
                <span>Lat: {row.latitude ?? '-'}</span>
                <span>Lng: {row.longitude ?? '-'}</span>
              </div>

              <p style={styles.time}>
                Zadnji update: {row.last_update
                  ? new Date(row.last_update).toLocaleString()
                  : '-'}
              </p>

              {row.latitude && row.longitude && (
                <a
                  href={`https://maps.google.com/?q=${row.latitude},${row.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  Otvori lokaciju
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    width: '100%',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#163b7a',
    margin: 0,
  },
  subtitle: {
    marginTop: '6px',
    color: '#6b7280',
  },
  info: {
    color: '#374151',
    background: '#fff',
    padding: '16px',
    borderRadius: '14px',
  },
  error: {
    color: '#b91c1c',
    background: '#fee2e2',
    padding: '16px',
    borderRadius: '14px',
  },
  list: {
    display: 'grid',
    gap: '16px',
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    alignItems: 'flex-start',
  },
  name: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
  },
  meta: {
    margin: '6px 0 0 0',
    color: '#4b5563',
  },
  badge: {
    background: '#dcfce7',
    color: '#166534',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700',
  },
  coords: {
    marginTop: '16px',
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    color: '#1f2937',
    fontWeight: '600',
  },
  time: {
    marginTop: '14px',
    color: '#6b7280',
    fontSize: '14px',
  },
  link: {
    display: 'inline-block',
    marginTop: '14px',
    color: '#163b7a',
    fontWeight: '700',
    textDecoration: 'none',
  },
}
