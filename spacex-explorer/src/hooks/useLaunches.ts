import { useCallback , useEffect , useMemo , useState } from "react";
import { useFetch } from "./useFetch";
import { endpoints } from "../api/spacex";
import type { Launch } from "../types/spacex";

export type Filters = {
    query: string
    year: string | 'all'
    status: 'all' | 'success' | 'failed'
    sort: 'newest' | 'oldest'
}

const DEFAULT: Filters = { query: '', year: 'all', status: 'all', sort: 'newest'}

export function useLaunches(pageSize = 12) {
    const { data , loading , error} = useFetch<Launch[]>({ url: endpoints.launches, cache: true})
    const [filters, setFilters] = useState<Filters>(DEFAULT)
    const [page, setPageState] = useState(1)

    const filtered = useMemo(() => {
        const launches = data ?? []
        return launches
            //Search filter
            .filter(launch => (
                filters.query ? launch.name.toLocaleLowerCase().includes(filters.query.toLocaleLowerCase()) : true
            ))
            // Year filter
            .filter(launch => (
                filters.year === 'all' 
                    ? true 
                    : new Date(launch.date_utc).getUTCFullYear().toString() === filters.year
                ))
            //Status filter
            .filter(launch => {
                if (filters.status === 'all') return true
                if (filters.status === 'success') return launch.success === true
                return launch.success === false
            })
            // sorting
            .sort((launchA ,launchB) => {
                const dateA = +new Date(launchA.date_utc)
                const dateB = +new Date(launchB.date_utc)

                return filters.sort === 'newest' ? dateB - dateA : dateA - dateB
            })
    },[data, filters])

    const totalPages = Math.max(1 , Math.ceil(filtered.length / pageSize))
     useEffect(() => {
        setPageState(prev => Math.min(Math.max(1 , prev) , totalPages))
    } , [totalPages])

    const setPage = useCallback((next: number | ((prev: number) => number)) => {
        setPageState(prev => {
            const candidate = typeof next === 'function' ? (next as (prev: number) => number)(prev) : next
            if (!Number.isFinite(candidate)) return prev
            const normalized = Math.round(candidate)
            return Math.min(totalPages , Math.max(1 , normalized))
        })
    } , [totalPages])
    const pageItems = useMemo(() => {
        const start  = (page - 1) * pageSize
        return filtered.slice(start , start + pageSize)
    } , [filtered , page , pageSize])

    const years = useMemo(() => {
        const s = new Set<string>()
        ;(data ?? []).forEach(l => s.add(new Date(l.date_utc).getUTCFullYear().toString()))
        return Array.from(s).sort((a, b) => Number(b) - Number(a))
    }, [data])

    return { loading ,  error , items: pageItems, page , totalPages , years , filters , setFilters , setPage , all: data ?? [] }
}
    
