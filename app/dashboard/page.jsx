'use client'

import Link from 'next/link'

export default function DashboardPage() {
  const cards = [
    {
      title: 'Kunden',
      description: 'Kunden verwalten und neue Kontakte anlegen.',
      href: '/clients',
    },
    {
      title: 'Mitarbeiter',
      description: 'Mitarbeiterübersicht und Rollen verwalten.',
      href: '/workers',
    },
    {
      title: 'Aufträge',
      description: 'Aufträge anlegen, planen und verfolgen.',
      href: '/jobs',
    },
    {
      title: 'Karte',
      description: 'Standorte und Übersicht auf der Karte.',
      href: '/map',
    },
    {
      title: 'Rechnungen',
      description: 'Rechnungen und Zahlungen verwalten.',
      href: '/invoices',
    },
    {
      title: 'Einstellungen',
      description: 'Firmen- und Systemeinstellungen bearbeiten.',
      href: '/settings',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>
              Willkommen im JobFlow Adminbereich.
            </p>
          </div>

          <Link href="/login" style={styles.logoutButton}>
            Logout
          </Link>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Aktive Aufträge</p>
            <h3 style={styles.statValue}>12</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Mitarbeiter</p>
            <h3 style={styles.statValue}>4</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Kunden</p>
            <h3 style={styles.statValue}>28</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Offene Rechnungen</p>
            <h3 style={styles.statValue}>3</h3>
          </div>
        </div>

        <div style={styles.grid}>
          {cards.map((card) => (
            <Link key={card.title} href={card.href} style={styles.card}>
              <h2 style={styles.cardTitle}>{card.title}</h2>
              <p style={styles.cardText}>{card.description}</p>
              <span style={styles.cardLink}>Öffnen</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef2f7',
    padding: '24px',
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '28px',
  },

  title: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#163b7a',
    margin: 0,
    marginBottom: '6px',
  },

  subtitle: {
    margin: 0,
    color: '#667085',
    fontSize: '15px',
  },

  logoutButton: {
    background: '#163b7a',
    color: '#fff',
    textDecoration: 'none',
    padding: '12px 18px',
    borderRadius: '12px',
    fontWeight: '700',
  },

  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },

  statCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
  },

  statLabel: {
    margin: 0,
    color: '#667085',
    fontSize: '14px',
    marginBottom: '8px',
  },

  statValue: {
    margin: 0,
    fontSize: '30px',
    fontWeight: '800',
    color: '#163b7a',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '18px',
  },

  card: {
    display: 'block',
    background: '#fff',
    borderRadius: '22px',
    padding: '22px',
    textDecoration: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    border: '1px solid #e4e7ec',
  },

  cardTitle: {
    margin: 0,
    marginBottom: '10px',
    fontSize: '22px',
    fontWeight: '800',
    color: '#163b7a',
  },

  cardText: {
    margin: 0,
    color: '#667085',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '18px',
  },

  cardLink: {
    color: '#163b7a',
    fontWeight: '700',
    fontSize: '14px',
  },
}
