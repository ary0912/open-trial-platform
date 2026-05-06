"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, Activity, TrendingUp, BarChart3, AlertCircle } from "lucide-react"

import { MetricCard } from "@/components/metric-card"
import { EnrollmentChart } from "@/components/enrollment-chart"
import { ParticipantsTable } from "@/components/participants-table"
import { CategoricalCard } from "@/components/categorical-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

import {
  getAnalytics,
  getParticipants,
  getStudies,
  type AnalyticsData,
  type Study,
} from "@/services/api"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

interface ParticipantDynamic {
  [key: string]: string | number | null | undefined
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8 p-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Metrics skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl" />
        ))}
      </div>

      {/* Chart skeleton */}
      <Skeleton className="h-[400px] w-full rounded-xl" />

      {/* Table skeleton */}
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  )
}

export default function DashboardPage() {
  const [studies, setStudies] = useState<Study[]>([])
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [participants, setParticipants] = useState<ParticipantDynamic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load studies on mount
  useEffect(() => {
    const loadStudies = async () => {
      try {
        const res = await getStudies()
        setStudies(res)
        if (res.length > 0) {
          setSelectedStudy(String(res[0].id))
        }
      } catch {
        setError("Failed to load studies")
        setLoading(false)
      }
    }
    loadStudies()
  }, [])

  // Load analytics when study changes
  useEffect(() => {
    if (!selectedStudy) return

    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const [analytics, participantsData] = await Promise.all([
          getAnalytics(Number(selectedStudy)),
          getParticipants(Number(selectedStudy)),
        ])

        setData(analytics)
        setParticipants(participantsData)
      } catch {
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [selectedStudy])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No data available</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatTitle = (key: string) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const topMetrics = Object.entries(data.numeric_metrics || {}).slice(0, 3)

  return (
    <motion.div
      className="space-y-8 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time analytics for your clinical studies
          </p>
        </div>

        {studies.length > 0 && (
          <Select
            value={selectedStudy || undefined}
            onValueChange={setSelectedStudy}
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Select a study" />
            </SelectTrigger>
            <SelectContent>
              {studies.map((study) => (
                <SelectItem key={study.id} value={String(study.id)}>
                  {study.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={itemVariants}
      >
        <MetricCard
          title="Total Participants"
          value={data.total_participants}
          icon={<Users className="size-5" />}
          trend={{ value: 12.5, label: "vs last month" }}
        />
        {topMetrics.map(([key, val]) => (
          <MetricCard
            key={key}
            title={formatTitle(key)}
            value={typeof val.avg === "number" ? val.avg.toFixed(2) : "0"}
            icon={<Activity className="size-5" />}
          />
        ))}
      </motion.div>

      {/* Gender Distribution */}
      {data.categorical_metrics?.gender && (
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={itemVariants}
        >
          <MetricCard
            title="Male Participants"
            value={data.categorical_metrics.gender.Male || 0}
            icon={<TrendingUp className="size-5" />}
          />
          <MetricCard
            title="Female Participants"
            value={data.categorical_metrics.gender.Female || 0}
            icon={<BarChart3 className="size-5" />}
          />
        </motion.div>
      )}

      {/* Charts and Categorical Metrics */}
      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        variants={itemVariants}
      >
        <div className="lg:col-span-2">
          <EnrollmentChart
            data={data.enrollment_trend || []}
            title="Enrollment Trend"
            description="Monthly participant enrollment over time"
          />
        </div>

        {data.categorical_metrics && (
          <div className="space-y-6">
            {Object.entries(data.categorical_metrics)
              .slice(0, 2)
              .map(([metric, values]) => (
                <CategoricalCard
                  key={metric}
                  title={formatTitle(metric)}
                  data={values}
                />
              ))}
          </div>
        )}
      </motion.div>

      {/* Additional Categorical Metrics */}
      {data.categorical_metrics &&
        Object.entries(data.categorical_metrics).length > 2 && (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={itemVariants}
          >
            {Object.entries(data.categorical_metrics)
              .slice(2)
              .map(([metric, values]) => (
                <CategoricalCard
                  key={metric}
                  title={formatTitle(metric)}
                  data={values}
                />
              ))}
          </motion.div>
        )}

      {/* Participants Table */}
      <motion.div variants={itemVariants}>
        <ParticipantsTable
          participants={participants}
          title="Participants"
          description="Detailed view of all study participants"
        />
      </motion.div>
    </motion.div>
  )
}
