import { useEffect, useState } from "react"
import { endpoints } from "../api/spacex"
import type { Payload } from "../types/spacex"

export function usePayloads(ids: string[] | undefined) {
  const [data, setData] = useState<Payload[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!ids?.length) {
      setData([])
      return
    }

    let active = true
    setLoading(true)
    setError(null)

    Promise.all(ids.map(id =>
      fetch(`${endpoints.payloads}/${id}`).then(res => res.json())
    ))
      .then(res => { if (active) setData(res) })
      .catch(e => { if (active) setError(e) })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [ids])

  return { data, loading, error }
}
