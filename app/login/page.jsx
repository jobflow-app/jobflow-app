'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

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
      password
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const userEmail = data?.user?.email

    if (!userEmail) {
      setErrorMessage('Login failed.')
      setLoading(false)
      return
    }

    // SUPERADMIN CHECK
    const { data: superadmin } = await supabase
      .from('superadmins')
      .select('email')
      .eq('email', userEmail)
      .single()

    if (superadmin) {
      router.push('/admin')
      return
    }

    // USER ROLE
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('email', userEmail)
      .single()

    if (!profile) {
      setErrorMessage('User profile not found.')
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

    setErrorMessage('Unknown user role.')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>

        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

        <p style={styles.subtitle}>
          Handwerk Management System
        </p>

        <form onSubmit={handleLogin}>

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

          {errorMessage && (
            <p style={styles.error}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Anmelden'}
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
    padding: '24px'
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },

  logo: {
    width: '140px',
    marginBottom: '16px'
  },

  subtitle: {
    marginBottom: '24px',
    color: '#475467'
  },

  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #d0d5dd',
    marginBottom: '14px',
    fontSize: '14px'
  },

  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer'
  },

  error: {
    color: 'red',
    marginBottom: '10px'
  }

}
