import { useEffect , useRef , useState } from "react";

type CacheMap = Map<string, unknown>
const memoryCache: CacheMap = new Map()

type UseFetchOpts<T> = {
    url: string | null
    enabled?: boolean
    cache?: boolean
}

export function useFetch<T = unknown>({ url , enabled = true, cache = true}: UseFetchOpts<T>) {
    const [data ,setData] = useState<T | null>(null)
    const [error , setError] = useState<Error | null>(null)
    const [loading , setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)

    useEffect(() => {
        if(!enabled || !url) return
        let active = true

        const run  = async () => {
            setLoading(true); setError(null)

            //check cache first
            if (cache && memoryCache.has(url)) {
                const cached = memoryCache.get(url) as T
                if (active) { setData(cached); setLoading(false) }
                return
            }

            // cancel previous request
            abortRef.current?.abort()
            const controller = new AbortController()
            abortRef.current = controller

            try {
                const res =  await fetch(url , {signal : controller.signal})
                if(!res.ok) throw new Error(`HTTP ${res.status}`)
                const json = (await res.json()) as T
                if (!active) return
                if (cache) memoryCache.set(url, json)
                setData(json)
            } catch (e : any) {
                if (e.name === 'AbortError') return
                setError(e)
            } finally {
                if (active) setLoading(false)
            }
        }

        run()
        return () => { active = false; abortRef.current?.abort()}
    }, [url ,enabled , cache])

    return { data , error, loading }
}