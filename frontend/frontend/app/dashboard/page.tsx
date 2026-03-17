"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import MetricCard from "../components/MetricCard"
import EnrollmentChart from "../components/EnrollmentChart"
import ParticipantTable from "../components/ParticipantTable"

import {
  getAnalytics,
  getParticipants,
  getStudies,
  type AnalyticsData,
  type Participant,
  type Study
} from "../../services/api"

import { Users, Activity } from "lucide-react"

export default function Dashboard() {

  const [studies, setStudies] = useState<Study[]>([])
  const [selectedStudy, setSelectedStudy] = useState<number | null>(null)

  const [data, setData] = useState<AnalyticsData | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /* ----------------------------- */

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const res = await getStudies()
        setStudies(res)
        if (res.length > 0) setSelectedStudy(res[0].id)
      } catch {
        setError("Failed to load studies")
      }
    }
    loadStudies()
  }, [])

  /* ----------------------------- */

  useEffect(() => {

    if (!selectedStudy) return

    const load = async () => {
      setLoading(true)

      try {
        const analytics = await getAnalytics(selectedStudy)
        const participantsData = await getParticipants(selectedStudy)

        setData(analytics)
        setParticipants(participantsData)

      } catch {
        setError("Failed to load dashboard")
      } finally {
        setLoading(false)
      }
    }

    load()

  }, [selectedStudy])

  /* ----------------------------- */

  if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  if (!data) return <div className="flex items-center justify-center min-h-screen text-white">No data</div>

  const formatTitle = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())

  const topMetrics = Object.entries(data.numeric_metrics || {}).slice(0, 4)

  /* ----------------------------- */

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* 🌊 Background */}
      <motion.div
        className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 200, -100, 0], y: [0, -200, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/20 rounded-full blur-3xl right-0"
        animate={{ x: [0, -200, 100, 0], y: [0, 200, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* CONTENT */}
      <div className="
        relative
        max-w-7xl mx-auto
        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
        py-10 md:py-14
        space-y-10 md:space-y-12
      ">

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h1 className="
            text-2xl sm:text-3xl md:text-4xl
            font-semibold tracking-tight
          ">
            Clinical Research Dashboard
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            Real-time analytics for clinical studies
          </p>

          <div>
            <select
              value={selectedStudy ?? ""}
              onChange={(e) => setSelectedStudy(Number(e.target.value))}
              className="
                w-full sm:w-auto
                bg-white/10 backdrop-blur-lg
                border border-white/20
                px-4 py-2 rounded-lg
                text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              {studies.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </motion.header>

        {/* METRICS */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4 sm:gap-6
        ">

          <GlassCard>
            <MetricCard
              title="Total Participants"
              value={data.total_participants}
              icon={<Users size={18} />}
            />
          </GlassCard>

          {topMetrics.map(([key, val]) => (
            <GlassCard key={key}>
              <MetricCard
                title={formatTitle(key)}
                value={typeof val.avg === "number" ? val.avg.toFixed(2) : "0"}
                icon={<Activity size={18} />}
              />
            </GlassCard>
          ))}

        </div>

        {/* GENDER METRICS */}
        {data.categorical_metrics?.gender && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <GlassCard>
              <MetricCard
                title="Male Participants"
                value={data.categorical_metrics.gender.Male || 0}
              />
            </GlassCard>

            <GlassCard>
              <MetricCard
                title="Female Participants"
                value={data.categorical_metrics.gender.Female || 0}
              />
            </GlassCard>
          </div>
        )}

        {/* CATEGORICAL */}
        {data.categorical_metrics && (
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4 sm:gap-6
          ">
            {Object.entries(data.categorical_metrics).map(([metric, values]) => (
              <GlassCard key={metric}>
                <h3 className="mb-3 text-sm text-gray-300">
                  {formatTitle(metric)}
                </h3>

                {Object.entries(values).map(([label, count]) => (
                  <div key={label} className="flex justify-between text-sm py-1">
                    <span>{label}</span>
                    <span className="text-blue-400">{count}</span>
                  </div>
                ))}
              </GlassCard>
            ))}
          </div>
        )}

        {/* CHART */}
        <GlassCard>
          {data.enrollment_trend?.length ? (
            <EnrollmentChart data={data.enrollment_trend} />
          ) : (
            <p className="text-gray-400 text-sm">No chart data</p>
          )}
        </GlassCard>

        {/* TABLE */}
        <GlassCard>
          {participants.length ? (
            <ParticipantTable participants={participants} />
          ) : (
            <p className="text-gray-400 text-sm">No participants</p>
          )}
        </GlassCard>

      </div>
    </div>
  )
}

/* -----------------------------
   GLASS CARD
----------------------------- */

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-4 sm:p-5 md:p-6
        shadow-lg
      "
    >
      {children}
    </motion.div>
  )
}