export const translations = {
  de: {
    dashboard: "Dashboard",
    jobs: "Einsätze",
    clients: "Kunden",
    workers: "Mitarbeiter",
    map: "Karte",
    logout: "Abmelden"
  },

  en: {
    dashboard: "Dashboard",
    jobs: "Jobs",
    clients: "Clients",
    workers: "Workers",
    map: "Map",
    logout: "Logout"
  },

  bhs: {
    dashboard: "Kontrolna tabla",
    jobs: "Poslovi",
    clients: "Klijenti",
    workers: "Radnici",
    map: "Mapa",
    logout: "Odjava"
  }
}

export function getTranslations(lang) {
  return translations[lang] || translations["en"]
}
