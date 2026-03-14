import { translations } from "./translations"

export function getTranslations(lang) {
  return translations[lang] || translations["en"]
}

export function getLanguage() {
  if (typeof window === "undefined") return "en"
  return localStorage.getItem("lang") || "en"
}

export function setLanguage(lang) {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang)
    window.location.reload()
  }
}
