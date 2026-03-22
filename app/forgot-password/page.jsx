'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleReset = async () => {
    setError('')
    setSuccess('')

    if (!email) {
      setError('Bitte geben Sie Ihre E-Mail-Adresse ein.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/update-password',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(
      'Wir haben Ihnen eine E-Mail zum Zurücksetzen Ihres Passworts gesendet.'
    )
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <section style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.badge}>JOBFLOW SICHERHEIT</div>
          <h1 style={styles.hero}>
            Passwort vergessen?
            <br />
            Kein Problem.
          </h1>
          <p style={styles.text}>
            Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen sicheren Link,
            mit dem Sie Ihr Passwort zurücksetzen können.
          </p>
        </div>
      </section>

      <section style={styles.right}>
        <div style={styles.card}>
          <img src="/logo.png" alt="JobFlow" style={styles.logo} />

          <h2 style={styles.title}>Passwort zurücksetzen</h2>

          <input
            type="email"
            placeholder="E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Wird gesendet...' : 'Reset-Link senden'}
          </button>

          {error ? <p style={styles.error}>{error}</p> : null}
          {success ? <p style={styles.success}>{success}</p> : null}

          <div style={styles.footerText}>
            <Link href="/login" style={styles.link}>
              Zurück zum Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    background: 'linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #f8fbff 100%)',
  },

  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '64px',
  },

  leftInner: {
    maxWidth: '680px',
  },

  badge: {
    display: 'inline-flex',
    padding: '10px 16px',
    borderRadius: '999px',
    background: '#e9f0ff',
    color: '#1d4ed8',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.08em',
    marginBottom: '24px',
  },

  hero: {
    fontSize: '58px',
    lineHeight: 1.02,
    fontWeight: '900',
    margin: '0 0 24px 0',
    color: '#0f172a',
  },

  text: {
    fontSize: '18px',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0,
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },

  card: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '40px',
    boxShadow: '0 30px 80px rgba(15, 23, 42, 0.10)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
  },

  logo: {
    width: '72px',
    height: '72px',
    objectFit: 'contain',
    marginBottom: '18px',
    display: 'block',
  },

  title: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 24px 0',
  },

  input: {
    width: '100%',
    height: '54px',
    borderRadius: '14px',
    border: '1px solid #dbe4f0',
    background: '#ffffff',
    color: '#0f172a',
    padding: '0 16px',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '14px',
    boxSizing: 'border-box',
  },

  button: {
    width: '100%',
    height: '54px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
  },

  error: {
    marginTop: '14px',
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: '600',
  },

  success: {
    marginTop: '14px',
    color: '#15803d',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: 1.6,
  },

  footerText: {
    marginTop: '18px',
  },

  link: {
    fontSize: '14px',
    color: '#1d4ed8',
    textDecoration: 'none',
    fontWeight: '700',
  },
}
