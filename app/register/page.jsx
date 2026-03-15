'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setErrorMessage('')

    const normalizedEmail = email.trim().toLowerCase()

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const userId = data?.user?.id

    if (!userId) {
      setMessage('Registracija poslana. Provjeri svoj E-Mail.')
      setLoading(false)
      return
    }

    const { error: companyError } = await supabase
      .from('companies')
      .insert([
        {
          name: companyName,
          owner_email: normalizedEmail,
        },
      ])

    if (companyError) {
      setErrorMessage(companyError.message)
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId,
          email: normalizedEmail,
          full_name: fullName,
          role: 'admin',
        },
      ])

    if (profileError) {
      setErrorMessage(profileError.message)
      setLoading(false)
      return
    }

    setMessage('Registracija uspješna. Provjeri E-Mail i prijavi se.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>Nova registracija klijenata</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Naziv firme"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            placeholder="Ime i prezime"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {message ? <p style={styles.success}>{message}</p> : null}
          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registracija...' : 'Registrieren'}
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
    maxWidth: '460px',
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
