export const translations = {
  de: {
    subtitle: "Handwerk Management System",
    email: "E-Mail",
    password: "Passwort",
    login: "Anmelden",
    loginLoading: "Anmeldung...",
    forgotPassword: "Passwort vergessen?",
    register: "Neue Kundenregistrierung"
  },

  en: {
    subtitle: "Handwork Management System",
    email: "Email",
    password: "Password",
    login: "Login",
    loginLoading: "Logging in...",
    forgotPassword: "Forgot password?",
    register: "New customer registration"
  },

  bhs: {
    subtitle: "Sistem za upravljanje poslovima",
    email: "Email",
    password: "Lozinka",
    login: "Prijava",
    loginLoading: "Prijava...",
    forgotPassword: "Zaboravili ste lozinku?",
    register: "Nova registracija klijenta"
  }
}

export function getLanguage() {
  if (typeof window === "undefined") return "de"
  return localStorage.getItem("lang") || "de"
}

export function setLanguage(lang) {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang)
  }
}
