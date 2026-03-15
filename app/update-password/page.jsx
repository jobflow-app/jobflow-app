'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (password.length < 6) {
      setErrorMessage('Lozinka mora imati najmanje 6 karaktera.')
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Lozinke se ne poklapaju.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setSuccessMessage('Lozinka je uspješno promijenjena.')

    setTimeout(() => {
      router.replace('/login')
    }, 1500)
  }

  return (
    <main style={styles.page}>
      <form onSubmit={handleUpdatePassword} style={styles.card}>
        <h1 style={styles.title}>Neues Passwort</h1>
        <p style={styles.subtitle}>Unesi novu lozinku</p>

        <input
          type="password"
          placeholder="Neues Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Passwort bestätigen"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />

        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
        {successMessage ? <p style={styles.success}>{successMessage}</p> : null}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Saving...' : 'Passwort ändern'}
        </button>
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
}
