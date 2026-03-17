"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {

  const pathname = usePathname()

  const navItems = [
    { name: "Studies", href: "/studies" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Upload", href: "/upload" }
  ]

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/80
        border-b border-gray-200
      "
    >

      <div className="
        w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
        py-3
        flex items-center justify-between relative
      ">

        {/* 🔵 LOGO - LEFT */}
        <Link href="/" className="flex items-center gap-2 shrink-0">

          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />

          <h1 className="
            text-base sm:text-lg md:text-lg lg:text-xl
            font-semibold tracking-tight
            bg-gradient-to-r from-blue-600 to-purple-600
            text-transparent bg-clip-text
          ">
            OpenTrials
          </h1>

        </Link>

        {/* 🧭 NAV ITEMS - CENTER */}
        <div className="
          absolute left-1/2 -translate-x-1/2
          hidden md:flex items-center
          gap-6 lg:gap-8
        ">

          {navItems.map((item) => {

            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <div className="relative">

                  <span
                    className={`
                      text-sm md:text-sm lg:text-base
                      font-medium transition-all duration-200
                      ${isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                        : "text-gray-500 hover:text-blue-600"}
                    `}
                  >
                    {item.name}
                  </span>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="
                        absolute -bottom-2 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-blue-600 to-purple-600
                        rounded-full
                      "
                    />
                  )}

                </div>
              </Link>
            )
          })}

        </div>

        {/* 🚀 CTA - RIGHT */}
        <Link href="/studies" className="shrink-0">

          <button className="
            text-sm sm:text-base md:text-base lg:text-lg
            font-semibold
            bg-gradient-to-r from-blue-600 to-purple-600
            text-transparent bg-clip-text
            hover:opacity-80 transition
          ">
            New Study
          </button>

        </Link>

      </div>
    </motion.nav>
  )
}