"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function LandingPage() {

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <motion.div
        className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 200, -100, 0], y: [0, -200, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/10 rounded-full blur-3xl right-0"
        animate={{ x: [0, -200, 100, 0], y: [0, 200, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* ================= CONTENT ================= */}

      <div className="
        relative max-w-7xl mx-auto
        px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
        py-16 sm:py-20
        space-y-20 md:space-y-28
      ">

        {/* ================= HERO ================= */}

        <section className="text-center space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-semibold tracking-tight
              bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
              text-transparent bg-clip-text
              drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]
            "
          >
            Clinical Research Analytics Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              text-sm sm:text-base md:text-lg
              text-gray-400
              max-w-2xl mx-auto
            "
          >
            Upload datasets, generate insights, and visualize trends with a modern,
            scalable analytics platform built for research and healthcare.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >

            {/* PRIMARY CTA */}
            <Link href="/studies">
              <button className="
                px-6 py-3 rounded-xl
                bg-white/10 backdrop-blur-lg
                border border-white/20
                text-sm sm:text-base md:text-lg font-semibold
                bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                text-transparent bg-clip-text
                hover:bg-white/20 transition
              ">
                Get Started
              </button>
            </Link>

            {/* SECONDARY CTA */}
            <Link href="/dashboard">
              <button className="
                px-6 py-3 rounded-xl
                bg-white/10 backdrop-blur-lg
                border border-white/20
                text-sm sm:text-base md:text-lg font-semibold
                bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
                text-transparent bg-clip-text
                hover:bg-white/20 transition
              ">
                View Dashboard
              </button>
            </Link>

          </motion.div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
          gap-5 sm:gap-6 md:gap-8
        ">

          {[
            {
              title: "Dynamic Analytics",
              desc: "Automatically compute averages, distributions, and trends across clinical datasets."
            },
            {
              title: "Flexible CSV Ingestion",
              desc: "Supports both wide and long formats with automatic schema detection."
            },
            {
              title: "Interactive Dashboard",
              desc: "Visualize participant trends and metrics with real-time charts and tables."
            }
          ].map((f, i) => (

            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-5 sm:p-6
              "
            >

              <h3 className="
                text-base sm:text-lg
                font-semibold mb-2
              ">
                {f.title}
              </h3>

              <p className="
                text-xs sm:text-sm md:text-base
                text-gray-400
              ">
                {f.desc}
              </p>

            </motion.div>

          ))}

        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section className="text-center space-y-8">

          <h2 className="
            text-xl sm:text-2xl md:text-3xl
            font-semibold
          ">
            How It Works
          </h2>

          <div className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            gap-6 md:gap-8
          ">

            {[
              "Create a Study",
              "Upload CSV Dataset",
              "Explore Insights"
            ].map((step, i) => (

              <div key={i} className="space-y-2">

                <div className="
                  text-xl sm:text-2xl md:text-3xl
                  font-bold text-blue-300
                ">
                  {i + 1}
                </div>

                <p className="text-sm sm:text-base text-gray-300">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ================= TECH STACK ================= */}

        <section className="text-center space-y-5">

          <h2 className="
            text-xl sm:text-2xl md:text-3xl
            font-semibold
          ">
            Built With
          </h2>

          <div className="
            px-15 sm:px-10 py-6.5 sm:py-4
rounded-xl
bg-white/10 backdrop-blur-lg
text-sm sm:text-base md:text-lg
font-semibold tracking-tight
bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
text-transparent bg-clip-text
hover:bg-white/20 transition-all duration-200
          ">

            {[
              "FastAPI",
              "PostgreSQL",
              "Next.js",
              "TailwindCSS",
              "Recharts"
            ].map((tech) => (

              <span
                key={tech}
                className="
               px-3.5 sm:px-5 md:px-6
py-1.5 sm:py-2 md:py-2.5
bg-white/5 border border-white/10
rounded-full
text-xs sm:text-sm md:text-base
leading-none
                "
              >
                {tech}
              </span>

            ))}

          </div>

        </section>

        {/* ================= CTA ================= */}

        <section className="text-center space-y-5">

          <h2 className="
            text-xl sm:text-2xl md:text-3xl
            font-semibold
          ">
            Start Exploring Your Data
          </h2>

          <Link href="/studies">
            <button className="
              px-6 py-3 rounded-xl
              bg-white/10 backdrop-blur-lg
              border border-white/20
              text-sm sm:text-base md:text-lg font-semibold
              bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400
              text-transparent bg-clip-text
              hover:bg-white/20 transition
            ">
              Create Study
            </button>
          </Link>

        </section>

        {/* ================= FOOTER ================= */}

        <footer className="text-center text-gray-500 text-xs sm:text-sm pt-6">
          <p>OpenTrials Platform • Built by Aryan Lodha</p>
        </footer>

      </div>

    </div>

  )
}