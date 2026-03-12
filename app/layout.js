export const metadata = {
  title: "JobFlow – Handwerk Management System",
  description: "Jobs, clients, invoices, reports, map and superadmin."
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
