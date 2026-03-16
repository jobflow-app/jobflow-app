'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SuperadminDashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalWorkers: 0,
    totalClients: 0,
    activeJobs: 0,
    trialCompanies: 0,
    activeCompanies: 0,
    mrr: 0,
  })

  const [companies, setCompanies] = useState([])

  useEffect(() => {
    loadPage()
  }, [])

  async function loadPage() {
    try {
      setLoading(true)
      setErrorMessage('')

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/login')
        return
      }

      const email = user.email || ''
      setUserEmail(email)

      const { data: superadminRow, error: superadminError } = await supabase
        .from('superadmins')
        .select('email')
        .eq('email', email)
        .maybeSingle()

      if (superadminError || !superadminRow) {
        router.push('/dashboard')
        return
      }

      await loadDashboardData()
    } catch (error) {
      console.error(error)
      setErrorMessage('Fehler beim Laden des Dashboards.')
    } finally {
      setLoading(false)
    }
  }

  async function loadDashboardData() {
    try {
      const [
        companiesRes,
        workersRes,
        clientsRes,
        jobsRes,
        subscriptionsRes,
      ] = await Promise.all([
        supabase.from('companies').select('*').order('created_at', { ascending: false }),
        supabase.from('workers').select('id, company_id'),
        supabase.from('clients').select('id, company_id'),
        supabase.from('jobs').select('id, company_id, status'),
        supabase.from('subscriptions').select('*'),
      ])

      if (companiesRes.error) throw companiesRes.error
      if (workersRes.error) throw workersRes.error
      if (clientsRes.error) throw clientsRes.error
      if (jobsRes.error) throw jobsRes.error
      if (subscriptionsRes.error) throw subscriptionsRes.error

      const companiesData = companiesRes.data || []
      const workersData = workersRes.data || []
      const clientsData = clientsRes.data || []
      const jobsData = jobsRes.data || []
      const subscriptionsData = subscriptionsRes.data || []

      const workersByCompany = countByCompany(workersData)
      const clientsByCompany = countByCompany(clientsData)
      const activeJobsByCompany = countActiveJobsByCompany(jobsData)

      const companyRows = companiesData.map((company) => {
        const subscription = subscriptionsData.find(
          (item) => item.company_id === company.id
        )

        const rawStatus =
          subscription?.status ||
          company.status ||
          company.trial_status ||
          company.plan ||
          ''

        const normalizedStatus = String(rawStatus).toLowerCase()

        const panelStatus =
          normalizedStatus === 'trial'
            ? 'Trial'
            : normalizedStatus === 'active'
            ? 'Aktiv'
            : 'Unbekannt'

        const monthlyPrice =
          Number(subscription?.price_monthly) ||
          Number(subscription?.monthly_price) ||
          Number(company?.price_monthly) ||
          Number(company?.monthly_price) ||
          0

        return {
          id: company.id,
          name: company.name || company.company_name || 'Unbenannte Firma',
          email: company.owner_email || company.email || 'Keine E-Mail',
          status: panelStatus,
          workersCount: workersByCompany[company.id] || 0,
          clientsCount: clientsByCompany[company.id] || 0,
          activeJobsCount: activeJobsByCompany[company.id] || 0,
          monthlyPrice,
        }
      })

      const activeJobs = jobsData.filter((job) =>
        ['open', 'assigned', 'in_progress', 'active'].includes(String(job.status).toLowerCase())
      ).length

      const totalMRR = companyRows
        .filter((company) => company.status === 'Aktiv')
        .reduce((sum, company) => sum + company.monthlyPrice, 0)

      setStats({
        totalCompanies: companyRows.length,
        totalWorkers: workersData.length,
        totalClients: clientsData.length,
        activeJobs,
        trialCompanies: companyRows.filter((c) => c.status === 'Trial').length,
        activeCompanies: companyRows.filter((c) => c.status === 'Aktiv').length,
        mrr: totalMRR,
      })

      setCompanies(companyRows)
    } catch (error) {
      console.error(error)
      setErrorMessage('Fehler beim Laden der Daten aus der Datenbank.')
    }
  }

  function countByCompany(items) {
    return items.reduce((acc, item) => {
      if (!item.company_id) return acc
      acc[item.company_id] = (acc[item.company_id] || 0) + 1
      return acc
    }, {})
  }

  function countActiveJobsByCompany(items) {
    return items.reduce((acc, item) => {
      const status = String(item.status || '').toLowerCase()
      const isActive = ['open', 'assigned', 'in_progress', 'active'].includes(status)

      if (!item.company_id || !isActive) return acc

      acc[item.company_id] = (acc[item.company_id] || 0) + 1
      return acc
    }, {})
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  function formatMoney(value) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value || 0)
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.loadingCard}>
          <h1 style={styles.loadingTitle}>Superadmin-Dashboard</h1>
          <p style={styles.loadingText}>Daten werden geladen ...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <div>
          <p style={styles.kicker}>JOBFLOW SAAS</p>
          <h1 style={styles.title}>Superadmin-Dashboard</h1>
          <p style={styles.subtitle}>
            Zentrale Übersicht über Firmen, Mitarbeiter, Kunden, aktive Aufträge und Umsatz.
          </p>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.userBox}>
            <span style={styles.userLabel}>Angemeldet als</span>
            <span style={styles.userValue}>{userEmail}</span>
          </div>

          <button onClick={handleLogout} style={styles.logoutButton}>
            Abmelden
          </button>
        </div>
      </section>

      {errorMessage ? <div style={styles.errorBox}>{errorMessage}</div> : null}

      <section style={styles.statsGrid}>
        <StatCard title="Firmen gesamt" value={stats.totalCompanies} />
        <StatCard title="Mitarbeiter" value={stats.totalWorkers} />
        <StatCard title="Kunden" value={stats.totalClients} />
        <StatCard title="Aktive Aufträge" value={stats.activeJobs} />
        <StatCard title="Trial-Firmen" value={stats.trialCompanies} />
        <StatCard title="Aktive Firmen" value={stats.activeCompanies} />
        <StatCard title="MRR" value={formatMoney(stats.mrr)} wide />
      </section>

      <section style={styles.section}>
        <div style={styles.sectionTop}>
          <div>
            <h2 style={styles.sectionTitle}>Firmenübersicht</h2>
            <p style={styles.sectionText}>
              Alle Firmen mit Status, Mitarbeiterzahl, Kundenzahl, aktiven Aufträgen und Umsatz.
            </p>
          </div>

          <div style={styles.actions}>
            <Link href="/superadmin/companies" style={styles.secondaryButton}>
              Firmen
            </Link>
            <Link href="/superadmin/subscriptions" style={styles.secondaryButton}>
              Abonnements
            </Link>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <div style={styles.table}>
            <div style={{ ...styles.row, ...styles.headRow }}>
              <div style={styles.th}>Firma</div>
              <div style={styles.th}>Status</div>
              <div style={styles.th}>Mitarbeiter</div>
              <div style={styles.th}>Kunden</div>
              <div style={styles.th}>Aktive Aufträge</div>
              <div style={styles.th}>MRR</div>
            </div>

            {companies.length === 0 ? (
              <div style={styles.emptyState}>Keine Firmen gefunden.</div>
            ) : (
              companies.map((company) => (
                <div key={company.id} style={styles.row}>
                  <div style={styles.td}>
                    <div style={styles.companyName}>{company.name}</div>
                    <div style={styles.companyMeta}>{company.email}</div>
                  </div>

                  <div style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        ...(company.status === 'Trial'
                          ? styles.badgeTrial
                          : company.status === 'Aktiv'
                          ? styles.badgeActive
                          : styles.badgeUnknown),
                      }}
                    >
                      {company.status}
                    </span>
                  </div>

                  <div style={styles.td}>{company.workersCount}</div>
                  <div style={styles.td}>{company.clientsCount}</div>
                  <div style={styles.td}>{company.activeJobsCount}</div>
                  <div style={styles.td}>{company.monthlyPrice > 0 ? formatMoney(company.monthlyPrice) : '—'}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function StatCard({ title, value, wide = false }) {
  return (
    <div style={{ ...styles.statCard, ...(wide ? styles.statCardWide : {}) }}>
      <p style={styles.statLabel}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#eef4fb',
    padding: '24px',
  },
  loadingCard: {
    maxWidth: '600px',
    margin: '120px auto',
    background: '#ffffff',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
    textAlign: 'center',
  },
  loadingTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#163b7a',
    marginBottom: '10px',
  },
  loadingText: {
    color: '#64748b',
    fontSize: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '24px',
  },
  kicker: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#2563eb',
    marginBottom: '8px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#64748b',
    maxWidth: '720px',
    lineHeight: 1.6,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  userBox: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '14px 16px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
    minWidth: '240px',
  },
  userLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
  },
  userValue: {
    display: 'block',
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: '700',
    wordBreak: 'break-word',
  },
  logoutButton: {
    border: 'none',
    borderRadius: '14px',
    padding: '14px 18px',
    background: '#163b7a',
    color: '#ffffff',
    fontWeight: '800',
    cursor: 'pointer',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '16px',
    padding: '14px 16px',
    marginBottom: '18px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    background: '#ffffff',
    borderRadius: '22px',
    padding: '22px',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
  },
  statCardWide: {
    gridColumn: 'span 2',
  },
  statLabel: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '700',
    marginBottom: '10px',
  },
  statValue: {
    fontSize: '34px',
    color: '#163b7a',
    fontWeight: '900',
    lineHeight: 1.1,
  },
  section: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '22px',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
  },
  sectionTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#163b7a',
    marginBottom: '6px',
  },
  sectionText: {
    color: '#64748b',
    fontSize: '14px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  secondaryButton: {
    textDecoration: 'none',
    background: '#eef4fb',
    color: '#163b7a',
    borderRadius: '14px',
    padding: '12px 16px',
    fontWeight: '800',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '980px',
  },
  headRow: {
    background: '#f8fbff',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '2.1fr 1fr 0.9fr 0.9fr 1fr 1fr',
    gap: '12px',
    alignItems: 'center',
    padding: '16px 14px',
    borderBottom: '1px solid #e5e7eb',
  },
  th: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '800',
    color: '#2563eb',
  },
  td: {
    fontSize: '14px',
    color: '#0f172a',
    fontWeight: '600',
  },
  companyName: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '4px',
  },
  companyMeta: {
    fontSize: '12px',
    color: '#64748b',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '86px',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '800',
  },
  badgeTrial: {
    background: '#fef3c7',
    color: '#92400e',
  },
  badgeActive: {
    background: '#dcfce7',
    color: '#166534',
  },
  badgeUnknown: {
    background: '#e2e8f0',
    color: '#334155',
  },
  emptyState: {
    padding: '24px 14px',
    color: '#64748b',
  },
}
