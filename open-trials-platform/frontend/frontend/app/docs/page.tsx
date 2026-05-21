"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Database,
  Download,
  FileSpreadsheet,
  FolderTree,
  ShieldCheck,
  Terminal,
  UploadCloud,
} from "lucide-react"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [copied, setCopied] = useState(false)

  // Scrollspy logic using IntersectionObserver
  useEffect(() => {
    const sectionsList = [
      "overview",
      "quick-start",
      "architecture",
      "uploading",
      "csv-structure",
      "validation",
      "security",
      "cli-usage",
      "deployment"
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-25% 0px -55% 0px" // Trigger when section is in the readable viewport area
      }
    )

    sectionsList.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `record_id,age,segment,cohort,timestamp\nR-1001,43,enterprise,alpha,2026-02-11\nR-1002,51,consumer,beta,2026-02-14\nR-1003,37,enterprise,beta,2026-02-15`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const navigation = [
    {
      group: "Introduction",
      items: [
        { id: "overview", name: "Overview" },
        { id: "quick-start", name: "Quick Start" },
        { id: "architecture", name: "Architecture" },
      ]
    },
    {
      group: "Data Ingestion",
      items: [
        { id: "uploading", name: "Uploading" },
        { id: "csv-structure", name: "CSV Structure" },
        { id: "validation", name: "Validation" },
      ]
    },
    {
      group: "Infrastructure",
      items: [
        { id: "security", name: "Security" },
        { id: "cli-usage", name: "CLI Usage" },
        { id: "deployment", name: "Deployment" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#0a0a0f] text-[#17171c] dark:text-[#eeece7] pt-20 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex">
        
        {/* ===================================================== */}
        {/* LEFT SIDEBAR (STICKY & HIGHLIGHTED) */}
        {/* ===================================================== */}
        <aside className="hidden xl:flex w-[300px] shrink-0 border-r border-[#ececec] dark:border-zinc-800/60 min-h-[calc(100vh-80px)] sticky top-20 self-start">
          <div className="w-full px-8 py-10 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="space-y-8">
              {navigation.map((group) => (
                <div key={group.group} className="space-y-3">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#93939f] font-mono block">
                    {group.group}
                  </span>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = activeSection === item.id
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`
                            flex
                            items-center
                            justify-between
                            px-3
                            py-2
                            rounded-lg
                            text-[14px]
                            transition-all
                            duration-200
                            group/nav
                            ${
                              isActive
                                ? "bg-zinc-100 dark:bg-zinc-850/80 text-action-blue dark:text-white font-medium shadow-sm"
                                : "text-[#616161] dark:text-zinc-400 hover:bg-[#f5f5f5]/80 dark:hover:bg-zinc-800/40 hover:text-[#17171c] dark:hover:text-white"
                            }
                          `}
                        >
                          <span>{item.name}</span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isActive
                                ? "opacity-100 text-action-blue dark:text-white translate-x-0.5"
                                : "opacity-30 group-hover/nav:translate-x-0.5"
                            }`}
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ===================================================== */}
        {/* MAIN DOCUMENTATION CONTENT */}
        {/* ===================================================== */}
        <main className="flex-1 min-w-0">
          
          {/* HERO */}
          <section className="px-8 lg:px-20 pt-16 pb-16 border-b border-[#ececec] dark:border-zinc-800/60">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#75758a] font-mono">
                  Documentation Hub
                </span>
              </div>
              <h1 className="text-[clamp(44px,5vw,72px)] leading-[1.05] tracking-[-0.02em] font-normal">
                Build high-fidelity clinical analytics.
              </h1>
              <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                OpenTrials provides a local-first analytics ecosystem for operational teams working with messy CSV exports, event logs, and schema drift.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="/demo-dataset.csv" download>
                  <button className="h-11 px-5 rounded-full bg-[#17171c] dark:bg-white text-white dark:text-[#17171c] text-xs font-semibold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                    <Download className="w-3.5 h-3.5" />
                    Download Sample Dataset
                  </button>
                </a>
                <Link href="/upload">
                  <button className="h-11 px-5 rounded-full border border-[#d9d9dd] dark:border-zinc-800 bg-white dark:bg-[#13131a] text-xs dark:text-white font-semibold flex items-center gap-2 hover:border-[#17171c] dark:hover:border-zinc-700 active:scale-95 transition-all">
                    Open Ingest Sandbox
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </section>

          {/* MAIN SECTIONS */}
          <div className="px-8 lg:px-20 py-16 space-y-24 max-w-5xl">
            
            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">01 / Introduction</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Overview</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                OpenTrials utilizes an in-browser WebAssembly (WASM) parser and reactive state engine to bypass traditional cloud database bottlenecks. 
                Reconcile, validate, and analyze participant metrics instantly with zero configuration and total privacy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {[
                  {
                    title: "Local-First Speed",
                    desc: "Parses datasets directly within the client sandbox thread, delivering sub-millisecond response latency."
                  },
                  {
                    title: "Zero Setup Required",
                    desc: "No developer databases or keys needed. Upload and slice any operational dataset up to 100MB."
                  },
                  {
                    title: "Reactive Insights",
                    desc: "Demographic charts, ledger tables, and anomaly detectors update in real time as data is ingested."
                  }
                ].map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl border border-[#ececec] dark:border-zinc-800/80 bg-white dark:bg-[#13131a] space-y-2 shadow-sm transition-colors duration-300">
                    <h3 className="text-md font-semibold text-[#17171c] dark:text-white tracking-[-0.02em]">{item.title}</h3>
                    <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.6] font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* QUICK START */}
            <section id="quick-start" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">02 / Onboarding</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Quick Start</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                Get operational and start analyzing clinical trial records in under two minutes:
              </p>
              
              <div className="border border-[#ececec] dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-[#ececec] dark:divide-zinc-800">
                {[
                  {
                    icon: Download,
                    title: "1. Download Template",
                    desc: "Acquire the standard clinical operational spreadsheet template to verify record structures."
                  },
                  {
                    icon: UploadCloud,
                    title: "2. Load Sandbox",
                    desc: "Drop your CSV spreadsheet directly into the Sandbox Upload workspace to process fields."
                  },
                  {
                    icon: Database,
                    title: "3. Analyze Metrics",
                    desc: "Explore clinical demographics, longitudinal trends, and segmentations instantly."
                  }
                ].map((step) => (
                  <div key={step.title} className="p-6 bg-white dark:bg-[#13131a] flex gap-4 items-start hover:bg-[#fafafa] dark:hover:bg-[#181822] transition-colors duration-200">
                    <div className="p-2.5 rounded-lg border border-[#ececec] dark:border-zinc-800 bg-[#fafafa] dark:bg-zinc-900 shrink-0">
                      <step.icon className="w-4 h-4 text-action-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#17171c] dark:text-white tracking-[-0.01em]">{step.title}</h3>
                      <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.6] mt-1 font-light">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ARCHITECTURE */}
            <section id="architecture" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">03 / Engine</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Architecture</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                OpenTrials utilizes an isolated sandbox dataflow pipeline to process clinical datasets without exposing proprietary participant information.
              </p>
              
              <div className="p-8 border border-[#ececec] dark:border-zinc-800 rounded-2xl bg-[#fafafa] dark:bg-[#13131a] space-y-6 transition-colors duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {[
                    { step: "01 / Ingestion", title: "CSV Parsing", desc: "Local block streaming." },
                    { step: "02 / Validation", title: "WASM Schema", desc: "Type & outlier auditing." },
                    { step: "03 / Storage", title: "IndexedDB", desc: "Encrypted offline store." },
                    { step: "04 / Render", title: "Reactive UI", desc: "Dynamic canvas charts." }
                  ].map((flow) => (
                    <div key={flow.step} className="bg-white dark:bg-[#1c1c24] p-4 rounded-xl border border-[#ececec] dark:border-zinc-800 space-y-1 shadow-sm transition-colors duration-300">
                      <span className="text-[10px] font-mono text-[#93939f]">{flow.step}</span>
                      <h4 className="text-xs font-semibold text-[#17171c] dark:text-white">{flow.title}</h4>
                      <p className="text-[10px] text-[#616161] dark:text-zinc-400 leading-[1.4] font-light">{flow.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-white dark:bg-[#1c1c24] rounded-lg border border-[#ececec] dark:border-zinc-800 text-xs text-[#616161] dark:text-zinc-400 leading-[1.6] font-light transition-colors duration-300">
                  <strong className="text-[#17171c] dark:text-white font-medium">Security Guarantee:</strong> Clinical datasets, cohort tags, or custom variables are never transmitted to external cloud systems. All transactions happen in the local client runtime.
                </div>
              </div>
            </section>

            {/* UPLOADING */}
            <section id="uploading" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">04 / Workspace</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Uploading</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                The ingestion sandbox processes spreadsheets in high-efficiency block streams. Review our ingest limits below to ensure smooth parsing:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#ececec] dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#13131a] space-y-4 transition-colors duration-300">
                  <h3 className="text-sm font-semibold text-[#17171c] dark:text-white tracking-[-0.01em]">Parser Specifications</h3>
                  <table className="w-full text-xs text-[#616161] dark:text-zinc-400 font-light">
                    <tbody>
                      <tr className="border-b border-[#fafafa] dark:border-zinc-800/40 h-8">
                        <td>Formats</td>
                        <td className="text-right font-mono font-medium text-[#17171c] dark:text-white">CSV, TSV</td>
                      </tr>
                      <tr className="border-b border-[#fafafa] dark:border-zinc-800/40 h-8">
                        <td>Max Size</td>
                        <td className="text-right font-mono font-medium text-[#17171c] dark:text-white">100MB</td>
                      </tr>
                      <tr className="border-b border-[#fafafa] dark:border-zinc-800/40 h-8">
                        <td>Row Limit</td>
                        <td className="text-right font-mono font-medium text-[#17171c] dark:text-white">500,000 rows</td>
                      </tr>
                      <tr className="h-8">
                        <td>Latency</td>
                        <td className="text-right font-mono font-semibold text-emerald-500">Sub-second</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 border border-[#ececec] dark:border-zinc-800 rounded-2xl bg-[#fafafa] dark:bg-[#13131a] flex flex-col justify-between transition-colors duration-300">
                  <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.6] font-light">
                    If an ingestion fails, the WASM validator highlights the exact record ID and line index where structural drift occurred, allowing operational teams to immediately clean the source sheet.
                  </p>
                  <Link href="/upload" className="mt-4">
                    <button className="w-full h-10 bg-primary-dark dark:bg-white text-white dark:text-[#0d0d11] text-xs font-semibold rounded-full hover:opacity-90 active:scale-95 transition-all">
                      Open Upload Sandbox
                    </button>
                  </Link>
                </div>
              </div>
            </section>

            {/* CSV STRUCTURE */}
            <section id="csv-structure" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">05 / Specifications</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">CSV Structure</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                To guarantee zero ingestion mismatch, standard CSV uploads must follow the headers defined below:
              </p>
              
              <div className="rounded-2xl overflow-hidden border border-[#ececec] dark:border-zinc-800">
                <div className="h-12 px-5 border-b border-[#ececec] dark:border-zinc-800 bg-[#fafafa] dark:bg-[#13131a] flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#75758a]" />
                    <span className="text-xs text-[#616161] dark:text-zinc-400 font-medium">clinical-cohort-template.csv</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="h-8 px-3 rounded-lg border border-[#e5e7eb] dark:border-zinc-800 bg-white dark:bg-[#1c1c24] text-[11px] dark:text-white flex items-center gap-1.5 hover:border-[#17171c] dark:hover:border-zinc-700 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="bg-white dark:bg-[#13131a] p-6 overflow-x-auto transition-colors duration-300">
                  <pre className="text-xs leading-[1.8] text-[#17171c] dark:text-white font-mono">
{`record_id,age,segment,cohort,timestamp
R-1001,43,enterprise,alpha,2026-02-11
R-1002,51,consumer,beta,2026-02-14
R-1003,37,enterprise,beta,2026-02-15`}
                  </pre>
                </div>
              </div>
            </section>

            {/* VALIDATION */}
            <section id="validation" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">06 / Rules</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Validation</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                The schema validator enforces type checking and records integrity automatically:
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    field: "record_id",
                    type: "string",
                    rules: "Must be a unique alpha-numeric string. Duplicate rows preserve the latest audit state."
                  },
                  {
                    field: "age",
                    type: "integer",
                    rules: "Must be a number between 1 and 120. Invalidate entries trigger outlier alerts."
                  },
                  {
                    field: "segment",
                    type: "enum",
                    rules: "Must match either 'enterprise' or 'consumer' exactly. Configures dashboard filters."
                  },
                  {
                    field: "cohort",
                    type: "string",
                    rules: "Cohort label (e.g. 'alpha', 'beta'). Maps group datasets in analytical displays."
                  }
                ].map((item) => (
                  <div key={item.field} className="p-4 border border-[#ececec] dark:border-zinc-800/80 rounded-xl bg-white dark:bg-[#13131a] flex flex-col sm:flex-row gap-3 justify-between sm:items-center transition-colors duration-300">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#17171c] dark:text-white">{item.field}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f5f5f7] dark:bg-zinc-800/40 text-[#75758a] font-mono">{item.type}</span>
                      </div>
                      <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.4] font-light">{item.rules}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#93939f]">Required</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECURITY */}
            <section id="security" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">07 / Shield</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Security</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                Our local-first framework ensures clinical datasets remain fully sandboxed inside the local runtime.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Client-Side Isolation",
                    desc: "Zero database calls or cloud servers are used during CSV operations, ensuring compliance."
                  },
                  {
                    icon: FolderTree,
                    title: "Data Expiry Enforcements",
                    desc: "IndexedDB stores expire automatically upon closing the browser tab, protecting data integrity."
                  }
                ].map((item) => (
                  <div key={item.title} className="p-6 border border-[#ececec] dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#13131a] space-y-4 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-xl border border-[#ececec] dark:border-zinc-800 flex items-center justify-center bg-[#fafafa] dark:bg-zinc-900">
                      <item.icon className="w-4 h-4 text-action-blue" />
                    </div>
                    <h3 className="text-sm font-semibold text-primary-dark dark:text-white">{item.title}</h3>
                    <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.6] font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CLI USAGE */}
            <section id="cli-usage" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">08 / Terminal</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">CLI Usage</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                Fetch standard dataset outlines via terminal commands directly to speed up diagnostic tasks:
              </p>
              
              <div className="rounded-2xl overflow-hidden bg-[#17171c] border border-black shadow-lg">
                <div className="h-11 border-b border-white/10 px-4 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-white/50 text-[11px] font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    terminal
                  </div>
                  <code className="block text-xs text-white font-mono leading-[1.6]">
                    curl -O http://localhost:3000/demo-dataset.csv
                  </code>
                </div>
              </div>
            </section>

            {/* DEPLOYMENT */}
            <section id="deployment" className="scroll-mt-24 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-[0.24em] text-[#93939f] font-mono">09 / Cloud</span>
                <h2 className="text-3xl font-normal tracking-[-0.02em] text-[#17171c] dark:text-white">Deployment</h2>
              </div>
              <p className="text-[15px] leading-[1.7] text-[#616161] dark:text-zinc-400 font-light">
                Deploy OpenTrials static outputs securely to static environments or host inside isolated local private intranets:
              </p>
              
              <div className="p-6 border border-[#ececec] dark:border-zinc-800 rounded-2xl bg-white dark:bg-[#13131a] space-y-4 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-mono font-bold text-[#17171c] dark:text-white">Static Sites (Vercel / Netlify)</h3>
                    <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.5] font-light">
                      Deploy build bundles instantly. The server serves purely static templates, driving top-tier rendering speeds and low infrastructure cost.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-mono font-bold text-[#17171c] dark:text-white">Self-Hosted Docker Stack</h3>
                    <p className="text-xs text-[#616161] dark:text-zinc-400 leading-[1.5] font-light">
                      Run standard multi-stage builds locally. Serves assets via internal Nginx, locking down intranet access for extreme clinical trial isolation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  )
}