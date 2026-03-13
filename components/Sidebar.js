"use client"

import { getTranslations } from "../lib/i18n"

export default function Sidebar({ language }) {

  const t = getTranslations(language)

  return (

    <div style={styles.sidebar}>

      <a>{t.dashboard}</a>
      <a>{t.jobs}</a>
      <a>{t.customers}</a>
      <a>{t.invoices}</a>
      <a>{t.workers}</a>
      <a>{t.map}</a>
      <a>{t.calendar}</a>
      <a>{t.reports}</a>
      <a>{t.settings}</a>

    </div>

  )

}

const styles = {

sidebar:{
  width:"220px",
  background:"#163b7a",
  color:"#fff",
  minHeight:"100vh",
  padding:"20px",
  display:"flex",
  flexDirection:"column",
  gap:"14px"
}

}


