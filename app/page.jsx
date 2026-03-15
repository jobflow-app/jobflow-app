'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (!mounted) return

        if (error) {
          setErrorMessage(error.message)
          setLoading(false)
          return
        }

        const session = data?.session

        if (session?.user) {
          router.replace('/dashboard')
          return
        }

        router.replace('/login')
      } catch (error) {
        if (!mounted) return
        setErrorMessage(error.message || 'Session check failed')
        setLoading(false)
      }
    }

    checkSession()

    return () => {
      mounted = false
    }
  }, [router])

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>JobFlow</h1>
          <p style={styles.text}>Loading...</p>
          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
        </div>
      </main>
    )
  }

  return null
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    background: '#fff',
    padding: '32px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '12px',
  },
  text: {
    color: '#374151',
  },
  error: {
    marginTop: '12px',
    color: '#b91c1c',
  },
}
