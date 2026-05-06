import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { Metadata, Viewport } from "next"

const geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
})

export const metadata: Metadata = {
  title: "OpenTrials | Clinical Research Analytics Platform",
  description: "Transform clinical trial data into actionable insights with our enterprise-grade analytics platform. Real-time monitoring, intelligent analysis, and seamless collaboration.",
  keywords: ["clinical trials", "research analytics", "healthcare data", "trial management"],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={cn(geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
