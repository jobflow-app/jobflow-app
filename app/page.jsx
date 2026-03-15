'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if (!userEmail) {
      setErrorMessage('Login nije uspio.')
      setLoading(false)
      return
    }

    const normalizedEmail = userEmail.toLowerCase().trim()

    const { data: superadmin } = await supabase
      .from('superadmins')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (superadmin) {
      router.push('/superadmin')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (!profile) {
      setErrorMessage('Profil nije pronađen.')
      setLoading(false)
      return
    }

    if (profile.role === 'admin') {
      router.push('/dashboard')
      return
    }

    if (profile.role === 'worker') {
      router.push('/worker')
      return
    }

    setErrorMessage('Nepoznata korisnička rola.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>JobFlow</h1>
        <p style={styles.subtitle}>Login</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {errorMessage && (
            <p style={styles.error}>{errorMessage}</p>
          )}

          <button type="submit" style={styles.button}>
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>
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
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '32px',
    borderRadius: '20px',
  },

  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#163b7a',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: '24px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  input: {
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #ddd',
  },

  button: {
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },

  error: {
    color: 'red',
    fontSize: '14px',
  },
}
