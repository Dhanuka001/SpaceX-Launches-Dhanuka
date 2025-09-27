import type { Payload } from "../types/spacex"

export default function PayloadTable({ items }: { items: Payload[] }) {

    if(!items.length) return <p>Opps! No payloads found.</p>

    return(
        <div role="region" aria-label="payloads">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Orbit</th>
                </tr>
            </table>
            <tbody>
                {items.map(p => (
                    <tr key={p.id}>
                        <td>{p.name ?? '-'}</td>
                        <td>{p.type ?? '-'}</td>
                        <td>{p.orbit ?? '-'}</td>


                    </tr>
                ))}
            </tbody>
        </div>
    )
}