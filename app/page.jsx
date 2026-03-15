'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { translations, getLanguage, setLanguage } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Page() {
  const router = useRouter()

  const [language, setLang] = useState(getLanguage())
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const t = useMemo(() => translations[language], [language])

  const changeLanguage = (lang) => {
    setLang(lang)
    setLanguage(lang)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const loginEmail = email.trim().toLowerCase()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        setLoading(false)
        return
      }

      const user = data?.user

      if (!user) {
        setErrorMessage('Login user not found.')
        setLoading(false)
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', user.id)
        .single()

      if (profileError) {
        setErrorMessage(profileError.message)
        setLoading(false)
        return
      }

      if (!profile?.role) {
        setErrorMessage('Role not found in profiles.')
        setLoading(false)
        return
      }

      if (profile.role === 'superadmin') {
        router.replace('/superadmin')
        return
      }

      if (profile.role === 'admin') {
        router.replace('/dashboard')
        return
      }

      if (profile.role === 'worker') {
        router.replace('/worker')
        return
      }

      setErrorMessage(`Unknown role: ${profile.role}`)
      setLoading(false)
    } catch (err) {
      setErrorMessage(err.message || 'Unexpected login error.')
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>{t.subtitle}</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="current-password"
            required
          />

          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? t.loginLoading : t.login}
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

        <LanguageSwitcher
          language={language}
          onChange={changeLanguage}
          labels={t}
        />
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
    width: '250px',
    maxWidth: '88%',
    height: 'auto',
    margin: '0 auto 18px auto',
    objectFit: 'contain',
  },
  subtitle: {
    textAlign: 'center',
    color: '#667085',
    marginBottom: '26px',
    fontSize: '15px',
    fontWeight: '500',
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
