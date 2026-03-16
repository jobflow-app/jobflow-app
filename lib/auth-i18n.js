export const authTexts = {
  de: {
    loginTitle: 'Willkommen bei JobFlow',
    loginSubtitle: 'Melden Sie sich in Ihr Handwerk-Managementsystem an.',
    registerTitle: 'Neue Firma registrieren',
    registerSubtitle:
      'Starten Sie mit JobFlow und verwalten Sie Aufträge, Kunden und Mitarbeiter an einem Ort.',
    forgotTitle: 'Passwort zurücksetzen',
    forgotSubtitle:
      'Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.',
    updateTitle: 'Neues Passwort festlegen',
    updateSubtitle: 'Bitte geben Sie ein neues Passwort für Ihr Konto ein.',

    companyName: 'Firmenname',
    email: 'E-Mail',
    password: 'Passwort',
    confirmPassword: 'Passwort bestätigen',
    newPassword: 'Neues Passwort',

    login: 'Anmelden',
    register: 'Firma registrieren',
    forgotPassword: 'Passwort vergessen?',
    backToLogin: 'Zurück zum Login',
    createAccount: 'Firma registrieren',
    trialText: '30 Tage kostenlos testen',
    sendResetLink: 'Reset-Link senden',
    savePassword: 'Passwort speichern',

    loading: 'Bitte warten...',
    passwordUpdated: 'Passwort wurde erfolgreich aktualisiert.',
    resetSent:
      'Wenn die E-Mail existiert, wurde ein Reset-Link gesendet.',
    requiredFields: 'Bitte füllen Sie alle Felder aus.',
    passwordTooShort: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
    passwordsNotMatch: 'Die Passwörter stimmen nicht überein.',
    genericError: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
  },

  en: {
    loginTitle: 'Welcome to JobFlow',
    loginSubtitle: 'Sign in to your field service management system.',
    registerTitle: 'Register a new company',
    registerSubtitle:
      'Start with JobFlow and manage jobs, clients and workers in one place.',
    forgotTitle: 'Reset password',
    forgotSubtitle:
      'Enter your email address and we will send you a password reset link.',
    updateTitle: 'Set new password',
    updateSubtitle: 'Please enter a new password for your account.',

    companyName: 'Company name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm password',
    newPassword: 'New password',

    login: 'Login',
    register: 'Register company',
    forgotPassword: 'Forgot password?',
    backToLogin: 'Back to login',
    createAccount: 'Create an account',
    trialText: '30 days free trial',
    sendResetLink: 'Send reset link',
    savePassword: 'Save password',

    loading: 'Please wait...',
    passwordUpdated: 'Password updated successfully.',
    resetSent:
      'If the email exists, a password reset link has been sent.',
    requiredFields: 'Please fill in all fields.',
    passwordTooShort: 'Password must be at least 6 characters long.',
    passwordsNotMatch: 'Passwords do not match.',
    genericError: 'Something went wrong. Please try again.',
  },

  bhs: {
    loginTitle: 'Dobro došli u JobFlow',
    loginSubtitle: 'Prijavite se u svoj sistem za upravljanje poslovima.',
    registerTitle: 'Registracija nove firme',
    registerSubtitle:
      'Počnite sa JobFlow-om i vodite poslove, klijente i radnike na jednom mjestu.',
    forgotTitle: 'Reset lozinke',
    forgotSubtitle:
      'Unesite svoju e-mail adresu i poslat ćemo vam link za reset lozinke.',
    updateTitle: 'Postavi novu lozinku',
    updateSubtitle: 'Molimo unesite novu lozinku za svoj račun.',

    companyName: 'Naziv firme',
    email: 'E-mail',
    password: 'Lozinka',
    confirmPassword: 'Potvrdite lozinku',
    newPassword: 'Nova lozinka',

    login: 'Prijava',
    register: 'Registruj firmu',
    forgotPassword: 'Zaboravljena šifra?',
    backToLogin: 'Nazad na login',
    createAccount: 'Registracija',
    trialText: '30 dana besplatnog probnog perioda',
    sendResetLink: 'Pošalji reset link',
    savePassword: 'Sačuvaj lozinku',

    loading: 'Sačekajte...',
    passwordUpdated: 'Lozinka je uspješno promijenjena.',
    resetSent:
      'Ako e-mail postoji, poslan je link za reset lozinke.',
    requiredFields: 'Molimo popunite sva polja.',
    passwordTooShort: 'Lozinka mora imati najmanje 6 znakova.',
    passwordsNotMatch: 'Lozinke se ne podudaraju.',
    genericError: 'Došlo je do greške. Pokušajte ponovo.',
  },
}

export function getInitialLanguage() {
  if (typeof window === 'undefined') return 'de'
  const saved = window.localStorage.getItem('jobflow_language')
  return saved || 'de'
}

export function saveLanguage(language) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('jobflow_language', language)
  }
}
