"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  FlaskConical,
  Plus,
  Users,
  Calendar,
  ArrowRight,
  AlertCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  FieldGroup,
  Field,
  FieldLabel,
} from "@/components/ui/field"

import { getStudies, createStudy, type Study } from "@/services/api"

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
    transition: { duration: 0.4 },
  },
}

function StudiesSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-56 w-full rounded-xl" />
        ))}
      </div>
    </div>
  )
}

function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/30 p-8 text-center"
    >
      <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
        <FlaskConical className="size-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">No studies yet</h3>
      <p className="mb-6 max-w-sm text-muted-foreground">
        Create your first clinical study to start managing research data and
        generating insights.
      </p>
      <Button onClick={onCreateClick} className="gap-2">
        <Plus className="size-4" />
        Create Study
      </Button>
    </motion.div>
  )
}

export default function StudiesPage() {
  const [studies, setStudies] = useState<Study[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pi, setPi] = useState("")
  const [creating, setCreating] = useState(false)

  const loadStudies = async () => {
    try {
      const data = await getStudies()
      setStudies(data)
    } catch (err) {
      console.error(err)
      setError("Failed to load studies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudies()
  }, [])

  const handleCreate = async () => {
    if (!title || !pi) return

    setCreating(true)
    try {
      await createStudy({
        title,
        description,
        principal_investigator: pi,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setPi("")
      setDialogOpen(false)

      // Refresh studies
      loadStudies()
    } catch (err) {
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  if (loading) {
    return <StudiesSkeleton />
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
            Studies
          </h1>
          <p className="text-muted-foreground">
            Manage your clinical research studies
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              New Study
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Study</DialogTitle>
              <DialogDescription>
                Add a new clinical study to start collecting and analyzing data.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <Field>
                <FieldLabel htmlFor="title">Study Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="e.g., Phase II Clinical Trial"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="pi">Principal Investigator</FieldLabel>
                <Input
                  id="pi"
                  placeholder="e.g., Dr. Jane Smith"
                  value={pi}
                  onChange={(e) => setPi(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Brief description of the study objectives..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!title || !pi || creating}
              >
                {creating ? "Creating..." : "Create Study"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Studies Grid or Empty State */}
      {studies.length === 0 ? (
        <EmptyState onCreateClick={() => setDialogOpen(true)} />
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {studies.map((study, index) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="relative">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <FlaskConical className="size-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-1 text-lg">
                    {study.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {study.description || "No description provided"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Users className="size-4" />
                      <span>{study.principal_investigator}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="relative">
                  <Button
                    variant="ghost"
                    className="w-full gap-2 transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                    asChild
                  >
                    <Link href={`/dashboard?study=${study.id}`}>
                      View Dashboard
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
