'use client'

import Link from 'next/link'

export default function AdminSystemPage() {
  const systemCards = [
    {
      title: 'Systemstatus',
      value: 'Online',
      text: 'Alle Kernmodule laufen stabil.',
    },
    {
      title: 'Datenbank',
      value: 'Stabil',
      text: 'Verbindungen und Tabellen funktionieren normal.',
    },
    {
      title: 'Auth',
      value: 'Aktiv',
      text: 'Login, Rollen und Sitzungen sind verfügbar.',
    },
    {
      title: 'Deploy',
      value: 'Letzter Build aktiv',
      text: 'Die aktuellste Version ist veröffentlicht.',
    },
  ]

  const logs = [
    'Superadmin Login erfolgreich',
    'Neue Registrierung verarbeitet',
    'Rollenprüfung erfolgreich abgeschlossen',
    'Dashboard-Modul geladen',
    'Systemüberwachung aktiv',
  ]

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.topBar}>
          <div>
            <p style={styles.eyebrow}>JOBFLOW SYSTEM CENTER</p>
            <h1 style={styles.title}>System & Kontrolle</h1>
            <p style={styles.subtitle}>
              Vollständiger Überblick über Plattform, Authentifizierung,
              Datenbank und Betriebsstatus.
            </p>
          </div>

          <Link href="/admin" style={styles.backButton}>
            Zurück zum Superadmin
          </Link>
        </div>

        <div style={styles.statsGrid}>
          {systemCards.map((item) => (
            <div key={item.title} style={styles.statCard}>
              <p style={styles.statLabel}>{item.title}</p>
              <h3 style={styles.statValue}>{item.value}</h3>
              <p style={styles.statText}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={styles.mainGrid}>
          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Systemmodule</h2>

            <div style={styles.moduleGrid}>
              <div style={styles.moduleCard}>
                <h3 style={styles.moduleTitle}>Authentifizierung</h3>
                <p style={styles.moduleText}>
                  Login, Rollen, Sessions und Passwort-Reset.
                </p>
              </div>

              <div style={styles.moduleCard}>
                <h3 style={styles.moduleTitle}>Datenbank</h3>
                <p style={styles.moduleText}>
                  Firmen, Nutzer, Jobs, Kunden und Systemdaten.
                </p>
              </div>

              <div style={styles.moduleCard}>
                <h3 style={styles.moduleTitle}>Superadmin Zugriff</h3>
                <p style={styles.moduleText}>
                  Globaler Zugriff über alle Firmen und Bereiche hinweg.
                </p>
              </div>

              <div style={styles.moduleCard}>
                <h3 style={styles.moduleTitle}>Deploy & Versionen</h3>
                <p style={styles.moduleText}>
                  Build-Status, Fehlerkontrolle und aktive Releases.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.sidePanel}>
            <h2 style={styles.panelTitle}>Letzte Ereignisse</h2>

            <div style={styles.logList}>
              {logs.map((log, index) => (
                <div key={index} style={styles.logItem}>
                  <div style={styles.logDot} />
                  <p style={styles.logText}>{log}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, #244b8f 0%, #12294f 38%, #091525 100%)',
    padding: '28px',
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },

  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '26px',
  },

  eyebrow: {
    margin: 0,
    color: '#b8d2ff',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.08em',
    marginBottom: '10px',
  },

  title: {
    margin: 0,
    color: '#ffffff',
    fontSize: '44px',
    fontWeight: '900',
    marginBottom: '12px',
  },

  subtitle: {
    margin: 0,
    color: 'rgba(255,255,255,0.78)',
    maxWidth: '760px',
    lineHeight: '1.6',
    fontSize: '16px',
  },

  backButton: {
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    padding: '14px 18px',
    borderRadius: '14px',
    fontWeight: '800',
    border: '1px solid rgba(255,255,255,0.14)',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },

  statCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '22px',
    boxShadow: '0 18px 40px rgba(0,0,0,0.20)',
    backdropFilter: 'blur(12px)',
  },

  statLabel: {
    margin: 0,
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    marginBottom: '10px',
  },

  statValue: {
    margin: 0,
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: '900',
    marginBottom: '8px',
  },

  statText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '22px',
  },

  panel: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '28px',
    padding: '26px',
    boxShadow: '0 22px 60px rgba(0,0,0,0.20)',
    backdropFilter: 'blur(12px)',
  },

  sidePanel: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '28px',
    padding: '26px',
    boxShadow: '0 22px 60px rgba(0,0,0,0.20)',
    backdropFilter: 'blur(12px)',
  },

  panelTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '900',
    marginBottom: '18px',
  },

  moduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
  },

  moduleCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '22px',
    padding: '20px',
  },

  moduleTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '800',
    marginBottom: '10px',
  },

  moduleText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
    lineHeight: '1.6',
  },

  logList: {
    display: 'grid',
    gap: '14px',
  },

  logItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },

  logDot: {
    width: '10px',
    height: '10px',
    borderRadius: '999px',
    background: '#8ab4ff',
    marginTop: '6px',
    flexShrink: 0,
  },

  logText: {
    margin: 0,
    color: 'rgba(255,255,255,0.78)',
    fontSize: '14px',
    lineHeight: '1.5',
  },
}
