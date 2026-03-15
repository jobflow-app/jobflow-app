'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMessage('')

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setMessage('Šifra je uspješno promijenjena.')

    setTimeout(() => {
      router.push('/')
    }, 1500)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>Nova lozinka</p>

        <form onSubmit={handleUpdatePassword} style={styles.form}>
          <input
            type="password"
            placeholder="Unesi novu lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {message ? <p style={styles.success}>{message}</p> : null}
          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Spremam...' : 'Spremi novu lozinku'}
          </button>
        </form>

        <Link href="/" style={styles.link}>
          Nazad na login
        </Link>
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
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '18px',
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '600',
  },
  success: {
    color: 'green',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
  error: {
    color: 'crimson',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
  },
}
