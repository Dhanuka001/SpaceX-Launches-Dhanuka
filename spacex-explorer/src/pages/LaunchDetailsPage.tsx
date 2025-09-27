import { useParams , Link} from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { endpoints } from '../api/spacex'
import type { Launch , Rocket , Launchpad , Payload } from '../types/spacex'
import LaunchSkeleton from '../components/LaunchSkeleton'
import PayloadTable from '../components/PayloadTable'
import { formatLocalDate } from '../utils/format'

export default function LaunchDetailsPage() {
    const { id } = useParams()
    const launch = useFetch<Launch>({ url : id ? `${endpoints.launches}/${id}` : null})

    const rocket = useFetch<Launch>({ url : launch.data ? `${endpoints.rockets}/${launch.data.rocket}` : null})
    const launchpad = useFetch<Launchpad>({ url: launch.data ? `${endpoints.launchpads}/${launch.data.launchpad}` : null})

    // fetch payloads individually
    const payloadResults = (launch.data?.payloads ?? []).map(pid =>
        useFetch<Payload>({ url: `${endpoints.payloads}/${pid}` })
    )

    const payloadLoading = payloadResults.some(r => r.loading)
    const payloadError = payloadResults.find(r => r.error)?.error
    const payloads = payloadResults.map(r => r.data).filter(Boolean) as Payload[]

    if(launch.loading) return <LaunchSkeleton />
    if(launch.error || !launch.data) return (
        <div role="alert">
            <p>Failed to load launch.</p>
            <Link to="/">Back</Link>
        </div>
    )

    const l = launch.data

    return (
        <div>
            <Link to="/">← Back</Link>
            <h1>{l.name}</h1>
            <div>{formatLocalDate(l.date_utc)}</div>
            {l.details && <p>{l.details}</p>}

            <section>
                <h2>Rocket</h2>
                {rocket.loading ? <div>Loading rocket...</div> : 
                    rocket.error ? <p role="alert">Failed to load rocket...</p> :
                    rocket.data ? <p>{rocket.data.name}</p> : null
                }
            </section>

            <section>
                <h2>Launchpad</h2>
                {launchpad.loading ? <div>Loading launchpad...</div> : 
                    launchpad.error ? <p role="alert">Failed to load launchpad</p> :
                    launchpad.data ? <p>{launchpad.data.name} - {launchpad.data.locality}, {launchpad.data.region}</p> : null
                }
            </section>

            <section>
                <h2>Payloads</h2>
                {payloadLoading && <div>Loading payloads...</div>}
                {payloadError && <p role="alert">Failed to load payloads...</p>}
                {!payloadLoading && !payloadError && <PayloadTable items={payloads}/>}
            </section>
        </div>
    )
}