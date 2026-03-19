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
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      if (!email) {
        setError('Bitte E-Mail eingeben.')
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess('Wenn die E-Mail existiert, wurde ein Reset-Link gesendet.')
    } catch (err) {
      console.error(err)
      setError('Etwas ist schiefgelaufen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />
        <h1 style={styles.title}>Passwort vergessen</h1>

        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleReset} style={styles.button} disabled={loading}>
          {loading ? 'Senden...' : 'Reset-Link senden'}
        </button>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}

        <p style={styles.footer}>
          <Link href="/login" style={styles.link}>Zurück zum Login</Link>
        </p>
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
    background: 'linear-gradient(180deg, #eef2f7 0%, #e7edf6 100%)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '24px',
    padding: '36px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
  },
  logo: {
    height: '52px',
    objectFit: 'contain',
    marginBottom: '18px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '900',
    marginBottom: '18px',
    color: '#163b7a',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #dbe2ea',
    marginBottom: '12px',
    fontSize: '15px',
  },
  button: {
    width: '100%',
    height: '50px',
    border: 'none',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  error: {
    color: '#b91c1c',
    marginTop: '12px',
  },
  success: {
    color: '#166534',
    marginTop: '12px',
  },
  footer: {
    marginTop: '16px',
  },
  link: {
    color: '#163b7a',
    fontWeight: '800',
    textDecoration: 'none',
  },
}
