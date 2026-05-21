"use client"

import { useState, useEffect } from "react"
import { uploadDataset, getStudies, Study } from "../../services/api"
import { Upload, FileText, CheckCircle2, AlertCircle, ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [studies, setStudies] = useState<Study[]>([])
  const [studyId, setStudyId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStudies = async () => {
      const data = await getStudies()
      setStudies(data)
      if (data.length > 0) setStudyId(data[0].id)
    }
    loadStudies()
  }, [])

  const handleUpload = async () => {
    if (!file || !studyId) return
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      await uploadDataset(studyId, file)
      setSuccess(true)
      setFile(null)
    } catch (err) {
      setError("Data ingestion failed. Ensure the CSV follows a standard dataset format.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-[#17171c] dark:text-[#eeece7] pt-32 pb-20 px-6 font-sans transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-16">
        
        {/* HEADER */}
        <header className="space-y-4">
          <span className="mono-label">Data Ingestion</span>
          <h1 className="text-5xl md:text-6xl font-normal tracking-tight">Import Dataset</h1>
          <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-xl">
            Upload operational CSV exports and let the platform infer schema, normalize fields, and surface analytics in minutes.
          </p>
        </header>
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="mono-label text-[10px]">Workspace</label>
            <div className="relative">
              <select
                value={studyId ?? ""}
                onChange={(e) => setStudyId(Number(e.target.value))}
                className="w-full appearance-none bg-soft-stone border-none rounded-sm p-4 text-sm focus:ring-1 focus:ring-accent outline-none cursor-pointer"
              >
                {studies.map((study) => (
                  <option key={study.id} value={study.id}>
                    {study.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-slate" />
            </div>
          </div>

          {/* DROP ZONE */}
          <div 
            className={`
              relative border-2 border-dashed rounded-lg p-12 transition-all duration-300
              flex flex-col items-center justify-center gap-6 text-center
              ${file ? "border-accent bg-pale-blue/20" : "border-hairline hover:border-primary-dark bg-soft-stone/20"}
            `}
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center border border-hairline">
              <Upload className={`w-6 h-6 ${file ? "text-accent" : "text-primary-dark"}`} />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">
                {file ? file.name : "Select a dataset CSV file"}
              </p>
              <p className="text-xs text-muted-slate">
                Drag and drop or click to browse (Max 50MB)
              </p>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Process Dataset <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STATUS MESSAGES */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-pale-green p-6 rounded-lg flex items-center gap-4 text-green-800"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Dataset successfully ingested.</p>
                  <Link href={`/dashboard?studyId=${studyId}`} className="text-xs underline font-medium mt-1 inline-block">
                    View in Dashboard
                  </Link>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 p-6 rounded-lg flex items-center gap-4 text-red-800"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* INSTRUCTIONS */}
        <div className="pt-12 border-t border-hairline grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Schema Requirements</h4>
            <p className="text-sm text-muted-slate font-light leading-relaxed">
              We support both wide and long format datasets. Upload any CSV with a header row and incremental identifiers for business events.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Data Sovereignty</h4>
            <p className="text-sm text-muted-slate font-light leading-relaxed">
              Files are processed locally in your browser. No external data telemetry is sent, letting you validate workflow assumptions safely.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}