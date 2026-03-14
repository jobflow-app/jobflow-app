'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState('')
  const [company, setCompany] = useState(null)

  useEffect(() => {
    async function loadData() {
      if (!supabase) return

      const { data: userData } = await supabase.auth.getUser()
      const email = userData?.user?.email || ''
      setUserEmail(email)

      if (email) {
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('owner_email', email)
          .maybeSingle()

        setCompany(companyData)
      }
    }

    loadData()
  }, [])

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <p style={styles.subtitle}>Welcome to JobFlow</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Company</h3>
          <p>{company?.company_name || 'New Company'}</p>
        </div>

        <div style={styles.card}>
          <h3>Owner</h3>
          <p>{userEmail || '-'}</p>
        </div>

        <div style={styles.card}>
          <h3>Plan</h3>
          <p>{company?.plan || 'starter'}</p>
        </div>

        <div style={styles.card}>
          <h3>Trial End</h3>
          <p>{company?.trial_end || '-'}</p>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '30px',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#6b7280',
  },
  grid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  },
  card: {
    background: '#fff',
    borderRadius: '18px',
    padding: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
  },
}
