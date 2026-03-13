export default function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <img
          src="/logo.png"
          alt="JobFlow"
          style={styles.logo}
        />

        <p style={styles.subtitle}>
          Handwerk-Managementsystem
        </p>

        <input
          type="email"
          placeholder="E-Mail"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Passwort"
          style={styles.input}
        />

        <button style={styles.button}>
          Anmelden
        </button>

        <p style={styles.languages}>
          Deutsch | English | BHS
        </p>
      </div>
    </main>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef2f7"
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "24px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },

  logo: {
    width: "170px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "24px",
    fontSize: "18px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#163b7a",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer"
  },

  languages: {
    marginTop: "14px",
    fontSize: "14px",
    color: "#6b7280"
  }
}
