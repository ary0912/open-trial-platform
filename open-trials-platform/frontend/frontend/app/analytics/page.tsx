"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft, 
  BarChart2, 
  TrendingUp, 
  Activity, 
  Users, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  FileSpreadsheet, 
  ShieldAlert, 
  PieChart, 
  CheckCircle2 
} from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts"

const ANALYTICS_DEMO_DATA = {
  retention: [
    { name: "Week 0", rate: 100 },
    { name: "Week 2", rate: 96 },
    { name: "Week 4", rate: 91 },
    { name: "Week 6", rate: 89 },
    { name: "Week 8", rate: 87 },
    { name: "Week 10", rate: 84 },
    { name: "Week 12", rate: 83 },
  ],
  throughput: [
    { name: "Site A", active: 240, pending: 80 },
    { name: "Site B", active: 190, pending: 45 },
    { name: "Site C", active: 310, pending: 95 },
    { name: "Site D", active: 150, pending: 30 },
    { name: "Site E", active: 280, pending: 60 },
  ],
  anomalies: [
    { name: "Jan", detected: 4 },
    { name: "Feb", detected: 2 },
    { name: "Mar", detected: 8 },
    { name: "Apr", detected: 1 },
    { name: "May", detected: 3 },
    { name: "Jun", detected: 0 },
  ]
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"retention" | "throughput" | "anomalies">("retention")

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-[#eeece7] relative overflow-hidden pt-28 pb-32 transition-colors duration-300">
      
      {/* Background radial glows for premium SaaS feeling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1863dc] blur-[150px] opacity-[0.06]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#ff7759] blur-[120px] opacity-[0.04]" />
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
              <BarChart2 className="w-5 h-5 text-action-blue animate-pulse" />
            </div>
            <span className="mono-label text-action-blue font-semibold">Adaptive Modeling</span>
          </div>

          <h1 className="text-[clamp(44px,6vw,72px)] leading-[0.95] tracking-tight font-normal text-primary-dark">
            Next-generation analytical engines for clinical portfolios.
          </h1>

          <p className="text-lg md:text-xl text-[#64748b] font-light leading-relaxed max-w-3xl">
            Streamline operational visibility with robust anomaly detection, real-time cohort alignment, and predictive compliance modeling. Built for speed, clarity, and precision.
          </p>
        </section>

        {/* INTERACTIVE DEMO VISUALIZATION SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4 transition-colors duration-300">
              <h3 className="mono-label border-b border-black/5 dark:border-zinc-800 pb-3 font-semibold text-[#0f172a] dark:text-white">Analytical Verticals</h3>
              
              <div className="space-y-2">
                {[
                  {
                    id: "retention",
                    title: "Cohort Retention Model",
                    desc: "Analyze longitudinal participant engagement and attrition over active study durations.",
                    icon: Users
                  },
                  {
                    id: "throughput",
                    title: "Data Stream Throughput",
                    desc: "Track enrollment velocity and pending queues across distributed operations.",
                    icon: Zap
                  },
                  {
                    id: "anomalies",
                    title: "Automated Anomaly Audit",
                    desc: "Real-time auditing and drift detection for massive structured CSV ledger runs.",
                    icon: ShieldAlert
                  }
                ].map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full text-left p-4.5 rounded-2xl border transition-all flex gap-4 ${
                        isActive 
                          ? "bg-primary-dark dark:bg-white border-primary-dark dark:border-white text-white dark:text-primary-dark shadow-lg shadow-black/10" 
                          : "bg-white dark:bg-[#13131a] border-black/5 dark:border-zinc-800/40 hover:border-black/15 dark:hover:border-zinc-700 text-primary-dark dark:text-white"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isActive ? "bg-white/10 border-white/10" : "bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-zinc-800/40"
                      }`}>
                        <Icon className={`w-4.5 h-4.5 ${isActive ? "text-action-blue" : "text-[#64748b] dark:text-zinc-400"}`} />
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-semibold block">{tab.title}</span>
                        <p className={`text-[11px] leading-relaxed font-light ${isActive ? "text-white/70 dark:text-primary-dark/80" : "text-[#64748b] dark:text-zinc-400"}`}>
                          {tab.desc}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="bg-[#eeece7] dark:bg-[#1c1c24] border dark:border-zinc-800 rounded-3xl p-6.5 space-y-4 transition-colors duration-300">
              <h4 className="font-semibold text-primary-dark dark:text-white tracking-tight">Need a custom model?</h4>
              <p className="text-xs text-ink/80 dark:text-zinc-300 leading-relaxed font-light">
                Our operations team designs custom pipelines matching structured clinical protocols. Connect your data flows instantly.
              </p>
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-action-blue font-semibold hover:underline">
                Launch Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Visualization Container (2 columns) */}
          <div className="lg:col-span-2 bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col justify-between min-h-[500px] transition-colors duration-300">
            <div className="flex justify-between items-start border-b border-black/5 dark:border-zinc-800 pb-5">
              <div>
                <span className="mono-label text-[10px]">Realtime Simulation</span>
                <h3 className="text-xl font-semibold tracking-tight text-primary-dark dark:text-white mt-1">
                  {activeTab === "retention" && "Cohort Retention Velocity"}
                  {activeTab === "throughput" && "Site Ingest & Queue Metrics"}
                  {activeTab === "anomalies" && "Audited Outliers Frequency"}
                </h3>
              </div>
              <span className="px-3 py-1 bg-action-blue/10 text-action-blue font-mono text-[10px] rounded-full font-bold uppercase tracking-wider">
                Active Simulation
              </span>
            </div>

            {/* CHART VIEWPORTS */}
            <div className="h-[340px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === "retention" ? (
                  <AreaChart data={ANALYTICS_DEMO_DATA.retention} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="demoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1863dc" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#1863dc" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(0,0,0,0.03)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} domain={[50, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#17171c", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                      itemStyle={{ color: "#38bdf8" }}
                    />
                    <Area type="monotone" dataKey="rate" stroke="#1863dc" strokeWidth={3} fill="url(#demoGrad)" />
                  </AreaChart>
                ) : activeTab === "throughput" ? (
                  <BarChart data={ANALYTICS_DEMO_DATA.throughput} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(0,0,0,0.03)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#17171c", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="active" fill="#1863dc" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="pending" fill="#eeece7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : (
                  <AreaChart data={ANALYTICS_DEMO_DATA.anomalies} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="demoGradCoral" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff7759" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#ff7759" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="rgba(0,0,0,0.03)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#17171c", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                      itemStyle={{ color: "#ff7759" }}
                    />
                    <Area type="monotone" dataKey="detected" stroke="#ff7759" strokeWidth={3} fill="url(#demoGradCoral)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
            
            <div className="border-t border-black/5 dark:border-zinc-800 pt-4 flex flex-wrap justify-between items-center gap-3 text-xs text-[#64748b] dark:text-zinc-400">
              <span>Demo Dataset: <code>demo-dataset.csv</code></span>
              <div className="flex gap-2 items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Simulated realtime updates (100% loss-less execution)</span>
              </div>
            </div>

          </div>

        </section>

        {/* CORE PLATFORM BENEFITS SECTION */}
        <section className="space-y-10">
          <div className="space-y-2">
            <span className="mono-label text-[#64748b] dark:text-zinc-400">Deep Integrations</span>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-dark dark:text-white">Designed for operational compliance.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileSpreadsheet,
                title: "Zero-Setup Schemas",
                desc: "Ingest generic CSV exports with schema drift, differing datatypes, or cohort sizes. We resolve it instantly."
              },
              {
                icon: ShieldAlert,
                title: "Dynamic Attrition Auditing",
                desc: "Calculate precise drop-out statistics automatically to optimize participant engagement strategies."
              },
              {
                icon: PieChart,
                title: "Unified Reporting",
                desc: "Consolidate multiple operations streams into single, client-ready, beautiful visual ledgers."
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-7 space-y-4 hover:shadow-sm transition-shadow transition-colors duration-300">
                <div className="w-11 h-11 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center border border-black/5 dark:border-zinc-800/40">
                  <benefit.icon className="w-5 h-5 text-[#64748b] dark:text-zinc-400" />
                </div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-[#64748b] dark:text-zinc-400 leading-relaxed font-light">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight">Ready to see live analytical metrics?</h2>
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
