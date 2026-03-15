'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://jobflow-app-sooty.vercel.app/update-password',
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setSuccessMessage('Reset link je poslan na e-mail.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleResetPassword} style={styles.card}>
        <h1 style={styles.title}>Passwort vergessen</h1>
        <p style={styles.subtitle}>
          Unesi svoj e-mail i poslat ćemo ti link za novu lozinku.
        </p>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
        {successMessage ? <p style={styles.success}>{successMessage}</p> : null}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Reset link senden'}
        </button>

        <div style={styles.backRow}>
          <Link href="/login" style={styles.link}>
            Zurück zum Login
          </Link>
        </div>
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
    fontSize: '28px',
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
  success: {
    color: '#166534',
    marginBottom: '12px',
  },
  backRow: {
    marginTop: '16px',
    textAlign: 'center',
  },
  link: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '600',
  },
}
