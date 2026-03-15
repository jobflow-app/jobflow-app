export const translations = {
  de: {
    subtitle: 'Handwerk Management System',
    email: 'E-Mail',
    password: 'Passwort',
    login: 'Anmelden',
    loginLoading: 'Anmeldung...',
    forgotPassword: 'Passwort vergessen?',
    register: 'Neue Kundenregistrierung',
    unknownRole: 'Unbekannte Benutzerrolle.',
    userNotFound: 'Benutzer wurde nicht gefunden.',
    languageDe: 'Deutsch',
    languageEn: 'Englisch',
    languageBhs: 'BHS',
  },

  en: {
    subtitle: 'Handwork Management System',
    email: 'Email',
    password: 'Password',
    login: 'Login',
    loginLoading: 'Logging in...',
    forgotPassword: 'Forgot password?',
    register: 'New customer registration',
    unknownRole: 'Unknown user role.',
    userNotFound: 'User not found.',
    languageDe: 'Deutsch',
    languageEn: 'English',
    languageBhs: 'BHS',
  },

  bhs: {
    subtitle: 'Sistem za upravljanje poslovima',
    email: 'Email',
    password: 'Lozinka',
    login: 'Prijava',
    loginLoading: 'Prijava...',
    forgotPassword: 'Zaboravili ste lozinku?',
    register: 'Nova registracija klijenata',
    unknownRole: 'Nepoznata korisnička rola.',
    userNotFound: 'Korisnik nije pronađen.',
    languageDe: 'Deutsch',
    languageEn: 'English',
    languageBhs: 'BHS',
  },
}

export function getLanguage() {
  if (typeof window === 'undefined') return 'de'
  return localStorage.getItem('jobflow_lang') || 'de'
}

export function setLanguage(lang) {
  if (typeof window === 'undefined') return
  localStorage.setItem('jobflow_lang', lang)
}
