'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
        },
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setMessage(
      'Registracija uspješna. Provjeri e-mail i potvrdi nalog.'
    )

    setFullName('')
    setCompanyName('')
    setEmail('')
    setPassword('')
    setLoading(false)

    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <h1 style={styles.title}>Create account</h1>
        <p style={styles.subtitle}>Start your 30-day free trial</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            minLength={6}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating...' : 'Start free trial'}
          </button>
        </form>

        {message ? <p style={styles.success}>{message}</p> : null}
        {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

        <p style={styles.bottomText}>
          Already have an account? <Link href="/" style={styles.link}>Login</Link>
        </p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eef2f7',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  logo: {
    width: '130px',
    display: 'block',
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#163b7a',
    textAlign: 'center',
    marginBottom: '8px',
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
    width: '100%',
    padding: '14px 16px',
    borderRadius: '14px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    background: '#163b7a',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  success: {
    marginTop: '18px',
    color: '#15803d',
    textAlign: 'center',
    fontWeight: '600',
  },
  error: {
    marginTop: '18px',
    color: '#dc2626',
    textAlign: 'center',
    fontWeight: '600',
  },
  bottomText: {
    marginTop: '18px',
    textAlign: 'center',
    color: '#6b7280',
  },
  link: {
    color: '#163b7a',
    fontWeight: '700',
    textDecoration: 'none',
  },
}
