'use client'

export default function AdminJobsPage() {
  const jobs = [
    {
      client: 'Müller Heizung',
      address: 'Salzburg, Hauptstraße 12',
      status: 'In Bearbeitung',
      worker: 'Velibor S.',
      date: 'Heute',
      time: '09:30',
    },
    {
      client: 'Schneider Elektro',
      address: 'Freilassing, Marktstraße 8',
      status: 'Geplant',
      worker: 'Marko T.',
      date: 'Heute',
      time: '11:00',
    },
    {
      client: 'Bauer Sanitär',
      address: 'Bad Reichenhall, Postweg 22',
      status: 'Offen',
      worker: 'Nikola P.',
      date: 'Morgen',
      time: '13:45',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Aufträge</h1>
          <p style={styles.subtitle}>
            Übersicht aller aktuellen und geplanten Jobs.
          </p>
        </div>

        <button style={styles.newBtn}>+ Neuer Auftrag</button>
      </div>

      <div style={styles.filters}>
        <button style={styles.filterActive}>Alle</button>
        <button style={styles.filter}>Heute</button>
        <button style={styles.filter}>Geplant</button>
        <button style={styles.filter}>Erledigt</button>
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Kunde</span>
          <span>Status</span>
          <span>Mitarbeiter</span>
          <span>Datum</span>
          <span>Zeit</span>
        </div>

        {jobs.map((job, index) => (
          <div key={index} style={styles.row}>
            <div>
              <div style={styles.client}>{job.client}</div>
              <div style={styles.address}>{job.address}</div>
            </div>

            <span
              style={{
                ...styles.badge,
                ...(job.status === 'In Bearbeitung'
                  ? styles.blue
                  : job.status === 'Geplant'
                  ? styles.orange
                  : styles.gray),
              }}
            >
              {job.status}
            </span>

            <div style={styles.text}>{job.worker}</div>
            <div style={styles.text}>{job.date}</div>
            <div style={styles.text}>{job.time}</div>
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
    marginBottom: '20px',
  },

  title: {
    fontSize: '32px',
    fontWeight: '900',
    color: '#163b7a',
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

  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  filter: {
    padding: '8px 14px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer',
  },

  filterActive: {
    padding: '8px 14px',
    borderRadius: '10px',
    border: 'none',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '700',
  },

  table: {
    background: '#fff',
    borderRadius: '16px',
    padding: '10px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  },

  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    padding: '10px',
    fontWeight: '800',
    color: '#2563eb',
    fontSize: '12px',
  },

  row: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    padding: '12px',
    borderTop: '1px solid #eee',
    alignItems: 'center',
  },

  client: {
    fontWeight: '800',
  },

  address: {
    fontSize: '12px',
    color: '#64748b',
  },

  text: {
    fontWeight: '600',
  },

  badge: {
    padding: '6px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '700',
    textAlign: 'center',
  },

  blue: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },

  orange: {
    background: '#fef3c7',
    color: '#b45309',
  },

  gray: {
    background: '#e2e8f0',
    color: '#475569',
  },
}
