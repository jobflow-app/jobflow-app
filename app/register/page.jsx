'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { translations, getLanguage, setLanguage } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function RegisterPage() {
  const [language, setLang] = useState(getLanguage())
  const [companyName, setCompanyName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const t = useMemo(() => translations[language], [language])

  const changeLanguage = (lang) => {
    setLang(lang)
    setLanguage(lang)
  }

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
      setMessage('Check your email.')
      setLoading(false)
      return
    }

    const { data: companyRow, error: companyError } = await supabase
      .from('companies')
      .insert([
        {
          name: companyName,
          owner_email: normalizedEmail,
        },
      ])
      .select('id')
      .single()

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
          company_id: companyRow.id,
        },
      ])

    if (profileError) {
      setErrorMessage(profileError.message)
      setLoading(false)
      return
    }

    setMessage('OK')
    setLoading(false)
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>{t.registerTitle}</p>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder={t.companyName}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={styles.input}
            autoComplete="organization"
            required
          />

          <input
            type="text"
            placeholder={t.fullName}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            autoComplete="name"
            required
          />

          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoComplete="new-email"
            required
          />

          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
            required
          />

          {message ? <p style={styles.success}>{message}</p> : null}
          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? t.registerLoading : t.registerButton}
          </button>
        </form>

        <Link href="/" style={styles.link}>
          {t.backToLogin}
        </Link>

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
    background: '#fff',
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
    background: '#f9fbfe',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '15px',
    borderRadius: '14px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 8px 22px rgba(22,59,122,0.22)',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    marginTop: '18px',
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '700',
  },
  success: {
    color: '#067647',
    fontSize: '14px',
    margin: 0,
    textAlign: 'center',
    background: '#ecfdf3',
    border: '1px solid #abefc6',
    borderRadius: '10px',
    padding: '10px 12px',
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
