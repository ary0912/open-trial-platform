import "./globals.css"
import Navbar from "./components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <main className="min-h-screen bg-[#f5f5f7]">
          {children}
        </main>

      </body>
    </html>
  )
}