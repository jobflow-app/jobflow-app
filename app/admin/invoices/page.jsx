'use client'

export default function AdminInvoicesPage() {
  const invoices = [
    {
      number: 'RE-2026-041',
      customer: 'Müller Heizung',
      amount: '€ 1.280',
      date: '18.03.2026',
      due: '25.03.2026',
      status: 'Offen',
    },
    {
      number: 'RE-2026-042',
      customer: 'Schneider Elektro',
      amount: '€ 860',
      date: '17.03.2026',
      due: '24.03.2026',
      status: 'Bezahlt',
    },
    {
      number: 'RE-2026-043',
      customer: 'Bauer Sanitär',
      amount: '€ 2.140',
      date: '16.03.2026',
      due: '23.03.2026',
      status: 'Überfällig',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Rechnungen</h1>
          <p style={styles.subtitle}>
            Übersicht über offene, bezahlte und überfällige Rechnungen.
          </p>
        </div>

        <button style={styles.newBtn}>+ Neue Rechnung</button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Offen</p>
          <h3 style={styles.statValue}>€ 12.480</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Bezahlt</p>
          <h3 style={styles.statValue}>€ 38.940</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Überfällig</p>
          <h3 style={styles.statValue}>€ 4.620</h3>
        </div>
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>Rechnung</span>
          <span>Kunde</span>
          <span>Betrag</span>
          <span>Datum</span>
          <span>Fällig</span>
          <span>Status</span>
        </div>

        {invoices.map((invoice, index) => (
          <div key={index} style={styles.row}>
            <div style={styles.name}>{invoice.number}</div>
            <div style={styles.text}>{invoice.customer}</div>
            <div style={styles.text}>{invoice.amount}</div>
            <div style={styles.text}>{invoice.date}</div>
            <div style={styles.text}>{invoice.due}</div>
            <div>
              <span
                style={{
                  ...styles.badge,
                  ...(invoice.status === 'Bezahlt'
                    ? styles.green
                    : invoice.status === 'Offen'
                    ? styles.blue
                    : styles.red),
                }}
              >
                {invoice.status}
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
    gridTemplateColumns: '1fr 1.4fr 1fr 1fr 1fr 0.8fr',
    padding: '12px',
    fontWeight: '800',
    color: '#2563eb',
    fontSize: '12px',
    textTransform: 'uppercase',
    gap: '12px',
    minWidth: '880px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr 1fr 1fr 1fr 0.8fr',
    padding: '14px 12px',
    borderTop: '1px solid #eef2f7',
    alignItems: 'center',
    gap: '12px',
    minWidth: '880px',
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
    minWidth: '88px',
  },
  green: {
    background: '#dcfce7',
    color: '#166534',
  },
  blue: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  red: {
    background: '#fee2e2',
    color: '#b91c1c',
  },
}
