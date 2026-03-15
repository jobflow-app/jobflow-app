'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Session check error:', error.message)
          setCheckingSession(false)
          return
        }

        if (data?.session?.user) {
          router.replace('/dashboard')
          return
        }

        setCheckingSession(false)
      } catch (err) {
        console.error('Unexpected session check error:', err)
        setCheckingSession(false)
      }
    }

    checkExistingSession()
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        return
      }

      if (data?.user) {
        router.replace('/dashboard')
      } else {
        setErrorMessage('Login failed.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setErrorMessage('Unexpected error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

        <h1 style={styles.title}>JobFlow Login</h1>
        <p style={styles.subtitle}>Prijava u sistem</p>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Loading...' : 'Anmelden'}
        </button>

        <Link href="/forgot-password" style={styles.link}>
          Passwort vergessen?
        </Link>
      </form>
    </main>
  )
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
    width: '100%',
    maxWidth: '430px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  logo: {
    width: '120px',
    margin: '0 auto 8px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#163b7a',
    textAlign: 'center',
    margin: 0,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 0,
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: '#163b7a',
    textDecoration: 'none',
    fontSize: '14px',
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '16px',
  },
}
