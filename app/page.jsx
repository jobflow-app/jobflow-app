'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

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

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        setLoading(false)
        return
      }

      const user = data?.user

      if (!user) {
        setErrorMessage('Login failed. User not found.')
        setLoading(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, company_id, email')
        .eq('id', user.id)
        .maybeSingle()

      if (profileError) {
        setErrorMessage(`Profile error: ${profileError.message}`)
        setLoading(false)
        return
      }

      if (!profile) {
        setErrorMessage(
          'Login uspješan, ali profile nije pronađen. Provjeri trigger / profiles tabelu.'
        )
        setLoading(false)
        return
      }

      if (profile.role === 'superadmin') {
        router.push('/superadmin')
        return
      }

      if (profile.role === 'admin') {
        router.push('/dashboard')
        return
      }

      if (profile.role === 'worker') {
        router.push('/worker')
        return
      }

      if (profile.role === 'client') {
        router.push('/client')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setErrorMessage('Unexpected error during login.')
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <h1 style={styles.title}>JobFlow</h1>
        <p style={styles.subtitle}>Handwerk-Managementsystem</p>

        <form onSubmit={handleLogin} style={styles.form}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

        <div style={styles.links}>
          <Link href="/forgot-password" style={styles.link}>
            Forgot password?
          </Link>

          <Link href="/register" style={styles.link}>
            Start 30-day free trial
          </Link>
        </div>
      </div>
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
    background: '#fff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  logo: {
    width: '130px',
    display: 'block',
    margin: '0 auto 20px',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
  },
  subtitle: {
    textAlign: 'center',
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
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    background: '#163b7a',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
    marginTop: '16px',
    fontWeight: '600',
    whiteSpace: 'pre-wrap',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '18px',
    textAlign: 'center',
  },
  link: {
    color: '#163b7a',
    fontWeight: '700',
    textDecoration: 'none',
  },
}
