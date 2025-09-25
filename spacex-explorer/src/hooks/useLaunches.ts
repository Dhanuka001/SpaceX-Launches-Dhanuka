import { useMemo , useState } from "react";
import { useFetch } from "./useFetch";
import { endpoints } from "../api/spacex";
import type { Launch } from "../types/spacex";

export type Filters = {
    q: string
    year: string | 'all'
    status: 'all' | 'success' | 'failed'
    sort: 'newest' | 'oldest'
}

const DEFAULT: Filters = { q: '', year: 'all', status: 'all', sort: 'newest'}

export function useLaunches(pageSize = 12) {
    const { data , loading , error} = useFetch<Launch[]>({ url: endpoints.launches, cache: true})
    const [filters, setFilters] = useState<Filters>(DEFAULT)
    const [page, setPage] = useState(1)

    const filtered = useMemo(() => {
        const list = data ?? []
        return list
            .filter(l => (filters.q ? l.name.toLocaleLowerCase().includes(filters.q.toLocaleLowerCase()) : true))
            .filter(l => (filters.year === 'all' ? true : new Date(l.date_utc).getUTCFullYear().toString() === filters.year))
            .filter(l => {
                if (filters.status === 'all') return true
                if (filters.status === 'success') return l.success === true
                return l.success === false
            })
            .sort((a ,b) => {
                const da = +new Date(a.date_utc)
                const db = +new Date(b.date_utc)

                return filters.sort === 'newest' ? db - da : da - db
            })
    },[data, filters])

    const totalPages = Math.max(1 , Math.ceil(filtered.length / pageSize))
    const pageItems = useMemo(() => {
        const start  = (page - 1) * pageSize
        return filtered.slice(start , start + pageSize)
    } , [filtered , page , pageSize])

    return { loading ,  error , filters , setFilters , page , setPage , all: data ?? [] }
}
    
