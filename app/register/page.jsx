'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      if (!companyName || !email || !password || !confirmPassword) {
        setError('Bitte fülle alle Felder aus.')
        return
      }

      if (password !== confirmPassword) {
        setError('Die Passwörter stimmen nicht überein.')
        return
      }

      if (password.length < 6) {
        setError('Das Passwort muss mindestens 6 Zeichen haben.')
        return
      }

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      const user = signUpData?.user

      if (!user) {
        setError('Benutzer konnte nicht erstellt werden.')
        return
      }

      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert([
          {
            company_name: companyName,
            owner_email: email,
          },
        ])
        .select()
        .single()

      if (companyError || !company) {
        setError(companyError?.message || 'Firma konnte nicht erstellt werden.')
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email,
            role: 'admin',
            company_id: company.id,
          },
        ])

      if (profileError) {
        setError(profileError.message)
        return
      }

      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 30)

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert([
          {
            company_id: company.id,
            status: 'trial',
            plan: 'trial',
            price_monthly: 0,
            trial_ends_at: trialEndsAt.toISOString(),
          },
        ])

      if (subscriptionError) {
        setError(subscriptionError.message)
        return
      }

      setSuccess('Registrierung erfolgreich. Du kannst dich jetzt anmelden.')
      setTimeout(() => {
        router.push('/login')
      }, 1200)
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
        <h1 style={styles.title}>JobFlow</h1>
        <p style={styles.subtitle}>Firma registrieren</p>

        <input
          type="text"
          placeholder="Firmenname"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={styles.input}
        />

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

        <input
          type="password"
          placeholder="Passwort bestätigen"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button} disabled={loading}>
          {loading ? 'Wird erstellt...' : 'Jetzt registrieren'}
        </button>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}

        <p style={styles.footerText}>
          Bereits registriert? <Link href="/login" style={styles.link}>Anmelden</Link>
        </p>
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
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #dbe2ea',
    marginBottom: '12px',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '14px',
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    color: '#b91c1c',
    marginTop: '14px',
    textAlign: 'center',
  },
  success: {
    color: '#166534',
    marginTop: '14px',
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginTop: '18px',
    color: '#64748b',
  },
  link: {
    color: '#163b7a',
    fontWeight: '700',
    textDecoration: 'none',
  },
}
