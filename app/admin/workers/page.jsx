'use client'

export default function AdminWorkersPage() {
  const workers = [
    {
      name: 'Velibor S.',
      role: 'Techniker',
      phone: '+49 151 2233445',
      email: 'velibor@jobflow.de',
      status: 'Unterwegs',
      jobsToday: 4,
    },
    {
      name: 'Marko T.',
      role: 'Techniker',
      phone: '+49 152 6677889',
      email: 'marko@jobflow.de',
      status: 'Beim Kunden',
      jobsToday: 3,
    },
    {
      name: 'Nikola P.',
      role: 'Monteur',
      phone: '+49 160 9988776',
      email: 'nikola@jobflow.de',
      status: 'Verfügbar',
      jobsToday: 2,
    },
    {
      name: 'David K.',
      role: 'Servicetechniker',
      phone: '+49 170 5544332',
      email: 'david@jobflow.de',
      status: 'Pause',
      jobsToday: 1,
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Mitarbeiter</h1>
          <p style={styles.subtitle}>
            Teamübersicht, Status und heutige Einsätze.
          </p>
        </div>

        <button style={styles.newBtn}>+ Neuer Mitarbeiter</button>
      </div>

      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Gesamtes Team</p>
          <h3 style={styles.statValue}>9</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Unterwegs</p>
          <h3 style={styles.statValue}>4</h3>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Verfügbar</p>
          <h3 style={styles.statValue}>3</h3>
        </div>
      </div>

      <div style={styles.grid}>
        {workers.map((worker, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.topRow}>
              <div style={styles.avatar}>{worker.name.charAt(0)}</div>
              <span
                style={{
                  ...styles.badge,
                  ...(worker.status === 'Verfügbar'
                    ? styles.green
                    : worker.status === 'Pause'
                    ? styles.gray
                    : styles.blue),
                }}
              >
                {worker.status}
              </span>
            </div>

            <h3 style={styles.name}>{worker.name}</h3>
            <p style={styles.role}>{worker.role}</p>

            <div style={styles.infoBox}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Telefon</span>
                <span style={styles.infoValue}>{worker.phone}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>E-Mail</span>
                <span style={styles.infoValue}>{worker.email}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Jobs heute</span>
                <span style={styles.infoValue}>{worker.jobsToday}</span>
              </div>
            </div>

            <div style={styles.actions}>
              <button style={styles.primaryBtn}>Profil öffnen</button>
              <button style={styles.secondaryBtn}>Planen</button>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '18px',
  },
  card: {
    background: '#fff',
    borderRadius: '22px',
    padding: '20px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.05)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  avatar: {
    width: '54px',
    height: '54px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '900',
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '800',
  },
  green: {
    background: '#dcfce7',
    color: '#166534',
  },
  blue: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  gray: {
    background: '#e2e8f0',
    color: '#475569',
  },
  name: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '4px',
  },
  role: {
    color: '#64748b',
    marginBottom: '16px',
  },
  infoBox: {
    background: '#f8fbff',
    border: '1px solid #e5edf5',
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '16px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '8px 0',
    borderBottom: '1px solid #edf2f7',
  },
  infoLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '700',
  },
  infoValue: {
    fontSize: '13px',
    color: '#0f172a',
    fontWeight: '700',
    textAlign: 'right',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  primaryBtn: {
    flex: 1,
    border: 'none',
    borderRadius: '12px',
    padding: '12px',
    background: '#163b7a',
    color: '#fff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  secondaryBtn: {
    flex: 1,
    border: '1px solid #dbe6f2',
    borderRadius: '12px',
    padding: '12px',
    background: '#fff',
    color: '#163b7a',
    fontWeight: '800',
    cursor: 'pointer',
  },
}
