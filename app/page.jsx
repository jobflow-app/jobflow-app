'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const translations = {
  de: {
    subtitle: 'Handwerk Management System',
    emailPlaceholder: 'E-Mail',
    passwordPlaceholder: 'Passwort',
    login: 'Anmelden',
    loading: 'Anmeldung...',
    forgotPassword: 'Passwort vergessen?',
    register: 'Neue Kundenregistrierung',
    profileNotFound: 'Profil wurde nicht gefunden.',
    loginFailed: 'Anmeldung fehlgeschlagen.',
    unknownRole: 'Unbekannte Benutzerrolle.',
    userNotFound: 'Benutzer wurde nicht gefunden.',
    german: 'Deutsch',
    english: 'Englisch',
    bhs: 'BHS',
  },
  en: {
    subtitle: 'Craft Management System',
    emailPlaceholder: 'E-Mail',
    passwordPlaceholder: 'Password',
    login: 'Login',
    loading: 'Logging in...',
    forgotPassword: 'Forgot password?',
    register: 'New customer registration',
    profileNotFound: 'Profile not found.',
    loginFailed: 'Login failed.',
    unknownRole: 'Unknown user role.',
    userNotFound: 'User not found.',
    german: 'German',
    english: 'English',
    bhs: 'BHS',
  },
  bhs: {
    subtitle: 'Sistem za upravljanje radovima',
    emailPlaceholder: 'E-Mail',
    passwordPlaceholder: 'Lozinka',
    login: 'Prijava',
    loading: 'Prijava...',
    forgotPassword: 'Zaboravili ste lozinku?',
    register: 'Nova registracija klijenata',
    profileNotFound: 'Profil nije pronađen.',
    loginFailed: 'Prijava nije uspjela.',
    unknownRole: 'Nepoznata korisnička rola.',
    userNotFound: 'Korisnik nije pronađen.',
    german: 'Deutsch',
    english: 'English',
    bhs: 'BHS',
  },
}

export default function Page() {
  const router = useRouter()

  const [language, setLanguage] = useState('de')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const t = useMemo(() => translations[language], [language])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setErrorMessage(t.userNotFound)
      setLoading(false)
      return
    }

    const normalizedEmail = user.email?.toLowerCase().trim()

    const { data: superadmin, error: superadminError } = await supabase
      .from('superadmins')
      .select('email')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (superadminError) {
      setErrorMessage(superadminError.message)
      setLoading(false)
      return
    }

    if (superadmin) {
      router.push('/superadmin')
      return
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
      setErrorMessage(profileError.message)
      setLoading(false)
      return
    }

    if (!profile) {
      setErrorMessage(t.profileNotFound)
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

    setErrorMessage(t.unknownRole)
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>{t.subtitle}</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder={t.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? t.loading : t.login}
          </button>
        </form>

        <div style={styles.linksBox}>
          <Link href="/forgot-password" style={styles.link}>
            {t.forgotPassword}
          </Link>

          <Link href="/register" style={styles.linkPrimary}>
            {t.register}
          </Link>
        </div>

        <div style={styles.languageRow}>
          <button
            type="button"
            onClick={() => setLanguage('de')}
            style={{
              ...styles.languageButton,
              ...(language === 'de' ? styles.languageButtonActive : {}),
            }}
          >
            {t.german}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            style={{
              ...styles.languageButton,
              ...(language === 'en' ? styles.languageButtonActive : {}),
            }}
          >
            {t.english}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('bhs')}
            style={{
              ...styles.languageButton,
              ...(language === 'bhs' ? styles.languageButtonActive : {}),
            }}
          >
            {t.bhs}
          </button>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #eef4fb 0%, #e7eef8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },

  card: {
    width: '100%',
    maxWidth: '460px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '36px 26px 28px 26px',
    boxShadow: '0 18px 60px rgba(22,59,122,0.12)',
    border: '1px solid rgba(22,59,122,0.06)',
  },

  logo: {
    display: 'block',
    width: '320px',
    maxWidth: '88%',
    height: 'auto',
    margin: '0 auto 24px auto',
    objectFit: 'contain',
  },

  subtitle: {
    textAlign: 'center',
    color: '#667085',
    marginBottom: '26px',
    fontSize: '15px',
    fontWeight: '500',
    lineHeight: '1.4',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },

  input: {
    width: '100%',
    padding: '15px 16px',
    borderRadius: '14px',
    border: '1px solid #d7deea',
    fontSize: '16px',
    outline: 'none',
    background: '#f9fbfe',
    color: '#111827',
    boxSizing: 'border-box',
  },

  button: {
    marginTop: '4px',
    width: '100%',
    padding: '15px',
    borderRadius: '14px',
    border: 'none',
    background: '#163b7a',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 8px 22px rgba(22,59,122,0.22)',
  },

  linksBox: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
  },

  link: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
  },

  linkPrimary: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '15px',
  },

  languageRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },

  languageButton: {
    border: '1px solid #d7deea',
    background: '#f9fbfe',
    color: '#163b7a',
    borderRadius: '999px',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
  },

  languageButtonActive: {
    background: '#163b7a',
    color: '#fff',
    border: '1px solid #163b7a',
  },

  error: {
    color: '#d92d20',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
    background: '#fff1f0',
    border: '1px solid #ffd3cf',
    borderRadius: '10px',
    padding: '10px 12px',
  },
}
