"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  Code2, 
  Terminal, 
  Network, 
  RefreshCw, 
  Check 
} from "lucide-react"
import Link from "next/link"

const FLOW_STEPS = [
  {
    id: 1,
    title: "1. Structured Ingest",
    desc: "Ingest CSV files. The platform automatically infers data types, detects schemas, and counts total records.",
    icon: Database
  },
  {
    id: 2,
    title: "2. Drift Alignment",
    desc: "Reconcile structural shifts, parse cohort variables, and execute statistical metric aggregations.",
    icon: RefreshCw
  },
  {
    id: 3,
    title: "3. Secure Sandbox",
    desc: "Generate local-first operations ledger. Render real-time conversions, funnel metrics, and interactive trends.",
    icon: ShieldCheck
  }
]

export default function PlatformPage() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-[#eeece7] relative overflow-hidden pt-28 pb-32 transition-colors duration-300">
      
      {/* Background radial glows for premium SaaS feeling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1863dc] blur-[150px] opacity-[0.06]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#10b981] blur-[120px] opacity-[0.04]" />
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* HERO SECTION */}
        <section className="max-w-4xl space-y-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors mb-6 group uppercase tracking-widest font-mono">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-action-blue/10 flex items-center justify-center border border-action-blue/15 shadow-sm">
              <Layers className="w-5 h-5 text-action-blue animate-spin" />
            </div>
            <span className="mono-label text-action-blue font-semibold">Core Architecture</span>
          </div>

          <h1 className="text-[clamp(44px,6vw,72px)] leading-[0.95] tracking-tight font-normal text-primary-dark">
            A secure, developer-first hub for clinical operations.
          </h1>

          <p className="text-lg md:text-xl text-[#64748b] font-light leading-relaxed max-w-3xl">
            Leverage robust local sandboxes, high-fidelity schema parsers, and automated ledger generation. Engine-optimized for speed and clinical reliability.
          </p>
        </section>

        {/* INTERACTIVE PIPELINE FLOW VISUALIZER */}
        <section className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-sm space-y-10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-black/5 dark:border-zinc-800/40 pb-6">
            <div className="space-y-1">
              <span className="mono-label text-[10px]">Data Lifecycle</span>
              <h3 className="text-2xl font-semibold tracking-tight text-primary-dark dark:text-white">Operational pipeline flow.</h3>
            </div>
            
            <div className="flex gap-2">
              {FLOW_STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                    activeStep === s.id 
                      ? "bg-action-blue text-white border-action-blue shadow-sm" 
                      : "bg-[#f8fafc] text-[#64748b] border-black/5 hover:border-black/10"
                  }`}
                >
                  Step {s.id}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Step Descriptions */}
            <div className="lg:col-span-1 space-y-6">
              {FLOW_STEPS.map((step) => {
                const isActive = activeStep === step.id
                const StepIcon = step.icon
                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-primary-dark dark:bg-white text-white dark:text-primary-dark border-primary-dark dark:border-white shadow-md" 
                        : "bg-[#f8fafc] dark:bg-zinc-800/40 border-black/5 dark:border-zinc-800/40 hover:border-black/10 opacity-70"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isActive ? "bg-white/10 border-white/10" : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-zinc-800/40"
                      }`}>
                        <StepIcon className={`w-4.5 h-4.5 ${isActive ? "text-action-blue" : "text-[#64748b] dark:text-zinc-400"}`} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-semibold">{step.title}</span>
                        <p className={`text-[11px] leading-relaxed font-light ${isActive ? "text-white/70 dark:text-primary-dark/80" : "text-[#64748b] dark:text-zinc-400"}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Simulated Live Visual Pipeline */}
            <div className="lg:col-span-2 bg-[#f8fafc] dark:bg-zinc-800/20 border border-black/5 dark:border-zinc-800/60 rounded-2xl p-8 h-[320px] flex flex-col justify-center items-center relative overflow-hidden transition-colors duration-300">
              
              {/* Dynamic steps visual */}
              <div className="flex items-center gap-6 relative z-10 w-full max-w-lg justify-between">
                
                {/* Step 1 Node */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    activeStep >= 1 ? "bg-white dark:bg-[#1c1c24] border-action-blue shadow-md text-action-blue scale-110" : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-zinc-800 text-[#94a3b8]"
                  }`}>
                    <Database className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#64748b] dark:text-zinc-400">Ingest</span>
                </div>

                {/* Arrow 1 */}
                <div className="flex-1 h-0.5 bg-black/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={activeStep >= 2 ? { left: "100%" } : { left: "-100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent to-action-blue"
                  />
                </div>

                {/* Step 2 Node */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    activeStep >= 2 ? "bg-white dark:bg-[#1c1c24] border-action-blue shadow-md text-action-blue scale-110" : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-zinc-800 text-[#94a3b8]"
                  }`}>
                    <RefreshCw className={`w-6 h-6 ${activeStep === 2 ? "animate-spin" : ""}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#64748b] dark:text-zinc-400">Reconcile</span>
                </div>

                {/* Arrow 2 */}
                <div className="flex-1 h-0.5 bg-black/5 dark:bg-zinc-800 relative overflow-hidden">
                  <motion.div 
                    initial={{ left: "-100%" }}
                    animate={activeStep >= 3 ? { left: "100%" } : { left: "-100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent to-action-blue"
                  />
                </div>

                {/* Step 3 Node */}
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                    activeStep >= 3 ? "bg-white dark:bg-[#1c1c24] border-emerald-500 shadow-md text-emerald-500 scale-110" : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-zinc-800 text-[#94a3b8]"
                  }`}>
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-[#64748b] dark:text-zinc-400">Secure Ledger</span>
                </div>

              </div>

              {/* Status Commentary */}
              <div className="mt-10 text-center space-y-1 relative z-10">
                <span className="mono-label text-[9px] text-[#64748b] dark:text-zinc-400">System Status</span>
                <p className="text-xs font-semibold text-primary-dark dark:text-white">
                  {activeStep === 1 && "Parsing structured csv variables... Zero schema mismatch."}
                  {activeStep === 2 && "Computing statistical averages and age thresholds..."}
                  {activeStep === 3 && "Injecting ledger models into verified storage cache. Ready."}
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* TECHNICAL ARCHITECTURE BLOCKS */}
        <section className="space-y-10">
          <div className="space-y-2">
            <span className="mono-label text-[#64748b] dark:text-zinc-400">Infrastructure specs</span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-dark dark:text-white">Optimized for operational compliance.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Cpu,
                title: "Local-First Sandbox",
                desc: "Your uploaded clinical trial data is stored and parsed entirely inside local storage mechanisms. Zero external servers are contacted without explicit authorization, keeping trial structures 100% private."
              },
              {
                icon: Code2,
                title: "Schema Auto-Inference",
                desc: "Our platform leverages intelligent datatype inference. It dynamically scans CSV arrays, identifies keys like age, gender, segments, and cohorts, and normalizes them for streamlined metric mapping."
              },
              {
                icon: Terminal,
                title: "Developer APIs & CLI",
                desc: "Integrate OpenTrials directly into external bioinformatics queues. Access secure JSON structures, trigger CSV webhooks, and automate metric audits."
              },
              {
                icon: Network,
                title: "Cohort Drift Reconciliation",
                desc: "Automatically map drift when adding or modifying participants. Our analytical pipeline ensures that baseline conversions remain mathematically consistent."
              }
            ].map((block, idx) => (
              <div key={idx} className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-8 space-y-4 hover:shadow-sm transition-shadow transition-colors duration-300">
                <div className="w-11 h-11 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center border border-black/5 dark:border-zinc-800/40">
                  <block.icon className="w-5 h-5 text-action-blue" />
                </div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-white">{block.title}</h3>
                <p className="text-sm text-[#64748b] dark:text-zinc-400 leading-relaxed font-light">{block.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPLIANCE & SPECS METRICS TABLE */}
        <section className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-8 shadow-sm transition-colors duration-300">
          <div className="border-b border-black/5 dark:border-zinc-800 pb-5 mb-6">
            <span className="mono-label text-[10px]">Technical Ledger</span>
            <h3 className="text-xl font-semibold tracking-tight text-primary-dark dark:text-white mt-1">Platform Integrity Guidelines</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-black/5 dark:border-zinc-800 text-[#64748b] dark:text-zinc-400">
                  <th className="py-3 font-semibold uppercase">Specification</th>
                  <th className="py-3 font-semibold uppercase">Verification</th>
                  <th className="py-3 font-semibold uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.03] dark:divide-zinc-800 text-[#334155] dark:text-zinc-300">
                {[
                  { spec: "Data Privacy Sandbox", ver: "Local-first index matching standard guidelines", status: "Active" },
                  { spec: "Maximum Ingest Limit", ver: "Up to 50,000 participant rows per dataset", status: "Verified" },
                  { spec: "Statistical Processing", ver: "O(1) aggregations for cohort analysis", status: "Optimized" },
                  { spec: "Cross-Origin Protocols", ver: "Private beta developer integration parameters", status: "Operational" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.005] dark:hover:bg-white/[0.01]">
                    <td className="py-3.5 font-medium text-primary-dark dark:text-white">{row.spec}</td>
                    <td className="py-3.5 text-[#64748b] dark:text-zinc-400">{row.ver}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 text-[10px] font-bold">
                        <Check className="w-3 h-3" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight">Ready to deploy clinical trials models?</h2>
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
              Launch the live OpenTrials platform instantly and upload clinical operational data. Your information stays protected in our secure sandbox.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <Link href="/dashboard">
              <button className="px-8 py-3.5 rounded-full bg-white text-[#0f172a] font-semibold hover:bg-white/90 active:scale-95 transition-all text-sm shadow-md">
                Launch Platform
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
