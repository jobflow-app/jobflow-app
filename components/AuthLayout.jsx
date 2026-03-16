'use client'

import Image from 'next/image'

export default function AuthLayout({
  title,
  subtitle,
  children,
  language,
  setLanguage,
}) {
  const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'bhs', label: 'BHS' },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Image
            src="/logo.png"
            alt="JobFlow"
            width={220}
            height={70}
            style={styles.logo}
            priority
          />
        </div>

        <div style={styles.divider} />

        <div style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          {subtitle ? <p style={styles.subtitle}>{subtitle}</p> : null}
        </div>

        <div>{children}</div>

        <div style={styles.languageWrap}>
          {languages.map((item) => {
            const active = language === item.code
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                style={{
                  ...styles.languageButton,
                  ...(active ? styles.languageButtonActive : {}),
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    overflow: 'hidden',
    background:
      'linear-gradient(180deg, #1261db 0%, #2d83f4 45%, #91c7ff 100%)',
  },
  glowOne: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.18)',
    filter: 'blur(70px)',
    top: '12%',
    left: '8%',
  },
  glowTwo: {
    position: 'absolute',
    width: '360px',
    height: '360px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.14)',
    filter: 'blur(70px)',
    bottom: '10%',
    right: '10%',
  },
  card: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '560px',
    background: 'rgba(255,255,255,0.96)',
    borderRadius: '28px',
    padding: '34px 34px 26px',
    boxShadow: '0 24px 60px rgba(10, 52, 126, 0.22)',
    backdropFilter: 'blur(6px)',
  },
  logoWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '18px',
  },
  logo: {
    width: 'auto',
    height: 'auto',
    maxWidth: '240px',
  },
  divider: {
    height: '1px',
    background: '#dbe5f2',
    marginBottom: '26px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '34px',
    lineHeight: 1.15,
    fontWeight: 800,
    color: '#163b7a',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    margin: '10px 0 0',
    color: '#5f6f89',
    fontSize: '15px',
    lineHeight: 1.5,
  },
  languageWrap: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '22px',
    flexWrap: 'wrap',
  },
  languageButton: {
    border: 'none',
    borderRadius: '999px',
    padding: '10px 16px',
    background: 'transparent',
    color: '#214a8a',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  languageButtonActive: {
    background: '#0f56cf',
    color: '#fff',
    boxShadow: '0 8px 18px rgba(15, 86, 207, 0.24)',
  },
}
