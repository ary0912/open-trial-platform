"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fb] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-[#eeece7] p-6 pt-28 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center space-y-8 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#0f172a] text-white flex items-center justify-center shadow-2xl">
          <Shield className="w-8 h-8" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Security Center
        </h1>
        
        <p className="text-lg text-[#64748b] leading-relaxed">
          Your data is encrypted end-to-end and HIPAA compliant. The detailed security specifications and compliance documents will be published here.
        </p>
        
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-8 h-14 rounded-full bg-[#0f172a] text-white font-medium hover:scale-105 transition-all shadow-xl">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
