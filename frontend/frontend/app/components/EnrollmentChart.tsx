"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

interface EnrollmentPoint {
  month: string
  participants: number
}

export default function EnrollmentChart({ data }: { data: EnrollmentPoint[] }) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1863dc" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#1863dc" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(0,0,0,0.04)" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#64748b", fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#64748b", fontWeight: 500 }}
            dx={-5}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(15, 23, 42, 0.95)", 
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)", 
              borderRadius: "16px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 500,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
            }}
            itemStyle={{ color: "#38bdf8", fontWeight: 600 }}
            labelStyle={{ color: "#94a3b8", marginBottom: "4px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}
            cursor={{ stroke: "rgba(24, 99, 220, 0.15)", strokeWidth: 2 }}
          />
          <Area 
            type="monotone" 
            dataKey="participants" 
            stroke="#1863dc" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorEnrollment)" 
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}