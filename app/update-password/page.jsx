'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async () => {
    setError('')
    setSuccess('')

    if (!password || !confirmPassword) {
      setError('Bitte beide Felder ausfüllen.')
      return
    }

    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    setLoading(true)

    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')

    if (token_hash && type === 'recovery') {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        type: 'recovery',
        token_hash,
      })

      if (verifyError) {
        setError('Der Passwort-Link ist ungültig oder abgelaufen.')
        setLoading(false)
        return
      }
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setSuccess('Ihr Passwort wurde erfolgreich aktualisiert.')
    setLoading(false)

    setTimeout(() => {
      router.push('/login')
    }, 1800)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>JOBFLOW</div>
        <h1 style={styles.title}>Neues Passwort setzen</h1>
        <p style={styles.text}>
          Bitte vergeben Sie ein neues sicheres Passwort für Ihr JobFlow-Konto.
        </p>

        <input
          type="password"
          placeholder="Neues Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Passwort wiederholen"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Wird gespeichert...' : 'Passwort aktualisieren'}
        </button>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}
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
    background: 'linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #f8fbff 100%)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '42px',
    boxShadow: '0 30px 80px rgba(15, 23, 42, 0.10)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
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
  title: {
    fontSize: '34px',
    fontWeight: '900',
    color: '#0f172a',
    margin: '0 0 14px 0',
  },
  text: {
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: '24px',
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
  },
}
