export default function SuperadminDashboard() {
  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Superadmin Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Firmen</h3>
          <p>Alle registrierten Firmen</p>
        </div>

        <div style={styles.card}>
          <h3>Mitarbeiter</h3>
          <p>Alle Mitarbeiter im System</p>
        </div>

        <div style={styles.card}>
          <h3>Aktive Aufträge</h3>
          <p>Alle laufenden Jobs</p>
        </div>

        <div style={styles.card}>
          <h3>MRR</h3>
          <p>Monatlicher Umsatz</p>
        </div>

        <div style={styles.card}>
          <h3>Trial Firmen</h3>
          <p>Firmen in Testphase</p>
        </div>

        <div style={styles.card}>
          <h3>Aktive Firmen</h3>
          <p>Bezahlte Abonnements</p>
        </div>
      </div>
    </main>
  )
}

const styles = {
  page: {
    padding: 40,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: 20,
  },
  card: {
    padding: 25,
    borderRadius: 12,
    background: '#f5f5f5',
  },
}
