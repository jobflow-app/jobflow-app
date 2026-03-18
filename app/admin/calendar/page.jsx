'use client'

export default function AdminCalendarPage() {
  const days = [
    { day: 'Mo', date: '18', jobs: 4, active: false },
    { day: 'Di', date: '19', jobs: 6, active: true },
    { day: 'Mi', date: '20', jobs: 3, active: false },
    { day: 'Do', date: '21', jobs: 5, active: false },
    { day: 'Fr', date: '22', jobs: 2, active: false },
    { day: 'Sa', date: '23', jobs: 1, active: false },
    { day: 'So', date: '24', jobs: 0, active: false },
  ]

  const schedule = [
    {
      time: '08:00',
      client: 'Müller Heizung',
      worker: 'Velibor S.',
      type: 'Service',
      status: 'Bestätigt',
    },
    {
      time: '10:30',
      client: 'Schneider Elektro',
      worker: 'Marko T.',
      type: 'Montage',
      status: 'Geplant',
    },
    {
      time: '13:00',
      client: 'Bauer Sanitär',
      worker: 'Nikola P.',
      type: 'Reparatur',
      status: 'Bestätigt',
    },
    {
      time: '15:30',
      client: 'Kaiser Technik',
      worker: 'David K.',
      type: 'Wartung',
      status: 'Offen',
    },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Kalender</h1>
          <p style={styles.subtitle}>
            Planung von Einsätzen, Team-Terminen und Tagesübersicht.
          </p>
        </div>

        <button style={styles.newBtn}>+ Neuer Termin</button>
      </div>

      <div style={styles.topGrid}>
        <section style={styles.weekPanel}>
          <div style={styles.panelHead}>
            <div>
              <h2 style={styles.panelTitle}>Wochenübersicht</h2>
              <p style={styles.panelText}>Aktuelle Auslastung je Tag.</p>
            </div>
            <span style={styles.monthBadge}>März 2026</span>
          </div>

          <div style={styles.weekGrid}>
            {days.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.dayCard,
                  ...(item.active ? styles.dayCardActive : {}),
                }}
              >
                <div style={styles.dayName}>{item.day}</div>
                <div style={styles.dayDate}>{item.date}</div>
                <div
                  style={{
                    ...styles.dayJobs,
                    ...(item.active ? styles.dayJobsActive : {}),
                  }}
                >
                  {item.jobs} Jobs
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.summaryPanel}>
          <h2 style={styles.panelTitle}>Tagesstatus</h2>
          <p style={styles.panelText}>Schneller Überblick für heute.</p>

          <div style={styles.summaryList}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Geplante Einsätze</div>
              <div style={styles.summaryValue}>6</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Verfügbare Mitarbeiter</div>
              <div style={styles.summaryValue}>3</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryLabel}>Offene Termine</div>
              <div style={styles.summaryValue}>2</div>
            </div>
          </div>
        </section>
      </div>

      <section style={styles.mainPanel}>
        <div style={styles.panelHead}>
          <div>
            <h2 style={styles.panelTitle}>Tagesplanung</h2>
            <p style={styles.panelText}>Alle Einsätze und Termine für den ausgewählten Tag.</p>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <div style={styles.tableHeader}>
            <span>Uhrzeit</span>
            <span>Kunde</span>
            <span>Mitarbeiter</span>
            <span>Typ</span>
            <span>Status</span>
          </div>

          {schedule.map((item, index) => (
            <div key={index} style={styles.row}>
              <div style={styles.time}>{item.time}</div>
              <div style={styles.client}>{item.client}</div>
              <div style={styles.text}>{item.worker}</div>
              <div style={styles.text}>{item.type}</div>
              <div>
                <span
                  style={{
                    ...styles.badge,
                    ...(item.status === 'Bestätigt'
                      ? styles.green
                      : item.status === 'Geplant'
                      ? styles.blue
                      : styles.gray),
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
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
  topGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 0.8fr',
    gap: '18px',
    marginBottom: '20px',
  },
  weekPanel: {
    background: '#fff',
    borderRadius: '22px',
    padding: '20px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.05)',
  },
  summaryPanel: {
    background: '#fff',
    borderRadius: '22px',
    padding: '20px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.05)',
  },
  panelHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '18px',
    flexWrap: 'wrap',
  },
  panelTitle: {
    fontSize: '22px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '6px',
  },
  panelText: {
    fontSize: '14px',
    color: '#64748b',
  },
  monthBadge: {
    padding: '8px 12px',
    borderRadius: '999px',
    background: '#eef4fb',
    color: '#163b7a',
    fontSize: '12px',
    fontWeight: '800',
  },
  weekGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '12px',
  },
  dayCard: {
    background: '#f8fbff',
    border: '1px solid #e5edf5',
    borderRadius: '18px',
    padding: '16px 10px',
    textAlign: 'center',
  },
  dayCardActive: {
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    border: '1px solid transparent',
    boxShadow: '0 14px 28px rgba(37, 99, 235, 0.24)',
  },
  dayName: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#64748b',
    marginBottom: '8px',
  },
  dayDate: {
    fontSize: '26px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '8px',
  },
  dayJobs: {
    fontSize: '12px',
    fontWeight: '800',
    color: '#2563eb',
  },
  dayJobsActive: {
    color: '#fff',
  },
  summaryList: {
    display: 'grid',
    gap: '12px',
    marginTop: '12px',
  },
  summaryCard: {
    background: '#f8fbff',
    border: '1px solid #e5edf5',
    borderRadius: '18px',
    padding: '16px',
  },
  summaryLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '700',
    marginBottom: '8px',
  },
  summaryValue: {
    fontSize: '28px',
    fontWeight: '900',
    color: '#163b7a',
  },
  mainPanel: {
    background: '#fff',
    borderRadius: '22px',
    padding: '20px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.05)',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1.5fr 1.2fr 1fr 0.9fr',
    gap: '12px',
    padding: '12px',
    color: '#2563eb',
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    minWidth: '760px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '0.8fr 1.5fr 1.2fr 1fr 0.9fr',
    gap: '12px',
    alignItems: 'center',
    padding: '14px 12px',
    borderTop: '1px solid #eef2f7',
    minWidth: '760px',
  },
  time: {
    fontWeight: '900',
    color: '#163b7a',
  },
  client: {
    fontWeight: '800',
    color: '#0f172a',
  },
  text: {
    fontWeight: '600',
    color: '#334155',
    fontSize: '14px',
  },
  badge: {
    display: 'inline-block',
    minWidth: '88px',
    textAlign: 'center',
    padding: '6px 10px',
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
}
