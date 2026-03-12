'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginWithPassword, isSuperadmin, getUserCompanyRole } from '../lib/auth'
import { ROLES } from '../lib/roles'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await loginWithPassword(email, password)

    if (error) {
      setErrorMessage(error.message || 'Login failed')
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if (!userEmail) {
      setErrorMessage('User not found')
      setLoading(false)
      return
    }

    const superadmin = await isSuperadmin(userEmail)
    if (superadmin) {
      router.push('/admin')
      return
    }

    const role = await getUserCompanyRole(userEmail)

    if (role === ROLES.WORKER) {
      router.push('/worker')
      return
    }

    router.push('/dashboard')
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <h1 style={styles.title}>JobFlow</h1>
        <p style={styles.subtitle}>Handwerk Management System</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
        </form>

        <div style={styles.languages}>Deutsch | English | Balkan</div>
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
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '24px',
    padding: '32px 24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  logo: {
    width: '110px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#163b7a',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '14px',
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
  error: {
    color: '#b91c1c',
    fontSize: '14px',
    margin: 0,
  },
  languages: {
    marginTop: '20px',
    color: '#4b5563',
    fontSize: '14px',
  },
}
