"use client"

import { type Participant } from "../../services/api"

export default function ParticipantTable({ participants }: { participants: Participant[] }) {
  if (!participants.length) return null

  // Get headers from first participant keys
  const headers = Object.keys(participants[0]).filter(k => k !== "id")

  const isNumeric = (val: any) => !isNaN(parseFloat(val)) && isFinite(val)
  const isGender = (val: any) => typeof val === 'string' && ['male', 'female', 'm', 'f'].includes(val.toLowerCase())
  const isSegment = (key: string) => key.toLowerCase() === 'segment'
  const isCohort = (key: string) => key.toLowerCase() === 'cohort'

  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/[0.02] border-b border-black/5">
              <th className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-[#64748b] font-bold font-mono whitespace-nowrap">ID / Index</th>
              {headers.map((h) => (
                <th key={h} className="px-6 py-4.5 text-[10px] uppercase tracking-widest text-[#64748b] font-bold font-mono whitespace-nowrap">
                  {h.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {participants.map((p, idx) => (
              <tr key={idx} className="bg-white hover:bg-black/[0.01] transition-colors group">
                <td className="px-6 py-4.5 text-xs font-mono text-[#64748b]/80 group-hover:text-primary-dark transition-colors">
                  {(idx + 1).toString().padStart(4, '0')}
                </td>
                {headers.map((h) => {
                  const val = p[h]
                  
                  if (val === null || val === undefined) {
                    return <td key={h} className="px-6 py-4.5"><span className="text-[#94a3b8] italic opacity-50 font-light">—</span></td>
                  }

                  if (isGender(val)) {
                    const isF = val.toString().toLowerCase().startsWith('f');
                    return (
                      <td key={h} className="px-6 py-4.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                          isF 
                            ? 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100' 
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {val.toString()}
                        </span>
                      </td>
                    )
                  }

                  if (isSegment(h)) {
                    const valStr = val.toString().toLowerCase();
                    const isEnt = valStr.includes('enterprise');
                    return (
                      <td key={h} className="px-6 py-4.5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                          isEnt 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {val.toString()}
                        </span>
                      </td>
                    )
                  }

                  if (isCohort(h)) {
                    return (
                      <td key={h} className="px-6 py-4.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                          {val.toString()}
                        </span>
                      </td>
                    )
                  }

                  if (isNumeric(val)) {
                    return (
                      <td key={h} className="px-6 py-4.5 text-sm font-mono text-[#0f172a] font-medium">
                        {val.toString()}
                      </td>
                    )
                  }

                  return (
                    <td key={h} className="px-6 py-4.5 text-sm font-normal text-[#334155] font-sans">
                      {val.toString()}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}