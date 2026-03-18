'use client'

import Link from 'next/link'

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Aktive Aufträge', value: '24', sub: '+6 heute' },
    { title: 'Kunden', value: '148', sub: '+12 diesen Monat' },
    { title: 'Mitarbeiter', value: '9', sub: '2 unterwegs' },
    { title: 'Offene Rechnungen', value: '18', sub: '€ 12.480 offen' },
  ]

  const jobs = [
    {
      client: 'Müller Heizung',
      address: 'Salzburg, Hauptstraße 12',
      status: 'In Bearbeitung',
      worker: 'Velibor S.',
      time: '09:30',
    },
    {
      client: 'Schneider Elektro',
      address: 'Freilassing, Marktstraße 8',
      status: 'Geplant',
      worker: 'Marko T.',
      time: '11:00',
    },
    {
      client: 'Bauer Sanitär',
      address: 'Bad Reichenhall, Postweg 22',
      status: 'Offen',
      worker: 'Nikola P.',
      time: '13:45',
    },
  ]

  const team = [
    { name: 'Velibor S.', role: 'Techniker', state: 'Unterwegs' },
    { name: 'Marko T.', role: 'Techniker', state: 'Beim Kunden' },
    { name: 'Nikola P.', role: 'Monteur', state: 'Verfügbar' },
    { name: 'David K.', role: 'Techniker', state: 'Pause' },
  ]

  const invoices = [
    { number: 'RE-2026-041', customer: 'Müller Heizung', amount: '€ 1.280', status: 'Offen' },
    { number: 'RE-2026-042', customer: 'Schneider Elektro', amount: '€ 860', status: 'Bezahlt' },
    { number: 'RE-2026-043', customer: 'Bauer Sanitär', amount: '€ 2.140', status: 'Offen' },
  ]

  return (
    <main style={styles.page}>
      <div style={styles.bgGlowOne} />
      <div style={styles.bgGlowTwo} />

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>JOBFLOW ADMIN</div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>
            Zentrale Steuerung für Aufträge, Kunden, Mitarbeiter, Rechnungen und Tagesübersicht.
          </p>

          <div style={styles.heroActions}>
            <Link href="/admin/jobs" style={styles.primaryBtn}>
              Aufträge verwalten
            </Link>
            <Link href="/admin/clients" style={styles.secondaryBtn}>
              Kunden öffnen
            </Link>
          </div>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroCardTop}>
            <span style={styles.heroMiniLabel}>Heute</span>
            <span style={styles.liveDotWrap}>
              <span style={styles.liveDot} />
              Live
            </span>
          </div>

          <div style={styles.heroKPIs}>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>24</div>
              <div style={styles.heroKpiLabel}>Aktive Jobs</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>9</div>
              <div style={styles.heroKpiLabel}>Mitarbeiter</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>€ 18.4k</div>
              <div style={styles.heroKpiLabel}>Monatsumsatz</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>96%</div>
              <div style={styles.heroKpiLabel}>Erledigungsquote</div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.statsGrid}>
        {stats.map((item) => (
          <div key={item.title} style={styles.statCard}>
            <p style={styles.statTitle}>{item.title}</p>
            <h3 style={styles.statValue}>{item.value}</h3>
            <p style={styles.statSub}>{item.sub}</p>
          </div>
        ))}
      </section>

      <section style={styles.mainGrid}>
        <div style={styles.leftCol}>
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div>
                <h2 style={styles.panelTitle}>Heutige Aufträge</h2>
                <p style={styles.panelText}>Schneller Überblick über aktuelle Einsätze.</p>
              </div>
              <Link href="/admin/jobs" style={styles.panelLink}>
                Alle anzeigen
              </Link>
            </div>

            <div style={styles.tableWrap}>
              <div style={styles.tableHeader}>
                <span>Kunde</span>
                <span>Status</span>
                <span>Mitarbeiter</span>
                <span>Zeit</span>
              </div>

              {jobs.map((job, index) => (
                <div key={index} style={styles.tableRow}>
                  <div>
                    <div style={styles.rowTitle}>{job.client}</div>
                    <div style={styles.rowSub}>{job.address}</div>
                  </div>
                  <div>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...(job.status === 'In Bearbeitung'
                          ? styles.statusBlue
                          : job.status === 'Geplant'
                          ? styles.statusAmber
                          : styles.statusGray),
                      }}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div style={styles.rowText}>{job.worker}</div>
                  <div style={styles.rowText}>{job.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div>
                <h2 style={styles.panelTitle}>Rechnungen</h2>
                <p style={styles.panelText}>Status der letzten Rechnungen.</p>
              </div>
              <Link href="/admin/invoices" style={styles.panelLink}>
                Zu Rechnungen
              </Link>
            </div>

            {invoices.map((invoice, index) => (
              <div key={index} style={styles.listRow}>
                <div>
                  <div style={styles.rowTitle}>{invoice.number}</div>
                  <div style={styles.rowSub}>{invoice.customer}</div>
                </div>

                <div style={styles.rowText}>{invoice.amount}</div>

                <span
                  style={{
                    ...styles.statusBadge,
                    ...(invoice.status === 'Bezahlt' ? styles.statusGreen : styles.statusRed),
                  }}
                >
                  {invoice.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div>
                <h2 style={styles.panelTitle}>Quick Actions</h2>
                <p style={styles.panelText}>Direktzugriffe für den Alltag.</p>
              </div>
            </div>

            <div style={styles.actionGrid}>
              <Link href="/admin/jobs/new" style={styles.actionCard}>
                <div style={styles.actionIcon}>+</div>
                <div>
                  <div style={styles.actionTitle}>Neuer Auftrag</div>
                  <div style={styles.actionSub}>Schnell anlegen</div>
                </div>
              </Link>

              <Link href="/admin/clients/new" style={styles.actionCard}>
                <div style={styles.actionIcon}>👤</div>
                <div>
                  <div style={styles.actionTitle}>Neuer Kunde</div>
                  <div style={styles.actionSub}>Kundendaten erfassen</div>
                </div>
              </Link>

              <Link href="/admin/workers" style={styles.actionCard}>
                <div style={styles.actionIcon}>👷</div>
                <div>
                  <div style={styles.actionTitle}>Mitarbeiter</div>
                  <div style={styles.actionSub}>Team verwalten</div>
                </div>
              </Link>

              <Link href="/admin/calendar" style={styles.actionCard}>
                <div style={styles.actionIcon}>📅</div>
                <div>
                  <div style={styles.actionTitle}>Planung</div>
                  <div style={styles.actionSub}>Termine öffnen</div>
                </div>
              </Link>
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div>
                <h2 style={styles.panelTitle}>Team Status</h2>
                <p style={styles.panelText}>Aktueller Überblick über das Team.</p>
              </div>
            </div>

            {team.map((member, index) => (
              <div key={index} style={styles.memberRow}>
                <div style={styles.avatar}>{member.name.charAt(0)}</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.rowTitle}>{member.name}</div>
                  <div style={styles.rowSub}>{member.role}</div>
                </div>
                <span
                  style={{
                    ...styles.statusBadge,
                    ...(member.state === 'Verfügbar'
                      ? styles.statusGreen
                      : member.state === 'Pause'
                      ? styles.statusGray
                      : styles.statusBlue),
                  }}
                >
                  {member.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    padding: '28px',
    background:
      'linear-gradient(180deg, #f8fbff 0%, #eef4fb 38%, #eaf1f8 100%)',
  },
  bgGlowOne: {
    position: 'absolute',
    top: '-120px',
    left: '-120px',
    width: '320px',
    height: '320px',
    borderRadius: '999px',
    background: 'rgba(37, 99, 235, 0.10)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  bgGlowTwo: {
    position: 'absolute',
    right: '-80px',
    top: '120px',
    width: '260px',
    height: '260px',
    borderRadius: '999px',
    background: 'rgba(22, 59, 122, 0.10)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: '1.3fr 0.9fr',
    gap: '22px',
    marginBottom: '22px',
  },
  heroLeft: {
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.65)',
    borderRadius: '28px',
    padding: '32px',
    boxShadow: '0 18px 50px rgba(15, 23, 42, 0.08)',
  },
  badge: {
    display: 'inline-flex',
    padding: '8px 14px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '800',
    color: '#2563eb',
    background: '#e8f0ff',
    marginBottom: '16px',
  },
  title: {
    fontSize: '42px',
    lineHeight: 1.05,
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#64748b',
    maxWidth: '720px',
  },
  heroActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '24px',
  },
  primaryBtn: {
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '16px',
    fontWeight: '800',
    boxShadow: '0 14px 30px rgba(37, 99, 235, 0.24)',
  },
  secondaryBtn: {
    textDecoration: 'none',
    background: '#fff',
    color: '#163b7a',
    padding: '14px 20px',
    borderRadius: '16px',
    fontWeight: '800',
    border: '1px solid #dbe6f2',
  },
  heroCard: {
    background: 'linear-gradient(135deg, #163b7a 0%, #214d9a 55%, #2563eb 100%)',
    borderRadius: '28px',
    padding: '26px',
    color: '#fff',
    boxShadow: '0 18px 50px rgba(22, 59, 122, 0.22)',
  },
  heroCardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  heroMiniLabel: {
    fontSize: '13px',
    opacity: 0.9,
    fontWeight: '700',
  },
  liveDotWrap: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    fontWeight: '700',
  },
  liveDot: {
    width: '9px',
    height: '9px',
    borderRadius: '999px',
    background: '#4ade80',
    boxShadow: '0 0 16px rgba(74, 222, 128, 0.9)',
  },
  heroKPIs: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  heroKpiBox: {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '18px',
    padding: '18px',
  },
  heroKpiValue: {
    fontSize: '24px',
    fontWeight: '900',
    marginBottom: '6px',
  },
  heroKpiLabel: {
    fontSize: '13px',
    opacity: 0.88,
  },
  statsGrid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '22px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(12px)',
    borderRadius: '22px',
    padding: '22px',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)',
  },
  statTitle: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '700',
    marginBottom: '10px',
  },
  statValue: {
    fontSize: '30px',
    lineHeight: 1,
    color: '#163b7a',
    fontWeight: '900',
    marginBottom: '8px',
  },
  statSub: {
    fontSize: '13px',
    color: '#94a3b8',
  },
  mainGrid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: '1.35fr 0.95fr',
    gap: '22px',
  },
  leftCol: {
    display: 'grid',
    gap: '22px',
  },
  rightCol: {
    display: 'grid',
    gap: '22px',
  },
  panel: {
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(12px)',
    borderRadius: '26px',
    padding: '22px',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
  },
  panelHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '18px',
  },
  panelTitle: {
    fontSize: '23px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '6px',
  },
  panelText: {
    fontSize: '14px',
    color: '#64748b',
  },
  panelLink: {
    textDecoration: 'none',
    color: '#2563eb',
    fontWeight: '800',
    fontSize: '14px',
  },
  tableWrap: {
    display: 'grid',
    gap: '10px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 0.6fr',
    gap: '12px',
    padding: '0 4px 8px 4px',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#2563eb',
    fontWeight: '800',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 0.6fr',
    gap: '12px',
    alignItems: 'center',
    padding: '14px',
    borderRadius: '18px',
    background: '#f8fbff',
    border: '1px solid #e6eef8',
  },
  rowTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '4px',
  },
  rowSub: {
    fontSize: '12px',
    color: '#64748b',
  },
  rowText: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#334155',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '110px',
    padding: '8px 12px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '800',
  },
  statusBlue: {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  statusAmber: {
    background: '#fef3c7',
    color: '#b45309',
  },
  statusGray: {
    background: '#e2e8f0',
    color: '#475569',
  },
  statusGreen: {
    background: '#dcfce7',
    color: '#166534',
  },
  statusRed: {
    background: '#fee2e2',
    color: '#b91c1c',
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  actionCard: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#f8fbff',
    border: '1px solid #e6eef8',
    borderRadius: '18px',
    padding: '16px',
    color: '#0f172a',
  },
  actionIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    fontWeight: '900',
    fontSize: '18px',
    flexShrink: 0,
  },
  actionTitle: {
    fontSize: '14px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '4px',
  },
  actionSub: {
    fontSize: '12px',
    color: '#64748b',
  },
  memberRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #edf2f7',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #163b7a 0%, #2563eb 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
  },
  listRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '14px 0',
    borderBottom: '1px solid #edf2f7',
  },
}
