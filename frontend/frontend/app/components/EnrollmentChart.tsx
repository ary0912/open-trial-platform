"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

/* --------------------------------
   TYPE (Aligned with backend)
-------------------------------- */

export interface EnrollmentData {
  month: string
  participants: number
}

/* --------------------------------
   PROPS
-------------------------------- */

interface Props {
  data: EnrollmentData[]
}

/* --------------------------------
   COMPONENT
-------------------------------- */

export default function EnrollmentChart({ data }: Props) {

  // Safety fallback (prevents crash)
  if (!data || data.length === 0) {
    return (
      <div className="surface-glass p-8 text-center text-gray-400">
        No enrollment data available
      </div>
    )
  }

  return (

    <div className="surface-glass p-8">

      <h2 className="text-lg font-semibold mb-4">
        Participant Enrollment
      </h2>

      <ResponsiveContainer width="100%" height={250}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis uses month (Jan, Feb, etc.) */}
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="participants"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}