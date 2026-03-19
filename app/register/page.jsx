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
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    try {
      setLoading(true)
      setError('')
      setSuccess('')

      if (!companyName || !email || !password || !passwordConfirm) {
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

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
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

      setSuccess('Registrierung erfolgreich. Bitte E-Mail bestätigen.')
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
        <h1 style={styles.title}>Firma registrieren</h1>

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
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button} disabled={loading}>
          {loading ? 'Wird erstellt...' : 'Jetzt registrieren'}
        </button>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}

        <p style={styles.footer}>
          Bereits registriert? <Link href="/login" style={styles.link}>Anmelden</Link>
        </p>
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
    marginTop: '6px',
  },
  error: {
    color: '#b91c1c',
    marginTop: '12px',
  },
  success: {
    color: '#166534',
    marginTop: '12px',
  },
  footer: {
    marginTop: '16px',
    color: '#64748b',
  },
  link: {
    color: '#163b7a',
    fontWeight: '800',
    textDecoration: 'none',
  },
}
