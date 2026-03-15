'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
    let mounted = true

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (!mounted) return

      if (data?.session?.user) {
        router.replace('/dashboard')
        return
      }

      setCheckingSession(false)
    }

    checkSession()

    return () => {
      mounted = false
    }
  }, [router])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    router.replace('/dashboard')
  }

  if (checkingSession) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>JobFlow</h1>
          <p style={styles.subtitle}>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1 style={styles.title}>JobFlow</h1>
        <p style={styles.subtitle}>Prijava</p>

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

        <div style={styles.linkRow}>
          <Link href="/forgot-password" style={styles.link}>
            Passwort vergessen?
          </Link>
        </div>

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Signing in...' : 'Anmelden'}
        </button>
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
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '24px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1px solid #d1d5db',
    marginBottom: '14px',
    fontSize: '16px',
    outline: 'none',
  },
  linkRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '16px',
  },
  link: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    fontSize: '16px',
    padding: '14px',
    borderRadius: '14px',
    cursor: 'pointer',
  },
  error: {
    color: '#b91c1c',
    marginBottom: '12px',
  },
}
