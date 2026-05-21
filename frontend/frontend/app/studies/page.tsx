"use client"

import { useEffect, useState } from "react"
import { getStudies, createStudy } from "../../services/api"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Users, ClipboardList, TrendingUp, Database } from "lucide-react"
import Link from "next/link"

interface Study {
  id: number
  title: string
  description: string
  principal_investigator: string
}

export default function StudiesPage() {
  const [studies, setStudies] = useState<Study[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [pi, setPi] = useState("")
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem("seenIntro")
    if (!seen) setShowIntro(true)

    fetchStudies()
  }, [])

  const fetchStudies = async () => {
    try {
      setLoading(true)
      const data = await getStudies()
      setStudies(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
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
    setShowCreateModal(false)
    fetchStudies()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-[#17171c] dark:text-[#eeece7] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <span className="mono-label">Workspace Management</span>
            <h1 className="text-5xl md:text-6xl font-normal tracking-tight">Data Workspaces</h1>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Workspace
          </button>
        </header>

        {/* STUDIES LIST */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {loading ? (
            <div className="col-span-full py-20 text-center text-muted-slate font-light italic">
              Synchronizing workspace index...
            </div>
          ) : studies.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-dashed border-hairline rounded-lg">
              <p className="text-muted-slate font-light">No active workspaces found.</p>
            </div>
          ) : (
            studies.map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group border-t border-primary-dark pt-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="mono-label text-accent font-medium">ID: {study.id.toString().slice(-4)}</span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                </div>
                <h3 className="text-2xl font-normal group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">
                  {study.description}
                </p>
                <div className="pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-muted-slate mb-1">Workspace Owner</span>
                    <span className="text-sm font-medium">{study.principal_investigator}</span>
                  </div>
                  <Link href={`/dashboard?studyId=${study.id}`}>
                    <button className="text-sm font-medium underline decoration-hairline hover:decoration-primary-dark transition-all">
                      Open Dashboard
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </section>

      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-[#13131a] border dark:border-zinc-800 text-primary-dark dark:text-white w-full max-w-xl rounded-lg shadow-2xl overflow-hidden transition-colors duration-300"
            >
              <div className="p-8 border-b border-hairline flex justify-between items-center">
                <h2 className="text-2xl font-normal">Create Workspace</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-muted-slate hover:text-primary-dark">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="mono-label text-[10px]">Workspace Title</label>
                  <input
                    className="w-full bg-soft-stone border-none rounded-sm p-4 text-sm focus:ring-1 focus:ring-accent outline-none"
                    placeholder="e.g. Sales Pipeline Analytics"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono-label text-[10px]">Workspace Owner</label>
                  <input
                    className="w-full bg-soft-stone border-none rounded-sm p-4 text-sm focus:ring-1 focus:ring-accent outline-none"
                    placeholder="Team or product owner"
                    value={pi}
                    onChange={(e) => setPi(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="mono-label text-[10px]">Description</label>
                  <textarea
                    rows={4}
                    className="w-full bg-soft-stone border-none rounded-sm p-4 text-sm focus:ring-1 focus:ring-accent outline-none resize-none"
                    placeholder="Provide workspace overview..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleCreate}
                  className="btn-primary w-full mt-4"
                >
                  Create Workspace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ONBOARDING POPUP */}
      <AnimatePresence>
        {showIntro && (
          <div className="fixed inset-0 z-70 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-primary-dark/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-[#13131a] border dark:border-zinc-800 text-primary-dark dark:text-white w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl transition-colors duration-300"
            >
              <div className="bg-deep-green p-12 text-white">
                <span className="mono-label text-pale-green mb-6 block">System Initialization</span>
                <h2 className="text-4xl md:text-5xl font-normal leading-tight mb-8">
                  Welcome to the <br/>Adaptive Intelligence Platform.
                </h2>
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <ClipboardList className="w-6 h-6 text-pale-green" />
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Workflows</p>
                  </div>
                  <div className="space-y-3">
                    <Database className="w-6 h-6 text-pale-green" />
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Ingestion</p>
                  </div>
                  <div className="space-y-3">
                    <TrendingUp className="w-6 h-6 text-pale-green" />
                    <p className="text-[10px] uppercase tracking-widest opacity-60">Analytics</p>
                  </div>
                </div>
              </div>
              <div className="p-12 space-y-8">
                <p className="text-lg font-light text-muted-foreground leading-relaxed">
                  Our platform provides an enterprise-grade infrastructure for managing dataset workspaces and deriving actionable insights from complex exports—instantly and locally.
                </p>
                <button
                  onClick={() => {
                    localStorage.setItem("seenIntro", "true")
                    setShowIntro(false)
                  }}
                  className="btn-primary px-12"
                >
                  Enter Command Center
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}