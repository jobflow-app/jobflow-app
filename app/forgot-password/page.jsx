'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) {
        setError('Passwort-Reset konnte nicht gesendet werden.')
        setLoading(false)
        return
      }

      setSuccess('Reset-Link wurde an Ihre E-Mail gesendet.')
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.backgroundGlowOne}></div>
      <div style={styles.backgroundGlowTwo}></div>

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img src="/logo.png" alt="JobFlow" style={styles.logo} />
        </div>

        <div style={styles.header}>
          <h1 style={styles.title}>Passwort vergessen</h1>
          <p style={styles.subtitle}>
            Geben Sie Ihre E-Mail ein, um einen Reset-Link zu erhalten
          </p>
        </div>

        <form onSubmit={handleResetPassword} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>E-Mail</label>
            <input
              type="email"
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
              required
            />
          </div>

          {error ? <div style={styles.error}>{error}</div> : null}
          {success ? <div style={styles.success}>{success}</div> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Wird gesendet...' : 'Reset-Link senden'}
          </button>
        </form>

        <div style={styles.footer}>
          <Link href="/login" style={styles.link}>
            Zurück zum Login
          </Link>
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
    padding: '24px',
    background:
      'linear-gradient(135deg, #0f172a 0%, #111827 35%, #1e293b 100%)',
    position: 'relative',
    overflow: 'hidden',
  },

  backgroundGlowOne: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    borderRadius: '50%',
    background: 'rgba(59,130,246,0.18)',
    filter: 'blur(80px)',
    top: '-80px',
    left: '-80px',
  },

  backgroundGlowTwo: {
    position: 'absolute',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'rgba(168,85,247,0.14)',
    filter: 'blur(90px)',
    bottom: '-100px',
    right: '-80px',
  },

  card: {
    width: '100%',
    maxWidth: '520px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '28px',
    padding: '34px 28px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
    position: 'relative',
    zIndex: 2,
  },

  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },

  logo: {
    width: '170px',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },

  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },

  title: {
    color: '#ffffff',
    fontSize: '34px',
    fontWeight: '800',
    margin: '0 0 10px 0',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '15px',
    margin: 0,
    lineHeight: '1.5',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    color: '#e5e7eb',
    fontSize: '14px',
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: '56px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    padding: '0 18px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  error: {
    background: 'rgba(239,68,68,0.14)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: '#fecaca',
    padding: '14px 16px',
    borderRadius: '14px',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  success: {
    background: 'rgba(34,197,94,0.14)',
    border: '1px solid rgba(34,197,94,0.35)',
    color: '#bbf7d0',
    padding: '14px 16px',
    borderRadius: '14px',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  button: {
    marginTop: '6px',
    height: '58px',
    borderRadius: '16px',
    border: 'none',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 12px 28px rgba(37,99,235,0.35)',
  },

  footer: {
    marginTop: '22px',
    display: 'flex',
    justifyContent: 'center',
  },

  link: {
    color: '#93c5fd',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
  },
}
