"use client"

import { useState } from "react"
import Topbar from "../../components/Topbar"
import Sidebar from "../../components/Sidebar"

export default function DashboardPage() {

  const [language, setLanguage] = useState("de")

  return (

    <div style={styles.wrapper}>

      <Sidebar language={language} />

      <div style={styles.content}>

        <Topbar
          language={language}
          setLanguage={setLanguage}
        />

        <div style={styles.dashboard}>

          <h1>Dashboard</h1>

        </div>

      </div>

    </div>

  )

}

const styles = {

wrapper:{
  display:"flex"
},

content:{
  flex:1
},

dashboard:{
  padding:"30px"
}

}
