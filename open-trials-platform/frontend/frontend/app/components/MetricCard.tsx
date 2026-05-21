"use client"

import { ReactNode } from "react"

interface Props {
  title: string
  value: string | number
  icon?: ReactNode
}

export default function MetricCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white border border-hairline rounded-[28px] p-8 text-primary-dark flex flex-col justify-between h-48 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="text-primary-dark/50">
        {icon}
      </div>
      <div>
        <span className="mono-label text-primary-dark/50 text-[10px]">{title}</span>
        <div className="text-4xl font-semibold mt-2">
          {value}
        </div>
      </div>
    </div>
  )
}