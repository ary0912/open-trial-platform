"use client"

import { ReactNode } from "react"

interface Props {
  title: string
  value: string | number
  icon?: ReactNode
}

export default function MetricCard({ title, value, icon }: Props) {

  return (

    <div className="
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-6
      flex items-center justify-between
      shadow-lg
    ">

      {/* TEXT */}
      <div>

        <p className="text-sm text-gray-400">
          {title}
        </p>

        <h2 className="text-3xl font-semibold text-white mt-1">
          {value}
        </h2>

      </div>

      {/* ICON */}
      {icon && (
        <div className="
          bg-white/10
          p-3
          rounded-xl
          text-blue-400
        ">
          {icon}
        </div>
      )}

    </div>

  )
}