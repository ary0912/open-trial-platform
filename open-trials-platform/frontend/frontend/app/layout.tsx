import "./globals.css"
import Navbar from "./components/Navbar"
import ScrollIndicator from "./components/ScrollIndicator"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem("theme");
                  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  const activeTheme = savedTheme || systemTheme;
                  if (activeTheme === "dark") {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>

        <Navbar />

        <main className="min-h-screen bg-[#f5f5f7] dark:bg-[#0d0d11] text-[#17171c] dark:text-[#eeece7] transition-colors duration-300">
          {children}
        </main>

        <ScrollIndicator />

      </body>
    </html>

  )
}