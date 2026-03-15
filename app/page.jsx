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

        <p style={styles.subtitle}>Handwerk Management System</p>

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
    background: 'linear-gradient(180deg, #eef4fb 0%, #e7eef8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },

  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '36px 26px 28px 26px',
    boxShadow: '0 18px 60px rgba(22,59,122,0.12)',
    border: '1px solid rgba(22,59,122,0.06)',
  },

  logo: {
    display: 'block',
    width: '300px',
    maxWidth: '88%',
    height: 'auto',
    margin: '0 auto 18px auto',
    objectFit: 'contain',
  },

  subtitle: {
    textAlign: 'center',
    color: '#667085',
    marginBottom: '26px',
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '1.4',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  input: {
    width: '100%',
    padding: '15px 16px',
    borderRadius: '14px',
    border: '1px solid #d7deea',
    fontSize: '16px',
    outline: 'none',
    background: '#f9fbfe',
    color: '#111827',
    boxSizing: 'border-box',
  },

  button: {
    marginTop: '4px',
    width: '100%',
    padding: '15px',
    borderRadius: '14px',
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 8px 22px rgba(22,59,122,0.22)',
  },

  linksBox: {
    marginTop: '20px',
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
    marginTop: '22px',
    color: '#7b8794',
    fontSize: '13px',
    fontWeight: '500',
  },

  error: {
    color: '#d92d20',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
    background: '#fff1f0',
    border: '1px solid #ffd3cf',
    borderRadius: '10px',
    padding: '10px 12px',
  },
}
