'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function SignupPage() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!supabase) {
      setError('Supabase is not connected.')
      setLoading(false)
      return
    }

    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: ownerName,
          phone: phone,
          company_name: companyName,
        },
      },
    })

    if (signupError) {
      setError(signupError.message)
      setLoading(false)
      return
    }

    setSuccess('Account created successfully. You can now log in.')
    setLoading(false)

    setTimeout(() => {
      router.push('/')
    }, 1200)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>30 Tage kostenlos testen</p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Firmenname"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Ansprechpartner"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button style={styles.button} disabled={loading}>
            {loading ? 'Loading...' : 'Kostenlos starten'}
          </button>
        </form>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}

        <p style={styles.languages}>Deutsch | English | BHS</p>
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
    background: '#eef2f7',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: '#fff',
    borderRadius: '24px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  logo: {
    width: '180px',
    marginBottom: '12px',
  },
  subtitle: {
    marginBottom: '24px',
    color: '#6b7280',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '14px',
    marginBottom: '12px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },
  error: {
    marginTop: '12px',
    color: 'red',
  },
  success: {
    marginTop: '12px',
    color: 'green',
  },
  languages: {
    marginTop: '14px',
    fontSize: '14px',
    color: '#6b7280',
  },
}
