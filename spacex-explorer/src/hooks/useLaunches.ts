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

    return { loading ,  error , filters , setFilters , page , setPage , all: data ?? [] }
}
    
