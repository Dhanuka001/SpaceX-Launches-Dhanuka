import type { Payload } from "../types/spacex"

export default function PayloadTable({ items }: { items: Payload[] }) {

    if(!items.length) return <p>Opps! No payloads found.</p>

    return(
    <div role="region" aria-label="payloads" className="overflow-x-auto shadow  border border-gray-600">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold border-b border-gray-300">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Orbit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map(p => (
            <tr
              key={p.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">{p.name ?? '—'}</td>
              <td className="px-4 py-3 text-gray-600">{p.type ?? '—'}</td>
              <td className="px-4 py-3 text-gray-600">{p.orbit ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}