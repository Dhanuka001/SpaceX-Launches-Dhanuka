import { useParams , Link} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { endpoints } from '../api/spacex'
import { usePayloads } from '../hooks/usePayloads'
import type { Launch , Launchpad } from '../types/spacex'
import PayloadTable from '../components/PayloadTable'
import { formatLocalDate } from '../utils/format'
import LaunchDetailsSkeleton from '../components/LaunchDetailsSkeleton'

export default function LaunchDetailsPage() {
    const { id } = useParams()
    const launch = useFetch<Launch>({ url : id ? `${endpoints.launches}/${id}` : null})

    const rocket = useFetch<Launch>({ url : launch.data ? `${endpoints.rockets}/${launch.data.rocket}` : null})
    const launchpad = useFetch<Launchpad>({ url: launch.data ? `${endpoints.launchpads}/${launch.data.launchpad}` : null})

   const { data: payloads, loading: payloadLoading, error: payloadError } = usePayloads(launch.data?.payloads)


    if(launch.loading) return <LaunchDetailsSkeleton />
    if(launch.error || !launch.data) return (
        <div role="alert" className="p-4 border rounded">
            <p className="mb-2">Failed to load launch.</p>
            <Link className="text-blue-600 underline" to="/">Back</Link>
        </div>
    )

    const l = launch.data

    return (
        <div className="grid gap-4">
            <Link to="/" className="text-blue-600 underline">← Back</Link>
            <h1 className="text-2xl font-semibold">{l.name}</h1>
            <div className="text-gray-700">{formatLocalDate(l.date_utc)}</div>
            {l.details && <p>{l.details}</p>}

            <section>
                <h2 className="font-semibold mb-1">Rocket</h2>
                {rocket.loading ? <div>Loading rocket...</div> : 
                    rocket.error ? <p role="alert">Failed to load rocket...</p> :
                    rocket.data ? <p>{rocket.data.name}</p> : null
                }
            </section>

            <section>
                <h2 className="font-semibold mb-1">Launchpad</h2>
                {launchpad.loading ? <div>Loading launchpad...</div> : 
                    launchpad.error ? <p role="alert">Failed to load launchpad</p> :
                    launchpad.data ? <p>{launchpad.data.name} - {launchpad.data.locality}, {launchpad.data.region}</p> : null
                }
            </section>

            <section>
                <h2 className="font-semibold mb-2">Payloads</h2>
                {payloadLoading && <div>Loading payloads...</div>}
                {payloadError && <p role="alert">Failed to load payloads...</p>}
                {!payloadLoading && !payloadError && <PayloadTable items={payloads}/>}
            </section>
        </div>
    )
}