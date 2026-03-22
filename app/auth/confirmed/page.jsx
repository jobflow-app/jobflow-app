import Link from 'next/link'

export default function ConfirmedPage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.badge}>JOBFLOW</div>
        <h1 style={styles.title}>E-Mail erfolgreich bestätigt</h1>
        <p style={styles.text}>
          Ihr Konto wurde erfolgreich bestätigt.
          Sie können sich jetzt mit Ihren Zugangsdaten anmelden.
        </p>

        <Link href="/login" style={styles.button}>
          Zum Login
        </Link>
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
    background: 'linear-gradient(135deg, #f8fbff 0%, #eef4ff 45%, #f8fbff 100%)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '620px',
    background: '#ffffff',
    borderRadius: '28px',
    padding: '48px',
    boxShadow: '0 30px 80px rgba(15, 23, 42, 0.10)',
    border: '1px solid rgba(148, 163, 184, 0.18)',
    textAlign: 'center',
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
  title: {
    fontSize: '38px',
    fontWeight: '900',
    color: '#0f172a',
    margin: '0 0 18px 0',
  },
  text: {
    fontSize: '17px',
    lineHeight: 1.7,
    color: '#475569',
    marginBottom: '28px',
  },
  button: {
    display: 'inline-block',
    padding: '14px 22px',
    borderRadius: '12px',
    background: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '800',
  },
}
