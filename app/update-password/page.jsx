'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UpdatePasswordPage() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdatePassword = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      if (!password || !passwordConfirm) {
        setError('Bitte alle Felder ausfüllen.')
        return
      }

      if (password !== passwordConfirm) {
        setError('Passwörter stimmen nicht überein.')
        return
      }

      if (password.length < 6) {
        setError('Passwort muss mindestens 6 Zeichen haben.')
        return
      }

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess('Passwort erfolgreich gespeichert.')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
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
        <h1 style={styles.title}>Neues Passwort</h1>

        <input
          type="password"
          placeholder="Neues Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Passwort bestätigen"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleUpdatePassword} style={styles.button} disabled={loading}>
          {loading ? 'Speichern...' : 'Passwort speichern'}
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
}
