'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Page() {
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
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if (!userEmail) {
      setErrorMessage('Login nije uspio.')
      setLoading(false)
      return
    }

    const normalizedEmail = userEmail.toLowerCase().trim()

    const { data: superadmin, error: superadminError } = await supabase
      .from('superadmins')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (superadminError) {
      setErrorMessage(superadminError.message)
      setLoading(false)
      return
    }

    if (superadmin) {
      router.push('/superadmin')
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (profileError) {
      setErrorMessage(profileError.message)
      setLoading(false)
      return
    }

    if (!profile) {
      setErrorMessage('Profil nije pronađen.')
      setLoading(false)
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

    setErrorMessage('Nepoznata korisnička rola.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

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
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {errorMessage ? (
            <p style={styles.error}>{errorMessage}</p>
          ) : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>

        <div style={styles.linksBox}>
          <Link href="/forgot-password" style={styles.link}>
            Passwort vergessen?
          </Link>

          <Link href="/register" style={styles.linkPrimary}>
            Neue Kundenregistrierung
          </Link>
        </div>

        <p style={styles.languages}>Deutsch | English | BHS</p>
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
    display: 'block',
    width: '220px',
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto 14px auto',
  },

  subtitle: {
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '24px',
    fontSize: '15px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  input: {
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
  },

  button: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },

  linksBox: {
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
  },

  link: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
  },

  linkPrimary: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '15px',
  },

  languages: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#6b7280',
    fontSize: '14px',
  },

  error: {
    color: 'crimson',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
}
