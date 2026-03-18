'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    // 🔥 UZMI ROLE IZ DATABASE
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      setError('Profile not found')
      setLoading(false)
      return
    }

    // 🔥 REDIRECT PO ROLE
    if (profile.role === 'superadmin') {
      router.push('/superadmin/dashboard')
    } else if (profile.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/worker/dashboard')
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>JobFlow</h1>

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

        <button onClick={handleLogin} style={styles.button}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    width: '320px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '12px',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    fontWeight: '700',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
}
