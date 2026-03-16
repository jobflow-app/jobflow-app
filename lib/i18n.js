export const translations = {
  de: {
    login: 'Login',
    email: 'E-Mail',
    password: 'Passwort',
    forgotPassword: 'Passwort vergessen?',
    createAccount: 'Firma registrieren',
    registerTitle: 'Neue Firma registrieren',
    companyName: 'Firmenname',
    register: 'Registrieren',
    backToLogin: 'Zurück zum Login',
    forgotTitle: 'Passwort zurücksetzen',
    resetLink: 'Reset-Link senden',
    updateTitle: 'Neues Passwort',
    savePassword: 'Passwort speichern',
  },
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    createAccount: 'Create Account',
    registerTitle: 'Register New Company',
    companyName: 'Company Name',
    register: 'Register',
    backToLogin: 'Back to Login',
    forgotTitle: 'Reset Password',
    resetLink: 'Send Reset Link',
    updateTitle: 'New Password',
    savePassword: 'Save Password',
  },
  bhs: {
    login: 'Prijava',
    email: 'E-mail',
    password: 'Šifra',
    forgotPassword: 'Zaboravljena šifra?',
    createAccount: 'Registracija firme',
    registerTitle: 'Registracija nove firme',
    companyName: 'Naziv firme',
    register: 'Registracija',
    backToLogin: 'Nazad na login',
    forgotTitle: 'Reset šifre',
    resetLink: 'Pošalji reset link',
    updateTitle: 'Nova šifra',
    savePassword: 'Sačuvaj šifru',
  },
}

export function getLanguage() {
  if (typeof window === 'undefined') return 'de'
  return localStorage.getItem('jobflow_language') || 'de'
}

export function setLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jobflow_language', lang)
  }
}
