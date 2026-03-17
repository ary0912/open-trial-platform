"use client"

import { useEffect, useState } from "react"
import { getStudies, createStudy } from "../../services/api"
import { motion } from "framer-motion"

interface Study {
  id: number
  title: string
  description: string
  principal_investigator: string
}

export default function Home() {

  const [studies, setStudies] = useState<Study[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pi, setPi] = useState("")
  const [loading, setLoading] = useState(true)

  // ✅ Onboarding popup state
  const [showIntro, setShowIntro] = useState(false)

  /* ----------------------------- */

  useEffect(() => {

    // Show popup only first time
    const seen = localStorage.getItem("seenIntro")
    if (!seen) setShowIntro(true)

    const fetchStudies = async () => {
      try {
        const data = await getStudies()
        setStudies(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStudies()

  }, [])

  /* ----------------------------- */

  const loadStudies = async () => {
    const data = await getStudies()
    setStudies(data)
  }

  const handleCreate = async () => {

    if (!title || !pi) return

    await createStudy({
      title,
      description,
      principal_investigator: pi
    })

    setTitle("")
    setDescription("")
    setPi("")

    loadStudies()
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
      <div className="relative max-w-[1200px] mx-auto px-8 py-16 space-y-14">

        {/* HEADER */}
        <header className="space-y-3">

          <h1 className="text-5xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            OpenTrials Platform
          </h1>

          <p className="text-gray-400">
            Manage clinical research studies and datasets
          </p>

        </header>

        {/* CREATE STUDY */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6 shadow-lg"
        >

          <h2 className="text-lg font-semibold text-gray-200">
            Create New Study
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Study Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Principal Investigator"
              value={pi}
              onChange={(e) => setPi(e.target.value)}
            />

          </div>

          <textarea
            className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Study Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-2 rounded-lg text-sm font-medium"
          >
            Create Study
          </button>

        </motion.section>

        {/* STUDIES */}
        <section className="space-y-6">

          <h2 className="text-lg font-semibold text-gray-200">
            Studies
          </h2>

          {loading && (
            <p className="text-gray-400">Loading studies...</p>
          )}

          {!loading && studies.length === 0 && (
            <p className="text-gray-400">No studies created yet.</p>
          )}

          <div className="grid md:grid-cols-2 gap-6">

            {studies.map((study) => (

              <motion.div
                key={study.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md"
              >

                <h3 className="text-lg font-semibold text-white">
                  {study.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  {study.description}
                </p>

                <div className="mt-4 text-sm">

                  <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 mr-2">
                    PI
                  </span>

                  <span className="text-gray-300">
                    {study.principal_investigator}
                  </span>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

      </div>

      {/* ✅ ONBOARDING POPUP */}
      {showIntro && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-lg w-full mx-4 shadow-2xl"
          >

            <h2 className="text-2xl font-semibold text-white mb-4">
              Welcome to OpenTrials 👋
            </h2>

            <p className="text-gray-400 text-sm mb-6">
              A simple platform to manage and analyze clinical research data.
            </p>

            <div className="space-y-4 text-sm">

              <div className="flex gap-3">
                <span className="text-blue-400 font-semibold">1.</span>
                <p className="text-gray-300">
                  Create a study to start managing your research
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-blue-400 font-semibold">2.</span>
                <p className="text-gray-300">
                  Upload CSV datasets with participant data
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-blue-400 font-semibold">3.</span>
                <p className="text-gray-300">
                  View insights and analytics in the dashboard
                </p>
              </div>

            </div>

            <button
              onClick={() => {
                localStorage.setItem("seenIntro", "true")
                setShowIntro(false)
              }}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-xl text-sm font-medium"
            >
              Start Exploring
            </button>

          </motion.div>

        </motion.div>

      )}

    </div>

  )
}