import { Participant } from "../types"

export function exportCSV(data: Participant[], filename: string) {

  if (data.length === 0) return

  const headers = Object.keys(data[0]).join(",")

  const rows = data.map((row) =>
    Object.values(row).join(",")
  )

  const csv = [headers, ...rows].join("\n")

  const blob = new Blob([csv], { type: "text/csv" })

  const link = document.createElement("a")

  link.href = URL.createObjectURL(blob)
  link.download = filename

  link.click()
}