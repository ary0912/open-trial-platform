"use client"

interface ParticipantDynamic {
  [key: string]: string | number | null
}

interface Props {
  participants: ParticipantDynamic[]
}

export default function ParticipantTable({ participants }: Props) {

  if (!participants || participants.length === 0) {
    return (
      <div className="surface-glass p-8 text-gray-400">
        No participant data available
      </div>
    )
  }

  const columns = Array.from(
    new Set(
      participants.flatMap(p => Object.keys(p))
    )
  )

  return (

    <div className="surface-glass p-10">

      <h2 className="text-lg font-semibold mb-6">
        Participants
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-sm border-collapse">

          <thead>
            <tr className="border-b text-left text-gray-500">

              {columns.map(col => (
                <th key={col} className="py-3 px-3 whitespace-nowrap">
                  {col.replace(/_/g, " ").toUpperCase()}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {participants.map((p, rowIndex) => (

              <tr
                key={`${p.id}-${rowIndex}`}
                className="border-b hover:bg-gray-50 transition"
              >

                {columns.map(col => (

                  <td key={col} className="py-2 px-3 whitespace-nowrap">

                    {p[col] !== undefined && p[col] !== null
                      ? String(p[col])
                      : "-"}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}