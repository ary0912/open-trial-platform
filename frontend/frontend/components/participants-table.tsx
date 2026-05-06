"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react"

interface ParticipantDynamic {
  [key: string]: string | number | null | undefined
}

interface ParticipantsTableProps {
  participants: ParticipantDynamic[]
  title?: string
  description?: string
}

export function ParticipantsTable({
  participants,
  title = "Participants",
  description = "Detailed view of all study participants",
}: ParticipantsTableProps) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const pageSize = 10

  if (!participants || participants.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No participant data available
          </div>
        </CardContent>
      </Card>
    )
  }

  // Get all unique columns
  const columns = Array.from(
    new Set(participants.flatMap((p) => Object.keys(p)))
  ).filter((col) => col !== "id")

  // Filter participants based on search
  const filtered = participants.filter((p) =>
    Object.values(p).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  )

  // Sort participants
  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        if (aVal === null || aVal === undefined) return 1
        if (bVal === null || bVal === undefined) return -1
        const comparison =
          typeof aVal === "number" && typeof bVal === "number"
            ? aVal - bVal
            : String(aVal).localeCompare(String(bVal))
        return sortDirection === "asc" ? comparison : -comparison
      })
    : filtered

  // Paginate
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize)
  const totalPages = Math.ceil(sorted.length / pageSize)

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const formatColumnName = (col: string) =>
    col.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const formatCellValue = (value: string | number | null | undefined, column: string) => {
    if (value === null || value === undefined) return "-"
    
    // Special formatting for status-like columns
    if (column.toLowerCase().includes("status")) {
      return (
        <Badge variant={value === "Active" ? "default" : "secondary"}>
          {String(value)}
        </Badge>
      )
    }
    
    // Special formatting for gender
    if (column.toLowerCase() === "gender") {
      return (
        <Badge variant="outline">
          {String(value)}
        </Badge>
      )
    }

    return String(value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search participants..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(0)
              }}
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 gap-1 text-xs font-medium"
                      onClick={() => handleSort(col)}
                    >
                      {formatColumnName(col)}
                      <ArrowUpDown className="size-3" />
                    </Button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((p, rowIndex) => (
                <TableRow key={`${p.id || rowIndex}-${rowIndex}`}>
                  {columns.map((col) => (
                    <TableCell key={col} className="whitespace-nowrap">
                      {formatCellValue(p[col], col)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {page * pageSize + 1} to{" "}
            {Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}{" "}
            participants
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
