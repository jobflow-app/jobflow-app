'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { translations, getLanguage, setLanguage } from '@/lib/i18n'

export default function UpdatePasswordPage() {
  const router = useRouter()

  const [language, setLang] = useState(getLanguage())
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const t = useMemo(() => translations[language], [language])

  const changeLanguage = (lang) => {
    setLang(lang)
    setLanguage(lang)
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    if (password !== confirmPassword) {
      setErrorMessage(
        language === 'de'
          ? 'Passwörter stimmen nicht überein.'
          : language === 'en'
            ? 'Passwords do not match.'
            : 'Lozinke se ne poklapaju.'
      )
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setErrorMessage(error.message)
        setLoading(false)
        return
      }

      setSuccessMessage(
        language === 'de'
          ? 'Passwort erfolgreich geändert.'
          : language === 'en'
            ? 'Password updated successfully.'
            : 'Lozinka je uspješno promijenjena.'
      )

      setLoading(false)

      setTimeout(() => {
        router.push('/login')
      }, 1800)
    } catch (err) {
      setErrorMessage(err.message || 'Update password error.')
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img src="/logo.png" alt="JobFlow" style={styles.logo} />

        <p style={styles.subtitle}>
          {language === 'de'
            ? 'Neues Passwort'
            : language === 'en'
              ? 'New password'
              : 'Nova lozinka'}
        </p>

        <form onSubmit={handleUpdatePassword} style={styles.form}>
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
            required
          />

          <input
            type="password"
            placeholder={
              language === 'de'
                ? 'Passwort bestätigen'
                : language === 'en'
                  ? 'Confirm password'
                  : 'Potvrdi lozinku'
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            autoComplete="new-password"
            required
          />

          {errorMessage ? <p style={styles.error}>{errorMessage}</p> : null}
          {successMessage ? <p style={styles.success}>{successMessage}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading
              ? language === 'de'
                ? 'Speichern...'
                : language === 'en'
                  ? 'Saving...'
                  : 'Spremam...'
              : language === 'de'
                ? 'Passwort speichern'
                : language === 'en'
                  ? 'Save password'
                  : 'Spremi lozinku'}
          </button>
        </form>

        <div style={styles.linksBox}>
          <Link href="/login" style={styles.link}>
            {language === 'de'
              ? 'Zurück zum Login'
              : language === 'en'
                ? 'Back to login'
                : 'Nazad na login'}
          </Link>
        </div>

        <div style={styles.languageRow}>
          <button
            type="button"
            onClick={() => changeLanguage('de')}
            style={{
              ...styles.languageButton,
              ...(language === 'de' ? styles.languageButtonActive : {}),
            }}
          >
            {t.languageDe}
          </button>

          <button
            type="button"
            onClick={() => changeLanguage('en')}
            style={{
              ...styles.languageButton,
              ...(language === 'en' ? styles.languageButtonActive : {}),
            }}
          >
            {t.languageEn}
          </button>

          <button
            type="button"
            onClick={() => changeLanguage('bhs')}
            style={{
              ...styles.languageButton,
              ...(language === 'bhs' ? styles.languageButtonActive : {}),
            }}
          >
            {t.languageBhs}
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
    fontSize: '18px',
    fontWeight: '700',
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
    fontWeight: '700',
    fontSize: '14px',
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
}
