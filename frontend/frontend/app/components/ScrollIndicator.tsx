"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
        setIsVisible(window.scrollY > 200)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // SVG parameters
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
        >
          <button
            onClick={scrollToTop}
            className="
              relative
              w-14
              h-14
              rounded-full
              bg-white
              dark:bg-[#1c1c24]
              border
              border-hairline
              dark:border-zinc-800
              shadow-lg
              hover:shadow-xl
              flex
              items-center
              justify-center
              group
              transition-all
              active:scale-95
            "
          >
            {/* PROGRESS RING */}
            <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-zinc-100 dark:stroke-zinc-800 fill-none"
                strokeWidth="2"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-primary-dark dark:stroke-white fill-none transition-all duration-75"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* PERCENTAGE ON HOVER / ICON DEFAULT */}
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="absolute text-[10px] font-mono font-medium opacity-0 group-hover:opacity-100 transition-opacity text-primary-dark dark:text-white">
                {Math.round(scrollProgress)}%
              </span>
              <ArrowUp className="w-4 h-4 text-primary-dark dark:text-white group-hover:opacity-0 transition-opacity" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
