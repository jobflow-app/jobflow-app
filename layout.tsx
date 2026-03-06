export const metadata = {
  title: "JobFlow",
  description: "Field service CRM"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f5f7fb" }}>
        {children}
      </body>
    </html>
  );
}
