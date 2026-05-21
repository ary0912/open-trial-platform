"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Code2, 
  Terminal, 
  Key, 
  Copy, 
  Check, 
  Webhook, 
  Layers, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react"
import Link from "next/link"

const CODE_EXAMPLES = {
  curl: `curl -X POST https://api.opentrials.io/v1/datasets/ingest \\
  -H "Authorization: Bearer opentrials_live_token" \\
  -F "study_id=102" \\
  -F "file=@clinical-cohort.csv"`,
  
  javascript: `const data = new FormData();
data.append('study_id', 102);
data.append('file', fileInput.files[0]);

const response = await fetch('https://api.opentrials.io/v1/datasets/ingest', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer opentrials_live_token'
  },
  body: data
});

const result = await response.json();
console.log('Ingest Success:', result.total_participants);`,

  python: `import requests

url = "https://api.opentrials.io/v1/datasets/ingest"
headers = {"Authorization": "Bearer opentrials_live_token"}
payload = {"study_id": 102}
files = [("file", ("clinical-cohort.csv", open("clinical-cohort.csv", "rb"), "text/csv"))]

response = requests.post(url, headers=headers, data=payload, files=files)
print(response.json())`
}

export default function ApiPage() {
  const [activeLang, setActiveLang] = useState<"curl" | "javascript" | "python">("curl")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeLang])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-[#eeece7] relative overflow-hidden pt-28 pb-32 transition-colors duration-300">
      
      {/* Background radial glows for premium SaaS feeling */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1863dc] blur-[150px] opacity-[0.06]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#38bdf8] blur-[120px] opacity-[0.04]" />
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-20">
        
        {/* HERO SECTION */}
        <section className="max-w-4xl space-y-6">
          <Link href="/">
            <button className="flex items-center gap-2 text-xs font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors mb-6 group uppercase tracking-widest font-mono">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-action-blue/10 flex items-center justify-center border border-action-blue/15 shadow-sm">
              <Code2 className="w-5 h-5 text-action-blue animate-pulse" />
            </div>
            <span className="mono-label text-action-blue font-semibold">Programmatic Access</span>
          </div>

          <h1 className="text-[clamp(44px,6vw,72px)] leading-[0.95] tracking-tight font-normal text-primary-dark">
            Integrate OpenTrials into clinical pipelines.
          </h1>

          <p className="text-lg md:text-xl text-[#64748b] font-light leading-relaxed max-w-3xl">
            Automate structured datasets upload, query clinical metrics via REST or GraphQL, and sync conversion ledgers directly to external tools. Private beta currently open.
          </p>
        </section>

        {/* REST API & CODE EXPLORER SANDBOX */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Specs Column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#13131a] border border-black/5 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-5 transition-colors duration-300">
              <h3 className="mono-label border-b border-black/5 dark:border-zinc-800 pb-3 font-semibold text-[#0f172a] dark:text-white">Authentication & Ingest</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-zinc-800/40 flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4 text-[#64748b] dark:text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-dark dark:text-white">Bearer Token Auth</h4>
                    <p className="text-xs text-[#64748b] dark:text-zinc-400 leading-relaxed font-light mt-1">
                      Every requests must contain your active bearer token parameter inside HTTP headers for proper security validation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-zinc-800/40 flex items-center justify-center shrink-0">
                    <Webhook className="w-4 h-4 text-[#64748b] dark:text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary-dark dark:text-white">Realtime Webhooks</h4>
                    <p className="text-xs text-[#64748b] dark:text-zinc-400 leading-relaxed font-light mt-1">
                      Receive event notifications when statistical metrics change, schema drift is reconciled, or ingestion fails.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#eeece7] dark:bg-[#1c1c24] border dark:border-zinc-800 rounded-3xl p-6.5 space-y-4 transition-colors duration-300">
              <h4 className="font-semibold text-primary-dark dark:text-white tracking-tight">Need private beta access?</h4>
              <p className="text-xs text-ink/80 dark:text-zinc-300 leading-relaxed font-light">
                API tokens are currently assigned exclusively to selected enterprise research partners. Connect to get your live token.
              </p>
              <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs text-action-blue font-semibold hover:underline">
                Launch Platform Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Code Viewer Container */}
          <div className="lg:col-span-2 bg-[#0f172a] rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[500px] border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-action-blue/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4.5 relative z-10">
              <div className="flex gap-2">
                {(["curl", "javascript", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                      activeLang === lang 
                        ? "bg-white text-[#0f172a] border-white" 
                        : "bg-transparent text-white/50 border-white/10 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {lang === "curl" ? "cURL" : lang === "javascript" ? "NodeJS" : "Python"}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>
            </div>

            {/* Code viewport container */}
            <div className="flex-1 mt-6 relative z-10 font-mono text-[13px] leading-relaxed text-white/90 overflow-x-auto select-all selection:bg-white/20 bg-black/30 p-6 rounded-2xl border border-white/5">
              <pre>{CODE_EXAMPLES[activeLang]}</pre>
            </div>

            <div className="border-t border-white/5 pt-4.5 mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs text-white/40 relative z-10">
              <span>Endpoint: <code>POST /v1/datasets/ingest</code></span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-white/60">Fully sandbox verified (SSL Encrypted)</span>
              </div>
            </div>

          </div>

        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-10 md:p-14 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight">Ready to see live analytical metrics?</h2>
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
              Launch the live OpenTrials platform instantly and upload clinical operational data. Your information stays protected in our secure sandbox.
            </p>
          </div>

          <div className="flex gap-4 shrink-0">
            <Link href="/dashboard">
              <button className="px-8 py-3.5 rounded-full bg-white text-[#0f172a] font-semibold hover:bg-white/90 active:scale-95 transition-all text-sm shadow-md">
                Launch Platform
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
