export default function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>JobFlow</div>
        <h1 style={styles.title}>JobFlow – Handwerk Management System</h1>
        <p style={styles.subtitle}>
          Login for companies, workers and superadmin
        </p>

        <form style={styles.form}>
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <div style={styles.languages}>Deutsch | English | Balkan</div>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f7fb",
    padding: "24px",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center"
  },
  logo: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#163a70",
    marginBottom: "10px"
  },
  title: {
    fontSize: "28px",
    lineHeight: "1.2",
    marginBottom: "10px",
    color: "#1f2937"
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    marginBottom: "24px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "16px"
  },
  button: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "none",
    background: "#163a70",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer"
  },
  languages: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#4b5563"
  }
};
