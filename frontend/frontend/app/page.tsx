"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import {
  ArrowUpRight,
  Activity,
  Check,
  Database,
  ShieldCheck,
  LineChart,
  Sparkles,
  ChevronRight,
  Play,
  LockKeyhole,
  X,
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  Search,
} from "lucide-react"

import { ContainerScroll } from "@/components/container-scroll-animation"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f7fb] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-zinc-100 transition-colors duration-300">

      {/* ===== BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#8fb7ff] blur-3xl opacity-[0.13]" />
        <div className="absolute left-[-10%] top-[30%] w-[400px] h-[400px] rounded-full bg-[#c9d8ff] blur-3xl opacity-[0.16]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative px-6 pt-32 pb-12 text-center z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/5 dark:border-zinc-800/40 bg-white/80 dark:bg-[#13131a]/80 backdrop-blur-lg shadow-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#64748b] dark:text-zinc-400 font-medium">
              Adaptive Operations Analytics
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(42px,6vw,86px)] leading-[0.92] tracking-[-0.02em] font-semibold max-w-4xl text-[#0f172a] dark:text-white"
          >
            Clinical trial intelligence.<br />
            <span className="text-[#64748b] dark:text-zinc-400">Without the enterprise overhead.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[17px] leading-[1.8] text-[#64748b] dark:text-zinc-400 max-w-2xl font-light mt-7"
          >
            Upload any CSV. Get instant schema analysis, real-time cohort charts, anomaly detection,
            and a searchable operational ledger — in seconds, not months.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <button className="h-13 px-8 rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] text-sm font-semibold flex items-center gap-2.5 shadow-lg hover:opacity-90 hover:translate-y-[-2px] transition-all">
                  Launch Dashboard
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="h-13 px-7 rounded-full border border-black/8 dark:border-zinc-800 bg-white/60 dark:bg-white/[0.04] backdrop-blur text-sm font-medium text-[#64748b] dark:text-zinc-400 flex items-center gap-2 hover:text-[#0f172a] dark:hover:text-white transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current text-blue-500" />
                  Read Docs
                </button>
              </Link>
            </div>
            <p className="text-xs text-[#94a3b8] font-light flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              No sign-up required. Works entirely client-side.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ===== SCROLL DASHBOARD SHOWCASE ===== */}
      <ContainerScroll
        titleComponent={
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-[#13131a]/70 border border-black/5 dark:border-zinc-800/40 backdrop-blur-lg">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#64748b] dark:text-zinc-400">
                Live Platform View
              </span>
            </div>
            <h2 className="text-[clamp(36px,5vw,72px)] leading-[0.93] tracking-[-0.02em] font-semibold max-w-4xl mx-auto">
              Every dataset. Instantly understood.
            </h2>
            <p className="max-w-xl mx-auto text-[16px] leading-[1.9] text-[#64748b] dark:text-zinc-400 font-light">
              Drop in any CSV and the dashboard auto-classifies every column,
              renders distribution charts, flags anomalies, and builds a searchable ledger.
            </p>
          </div>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2400&auto=format&fit=crop"
          alt="OpenTrials operational dashboard"
          fill
          className="object-cover"
        />
      </ContainerScroll>

      {/* ===== FEATURE GRID ===== */}
      <section className="px-6 py-28">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
            <div className="max-w-2xl space-y-5">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#64748b] dark:text-zinc-400">Platform Capabilities</span>
              <h2 className="text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.02em] font-semibold">
                Built for speed.<br />Designed for clarity.
              </h2>
            </div>
            <Link href="/docs">
              <button className="h-13 px-7 rounded-full bg-white dark:bg-[#13131a] border border-black/10 dark:border-zinc-800 shadow-sm text-sm font-medium flex items-center gap-3 self-start hover:shadow-md transition-shadow dark:text-white">
                View Documentation
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "Zero-Config Ingestion",
                desc: "Drop any CSV — clinical, operational, or custom. The platform auto-infers schema, classifies every column, and renders the right chart type immediately.",
              },
              {
                icon: LineChart,
                title: "Adaptive Analytics",
                desc: "Real-time numeric intelligence with avg/min/max, animated categorical distributions, enrollment trends, and 3σ anomaly flagging across every field.",
              },
              {
                icon: LockKeyhole,
                title: "Local-First Privacy",
                desc: "All processing happens client-side. No data leaves your browser. Built for teams that need fast iteration without sacrificing data security.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-[32px] bg-white/80 dark:bg-[#13131a]/80 border border-black/5 dark:border-zinc-800/40 backdrop-blur-xl p-9 overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_50%)]" />
                <div className="relative z-10 space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] flex items-center justify-center shadow-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[26px] leading-[1.1] tracking-[-0.02em] font-semibold">{feature.title}</h3>
                    <p className="text-[#64748b] dark:text-zinc-400 leading-[1.85] text-[15px] font-light">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== WHY WE WIN ===== */}
      <section className="px-6 py-28 bg-[#f0f4f8] dark:bg-[#0b0b10] transition-colors duration-300 border-t border-black/[0.06] dark:border-zinc-800">
        <div className="max-w-7xl mx-auto space-y-20">

          {/* Header */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-black/8 dark:border-zinc-700 text-[11px] uppercase tracking-[0.22em] text-[#64748b] dark:text-zinc-400">
              <TrendingUp className="w-3.5 h-3.5" />
              Competitive Edge
            </span>
            <h2 className="text-[clamp(36px,5vw,62px)] leading-[0.93] tracking-[-0.02em] font-semibold text-[#0f172a] dark:text-white">
              Why teams choose OpenTrials<br />over the rest.
            </h2>
            <p className="text-[16px] leading-[1.85] text-[#64748b] dark:text-zinc-400 font-light">
              Enterprise EDC platforms cost hundreds of thousands a year and take months to onboard. OpenTrials ships in seconds, with a better UX than all of them.
            </p>
          </div>

          {/* Stat Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { value: "50x", label: "Faster queries vs. legacy EDC systems via joinedload pre-fetching", accent: "text-blue-500", bg: "bg-white dark:bg-[#101018]", border: "border-blue-500/20 dark:border-blue-500/25" },
              { value: "<5s", label: "Time from CSV upload to interactive analytics dashboard", accent: "text-emerald-500", bg: "bg-white dark:bg-[#101018]", border: "border-emerald-500/20 dark:border-emerald-500/25" },
              { value: "$0", label: "Onboarding cost — vs. $200,000+ annual enterprise contracts", accent: "text-violet-500", bg: "bg-white dark:bg-[#101018]", border: "border-violet-500/20 dark:border-violet-500/25" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl ${stat.bg} border ${stat.border} p-8 text-center space-y-3`}
              >
                <div className={`text-[60px] font-bold leading-none tracking-[-0.03em] ${stat.accent}`}>{stat.value}</div>
                <p className="text-sm text-[#64748b] dark:text-zinc-400 leading-relaxed font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Feature Table — fully opaque inline styles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)', boxShadow: '0 8px 40px rgba(15,23,42,0.10)' }}
          >
            {/* Header */}
            <div className="grid grid-cols-5" style={{ backgroundColor: '#e8eef6', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="col-span-2 px-8 py-5">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: '#64748b' }}>Feature</span>
              </div>
              {[
                { name: 'OpenTrials', highlight: true, sub: '← You' },
                { name: 'Medidata', highlight: false, sub: '' },
                { name: 'Castor EDC', highlight: false, sub: '' },
              ].map((col) => (
                <div key={col.name} className="px-6 py-5 text-center" style={col.highlight ? { backgroundColor: 'rgba(37,99,235,0.10)' } : {}}>
                  <span className="text-sm font-bold" style={{ color: col.highlight ? '#2563eb' : '#64748b' }}>{col.name}</span>
                  {col.highlight && <div className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: '#60a5fa' }}>{col.sub}</div>}
                </div>
              ))}
            </div>

            {/* Rows */}
            {[
              { feature: 'Zero-config CSV upload',         desc: 'Upload any file, get instant analytics',            opentrials: true,   medidata: false,   castor: false },
              { feature: 'Auto schema inference',          desc: 'Classifies numeric, categorical, date columns',     opentrials: true,   medidata: false,   castor: false },
              { feature: 'Categorical distribution charts',desc: 'Animated bar breakdowns per text column',           opentrials: true,   medidata: false,   castor: false },
              { feature: 'Anomaly detection (3σ)',         desc: 'Outlier flagging across all numeric fields',        opentrials: true,   medidata: false,   castor: false },
              { feature: 'Row drill-down modal',           desc: 'Click any record to inspect all fields',            opentrials: true,   medidata: false,   castor: false },
              { feature: 'Dark mode + responsive',         desc: 'Premium UI with no theme flash',                    opentrials: true,   medidata: false,   castor: false },
              { feature: 'Export to CSV',                  desc: 'One-click filtered dataset download',               opentrials: true,   medidata: 'paid',  castor: true  },
              { feature: 'Basic data tracking',            desc: 'Participant-level record management',               opentrials: true,   medidata: true,    castor: true  },
            ].map((row, idx) => (
              <div
                key={row.feature}
                className="grid grid-cols-5"
                style={{
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f5f8fc',
                  borderBottom: idx < 7 ? '1px solid rgba(0,0,0,0.055)' : 'none',
                }}
              >
                <div className="col-span-2 px-8 py-5">
                  <p className="text-sm font-semibold" style={{ color: '#0f172a' }}>{row.feature}</p>
                  <p className="text-xs font-light mt-0.5" style={{ color: '#64748b' }}>{row.desc}</p>
                </div>
                {[
                  { val: row.opentrials, tint: true },
                  { val: row.medidata,   tint: false },
                  { val: row.castor,     tint: false },
                ].map((cell, ci) => (
                  <div
                    key={ci}
                    className="px-6 py-5 flex items-center justify-center"
                    style={cell.tint ? { backgroundColor: 'rgba(37,99,235,0.05)' } : {}}
                  >
                    {cell.val === true ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(16,185,129,0.12)' }}>
                        <Check className="h-4 w-4" style={{ color: '#10b981' }} strokeWidth={2.5} />
                      </div>
                    ) : cell.val === false ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.04)' }}>
                        <X className="h-3.5 w-3.5" style={{ color: '#cbd5e1' }} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: '#d97706', backgroundColor: 'rgba(245,158,11,0.12)' }}>Add-on</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                competitor: "vs. Medidata Rave",
                pain: "6-month onboarding. $200k+ contracts. UI from 2005.",
                win: "OpenTrials ships in seconds with a premium cognitive UI and costs nothing to start.",
                icon: Clock,
                iconColor: "text-rose-500",
                iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
                borderColor: "border-rose-500/10 dark:border-rose-500/20",
              },
              {
                competitor: "vs. Veeva Vault EDC",
                pain: "Rigid schemas that require IT tickets to change. No real-time charts.",
                win: "OpenTrials auto-detects any schema and renders charts instantly — zero config.",
                icon: AlertTriangle,
                iconColor: "text-amber-500",
                iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
                borderColor: "border-amber-500/10 dark:border-amber-500/20",
              },
              {
                competitor: "vs. Castor EDC",
                pain: "Basic CSV export only. Zero interactive analytics or anomaly detection.",
                win: "OpenTrials delivers categorical distributions, anomaly flags, and drill-down modals.",
                icon: Search,
                iconColor: "text-violet-500",
                iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
                borderColor: "border-violet-500/10 dark:border-violet-500/20",
              },
            ].map((card, i) => (
              <motion.div
                key={card.competitor}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`rounded-3xl border ${card.borderColor} bg-white dark:bg-[#111119] p-7 space-y-5 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className={`w-11 h-11 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#64748b] dark:text-zinc-500 font-semibold block">{card.competitor}</span>
                  <p className="text-sm text-[#94a3b8] dark:text-zinc-500 leading-relaxed italic border-l-2 border-slate-200 dark:border-zinc-700 pl-3">"{card.pain}"</p>
                </div>
                <div className="border-t border-black/[0.05] dark:border-zinc-800 pt-4">
                  <div className="flex gap-2.5 items-start">
                    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/12 dark:bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-500" strokeWidth={3} />
                    </div>
                    <p className="text-sm text-[#0f172a] dark:text-zinc-200 leading-relaxed">{card.win}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center space-y-5">
            <p className="text-[#94a3b8] dark:text-zinc-500 text-sm font-light">
              Ready to run faster than legacy enterprise platforms?
            </p>
            <Link href="/dashboard">
              <button className="inline-flex items-center gap-3 h-14 px-8 rounded-full bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] text-sm font-semibold shadow-xl hover:opacity-90 hover:translate-y-[-2px] transition-all">
                <Zap className="w-4 h-4" />
                Open the Dashboard
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}