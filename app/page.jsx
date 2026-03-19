'use client'

import WorkersMap from '@/components/WorkersMap'

export default function AdminMapPage() {
  return (
    <main style={styles.page}>
      <div style={styles.bgGlowOne} />
      <div style={styles.bgGlowTwo} />

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>JOBFLOW LIVE MAP</div>
          <h1 style={styles.title}>Live Workers Map</h1>
          <p style={styles.subtitle}>
            Übersicht über Standorte, aktuelle Einsätze und verfügbare Mitarbeiter in Echtzeit.
          </p>
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
              <div style={styles.heroKpiValue}>9</div>
              <div style={styles.heroKpiLabel}>Mitarbeiter</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>4</div>
              <div style={styles.heroKpiLabel}>Unterwegs</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>3</div>
              <div style={styles.heroKpiLabel}>Aktive Jobs</div>
            </div>
            <div style={styles.heroKpiBox}>
              <div style={styles.heroKpiValue}>2</div>
              <div style={styles.heroKpiLabel}>Verfügbar</div>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.mapCard}>
        <div style={styles.mapHead}>
          <div>
            <h2 style={styles.mapTitle}>Standorte auf der Karte</h2>
            <p style={styles.mapText}>
              Live-Ansicht der Techniker und ihrer aktuellen Positionen.
            </p>
          </div>
        </div>

        <WorkersMap />
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

  mapCard: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.88)',
    backdropFilter: 'blur(12px)',
    borderRadius: '26px',
    padding: '22px',
    border: '1px solid rgba(255,255,255,0.7)',
    boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
  },

  mapHead: {
    marginBottom: '18px',
  },

  mapTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '6px',
  },

  mapText: {
    color: '#64748b',
    fontSize: '14px',
  },
}
