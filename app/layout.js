export const metadata = {
  title: 'JobFlow',
  description: 'Handwerk Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.body}>{children}</body>
    </html>
  )
}

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Inter, Arial, sans-serif',
    background: '#eef2f7',
  },
}
