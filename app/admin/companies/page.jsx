'use client'

import Link from 'next/link'

export default function AdminCompaniesPage() {

  const companies = [
    {
      name: 'VS Technik',
      city: 'Bad Reichenhall',
      workers: 4,
      clients: 28,
      status: 'Active',
    },
    {
      name: 'Elektro Hammer',
      city: 'München',
      workers: 7,
      clients: 41,
      status: 'Trial',
    },
    {
      name: 'Bau Service Keller',
      city: 'Salzburg',
      workers: 3,
      clients: 19,
      status: 'Active',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div>
            <p style={styles.badge}>SUPERADMIN CONTROL</p>
            <h1 style={styles.title}>Firmen Übersicht</h1>
            <p style={styles.subtitle}>
              Alle registrierten Firmen im JobFlow System.
            </p>
          </div>

          <Link href="/admin" style={styles.backButton}>
            Zurück
          </Link>
        </div>

        <div style={styles.tableCard}>

          <div style={styles.tableHeader}>
            <div>Firma</div>
            <div>Stadt</div>
            <div>Mitarbeiter</div>
            <div>Kunden</div>
            <div>Status</div>
            <div></div>
          </div>

          {companies.map((company, index) => (
            <div key={index} style={styles.row}>
              <div style={styles.companyName}>{company.name}</div>
              <div>{company.city}</div>
              <div>{company.workers}</div>
              <div>{company.clients}</div>

              <div>
                <span
                  style={
                    company.status === 'Active'
                      ? styles.active
                      : styles.trial
                  }
                >
                  {company.status}
                </span>
              </div>

              <div>
                <button style={styles.viewButton}>
                  Öffnen
                </button>
              </div>
            </div>
          ))}

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
    padding: '30px',
  },

  container: {
    maxWidth: '1300px',
    margin: '0 auto',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '26px',
    flexWrap: 'wrap',
    gap: '20px',
  },

  badge: {
    color: '#9dc4ff',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.08em',
    marginBottom: '10px',
  },

  title: {
    margin: 0,
    fontSize: '40px',
    color: '#ffffff',
    fontWeight: '900',
    marginBottom: '10px',
  },

  subtitle: {
    margin: 0,
    color: 'rgba(255,255,255,0.75)',
    fontSize: '15px',
  },

  backButton: {
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.1)',
    color: '#ffffff',
    padding: '12px 16px',
    borderRadius: '12px',
    fontWeight: '700',
    border: '1px solid rgba(255,255,255,0.15)',
  },

  tableCard: {
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '24px',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
  },

  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
    fontWeight: '700',
    color: '#bcd6ff',
    marginBottom: '14px',
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 120px',
    alignItems: 'center',
    padding: '14px 0',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    color: '#ffffff',
  },

  companyName: {
    fontWeight: '800',
  },

  active: {
    background: '#1f8f4c',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '12px',
  },

  trial: {
    background: '#c89b18',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '12px',
  },

  viewButton: {
    background: '#ffffff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontWeight: '700',
    cursor: 'pointer',
  },
}
