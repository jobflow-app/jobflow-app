"use client"

export default function LanguageSwitcher({ language, setLanguage }) {

  return (
    <div style={styles.wrapper}>

      <button
        onClick={() => setLanguage("de")}
        style={language === "de" ? styles.active : styles.btn}
      >
        DE
      </button>

      <button
        onClick={() => setLanguage("en")}
        style={language === "en" ? styles.active : styles.btn}
      >
        EN
      </button>

      <button
        onClick={() => setLanguage("bhs")}
        style={language === "bhs" ? styles.active : styles.btn}
      >
        BHS
      </button>

    </div>
  )
}

const styles = {

wrapper:{
  display:"flex",
  gap:"6px"
},

btn:{
  padding:"6px 10px",
  borderRadius:"6px",
  border:"1px solid #ccc",
  background:"#fff",
  cursor:"pointer"
},

active:{
  padding:"6px 10px",
  borderRadius:"6px",
  border:"1px solid #163b7a",
  background:"#163b7a",
  color:"#fff",
  cursor:"pointer"
}

}
