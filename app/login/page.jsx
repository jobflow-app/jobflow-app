'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

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

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', userEmail)
      .single()

    if (profileError || !profile) {
      setErrorMessage('No profile found for this user.')
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

    setErrorMessage('Unknown role.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <div style={styles.divider} />

        <h1 style={styles.title}>Login</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        <div style={styles.links}>
          <Link href="/forgot-password">Forgot Password?</Link>
          <Link href="/register">Create Account</Link>
        </div>
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
    background: '#2d83f4',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    width: '420px',
    textAlign: 'center',
  },
  logo: {
    width: '180px',
    marginBottom: '20px',
  },
  divider: {
    height: '1px',
    background: '#ddd',
    marginBottom: '20px',
  },
  title: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '14px',
    marginBottom: '14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: '#1261db',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  links: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  error: {
    color: 'red',
  },
}
