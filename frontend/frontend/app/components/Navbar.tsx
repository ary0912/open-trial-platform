"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const activeTheme = savedTheme || systemTheme
    if (activeTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDarkMode(false)
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", isDark ? "dark" : "light")
    setIsDarkMode(isDark)
  }

  const navItems = [
    { name: "Platform", href: "/platform" },
    { name: "Analytics", href: "/analytics" },
    { name: "Documentation", href: "/docs" }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0d0d11]/80 backdrop-blur-md border-b border-hairline dark:border-zinc-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO - LEFT */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-4 h-4 bg-primary-dark dark:bg-white rotate-45 transition-transform group-hover:rotate-90" />
          <span className="text-xl font-normal tracking-[-0.02em] uppercase text-primary-dark dark:text-white">OpenTrials</span>
        </Link>

        {/* MENU - CENTER (Desktop) */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <span className={`text-sm font-normal transition-colors ${
                  isActive ? "text-primary-dark dark:text-white" : "text-muted-slate hover:text-primary-dark dark:hover:text-white"
                }`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>

        {/* CTA - RIGHT (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* DARK TOGGLE */}
          <button
            onClick={toggleTheme}
            className="
              p-2.5
              rounded-full
              border
              border-hairline
              dark:border-zinc-800
              bg-white
              dark:bg-[#17171c]
              hover:bg-[#fafafa]
              dark:hover:bg-zinc-800
              transition-colors
              flex
              items-center
              justify-center
              text-primary-dark
              dark:text-white
              active:scale-95
            "
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link href="/dashboard">
            <button className="bg-primary-dark dark:bg-white text-white dark:text-[#0d0d11] px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity tracking-[-0.02em]">
              Launch Platform
            </button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-primary-dark dark:text-white"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            <Menu className="w-6 h-6 text-primary-dark dark:text-white" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white dark:bg-[#0d0d11] border-b border-hairline dark:border-zinc-800 shadow-lg flex flex-col items-center py-4 space-y-4 transition-colors duration-300">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <span className="text-sm font-normal text-primary-dark dark:text-white">
                {item.name}
              </span>
            </Link>
          ))}
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <button className="bg-primary-dark dark:bg-white text-white dark:text-[#0d0d11] px-5 py-2 rounded-full text-sm font-medium tracking-[-0.02em]">
              Launch Platform
            </button>
          </Link>
        </div>
      )}
    </motion.nav>
  )
}