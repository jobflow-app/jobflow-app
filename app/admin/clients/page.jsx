'use client'

export default function AdminClientsPage() {
  const clients = [
    {
      name: 'Müller Heizung',
      contact: 'Herr Müller',
      email: 'mueller@firma.de',
      phone: '+49 151 2345678',
      city: 'Salzburg',
      status: 'Aktiv',
    },
    {
      name: 'Schneider Elektro',
      contact: 'Frau Schneider',
      email: 'kontakt@schneider-elektro.de',
      phone: '+49 152 9876543',
      city: 'Freilassing',
      status: 'Aktiv',
    },
    {
      name: 'Bauer Sanitär',
      contact: 'Herr Bauer',
      email: 'info@bauer-sanitaer.de',
      phone: '+49 160 5554433',
      city: 'Bad Reichenhall',
      status: 'Neu',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Kunden</h1>
          <p style={styles.subtitle}>
            Übersicht aller Firmenkunden und Ansprechpartner.
          </p>
        </div>

        <button style={styles.newBtn}>+ Neuer Kunde</button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Gesamte Kunden</p>
          <h3 style={styles.statValue}>148</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Neue Kunden</p>
          <h3 style={styles.statValue}>12</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Aktive Firmen</p>
          <h3 style={styles.statValue}>131</h3>
        </div>
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Firma</span>
          <span>Ansprechpartner</span>
          <span>E-Mail</span>
          <span>Telefon</span>
          <span>Ort</span>
          <span>Status</span>
        </div>

        {clients.map((client, index) => (
          <div key={index} style={styles.row}>
            <div style={styles.name}>{client.name}</div>
            <div style={styles.text}>{client.contact}</div>
            <div style={styles.text}>{client.email}</div>
            <div style={styles.text}>{client.phone}</div>
            <div style={styles.text}>{client.city}</div>
            <div>
              <span
                style={{
                  ...styles.badge,
                  ...(client.status === 'Aktiv' ? styles.green : styles.blue),
                }}
              >
                {client.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

const styles = {
  page: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '6px',
  },
  subtitle: {
    color: '#64748b',
  },
  newBtn: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '12px',
    fontWeight: '800',
    cursor: 'pointer',
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '20px',
  },
  statCard: {
    background: '#fff',
    borderRadius: '18px',
    padding: '18px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  },
  statLabel: {
    fontSize: '13px',
    color: '#64748b',
    marginBottom: '8px',
    fontWeight: '700',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#163b7a',
  },
  table: {
    background: '#fff',
    borderRadius: '18px',
    padding: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    overflowX: 'auto',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1.2fr 1fr 0.8fr 0.7fr',
    padding: '12px',
    fontWeight: '800',
    color: '#2563eb',
    fontSize: '12px',
    textTransform: 'uppercase',
    gap: '12px',
    minWidth: '900px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1.2fr 1fr 0.8fr 0.7fr',
    padding: '14px 12px',
    borderTop: '1px solid #eef2f7',
    alignItems: 'center',
    gap: '12px',
    minWidth: '900px',
  },
  name: {
    fontWeight: '800',
    color: '#0f172a',
  },
  text: {
    fontWeight: '600',
    color: '#334155',
    fontSize: '14px',
  },
  badge: {
    padding: '6px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '800',
    textAlign: 'center',
    display: 'inline-block',
    minWidth: '70px',
  },
  green: {
    background: '#dcfce7',
    color: '#166534',
  },
  blue: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
}
