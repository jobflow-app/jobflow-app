'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabase'
import { getCurrentUserWithRole } from '../../../lib/auth'
import AppLayout from '../../../components/AppLayout'

export default function WorkerMapPage() {
  const router = useRouter()
  const watchIdRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [status, setStatus] = useState('GPS not started')
  const [coords, setCoords] = useState(null)
  const [workerProfile, setWorkerProfile] = useState(null)

  useEffect(() => {
    async function checkAccess() {
      const { user, profile } = await getCurrentUserWithRole()

      if (!user || !profile) {
        router.push('/')
        return
      }

      if (profile.role !== 'worker') {
        router.push('/')
        return
      }

      setWorkerProfile({
        email: user.email,
        company_id: profile.company_id,
        user_id: user.id,
      })

      setAllowed(true)
      setLoading(false)
    }

    checkAccess()

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [router])

  async function saveLocation(latitude, longitude) {
    if (!supabase || !workerProfile?.email) return

    const payload = {
      worker_email: workerProfile.email,
      company_id: workerProfile.company_id,
      status: 'active',
      latitude,
      longitude,
    }

    const { error } = await supabase
      .from('worker_gps_status')
      .upsert(payload, {
        onConflict: 'worker_email',
      })

    if (error) {
      setStatus(`Save error: ${error.message}`)
      return
    }

    setStatus('Location sent successfully')
  }

  function startTracking() {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported on this device')
      return
    }

    setStatus('Starting GPS...')

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setCoords({ latitude, longitude })
        await saveLocation(latitude, longitude)
      },
      (error) => {
        setStatus(`GPS error: ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 20000,
      }
    )
  }

  function stopTracking() {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
      setStatus('GPS stopped')
    }
  }

  if (loading) {
    return <main style={loadingStyles.page}>Loading...</main>
  }

  if (!allowed) return null

  return (
    <AppLayout
      role="worker"
      title="Karte"
      subtitle="GPS tracking za worker app"
    >
      <div style={styles.card}>
        <h3 style={styles.heading}>Worker GPS</h3>
        <p style={styles.text}>Status: {status}</p>

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton} onClick={startTracking}>
            Start GPS
          </button>

          <button style={styles.secondaryButton} onClick={stopTracking}>
            Stop GPS
          </button>
        </div>

        <div style={styles.infoBox}>
          <p><strong>Email:</strong> {workerProfile?.email || '-'}</p>
          <p><strong>Company ID:</strong> {workerProfile?.company_id || '-'}</p>
          <p><strong>Latitude:</strong> {coords?.latitude || '-'}</p>
          <p><strong>Longitude:</strong> {coords?.longitude || '-'}</p>
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
  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '24px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
    maxWidth: '700px',
  },
  heading: {
    marginBottom: '12px',
    color: '#163b7a',
  },
  text: {
    marginBottom: '16px',
    color: '#374151',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    background: '#d1d5db',
    color: '#111827',
    fontWeight: '700',
    cursor: 'pointer',
  },
  infoBox: {
    background: '#f8fafc',
    borderRadius: '14px',
    padding: '16px',
    lineHeight: '1.8',
  },
}
