"use client"

import { useState, useEffect } from "react"
import { uploadDataset, getStudies, Study } from "../../services/api"
import { UploadCloud, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function UploadPage() {

  const [file, setFile] = useState<File | null>(null)
  const [studies, setStudies] = useState<Study[]>([])
  const [studyId, setStudyId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* ----------------------------- */

  useEffect(() => {

    const loadStudies = async () => {

      const data = await getStudies()
      setStudies(data)

      if (data.length > 0) {
        setStudyId(data[0].id)
      }

    }

    loadStudies()

  }, [])

  /* ----------------------------- */

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

      console.error(err)
      setError("Upload failed")

    } finally {

      setLoading(false)

    }

  }

  /* ----------------------------- */

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* 🌊 Animated Background */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 200, -100, 0], y: [0, -200, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl right-0"
        animate={{ x: [0, -200, 100, 0], y: [0, 200, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* CONTENT */}
      <div className="relative max-w-3xl mx-auto py-20 px-6 space-y-10">

        {/* HEADER */}
        <header className="space-y-2">

          <h1 className="text-4xl font-semibold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Upload Dataset
          </h1>

          <p className="text-gray-400 text-sm">
            Upload CSV data for your clinical study
          </p>

        </header>

        {/* STUDY SELECT */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">

          <label className="text-sm text-gray-400 mb-2 block">
            Select Study
          </label>

          <select
            value={studyId ?? ""}
            onChange={(e) => setStudyId(Number(e.target.value))}
            className="w-full bg-transparent text-white border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {studies.map((study) => (
              <option key={study.id} value={study.id} className="text-black">
                {study.title}
              </option>
            ))}
          </select>

        </div>

        {/* UPLOAD CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-lg"
        >

          {/* DROP AREA */}
          <div className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center space-y-4 hover:border-blue-500 transition">

            <UploadCloud size={40} className="mx-auto text-blue-400" />

            <p className="text-sm text-gray-400">
              Drag & drop your CSV file or click to upload
            </p>

            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-300"
            />

          </div>

          {/* FILE INFO */}
          {file && (

            <div className="flex items-center gap-3 text-sm bg-white/5 p-3 rounded-lg border border-white/10">

              <FileSpreadsheet size={18} className="text-blue-400" />

              <span className="text-gray-300">{file.name}</span>

            </div>

          )}

          {/* BUTTON */}
          {file && (

            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-lg text-sm font-medium"
            >
              {loading ? "Uploading..." : "Upload Dataset"}
            </button>

          )}

          {/* SUCCESS */}
          {success && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle size={16} /> Upload successful
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

        </motion.div>

      </div>

    </div>

  )

}