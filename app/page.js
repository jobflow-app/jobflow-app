'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if (!userEmail) {
      setErrorMessage('Login failed.')
      setLoading(false)
      return
    }

    const { data: superadminRow, error: superadminError } = await supabase
      .from('superadmins')
      .select('email')
      .eq('email', userEmail)
      .maybeSingle()

    if (!superadminError && superadminRow) {
      router.push('/admin')
      return
    }

    router.push('/dashboard')
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>JobFlow</div>
        <h1 style={styles.title}>JobFlow – Handwerk Management System</h1>
        <p style={styles.subtitle}>
          Login for companies, workers and superadmin
        </p>

        <form style={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
        </form>

        <div style={styles.languages}>Deutsch | English | Balkan</div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#eef2f7',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '32px 24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  logo: {
    fontSize: '54px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1f2937',
    lineHeight: '1.15',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid #d1d5db',
    fontSize: '18px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '16px',
    borderRadius: '16px',
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  error: {
    color: '#b91c1c',
    fontSize: '14px',
    marginTop: '6px',
  },
  languages: {
    marginTop: '24px',
    color: '#4b5563',
    fontSize: '16px',
  },
}
