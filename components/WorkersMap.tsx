'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type WorkerGpsRow = {
  id: string
  worker_id: string
  latitude: number | null
  longitude: number | null
  last_seen_at: string | null
  current_job_id: string | null
  workers?: {
    id: string
    full_name: string | null
    email: string | null
  } | null
}

type Props = {
  title?: string
}

export default function WorkersMap({ title = 'Live Workers Map' }: Props) {
  const [workers, setWorkers] = useState<WorkerGpsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadWorkers() {
    setError('')

    const { data, error } = await supabase
      .from('worker_gps_status')
      .select(`
        id,
        worker_id,
        latitude,
        longitude,
        last_seen_at,
        current_job_id,
        workers (
          id,
          full_name,
          email
        )
      `)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .order('last_seen_at', { ascending: false })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setWorkers((data as WorkerGpsRow[]) || [])
    setLoading(false)
  }

  useEffect(() => {
    loadWorkers()

    const interval = setInterval(() => {
      loadWorkers()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.subtitle}>
          Live GPS status radnika
        </p>
      </div>

      {loading && <p style={styles.info}>Učitavanje mape...</p>}
      {error && <p style={styles.error}>Greška: {error}</p>}

      {!loading && !error && workers.length === 0 && (
        <p style={styles.info}>Nema aktivnih GPS lokacija.</p>
      )}

      {!loading && !error && workers.length > 0 && (
        <div style={styles.grid}>
          {workers.map((item) => {
            const mapsUrl =
              item.latitude && item.longitude
                ? `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
                : '#'

            const workerName =
              item.workers?.full_name ||
              item.workers?.email ||
              `Worker ${item.worker_id?.slice(0, 8)}`

            return (
              <div key={item.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <h3 style={styles.workerName}>{workerName}</h3>
                  <span style={styles.badge}>LIVE</span>
                </div>

                <p style={styles.text}>
                  <strong>Lat:</strong> {item.latitude}
                </p>
                <p style={styles.text}>
                  <strong>Lng:</strong> {item.longitude}
                </p>
                <p style={styles.text}>
                  <strong>Zadnji update:</strong>{' '}
                  {item.last_seen_at
                    ? new Date(item.last_seen_at).toLocaleString()
                    : '-'}
                </p>
                <p style={styles.text}>
                  <strong>Job:</strong> {item.current_job_id || 'Nema aktivnog'}
                </p>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  Otvori u Google Maps
                </a>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#163b7a',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '8px',
  },
  info: {
    color: '#374151',
    background: '#fff',
    padding: '18px',
    borderRadius: '16px',
  },
  error: {
    color: '#b91c1c',
    background: '#fee2e2',
    padding: '18px',
    borderRadius: '16px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '18px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  workerName: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
    color: '#111827',
  },
  badge: {
    background: '#dcfce7',
    color: '#166534',
    padding: '6px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
  },
  text: {
    margin: '8px 0',
    color: '#374151',
  },
  link: {
    display: 'inline-block',
    marginTop: '12px',
    textDecoration: 'none',
    color: '#163b7a',
    fontWeight: 700,
  },
}
