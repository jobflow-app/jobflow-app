'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/AuthLayout'
import { supabase } from '@/lib/supabase'
import {
  authTexts,
  getInitialLanguage,
  saveLanguage,
} from '@/lib/auth-i18n'

export default function RegisterPage() {
  const router = useRouter()

  const [language, setLanguageState] = useState('de')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setLanguageState(getInitialLanguage())
  }, [])

  const t = useMemo(() => authTexts[language] || authTexts.de, [language])

  function handleLanguageChange(nextLanguage) {
    setLanguageState(nextLanguage)
    saveLanguage(nextLanguage)
  }

  async function handleRegister(e) {
    e.preventDefault()
    setErrorMessage('')

    if (!companyName || !email || !password) {
      setErrorMessage(t.requiredFields)
      return
    }

    if (password.length < 6) {
      setErrorMessage(t.passwordTooShort)
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          company_name: companyName,
          preferred_language: language,
        },
      },
    })

    if (error) {
      setErrorMessage(error.message || t.genericError)
      setLoading(false)
      return
    }

    router.push('/login')
  }

  return (
    <AuthLayout
      title={t.registerTitle}
      subtitle={t.registerSubtitle}
      language={language}
      setLanguage={handleLanguageChange}
    >
      <form onSubmit={handleRegister} style={styles.form}>
        <label style={styles.label}>{t.companyName}</label>
        <input
          type="text"
          placeholder={t.companyName}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>{t.email}</label>
        <input
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>{t.password}</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {errorMessage ? (
          <p style={styles.error}>{errorMessage}</p>
        ) : null}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? t.loading : t.register}
        </button>

        <p style={styles.trial}>{t.trialText}</p>

        <div style={styles.bottomCenter}>
          <Link href="/login" style={styles.link}>
            {t.backToLogin}
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#294770',
    marginBottom: '8px',
    marginTop: '4px',
  },
  input: {
    height: '56px',
    borderRadius: '14px',
    border: '1px solid #d6e1ee',
    padding: '0 16px',
    fontSize: '16px',
    outline: 'none',
    background: '#fbfdff',
    color: '#163b7a',
    marginBottom: '18px',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
  },
  button: {
    height: '58px',
    border: 'none',
    borderRadius: '16px',
    background: 'linear-gradient(180deg, #1f74f2 0%, #0f56cf 100%)',
    color: '#fff',
    fontSize: '22px',
    fontWeight: 800,
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 16px 28px rgba(15, 86, 207, 0.24)',
  },
  trial: {
    textAlign: 'center',
    color: '#456791',
    fontWeight: 700,
    marginTop: '16px',
    marginBottom: '8px',
  },
  bottomCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '6px',
  },
  link: {
    color: '#1f63d0',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '15px',
  },
  error: {
    margin: '0 0 12px',
    color: '#c62828',
    fontWeight: 600,
    fontSize: '14px',
  },
}
