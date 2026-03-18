'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()

  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!companyName.trim()) {
      setError('Bitte Firmennamen eingeben.')
      return
    }

    if (!fullName.trim()) {
      setError('Bitte vollständigen Namen eingeben.')
      return
    }

    if (!email.trim()) {
      setError('Bitte E-Mail eingeben.')
      return
    }

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen haben.')
      return
    }

    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.')
      return
    }

    setLoading(true)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            company_name: companyName.trim(),
          },
        },
      })

      if (authError) {
        setError(authError.message || 'Registrierung fehlgeschlagen.')
        setLoading(false)
        return
      }

      const user = authData?.user

      if (!user) {
        setError('Benutzer konnte nicht erstellt werden.')
        setLoading(false)
        return
      }

      const trialEndsAt = new Date()
      trialEndsAt.setDate(trialEndsAt.getDate() + 30)

      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert([
          {
            name: companyName.trim(),
            owner_email: email.trim().toLowerCase(),
            trial_ends_at: trialEndsAt.toISOString(),
            status: 'trial',
          },
        ])
        .select()
        .single()

      if (companyError || !companyData) {
        setError(companyError?.message || 'Firma konnte nicht erstellt werden.')
        setLoading(false)
        return
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
          {
            id: user.id,
            full_name: fullName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim() || null,
            role: 'admin',
            company_id: companyData.id,
          },
        ])

      if (profileError) {
        setError(profileError.message || 'Profil konnte nicht erstellt werden.')
        setLoading(false)
        return
      }

      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .insert([
          {
            company_id: companyData.id,
            plan: 'trial',
            status: 'trial',
            starts_at: new Date().toISOString(),
            ends_at: trialEndsAt.toISOString(),
          },
        ])

      if (subscriptionError) {
        setError(subscriptionError.message || 'Trial konnte nicht erstellt werden.')
        setLoading(false)
        return
      }

      setSuccess('Registrierung erfolgreich. Ihr 30-Tage-Testzugang wurde erstellt.')

      setTimeout(() => {
        router.push('/login')
      }, 1800)
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.backgroundGlowOne}></div>
      <div style={styles.backgroundGlowTwo}></div>

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img src="/logo.png" alt="JobFlow" style={styles.logo} />
        </div>

        <div style={styles.header}>
          <h1 style={styles.title}>Konto erstellen</h1>
          <p style={styles.subtitle}>
            Starten Sie mit JobFlow und aktivieren Sie Ihre 30 Tage Testphase
          </p>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Firmenname</label>
            <input
              type="text"
              placeholder="z. B. VS Technik"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Vollständiger Name</label>
            <input
              type="text"
              placeholder="Ihr Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>E-Mail</label>
            <input
              type="email"
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Telefon</label>
            <input
              type="text"
              placeholder="+49 ..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Passwort</label>
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.passwordInput}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                {showPassword ? 'Verbergen' : 'Anzeigen'}
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Passwort bestätigen</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Passwort bestätigen"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
              autoComplete="new-password"
              required
            />
          </div>

          {error ? <div style={styles.error}>{error}</div> : null}
          {success ? <div style={styles.success}>{success}</div> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Registrierung läuft...' : 'Jetzt registrieren'}
          </button>
        </form>

        <div style={styles.footer}>
          <span style={styles.footerText}>Bereits registriert?</span>
          <Link href="/login" style={styles.link}>
            Zum Login
          </Link>
        </div>
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
    background:
      'linear-gradient(135deg, #0f172a 0%, #111827 35%, #1e293b 100%)',
    position: 'relative',
    overflow: 'hidden',
  },

  backgroundGlowOne: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    borderRadius: '50%',
    background: 'rgba(59,130,246,0.18)',
    filter: 'blur(80px)',
    top: '-80px',
    left: '-80px',
  },

  backgroundGlowTwo: {
    position: 'absolute',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'rgba(168,85,247,0.14)',
    filter: 'blur(90px)',
    bottom: '-100px',
    right: '-80px',
  },

  card: {
    width: '100%',
    maxWidth: '560px',
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: '28px',
    padding: '34px 28px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
    position: 'relative',
    zIndex: 2,
  },

  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },

  logo: {
    width: '170px',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },

  header: {
    textAlign: 'center',
    marginBottom: '28px',
  },

  title: {
    color: '#ffffff',
    fontSize: '34px',
    fontWeight: '800',
    margin: '0 0 10px 0',
    letterSpacing: '-0.02em',
  },

  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '15px',
    margin: 0,
    lineHeight: '1.5',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    color: '#e5e7eb',
    fontSize: '14px',
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: '56px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    padding: '0 18px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  passwordWrap: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },

  passwordInput: {
    flex: 1,
    height: '56px',
    border: 'none',
    background: 'transparent',
    color: '#ffffff',
    padding: '0 18px',
    fontSize: '15px',
    outline: 'none',
  },

  showButton: {
    height: '56px',
    border: 'none',
    background: 'transparent',
    color: '#93c5fd',
    fontWeight: '700',
    padding: '0 16px',
    cursor: 'pointer',
    fontSize: '14px',
  },

  error: {
    background: 'rgba(239,68,68,0.14)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: '#fecaca',
    padding: '14px 16px',
    borderRadius: '14px',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  success: {
    background: 'rgba(34,197,94,0.14)',
    border: '1px solid rgba(34,197,94,0.35)',
    color: '#bbf7d0',
    padding: '14px 16px',
    borderRadius: '14px',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  button: {
    marginTop: '6px',
    height: '58px',
    borderRadius: '16px',
    border: 'none',
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 12px 28px rgba(37,99,235,0.35)',
  },

  footer: {
    marginTop: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },

  footerText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
  },

  link: {
    color: '#93c5fd',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
  },
}
