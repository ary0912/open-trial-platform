"use client"

import { Suspense } from "react"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"

import EnrollmentChart from "../components/EnrollmentChart"
import ParticipantTable from "../components/ParticipantTable"

import {
  getAnalytics,
  getParticipants,
  getStudies,
  uploadDataset,
  type AnalyticsData,
  type Participant,
  type Study
} from "../../services/api"

import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Database,
  Download,
  Search,
  Sparkles,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap
} from "lucide-react"

import dynamic from "next/dynamic"

const IncidentFunnelReportCard = dynamic(
  () => import("../../components/ui/layered-chart-xl"),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-slate-100 dark:bg-white/5" /> }
)

const StatsWidget = dynamic(
  () => import("../../components/ui/stats-widget").then(m => ({ default: m.StatsWidget })),
  { ssr: false }
)

const NAVBAR_HEIGHT = 64

function DashboardContent() {
  const searchParams = useSearchParams()

  const studyIdParam = searchParams.get("studyId")

  const [studies, setStudies] = useState<Study[]>([])
  const [selectedStudy, setSelectedStudy] =
    useState<number | null>(null)

  const [data, setData] =
    useState<AnalyticsData | null>(null)

  const [participants, setParticipants] = useState<
    Participant[]
  >([])

  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRow, setSelectedRow] = useState<Participant | null>(null)

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const res = await getStudies()

        setStudies(res)

        if (studyIdParam) {
          setSelectedStudy(Number(studyIdParam))
        } else if (res.length > 0) {
          setSelectedStudy(res[0].id)
        }
      } catch {
        setError("Failed to load studies")
      }
    }

    loadStudies()
  }, [studyIdParam])

  useEffect(() => {
    if (!selectedStudy) return

    const loadDashboard = async () => {
      setLoading(true)

      try {
        const analytics =
          await getAnalytics(selectedStudy)

        const participantsData =
          await getParticipants(selectedStudy)

        setData(analytics)
        setParticipants(participantsData)
      } catch {
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [selectedStudy])

  const refreshData = async () => {
    if (!selectedStudy) return

    const analytics =
      await getAnalytics(selectedStudy)

    const participantsData =
      await getParticipants(selectedStudy)

    setData(analytics)
    setParticipants(participantsData)
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file || !selectedStudy) return

    setUploading(true)

    try {
      await uploadDataset(selectedStudy, file)
      await refreshData()
    } catch {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const loadDemoData = async () => {
    if (!selectedStudy) return

    setUploading(true)

    try {
      const response = await fetch(
        "/demo-dataset.csv"
      )

      const blob = await response.blob()

      const file = new File(
        [blob],
        "demo-dataset.csv",
        {
          type: "text/csv"
        }
      )

      await uploadDataset(selectedStudy, file)

      await refreshData()
    } catch {
      alert("Failed to load demo data")
    } finally {
      setUploading(false)
    }
  }

  const formatTitle = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const getMetricDisplayValue = (
    value: unknown
  ): string => {
    if (
      typeof value === "object" &&
      value !== null &&
      "avg" in value
    ) {
      const avg = Number(
        (value as { avg: number }).avg
      )

      return !isNaN(avg)
        ? avg.toFixed(1)
        : "0"
    }

    if (
      typeof value === "number" &&
      !isNaN(value)
    ) {
      return value.toLocaleString()
    }

    const parsed = Number(value)

    if (!isNaN(parsed)) {
      return parsed.toLocaleString()
    }

    return "0"
  }

  const topMetrics = data
    ? Object.entries(data.numeric_metrics || {}).slice(0, 3)
    : []

  // Anomaly detection: flag values > 3σ from mean per numeric column
  const anomalies = useMemo(() => {
    if (!data || !participants.length) return []
    const flags: { row: number; col: string; value: number; mean: number; sigma: number }[] = []
    Object.entries(data.numeric_metrics || {}).forEach(([col, stats]) => {
      const values = participants.map(p => Number(p[col])).filter(v => !isNaN(v))
      if (values.length < 3) return
      const mean = stats.avg
      const std = Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length)
      if (std === 0) return
      participants.forEach((p, idx) => {
        const v = Number(p[col])
        if (!isNaN(v) && Math.abs(v - mean) > 3 * std) {
          flags.push({ row: idx + 1, col, value: v, mean, sigma: Math.abs(v - mean) / std })
        }
      })
    })
    return flags.slice(0, 8)
  }, [data, participants])

  // Filtered participants for the ledger table
  const filteredParticipants = useMemo(() => {
    if (!searchQuery.trim()) return participants
    const q = searchQuery.toLowerCase()
    return participants.filter(p =>
      Object.values(p).some(v => String(v).toLowerCase().includes(q))
    )
  }, [participants, searchQuery])

  // Export current dataset as CSV
  const exportCSV = () => {
    if (!participants.length) return
    const headers = Object.keys(participants[0]).filter(k => k !== 'id')
    const rows = participants.map(p => headers.map(h => String(p[h] ?? '')).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `opentrials-export-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#09090b]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-4 border-black/5 dark:border-white/5" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
          </div>

          <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Loading Intelligence
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] dark:bg-[#09090b] dark:text-[#f5f5f4]">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-blue-500 opacity-[0.03] blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-emerald-500 opacity-[0.03] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Floating Sticky Workspace Toolbar */}
      <div
        className="sticky z-40 px-9"
        style={{
          top: `${NAVBAR_HEIGHT + 30}px`
        }}
      >
        <header
          className="
            mx-auto
            flex
            h-[78px]
            max-w-7xl
            items-center
            justify-between
            rounded-[26px]
            border
            border-black/[0.04]
            bg-[#fcfcfd]/94
            px-7
            shadow-[0_10px_30px_rgba(15,23,42,0.04)]
            backdrop-blur-xl
            transition-all
            duration-300
            dark:border-white/[0.05]
            dark:bg-[#0b0b0f]/94
          "
        >

          {/* LEFT SECTION */}
          <div className="flex min-w-0 items-center gap-6">

            {/* Brand */}
            <div className="flex shrink-0 items-center gap-4">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-black/[0.05]
                  bg-white
                  shadow-sm
                  dark:border-white/[0.05]
                  dark:bg-white/[0.03]
                "
              >
                <Sparkles className="h-5 w-5 text-blue-500" />
              </div>

              <div className="leading-tight">
                <h1
                  className="
                    text-[15px]
                    font-semibold
                    tracking-tight
                    text-[#0f172a]
                    dark:text-white
                  "
                >
                  OpenTrials Intelligence
                </h1>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-500
                  "
                >
                  Adaptive Analytics Platform
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="
                hidden
                h-8
                w-px
                bg-black/[0.05]
                xl:block
                dark:bg-white/[0.05]
              "
            />

            {/* Study Selector */}
            <div className="relative hidden lg:block">

              <select
                value={selectedStudy ?? ""}
                onChange={(e) =>
                  setSelectedStudy(
                    Number(e.target.value)
                  )
                }
                className="
                  h-12
                  min-w-[420px]
                  appearance-none
                  rounded-2xl
                  border
                  border-black/[0.05]
                  bg-white
                  px-5
                  pr-12
                  text-[15px]
                  font-medium
                  text-[#0f172a]
                  outline-none
                  transition-all
                  focus:border-blue-500/30
                  focus:ring-4
                  focus:ring-blue-500/10
                  dark:border-white/[0.05]
                  dark:bg-white/[0.03]
                  dark:text-white
                "
              >
                {studies.map((study) => (
                  <option
                    key={study.id}
                    value={study.id}
                    className="dark:bg-[#0f0f13]"
                  >
                    {study.title}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>

            {/* Live Status */}
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-emerald-500/10
                bg-emerald-500/[0.08]
                px-3
                py-1.5
                text-xs
                font-medium
                text-emerald-600
                dark:text-emerald-400
                2xl:flex
              "
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500" />

              Live
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Upload */}
            <label
              className="
                flex
                h-12
                cursor-pointer
                items-center
                gap-2.5
                rounded-2xl
                border
                border-black/[0.05]
                bg-white
                px-5
                text-[15px]
                font-medium
                text-[#0f172a]
                transition-all
                hover:border-blue-500/20
                hover:bg-blue-50
                dark:border-white/[0.05]
                dark:bg-white/[0.03]
                dark:text-white
                dark:hover:bg-blue-500/10
              "
            >
              <Upload className="h-4 w-4" />

              {uploading
                ? "Uploading..."
                : "Upload"}

              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            {/* Demo */}
            <button
              onClick={loadDemoData}
              className="
                flex
                h-12
                items-center
                gap-2.5
                rounded-2xl
                bg-blue-500
                px-5
                text-[15px]
                font-medium
                text-white
                transition-all
                hover:bg-blue-600
              "
            >
              <Zap className="h-4 w-4" />
              Demo Data
            </button>

            {/* Export */}
            <button
              onClick={exportCSV}
              disabled={!participants.length}
              className="flex h-12 items-center gap-2.5 rounded-2xl border border-black/[0.05] bg-white px-5 text-[15px] font-medium text-[#0f172a] transition-all hover:border-emerald-500/20 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.05] dark:bg-white/[0.03] dark:text-white dark:hover:bg-emerald-500/10"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </header>
      </div>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl space-y-8 px-6 pt-35 pb-12">

        {/* Hero */}
        <section className="space-y-4">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300">
                <Activity className="h-3.5 w-3.5 text-blue-500" />
                Real-time Operational Intelligence
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Analytics Overview
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-500">
                Monitoring participant analytics
                across adaptive schema datasets
                with live ingestion and operational
                intelligence workflows.
              </p>
            </div>

            {/* Hero Stats */}
            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-3.5 w-3.5" />
                  Updated Recently
                </div>

                <div className="mt-1 text-sm font-semibold">
                  Live Dataset
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white/70 px-4 py-3 dark:border-white/5 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Database className="h-3.5 w-3.5" />
                  Active Records
                </div>

                <div className="mt-1 text-sm font-semibold">
                  {participants.length}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">

            {/* Main Metric */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
                md:col-span-2
                rounded-3xl
                border
                border-white/5
                bg-gradient-to-br
                from-[#0f172a]
                to-[#172554]
                p-7
                text-white
                shadow-xl
              "
            >
              <div className="flex h-full flex-col justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Total Records
                  </p>

                  <div className="mt-4 flex items-end justify-between">

                    <h3 className="text-6xl font-semibold tracking-tight">
                      {data?.total_participants ??
                        0}
                    </h3>

                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs">
                      <ArrowUpRight className="h-3 w-3" />
                      12.8%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Metrics */}
            {topMetrics.map(
              ([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}
                  className="
                    md:col-span-1
                    rounded-3xl
                    border
                    border-black/5
                    bg-[#fcfcfd]/90
                    p-6
                    backdrop-blur-xl
                    shadow-sm
                    dark:border-white/5
                    dark:bg-white/[0.03]
                  "
                >
                  <div className="flex h-full flex-col justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black/[0.03] dark:bg-white/[0.03]">
                      <TrendingUp className="h-4 w-4 text-slate-500" />
                    </div>

                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-slate-500">
                        {formatTitle(key)}
                      </p>

                      <h3 className="mt-3 text-4xl font-semibold tracking-tight">
                        {getMetricDisplayValue(
                          value
                        )}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </section>

        {/* Numeric Detail Cards — every numeric column from ANY csv */}
        {data && Object.keys(data.numeric_metrics).length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Numeric Intelligence</h3>
                <p className="mt-1 text-sm text-slate-500">Auto-detected from uploaded dataset schema</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Object.entries(data.numeric_metrics).map(([key, val], i) => {
                const formatted = (n: number) => isNaN(n) ? '—' : Number.isInteger(n) ? n.toLocaleString() : n.toFixed(2)
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                  <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="rounded-3xl border border-black/5 bg-[#fcfcfd]/90 p-6 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-white/[0.03]">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="rounded-xl bg-blue-500/8 p-2.5">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">{val.count} pts</span>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{label}</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight">{formatted(val.avg)}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-black/5 pt-4 dark:border-white/5">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Min</p>
                        <p className="mt-0.5 text-sm font-semibold">{formatted(val.min)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Max</p>
                        <p className="mt-0.5 text-sm font-semibold">{formatted(val.max)}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* Categorical Breakdowns — every text column from ANY csv */}
        {data && Object.keys(data.categorical_metrics).length > 0 && (
          <section>
            <div className="mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Categorical Distributions</h3>
              <p className="mt-1 text-sm text-slate-500">Breakdown of all text-based fields from your dataset</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(data.categorical_metrics).map(([metric, values], i) => {
                const total = Object.values(values).reduce((a, b) => a + b, 0)
                const label = metric.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]).slice(0, 8)
                const COLORS = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-orange-500', 'bg-pink-500']
                return (
                  <motion.div key={metric} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="rounded-3xl border border-black/5 bg-[#fcfcfd]/90 p-7 shadow-sm backdrop-blur-xl dark:border-white/5 dark:bg-white/[0.03]">
                    <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-5 dark:border-white/5">
                      <h4 className="text-sm font-semibold text-[#0f172a] dark:text-white">{label}</h4>
                      <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-white/[0.04]">{total} total</span>
                    </div>
                    <div className="space-y-4">
                      {sorted.map(([lbl, count], j) => {
                        const pct = total > 0 ? (count / total) * 100 : 0
                        return (
                          <div key={lbl}>
                            <div className="mb-1.5 flex items-center justify-between text-sm">
                              <span className="font-medium text-[#334155] dark:text-slate-300 truncate max-w-[60%]">{lbl}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono text-slate-400">{pct.toFixed(1)}%</span>
                                <span className="font-semibold text-[#0f172a] dark:text-white">{count}</span>
                              </div>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: 'easeOut', delay: j * 0.05 }}
                                className={`h-full rounded-full ${COLORS[j % COLORS.length]}`} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* Empty state when no data */}
        {!data?.total_participants && !loading && (
          <section className="rounded-3xl border border-dashed border-black/10 dark:border-white/10 p-16 text-center">
            <Database className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold">No data yet</h3>
            <p className="mt-2 text-sm text-slate-500">Upload any CSV file or click Demo Data to get started</p>
          </section>
        )}

        {/* Main Grid */}
        <section className="grid grid-cols-12 gap-6">

          {/* Left */}
          <div className="col-span-12 space-y-6 xl:col-span-8">

            {/* Chart */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
                rounded-3xl
                border
                border-black/5
                bg-[#fcfcfd]/90
                p-8
                backdrop-blur-xl
                shadow-sm
                dark:border-white/5
                dark:bg-white/[0.03]
              "
            >
              <div className="mb-8 flex items-center justify-between">

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Data Throughput
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Real-time participant analytics
                    and adaptive operational trends.
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <div className="rounded-2xl bg-black/[0.03] px-4 py-3 dark:bg-white/[0.03]">
                    <div className="text-xs text-slate-500">
                      Throughput
                    </div>

                    <div className="mt-1 text-sm font-semibold text-emerald-500">
                      +14.2%
                    </div>
                  </div>

                  <div className="rounded-2xl bg-black/[0.03] px-4 py-3 dark:bg-white/[0.03]">
                    <div className="text-xs text-slate-500">
                      Schema Updates
                    </div>

                    <div className="mt-1 text-sm font-semibold">
                      12 Active
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[420px]">
                {data?.enrollment_trend
                  ?.length ? (
                  <EnrollmentChart
                    data={
                      data.enrollment_trend
                    }
                  />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-black/10 dark:border-white/10">
                    <div className="text-center">
                      <Database className="mx-auto h-10 w-10 text-slate-300" />

                      <p className="mt-4 text-sm text-slate-500">
                        No analytics available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.05
              }}
              className="
                rounded-3xl
                border
                border-black/5
                bg-[#fcfcfd]/90
                p-8
                backdrop-blur-xl
                shadow-sm
                dark:border-white/5
                dark:bg-white/[0.03]
              "
            >
              {/* Ledger header with search + export */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">Operational Ledger</h3>
                  <p className="mt-1 text-sm text-slate-500">{filteredParticipants.length} of {participants.length} records — click any row to inspect</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search records..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="h-10 w-52 rounded-2xl border border-black/5 bg-white pl-9 pr-4 text-sm outline-none focus:border-blue-500/30 focus:ring-2 focus:ring-blue-500/10 dark:border-white/5 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-slate-500"
                    />
                  </div>
                  <button onClick={exportCSV} disabled={!participants.length}
                    className="flex h-10 items-center gap-1.5 rounded-2xl border border-black/5 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:border-emerald-500/20 disabled:opacity-40 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300">
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Clickable participant table */}
              <div className="overflow-auto rounded-2xl border border-black/5 dark:border-white/5">
                {filteredParticipants.length ? (
                  <table className="w-full text-left">
                    <thead className="bg-black/[0.02] dark:bg-white/[0.02]">
                      <tr>
                        {Object.keys(filteredParticipants[0]).filter(k => k !== 'id').map(col => (
                          <th key={col} className="whitespace-nowrap px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                            {col.replace(/_/g, ' ')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredParticipants.slice(0, 50).map((p, idx) => (
                        <tr key={idx} onClick={() => setSelectedRow(p)}
                          className="cursor-pointer border-t border-black/[0.04] transition hover:bg-blue-500/[0.02] dark:border-white/[0.04] dark:hover:bg-white/[0.02]">
                          {Object.entries(p).filter(([k]) => k !== 'id').map(([k, v]) => {
                            const num = Number(v)
                            const isNum = typeof v === 'number' || (!isNaN(num) && v !== '')
                            return (
                              <td key={k} className="whitespace-nowrap px-5 py-3.5 text-sm">
                                {isNum
                                  ? <span className="font-mono text-[#0f172a] dark:text-white">{v}</span>
                                  : <span className="text-slate-600 dark:text-slate-300">{String(v ?? '—')}</span>}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Database className="h-10 w-10 text-slate-200" />
                    <p className="mt-3 text-sm text-slate-400">{searchQuery ? 'No records matched your search' : 'Upload a CSV to populate the ledger'}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 space-y-6 xl:col-span-4">

            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="
                rounded-3xl
                border
                border-black/5
                bg-[#fcfcfd]/90
                p-6
                backdrop-blur-xl
                shadow-sm
                dark:border-white/5
                dark:bg-white/[0.03]
              "
            >
              <StatsWidget />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.05
              }}
              className="
                rounded-3xl
                border
                border-black/5
                bg-[#fcfcfd]/90
                p-6
                backdrop-blur-xl
                shadow-sm
                dark:border-white/5
                dark:bg-white/[0.03]
              "
            >
              <IncidentFunnelReportCard />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}
              className="
                rounded-3xl
                border
                border-black/5
                bg-[#fcfcfd]/90
                p-6
                backdrop-blur-xl
                shadow-sm
                dark:border-white/5
                dark:bg-white/[0.03]
              "
            >
              <div className="mb-5">
                <h3 className="text-lg font-semibold">
                  System Status
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Platform operational health
                </p>
              </div>

              <div className="space-y-4">

                <div className="flex items-center justify-between rounded-2xl bg-black/[0.02] px-4 py-3 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-slate-500" />

                    <span className="text-sm">
                      Data Processing
                    </span>
                  </div>

                  <span className="text-sm font-medium text-emerald-500">
                    Healthy
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-black/[0.02] px-4 py-3 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 text-slate-500" />

                    <span className="text-sm">
                      Pipeline Status
                    </span>
                  </div>

                  <span className="text-sm font-medium text-blue-500">
                    Live
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-black/[0.02] px-4 py-3 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <Download className="h-4 w-4 text-slate-500" />

                    <span className="text-sm">
                      Analytics Export
                    </span>
                  </div>

                  <span className="text-sm font-medium">
                    Ready
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Anomaly Detection Panel */}
        {anomalies.length > 0 && (
          <section>
            <div className="mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Anomaly Detection</h3>
              <p className="mt-1 text-sm text-slate-500">Values deviating more than 3σ from the column mean — potential outliers flagged automatically</p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {anomalies.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-4 rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] p-4 dark:border-amber-500/10 dark:bg-amber-500/[0.06]">
                  <div className="mt-0.5 rounded-xl bg-amber-500/10 p-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold capitalize">{a.col.replace(/_/g, ' ')}</p>
                    <p className="mt-0.5 text-xs text-slate-500">Row {a.row} · Value: <span className="font-mono font-semibold text-amber-600">{a.value}</span></p>
                    <p className="mt-0.5 text-xs text-slate-400">{a.sigma.toFixed(1)}σ from mean ({a.mean.toFixed(1)})</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Row Drill-Down Modal */}
      <AnimatePresence>
        {selectedRow && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setSelectedRow(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-black/5 bg-white p-8 shadow-2xl dark:border-white/5 dark:bg-[#0f0f14]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Record Inspector</h3>
                  <p className="mt-1 text-sm text-slate-500">Full field-level view for selected participant</p>
                </div>
                <button onClick={() => setSelectedRow(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/5 bg-black/[0.02] transition hover:bg-black/5 dark:border-white/5 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]">
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>
              <div className="max-h-[60vh] overflow-auto">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(selectedRow).filter(([k]) => k !== 'id').map(([k, v]) => {
                    const num = Number(v)
                    const isNum = typeof v === 'number' || (!isNaN(num) && v !== '' && v !== null)
                    return (
                      <div key={k} className="rounded-2xl border border-black/[0.04] bg-black/[0.01] px-4 py-3 dark:border-white/[0.04] dark:bg-white/[0.02]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{k.replace(/_/g, ' ')}</p>
                        <p className={`mt-1 text-base font-semibold ${isNum ? 'font-mono text-blue-600 dark:text-blue-400' : 'text-[#0f172a] dark:text-white'}`}>
                          {String(v ?? '—')}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#09090b]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-4 border-black/5 dark:border-white/5" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
          </div>
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Loading Intelligence
          </span>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}