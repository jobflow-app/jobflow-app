'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

    if (profile.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/superadmin/dashboard')
    }
  }

  return (
    <main style={styles.page}>

      <div style={styles.toggle}>
        <ThemeToggle />
      </div>

      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h1 style={styles.hero}>
          Dein Handwerk.
          <br />
          Perfekt organisiert.
        </h1>

        <p style={styles.text}>
          JobFlow bringt Aufträge, Kunden, Mitarbeiter und Rechnungen
          in ein modernes System – einfach, schnell und übersichtlich.
        </p>
      </div>

      {/* RIGHT LOGIN */}
      <div style={styles.card}>
        <img src="/logo.png" style={styles.logo} />

        <h2 style={styles.title}>Login</h2>

        <input
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
    display: 'flex',
    background: 'var(--bg)',
    color: 'var(--text)',
  },

  toggle: {
    position: 'absolute',
    top: 20,
    right: 20,
  },

  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '60px',
  },

  hero: {
    fontSize: '48px',
    fontWeight: '900',
  },

  text: {
    marginTop: '20px',
    color: 'var(--text-secondary)',
  },

  card: {
    width: '400px',
    margin: 'auto',
    padding: '40px',
    borderRadius: '20px',
    background: 'var(--card)',
    boxShadow: 'var(--shadow)',
  },

  logo: {
    height: '60px',
    marginBottom: '20px',
  },

  title: {
    marginBottom: '20px',
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
    fontWeight: '800',
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
