'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ThemeToggle from '@/components/ThemeToggle'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 🔥 automatski ucitaj theme
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile.role === 'superadmin') {
      router.push('/superadmin/dashboard')
    } else if (profile.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/worker/dashboard')
    }
  }

  return (
    <main style={styles.page}>

      {/* 🔥 DARK / LIGHT TOGGLE */}
      <div style={styles.toggle}>
        <ThemeToggle />
      </div>

      <div style={styles.card}>
        <img src="/logo.png" style={styles.logo} />

        <h1 style={styles.title}>JobFlow Login</h1>

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

        <button onClick={handleLogin} style={styles.button}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.links}>
          <a href="/forgot-password">Passwort vergessen?</a>
          <a href="/register">Registrieren</a>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  toggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  card: {
    width: '350px',
    padding: '30px',
    borderRadius: '20px',
    background: 'var(--card)',
    boxShadow: 'var(--shadow)',
    textAlign: 'center',
  },

  logo: {
    height: '60px',
    marginBottom: '10px',
  },

  title: {
    marginBottom: '20px',
    color: 'var(--text)',
  },

  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '10px',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text)',
  },

  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },

  error: {
    color: 'red',
    marginTop: '10px',
  },

  links: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
}
