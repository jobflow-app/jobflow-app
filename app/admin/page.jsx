'use client'

import Link from 'next/link'

export default function AdminPage() {
  const stats = [
    { label: 'Firmen gesamt', value: '24' },
    { label: 'Aktive Admins', value: '31' },
    { label: 'Mitarbeiter gesamt', value: '86' },
    { label: 'Aktive Aufträge', value: '142' },
    { label: 'Kunden gesamt', value: '518' },
    { label: 'Monatsumsatz', value: '€ 12.480' },
  ]

  const sections = [
    {
      title: 'Firmen',
      description: 'Alle Firmen ansehen, prüfen und verwalten.',
      href: '/admin/companies',
    },
    {
      title: 'Admins',
      description: 'Firmen-Admins und Zugriffsrechte kontrollieren.',
      href: '/admin/admins',
    },
    {
      title: 'Mitarbeiter',
      description: 'Alle Mitarbeiter über alle Firmen hinweg einsehen.',
      href: '/admin/workers',
    },
    {
      title: 'Kunden',
      description: 'Zentraler Überblick über alle Kunden und Einträge.',
      href: '/admin/clients',
    },
    {
      title: 'Aufträge',
      description: 'Alle Jobs, Status, Prioritäten und Abläufe prüfen.',
      href: '/admin/jobs',
    },
    {
      title: 'Abos & Trial',
      description: 'Pakete, Testphasen und Laufzeiten verwalten.',
      href: '/admin/subscriptions',
    },
    {
      title: 'Rechnungen',
      description: 'Rechnungen, Zahlungen und offene Posten prüfen.',
      href: '/admin/invoices',
    },
    {
      title: 'System',
      description: 'Systemstatus, Logs, Sicherheit und Plattformkontrolle.',
      href: '/admin/system',
    },
  ]

  const activity = [
    'Neue Firma registriert: Elektro Hammer GmbH',
    'Trial gestartet: VS Technik',
    'Neuer Mitarbeiter hinzugefügt: worker1@vs-technik.de',
    'Offene Rechnung markiert: Firma #12',
    'Superadmin Login erfolgreich',
  ]

  return (
    <main style={styles.page}>
      <div style={styles.overlay} />

      <div style={styles.container}>
        <section style={styles.hero}>
          <div style={styles.heroLeft}>
            <div style={styles.badge}>ULTRA PREMIUM SUPERADMIN</div>

            <h1 style={styles.title}>JobFlow Control Center</h1>

            <p style={styles.subtitle}>
              Vollständige Kontrolle über Firmen, Mitarbeiter, Kunden, Aufträge,
              Abonnements und das gesamte System.
            </p>

            <div style={styles.heroButtons}>
              <Link href="/dashboard" style={styles.primaryButton}>
                Firmen-Dashboard
              </Link>

              <Link href="/login" style={styles.secondaryButton}>
                Logout
              </Link>
            </div>
          </div>

          <div style={styles.heroRight}>
            <div style={styles.heroCard}>
              <p style={styles.heroCardLabel}>Systemstatus</p>
              <h3 style={styles.heroCardValue}>Online</h3>
              <p style={styles.heroCardText}>
                Alle Kernbereiche laufen stabil.
              </p>
            </div>

            <div style={styles.heroCard}>
              <p style={styles.heroCardLabel}>Zugriffsebene</p>
              <h3 style={styles.heroCardValue}>Superadmin</h3>
              <p style={styles.heroCardText}>
                Vollzugriff auf alle Bereiche.
              </p>
            </div>
          </div>
        </section>

        <section style={styles.statsGrid}>
          {stats.map((item) => (
            <div key={item.label} style={styles.statCard}>
              <p style={styles.statLabel}>{item.label}</p>
              <h3 style={styles.statValue}>{item.value}</h3>
            </div>
          ))}
        </section>

        <section style={styles.mainGrid}>
          <div style={styles.leftColumn}>
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Zentrale Bereiche</h2>
                <p style={styles.sectionText}>
                  Direkter Zugriff auf alle Hauptmodule der Plattform.
                </p>
              </div>

              <div style={styles.modulesGrid}>
                {sections.map((section) => (
                  <Link key={section.title} href={section.href} style={styles.moduleCard}>
                    <h3 style={styles.moduleTitle}>{section.title}</h3>
                    <p style={styles.moduleText}>{section.description}</p>
                    <span style={styles.moduleLink}>Öffnen</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.sideCard}>
              <h2 style={styles.sideTitle}>Letzte Aktivitäten</h2>

              <div style={styles.activityList}>
                {activity.map((item, index) => (
                  <div key={index} style={styles.activityItem}>
                    <div style={styles.dot} />
                    <p style={styles.activityText}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.sideCard}>
              <h2 style={styles.sideTitle}>Schnellzugriff</h2>

              <div style={styles.quickActions}>
                <Link href="/admin/companies" style={styles.quickButton}>
                  Firmen
                </Link>

                <Link href="/admin/jobs" style={styles.quickButton}>
                  Aufträge
                </Link>

                <Link href="/admin/workers" style={styles.quickButton}>
                  Mitarbeiter
                </Link>

                <Link href="/admin/system" style={styles.quickButton}>
                  System
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    background:
      'radial-gradient(circle at top left, #244b8f 0%, #12294f 38%, #091525 100%)',
    padding: '28px',
    overflow: 'hidden',
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 45%)',
    pointerEvents: 'none',
  },

  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1400px',
    margin: '0 auto',
  },

  hero: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 0.9fr',
    gap: '22px',
    marginBottom: '24px',
  },

  heroLeft: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '30px',
    padding: '34px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
  },

  heroRight: {
    display: 'grid',
    gap: '18px',
  },

  heroCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '26px',
    padding: '26px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.20)',
  },

  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 14px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.12)',
    color: '#d7e6ff',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.08em',
    marginBottom: '18px',
  },

  title: {
    fontSize: '48px',
    lineHeight: '1.05',
    color: '#ffffff',
    margin: 0,
    marginBottom: '16px',
    fontWeight: '900',
  },

  subtitle: {
    margin: 0,
    fontSize: '17px',
    lineHeight: '1.6',
    color: 'rgba(255,255,255,0.82)',
    maxWidth: '720px',
  },

  heroButtons: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    marginTop: '28px',
  },

  primaryButton: {
    textDecoration: 'none',
    background: '#ffffff',
    color: '#163b7a',
    padding: '14px 20px',
    borderRadius: '14px',
    fontWeight: '800',
    boxShadow: '0 12px 28px rgba(255,255,255,0.18)',
  },

  secondaryButton: {
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    padding: '14px 20px',
    borderRadius: '14px',
    fontWeight: '800',
    border: '1px solid rgba(255,255,255,0.16)',
  },

  heroCardLabel: {
    margin: 0,
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    marginBottom: '10px',
  },

  heroCardValue: {
    margin: 0,
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: '900',
    marginBottom: '8px',
  },

  heroCardText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },

  statCard: {
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '22px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.18)',
  },

  statLabel: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
    marginBottom: '10px',
  },

  statValue: {
    margin: 0,
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '900',
  },

  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.45fr 0.75fr',
    gap: '22px',
  },

  leftColumn: {
    display: 'grid',
  },

  rightColumn: {
    display: 'grid',
    gap: '22px',
    alignContent: 'start',
  },

  sectionCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '30px',
    padding: '28px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 26px 70px rgba(0,0,0,0.22)',
  },

  sectionHeader: {
    marginBottom: '18px',
  },

  sectionTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '900',
    marginBottom: '8px',
  },

  sectionText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
  },

  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '16px',
  },

  moduleCard: {
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '22px',
    padding: '22px',
    display: 'block',
    boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
  },

  moduleTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '800',
    marginBottom: '10px',
  },

  moduleText: {
    margin: 0,
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '18px',
  },

  moduleLink: {
    color: '#dbe8ff',
    fontSize: '14px',
    fontWeight: '800',
  },

  sideCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '28px',
    padding: '24px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 22px 60px rgba(0,0,0,0.20)',
  },

  sideTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '22px',
    fontWeight: '900',
    marginBottom: '18px',
  },

  activityList: {
    display: 'grid',
    gap: '14px',
  },

  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },

  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '999px',
    background: '#8ab4ff',
    marginTop: '6px',
    flexShrink: 0,
  },

  activityText: {
    margin: 0,
    color: 'rgba(255,255,255,0.78)',
    fontSize: '14px',
    lineHeight: '1.5',
  },

  quickActions: {
    display: 'grid',
    gap: '12px',
  },

  quickButton: {
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.08)',
    color: '#ffffff',
    padding: '14px 16px',
    borderRadius: '14px',
    fontWeight: '700',
    border: '1px solid rgba(255,255,255,0.12)',
  },
}
