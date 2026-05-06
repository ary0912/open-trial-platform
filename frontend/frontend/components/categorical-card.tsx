"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CategoricalCardProps {
  title: string
  data: Record<string, number>
}

export function CategoricalCard({ title, data }: CategoricalCardProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0)
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1])

  const colors = [
    "bg-primary",
    "bg-chart-2",
    "bg-chart-3",
    "bg-chart-4",
    "bg-chart-5",
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {entries.map(([label, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0
          return (
            <div key={label} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">
                  {count}{" "}
                  <span className="text-muted-foreground">
                    ({percentage.toFixed(1)}%)
                  </span>
                </span>
              </div>
              {/* Custom progress bar */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full transition-all duration-500 ease-out",
                    colors[index % colors.length]
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
