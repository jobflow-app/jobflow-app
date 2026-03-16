'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SuperadminDashboardPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [stats, setStats] = useState({
    totalCompanies: 0,
    trialCompanies: 0,
    activeCompanies: 0,
    totalWorkers: 0,
    totalClients: 0,
    activeJobs: 0,
    mrr: 0,
  })
  const [companies, setCompanies] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    checkAccessAndLoad()
  }, [])

  const formatMoney = useMemo(() => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    })
  }, [])

  async function checkAccessAndLoad() {
    try {
      setLoading(true)
      setErrorMessage('')

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/')
        return
      }

      const userEmail = user.email || ''
      setEmail(userEmail)

      const { data: superadminRow, error: superadminError } = await supabase
        .from('superadmins')
        .select('email')
        .eq('email', userEmail)
        .maybeSingle()

      if (superadminError || !superadminRow) {
        router.push('/dashboard')
        return
      }

      await loadDashboardData()
    } catch (error) {
      console.error('Dashboard access error:', error)
      setErrorMessage('Greška pri učitavanju dashboarda.')
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

      const companiesData = companiesRes.data || []
      const workersData = workersRes.data || []
      const clientsData = clientsRes.data || []
      const jobsData = jobsRes.data || []
      const subscriptionsData = subscriptionsRes.data || []

      const workersByCompany = countByCompany(workersData)
      const clientsByCompany = countByCompany(clientsData)
      const activeJobsByCompany = countActiveJobsByCompany(jobsData)

      const enrichedCompanies = companiesData.map((company) => {
        const companySubscription = subscriptionsData.find(
          (sub) => sub.company_id === company.id
        )

        const isTrial =
          companySubscription?.status === 'trial' ||
          company.trial_status === 'trial' ||
          company.status === 'trial' ||
          company.plan === 'trial'

        const isActive =
          companySubscription?.status === 'active' ||
          company.trial_status === 'active' ||
          company.status === 'active' ||
          company.plan === 'active'

        const monthlyPrice =
          Number(companySubscription?.price_monthly) ||
          Number(companySubscription?.monthly_price) ||
          Number(company.price_monthly) ||
          Number(company.monthly_price) ||
          0

        return {
          ...company,
          workers_count: workersByCompany[company.id] || 0,
          clients_count: clientsByCompany[company.id] || 0,
          active_jobs_count: activeJobsByCompany[company.id] || 0,
          panel_status: isTrial ? 'Trial' : isActive ? 'Active' : 'Unknown',
          monthly_price: monthlyPrice,
        }
      })

      const totalCompanies = enrichedCompanies.length
      const trialCompanies = enrichedCompanies.filter((c) => c.panel_status === 'Trial').length
      const activeCompanies = enrichedCompanies.filter((c) => c.panel_status === 'Active').length
      const totalWorkers = workersData.length
      const totalClients = clientsData.length
      const activeJobs = jobsData.filter((job) =>
        ['open', 'assigned', 'in_progress', 'active'].includes(job.status)
      ).length

      const mrr = enrichedCompanies
        .filter((c) => c.panel_status === 'Active')
        .reduce((sum, company) => sum + (Number(company.monthly_price) || 0), 0)

      setStats({
        totalCompanies,
        trialCompanies,
        activeCompanies,
        totalWorkers,
        totalClients,
        activeJobs,
        mrr,
      })

      setCompanies(enrichedCompanies)
    } catch (error) {
      console.error('Load dashboard data error:', error)
      setErrorMessage('Greška pri učitavanju podataka iz baze.')
    }
  }

  function countByCompany(items) {
    return items.reduce((acc, item) => {
      const key = item.company_id
      if (!key) return acc
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  }

  function countActiveJobsByCompany(items) {
    return items.reduce((acc, item) => {
      const isActive = ['open', 'assigned', 'in_progress', 'active'].includes(item.status)
      if (!item.company_id || !isActive) return acc
      acc[item.company_id] = (acc[item.company_id] || 0) + 1
      return acc
    }, {})
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.centerCard}>
          <h1 style={styles.loadingTitle}>JobFlow Superadmin</h1>
          <p style={styles.loadingText}>Učitavanje dashboarda...</p>
        </div>
      </main>
    )
  }

  return (
    <main style={styles.page}>
      <div style={styles.bgGlowOne} />
      <div style={styles.bgGlowTwo} />

      <section style={styles.topbar}>
        <div>
          <p style={styles.kicker}>JOBFLOW SAAS</p>
          <h1 style={styles.title}>Superadmin Dashboard</h1>
          <p style={styles.subtitle}>
            Centralni pregled cijelog sistema, firmi, radnika i aktivnih poslova.
          </p>
        </div>

        <div style={styles.topbarRight}>
          <div style={styles.userBox}>
            <span style={styles.userLabel}>Prijavljen:</span>
            <span style={styles.userEmail}>{email}</span>
          </div>

          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </section>

      {errorMessage ? (
        <div style={styles.errorBox}>{errorMessage}</div>
      ) : null}

      <section style={styles.statsGrid}>
        <StatCard title="Total Companies" value={stats.totalCompanies} />
        <StatCard title="Trial Companies" value={stats.trialCompanies} />
        <StatCard title="Active Companies" value={stats.activeCompanies} />
        <StatCard title="Total Workers" value={stats.totalWorkers} />
        <StatCard title="Total Clients" value={stats.totalClients} />
        <StatCard title="Active Jobs" value={stats.activeJobs} />
        <StatCard title="MRR" value={formatMoney.format(stats.mrr)} wide />
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Companies Overview</h2>
            <p style={styles.sectionText}>
              Pregled svih firmi sa statusom, brojem radnika, klijenata i aktivnih poslova.
            </p>
          </div>

          <div style={styles.sectionActions}>
            <Link href="/admin" style={styles.secondaryButton}>
              Nazad na Admin
            </Link>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <div style={styles.table}>
            <div style={{ ...styles.thead, ...styles.row }}>
              <div style={styles.th}>Firma</div>
              <div style={styles.th}>Status</div>
              <div style={styles.th}>Radnici</div>
              <div style={styles.th}>Klijenti</div>
              <div style={styles.th}>Aktivni poslovi</div>
              <div style={styles.th}>MRR</div>
            </div>

            {companies.length === 0 ? (
              <div style={styles.emptyState}>Nema firmi u bazi.</div>
            ) : (
              companies.map((company) => (
                <div key={company.id} style={styles.row}>
                  <div style={styles.td}>
                    <div style={styles.companyName}>
                      {company.name || company.company_name || 'Unnamed company'}
                    </div>
                    <div style={styles.companyMeta}>
                      {company.owner_email || company.email || 'Bez emaila'}
                    </div>
                  </div>

                  <div style={styles.td}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        ...(company.panel_status === 'Trial'
                          ? styles.trialBadge
                          : company.panel_status === 'Active'
                          ? styles.activeBadge
                          : styles.unknownBadge),
                      }}
                    >
                      {company.panel_status}
                    </span>
                  </div>

                  <div style={styles.td}>{company.workers_count}</div>
                  <div style={styles.td}>{company.clients_count}</div>
                  <div style={styles.td}>{company.active_jobs_count}</div>
                  <div style={styles.td}>
                    {company.monthly_price > 0
                      ? formatMoney.format(company.monthly_price)
                      : '—'}
                  </div>
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
    <div
      style={{
        ...styles.statCard,
        ...(wide ? styles.statCardWide : {}),
      }}
    >
      <p style={styles.statLabel}>{title}</p>
      <h3 style={styles.statValue}>{value}</h3>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '28px',
    background:
      'linear-gradient(135deg, #071126 0%, #0b1830 35%, #0f2347 70%, #15356b 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlowOne: {
    position: 'absolute',
    top: '-120px',
    right: '-100px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'rgba(59,130,246,0.16)',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },
  bgGlowTwo: {
    position: 'absolute',
    bottom: '-120px',
    left: '-80px',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(34,211,238,0.14)',
    filter: 'blur(70px)',
    pointerEvents: 'none',
  },
  centerCard: {
    maxWidth: '560px',
    margin: '140px auto',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(20px)',
    borderRadius: '28px',
    padding: '40px',
    textAlign: 'center',
    color: '#fff',
  },
  loadingTitle: {
    fontSize: '34px',
    fontWeight: '800',
    marginBottom: '10px',
  },
  loadingText: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.8)',
  },
  topbar: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '26px',
    flexWrap: 'wrap',
  },
  kicker: {
    color: '#7dd3fc',
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.18em',
    marginBottom: '10px',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '40px',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '10px',
    lineHeight: 1.05,
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.75)',
    maxWidth: '760px',
    lineHeight: 1.6,
  },
  topbarRight: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userBox: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '18px',
    padding: '14px 16px',
    backdropFilter: 'blur(16px)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '220px',
  },
  userLabel: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '4px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#fff',
    fontWeight: '700',
    wordBreak: 'break-word',
  },
  logoutButton: {
    border: 'none',
    borderRadius: '16px',
    padding: '14px 18px',
    background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
    color: '#fff',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(37,99,235,0.35)',
  },
  errorBox: {
    position: 'relative',
    zIndex: 2,
    marginBottom: '18px',
    background: 'rgba(239,68,68,0.12)',
    color: '#fecaca',
    border: '1px solid rgba(239,68,68,0.35)',
    borderRadius: '18px',
    padding: '14px 16px',
  },
  statsGrid: {
    position: 'relative',
    zIndex: 2,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
    marginBottom: '26px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '24px',
    padding: '22px',
    backdropFilter: 'blur(16px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.16)',
  },
  statCardWide: {
    gridColumn: 'span 2',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.68)',
    marginBottom: '10px',
    fontWeight: '700',
  },
  statValue: {
    fontSize: '34px',
    color: '#fff',
    fontWeight: '900',
    lineHeight: 1.1,
  },
  section: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '28px',
    padding: '22px',
    backdropFilter: 'blur(18px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.16)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '18px',
    flexWrap: 'wrap',
    marginBottom: '18px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '6px',
  },
  sectionText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.72)',
  },
  sectionActions: {
    display: 'flex',
    gap: '10px',
  },
  secondaryButton: {
    textDecoration: 'none',
    borderRadius: '14px',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff',
    fontWeight: '800',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '980px',
  },
  thead: {
    background: 'rgba(255,255,255,0.06)',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '2.2fr 1fr 0.8fr 0.8fr 1fr 1fr',
    gap: '12px',
    alignItems: 'center',
    padding: '16px 14px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  th: {
    color: '#93c5fd',
    fontWeight: '800',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  td: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
  },
  companyName: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '4px',
  },
  companyMeta: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.62)',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '84px',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '800',
  },
  trialBadge: {
    background: 'rgba(250,204,21,0.16)',
    color: '#fde68a',
    border: '1px solid rgba(250,204,21,0.28)',
  },
  activeBadge: {
    background: 'rgba(34,197,94,0.16)',
    color: '#86efac',
    border: '1px solid rgba(34,197,94,0.28)',
  },
  unknownBadge: {
    background: 'rgba(148,163,184,0.16)',
    color: '#cbd5e1',
    border: '1px solid rgba(148,163,184,0.28)',
  },
  emptyState: {
    padding: '26px 14px',
    color: 'rgba(255,255,255,0.72)',
    fontSize: '14px',
  },
}
