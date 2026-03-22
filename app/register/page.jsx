'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/confirm',
        data: {
          company_name: companyName,
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <main style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.badge}>JOBFLOW</div>
          <h1 style={styles.successTitle}>Bitte E-Mail bestätigen</h1>
          <p style={styles.successText}>
            Wir haben Ihnen eine Bestätigungs-E-Mail gesendet.
            Bitte öffnen Sie Ihr Postfach und bestätigen Sie Ihre E-Mail-Adresse,
            bevor Sie sich anmelden.
          </p>

          <Link href="/login" style={styles.linkButton}>
            Zur Login-Seite
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <section style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.badge}>JOBFLOW REGISTRIERUNG</div>
          <h1 style={styles.hero}>
            Starten Sie mit JobFlow.
            <br />
            Sicher und professionell.
          </h1>
          <p style={styles.text}>
            Registrieren Sie Ihre Firma, bestätigen Sie Ihre E-Mail-Adresse
            und starten Sie danach direkt mit Ihrem Admin-Zugang.
          </p>
        </div>
      </section>

      <section style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.title}>Konto erstellen</h2>

          <input
            placeholder="Firmenname"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Ansprechpartner"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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

          <button
            onClick={handleRegister}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Wird erstellt...' : 'Jetzt registrieren'}
          </button>

          {error ? <p style={styles.error}>{error}</p> : null}

          <div style={styles.footerText}>
            Bereits registriert? <Link href="/login">Zum Login</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    background: 'linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #f8fbff 100%)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '64px',
  },
  leftInner: {
    maxWidth: '680px',
  },
  badge: {
    display: 'inline-flex',
    padding: '10px 16px',
    borderRadius: '999px',
    background: '#e9f0ff',
    color: '#1d4ed8',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '0.08em',
    marginBottom: '24px',
  },
  hero: {
    fontSize: '58px',
    lineHeight: 1.02,
    fontWeight: '900',
    margin: '0 0 24px 0',
    color: '#0f172a',
  },
  text: {
    fontSize: '18px',
    lineHeight: 1.7,
    color: '#475569',
    margin: 0,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '40px',
    boxShadow: '0 30px 80px rgba(15, 23, 42, 0.10)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
  },
  title: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 24px 0',
  },
  input: {
    width: '100%',
    height: '54px',
    borderRadius: '14px',
    border: '1px solid #dbe4f0',
    background: '#ffffff',
    color: '#0f172a',
    padding: '0 16px',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '14px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    height: '54px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
    color: '#ffffff',
    fontWeight: '800',
    fontSize: '15px',
    cursor: 'pointer',
    marginTop: '4px',
  },
  error: {
    marginTop: '14px',
    color: '#dc2626',
    fontSize: '14px',
    fontWeight: '600',
  },
  footerText: {
    marginTop: '18px',
    fontSize: '14px',
    color: '#475569',
  },
  successCard: {
    width: '100%',
    maxWidth: '620px',
    margin: 'auto',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '48px',
    boxShadow: '0 30px 80px rgba(15, 23, 42, 0.10)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    textAlign: 'center',
  },
  successTitle: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#0f172a',
    margin: '0 0 18px 0',
  },
  successText: {
    fontSize: '17px',
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: '28px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '14px 22px',
    borderRadius: '12px',
    background: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '800',
  },
}
