"use client"

import Link from "next/link"
import { getTranslations, getLanguage } from "../lib/i18n"

export default function Sidebar() {

  const lang = getLanguage()
  const t = getTranslations(lang)

  return (

    <aside style={styles.sidebar}>

      <h2 style={styles.logo}>JobFlow</h2>

      <nav style={styles.nav}>

        <Link href="/dashboard">{t.dashboard}</Link>

        <Link href="/map">{t.map}</Link>

        <Link href="/worker">{t.jobs}</Link>

        <Link href="/settings">{t.settings}</Link>

      </nav>

    </aside>

  )
}

const styles = {

sidebar:{
width:"220px",
background:"#163b7a",
color:"#fff",
height:"100vh",
padding:"20px"
},

logo:{
marginBottom:"30px"
},

nav:{
display:"flex",
flexDirection:"column",
gap:"12px"
}

}
