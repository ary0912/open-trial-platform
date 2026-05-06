"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  X,
  FileUp,
  CloudUpload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { uploadDataset, getStudies, type Study } from "@/services/api"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function UploadSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-16 w-full max-w-md rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [studies, setStudies] = useState<Study[]>([])
  const [studyId, setStudyId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const loadStudies = async () => {
      try {
        const data = await getStudies()
        setStudies(data)
        if (data.length > 0) {
          setStudyId(String(data[0].id))
        }
      } catch (err) {
        console.error(err)
        setError("Failed to load studies")
      } finally {
        setLoading(false)
      }
    }
    loadStudies()
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile)
      setSuccess(false)
      setError(null)
    } else {
      setError("Please upload a CSV file")
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setSuccess(false)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file || !studyId) return

    try {
      setUploading(true)
      setError(null)
      setSuccess(false)
      setUploadProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      await uploadDataset(Number(studyId), file)

      clearInterval(progressInterval)
      setUploadProgress(100)
      setSuccess(true)
      setFile(null)
    } catch (err) {
      console.error(err)
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
    setSuccess(false)
    setError(null)
  }

  if (loading) {
    return <UploadSkeleton />
  }

  return (
    <motion.div
      className="space-y-8 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Upload Dataset
        </h1>
        <p className="text-muted-foreground">
          Import CSV data to populate your clinical study
        </p>
      </motion.div>

      {/* Study Selector */}
      <motion.div variants={itemVariants} className="max-w-md">
        <label className="mb-2 block text-sm font-medium">Select Study</label>
        <Select value={studyId || undefined} onValueChange={setStudyId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a study" />
          </SelectTrigger>
          <SelectContent>
            {studies.map((study) => (
              <SelectItem key={study.id} value={String(study.id)}>
                {study.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Upload Card */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="size-5" />
              Upload CSV File
            </CardTitle>
            <CardDescription>
              Drag and drop your dataset or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              <div className="pointer-events-none flex flex-col items-center gap-4">
                <motion.div
                  animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                  className={`flex size-16 items-center justify-center rounded-full ${
                    isDragging ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <CloudUpload
                    className={`size-8 ${
                      isDragging ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </motion.div>
                <div>
                  <p className="text-sm font-medium">
                    {isDragging
                      ? "Drop your file here"
                      : "Drag & drop your CSV file"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    or click to browse from your computer
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  CSV files only
                </Badge>
              </div>
            </div>

            {/* Selected File */}
            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileSpreadsheet className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="size-8"
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Progress */}
            <AnimatePresence>
              {uploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="font-medium">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress}>
                    <ProgressTrack className="h-2">
                      <ProgressIndicator className="transition-all duration-300" />
                    </ProgressTrack>
                  </Progress>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert className="border-success/50 bg-success/10">
                    <CheckCircle className="size-4 text-success" />
                    <AlertTitle className="text-success">Success!</AlertTitle>
                    <AlertDescription>
                      Your dataset has been uploaded and processed successfully.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!file || !studyId || uploading}
              className="w-full gap-2"
              size="lg"
            >
              <FileUp className="size-4" />
              {uploading ? "Uploading..." : "Upload Dataset"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Help Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">File Format Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 text-success" />
                CSV files with headers in the first row
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 text-success" />
                UTF-8 encoding recommended for special characters
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 text-success" />
                Include participant IDs, demographics, and measurements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 text-success" />
                Both wide and long data formats are supported
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
