"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface EnrollmentData {
  month: string
  participants: number
}

interface EnrollmentChartProps {
  data: EnrollmentData[]
  title?: string
  description?: string
}

export function EnrollmentChart({
  data,
  title = "Enrollment Trend",
  description = "Monthly participant enrollment over time",
}: EnrollmentChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No enrollment data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="oklch(0.65 0.2 250)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.28 0.006 285 / 0.5)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="oklch(0.6 0.01 285)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="oklch(0.6 0.01 285)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-sm text-primary">
                        {payload[0].value} participants
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="monotone"
              dataKey="participants"
              stroke="oklch(0.65 0.2 250)"
              strokeWidth={2}
              fill="url(#enrollmentGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "oklch(0.65 0.2 250)",
                stroke: "oklch(0.13 0.004 285)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
