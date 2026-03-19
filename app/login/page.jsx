'use client'
import ThemeToggle from '@/components/ThemeToggle'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('DE')

  const handleLogin = async () => {
    try {
      setLoading(true)
      setError('')

      if (!email || !password) {
        setError('Bitte E-Mail und Passwort eingeben.')
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      const user = data?.user

      if (!user) {
        setError('Login fehlgeschlagen.')
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError || !profile) {
        setError('Profil nicht gefunden.')
        return
      }

      if (profile.role === 'superadmin') {
        router.push('/superadmin/dashboard')
      } else if (profile.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/worker/dashboard')
      }
    } catch (err) {
      console.error(err)
      setError('Etwas ist schiefgelaufen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.bgGlowOne} />
      <div style={styles.bgGlowTwo} />

      <section style={styles.shell}>
        <div style={styles.leftPanel}>
          <div style={styles.brandBadge}>JOBFLOW</div>
          <h1 style={styles.heroTitle}>
            Mehr Überblick.
            <br />
            Weniger Chaos.
          </h1>
          <p style={styles.heroText}>
            JobFlow verbindet Aufträge, Kunden, Mitarbeiter, Rechnungen und Live-Standorte
            in einem modernen Handwerk-System.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>• Aufträge schneller verwalten</div>
            <div style={styles.featureItem}>• Mitarbeiter live koordinieren</div>
            <div style={styles.featureItem}>• Rechnungen und Kunden zentral steuern</div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTop}>
            <img src="/logo.png" alt="JobFlow" style={styles.logo} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.langSelect}
            >
              <option value="DE">DE</option>
              <option value="EN">EN</option>
              <option value="BHS">BHS</option>
            </select>
          </div>

          <h2 style={styles.cardTitle}>Willkommen zurück</h2>
          <p style={styles.cardSubtitle}>
            Melden Sie sich in Ihrem JobFlow-Konto an
          </p>

          <div style={styles.form}>
            <label style={styles.label}>E-Mail</label>
            <input
              type="email"
              placeholder="ihre@email.de"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>Passwort</label>
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.passwordInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showBtn}
              >
                {showPassword ? 'Verbergen' : 'Anzeigen'}
              </button>
            </div>

            <div style={styles.linksRow}>
              <Link href="/forgot-password" style={styles.inlineLink}>
                Passwort vergessen?
              </Link>
            </div>

            <button onClick={handleLogin} style={styles.button} disabled={loading}>
              {loading ? 'Bitte warten...' : 'Anmelden'}
            </button>

            {error ? <p style={styles.error}>{error}</p> : null}

            <div style={styles.registerBox}>
              <span style={styles.registerText}>Noch kein Konto?</span>
              <Link href="/register" style={styles.registerLink}>
                Jetzt registrieren
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(180deg, #f5f8fd 0%, #eaf0f8 100%)',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgGlowOne: {
    position: 'absolute',
    top: '-120px',
    left: '-120px',
    width: '320px',
    height: '320px',
    borderRadius: '999px',
    background: 'rgba(37, 99, 235, 0.10)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },

  bgGlowTwo: {
    position: 'absolute',
    right: '-80px',
    bottom: '-80px',
    width: '280px',
    height: '280px',
    borderRadius: '999px',
    background: 'rgba(22, 59, 122, 0.10)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },

  shell: {
    width: '100%',
    maxWidth: '1180px',
    display: 'grid',
    gridTemplateColumns: '1.05fr 0.95fr',
    gap: '28px',
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 1,
  },

  leftPanel: {
    background: 'linear-gradient(135deg, #163b7a 0%, #214d9a 55%, #2563eb 100%)',
    borderRadius: '32px',
    padding: '42px',
    color: '#fff',
    boxShadow: '0 25px 70px rgba(22, 59, 122, 0.22)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '680px',
  },

  brandBadge: {
    display: 'inline-flex',
    width: 'fit-content',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.14)',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.12em',
    marginBottom: '20px',
  },

  heroTitle: {
    fontSize: '54px',
    lineHeight: 1.02,
    fontWeight: '900',
    marginBottom: '18px',
  },

  heroText: {
    fontSize: '17px',
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.88)',
    maxWidth: '520px',
    marginBottom: '28px',
  },

  featureList: {
    display: 'grid',
    gap: '12px',
  },

  featureItem: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '700',
  },

  card: {
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.75)',
    borderRadius: '32px',
    padding: '36px',
    boxShadow: '0 20px 60px rgba(15, 23, 42, 0.08)',
    minHeight: '680px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '22px',
  },

  logo: {
    height: '54px',
    objectFit: 'contain',
  },

  langSelect: {
    border: '1px solid #dbe2ea',
    borderRadius: '12px',
    padding: '10px 12px',
    background: '#fff',
    fontWeight: '800',
    color: '#163b7a',
    outline: 'none',
  },

  cardTitle: {
    fontSize: '38px',
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: '10px',
  },

  cardSubtitle: {
    fontSize: '15px',
    color: '#64748b',
    marginBottom: '26px',
    lineHeight: 1.6,
  },

  form: {
    width: '100%',
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '8px',
  },

  input: {
    width: '100%',
    height: '56px',
    borderRadius: '16px',
    border: '1px solid #dbe2ea',
    background: '#f8fbff',
    padding: '0 16px',
    fontSize: '15px',
    marginBottom: '16px',
    outline: 'none',
  },

  passwordWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    borderRadius: '16px',
    border: '1px solid #dbe2ea',
    background: '#f8fbff',
    marginBottom: '14px',
    overflow: 'hidden',
  },

  passwordInput: {
    height: '56px',
    border: 'none',
    background: 'transparent',
    padding: '0 16px',
    fontSize: '15px',
    outline: 'none',
  },

  showBtn: {
    height: '56px',
    padding: '0 18px',
    border: 'none',
    borderLeft: '1px solid #dbe2ea',
    background: 'rgba(37, 99, 235, 0.08)',
    color: '#163b7a',
    fontWeight: '800',
    cursor: 'pointer',
  },

  linksRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '18px',
  },

  inlineLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '14px',
  },

  button: {
    width: '100%',
    height: '58px',
    border: 'none',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer',
    boxShadow: '0 16px 30px rgba(37, 99, 235, 0.28)',
  },

  error: {
    marginTop: '14px',
    color: '#b91c1c',
    fontWeight: '700',
    fontSize: '14px',
  },

  registerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },

  registerText: {
    color: '#64748b',
    fontSize: '14px',
  },

  registerLink: {
    color: '#163b7a',
    textDecoration: 'none',
    fontWeight: '900',
    fontSize: '14px',
  },
}
