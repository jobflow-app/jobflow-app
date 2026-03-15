'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import AppLayout from '../../components/AppLayout'
import { getCurrentUserWithRole } from '../../lib/auth'
import { supabase } from '../../lib/supabase'

const WorkersMap = dynamic(() => import('../../components/WorkersMap'), {
  ssr: false,
})

export default function AdminMapPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [gpsRows, setGpsRows] = useState([])

  useEffect(() => {
    async function loadData() {
      const { user, profile } = await getCurrentUserWithRole()

      if (!user || !profile) {
        router.push('/')
        return
      }

      if (profile.role !== 'superadmin' && profile.role !== 'admin') {
        router.push('/worker')
        return
      }

      if (!supabase) {
        setLoading(false)
        return
      }

      let query = supabase
        .from('worker_gps_status')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (profile.role === 'admin') {
        query = query.eq('company_id', profile.company_id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (!error) {
        setGpsRows(data || [])
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  if (loading) {
    return <main style={loadingStyles.page}>Loading...</main>
  }

  return (
    <AppLayout
      role="superadmin"
      title="Live Map"
      subtitle="GPS prikaz radnika"
    >
      <div style={styles.card}>
        <WorkersMap workers={gpsRows} />
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
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
}
