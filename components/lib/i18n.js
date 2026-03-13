import { translations } from "./translations"

export function getTranslations(lang) {
  return translations[lang] || translations.de
}

