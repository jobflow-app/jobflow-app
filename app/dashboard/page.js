export default function DashboardPage() {
  return (
    <main style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>JobFlow</div>

        <nav style={styles.nav}>
          <a style={styles.navItem}>Dashboard</a>
          <a style={styles.navItem}>Poslovi</a>
          <a style={styles.navItem}>Klijenti</a>
          <a style={styles.navItem}>Računi</a>
          <a style={styles.navItem}>Mapa</a>
          <a style={styles.navItem}>Statistika</a>
          <a style={styles.navItem}>Settings</a>
        </nav>
      </aside>

      <section style={styles.content}>
        <div style={styles.topbar}>
          <h1 style={styles.title}>Dashboard</h1>
          <div style={styles.lang}>Deutsch | English | Balkan</div>
        </div>

        <div style={styles.grid}>
          <div style={styles.cardBlue}>
            <div style={styles.cardTitle}>Današnji poslovi</div>
            <div style={styles.cardValue}>5</div>
          </div>

          <div style={styles.cardYellow}>
            <div style={styles.cardTitle}>U toku</div>
            <div style={styles.cardValue}>2</div>
          </div>

          <div style={styles.cardGreen}>
            <div style={styles.cardTitle}>Završeno</div>
            <div style={styles.cardValue}>3</div>
          </div>

          <div style={styles.cardDark}>
            <div style={styles.cardTitle}>Prihod danas</div>
            <div style={styles.cardValue}>420 €</div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Brze akcije</h2>
          <div style={styles.actions}>
            <button style={styles.actionBtn}>+ Novi posao</button>
            <button style={styles.actionBtn}>Klijenti</button>
            <button style={styles.actionBtn}>Računi</button>
            <button style={styles.actionBtn}>Mapa</button>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    fontFamily: "Arial, sans-serif",
    background: "#f4f7fb"
  },
  sidebar: {
    width: "240px",
    background: "#163a70",
    color: "#fff",
    padding: "24px 18px"
  },
  brand: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "30px"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  navItem: {
    color: "#fff",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.08)"
  },
  content: {
    flex: 1,
    padding: "28px"
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "12px",
    flexWrap: "wrap"
  },
  title: {
    margin: 0,
    fontSize: "34px",
    color: "#1f2937"
  },
  lang: {
    color: "#4b5563",
    fontSize: "15px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "28px"
  },
  cardBlue: {
    background: "#3b82f6",
    color: "#fff",
    borderRadius: "18px",
    padding: "24px"
  },
  cardYellow: {
    background: "#f59e0b",
    color: "#fff",
    borderRadius: "18px",
    padding: "24px"
  },
  cardGreen: {
    background: "#10b981",
    color: "#fff",
    borderRadius: "18px",
    padding: "24px"
  },
  cardDark: {
    background: "#1f2937",
    color: "#fff",
    borderRadius: "18px",
    padding: "24px"
  },
  cardTitle: {
    fontSize: "18px",
    marginBottom: "10px"
  },
  cardValue: {
    fontSize: "36px",
    fontWeight: "700"
  },
  section: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "18px",
    color: "#1f2937"
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap"
  },
  actionBtn: {
    padding: "14px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#163a70",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer"
  }
};
