import { useCallback , useMemo , useEffect , useRef } from "react"
import LaunchCard from "./LaunchCard"
import LaunchSkeleton from "./LaunchSkeleton"
import LaunchFilters from "./LaunchFilters"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useLaunches } from "../hooks/useLaunches"
import { useSearchParams } from "react-router-dom"

function parseParams(sp: URLSearchParams) {
    return {
        query: sp.get('query') ?? '',
        year: (sp.get('year') ?? 'all') as 'all' | string,
        status: (sp.get('status') ?? 'all') as 'all' | 'success' | 'failed',
        sort: (sp.get('sort') ?? 'newest') as 'newest' | 'oldest',
        page: Math.max(1 , Number(sp.get('page') ?? '1'))
    }
}

export default function LaunchList() {
    const {items , loading ,error , page , totalPages , setPage , years , filters ,setFilters } = useLaunches(12)
    const [favorites , setFavorites] = useLocalStorage<string[]>('favorites' , [])
    const favSet = useMemo(() => new Set(favorites) , [favorites])

    const [searchParams ,setSearchParams] = useSearchParams()
    const didInit = useRef(false)

    //initialize from URL once
    useEffect(() => {
        if (didInit.current) return
        didInit.current =  true
        const p = parseParams(searchParams)
        setFilters({ query: p.query, year: p.year, status: p.status , sort: p.sort})
    }, [searchParams , setFilters , setPage])

    //whenever filters/page change, write them to the URL
    useEffect(() => {
        const p = new URLSearchParams()
        if (filters.query) p.set('query' , filters.query)
        if (filters.year !== 'all') p.set('year', filters.year)
        if (filters.status !== 'all') p.set('status' , filters.status)
        if (filters.sort !== 'newest') p.set('sort' , filters.sort)
        if (page !== 1) p.set('page' , String(page))
        setSearchParams(p , { replace: true})
    }, [filters, page ,setSearchParams])

    const toggleFav = useCallback((id: string) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev ,id])
    }, [setFavorites])

    if (error) return (
        <div role="alert" className="flex flex-col items-center justify-center text-center p-8 bg-red-50  border border-red-200 rounded-lg shadow-sm">
            <p className="text-red-700 text-lg mb-3">Failed to load launches.</p>
            <button className="px-5 py-2 rounded-md bg-black text-white font-medium hover:bg-gray-700 transition" onClick={() => location.reload()}>Retry</button>
        </div>
    )
    return (
        <section>
            <LaunchFilters 
                years={years}
                filters={filters}
                onChange={(patch) => { setFilters({ ...filters , ...patch }); setPage(1) }}
            />

            {loading ? (
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-6">
                    {Array.from({length:12}).map((_,i) => <LaunchSkeleton key={i}/>)}
                </div>
            ) : (
                <>
                {items.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p>Opps! No Launches Found</p>
                        <p>Try adjusting your filters or search query.</p>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-6">
                        {items.map(l => (
                            <LaunchCard 
                                key={l.id}
                                launch={l}
                                isFavorite={favSet.has(l.id)}
                                onToggleFavorite={toggleFav}
                            />
                        ))}
                    </div>
                )}
               
               {items.length > 0 && (
                     <nav aria-label="pagination" className="flex gap-2 justify-center mt-4  ">
                    <button disabled={page===1} className="bg-gray-50 rounded-md px-2 py-1 disabled:opacity-50 hover:bg-black hover:text-white" onClick={() => setPage(1)}>First</button>
                    <button disabled={page===1} className="bg-gray-50 rounded-md px-2 py-1 disabled:opacity-50 hover:bg-black hover:text-white" onClick={() => setPage(1)}>← Back</button>
                    <span className="px-2 py-1">Page {page} / {totalPages}</span>
                    <button disabled={page===totalPages} className="bg-gray-100 rounded-md px-2 py-1 disabled:opacity-50 hover:bg-black hover:text-white" onClick={() => setPage(page+1)}>Next →</button>
                    <button disabled={page===totalPages} className="bg-gray-100 rounded-md px-2 py-1 disabled:opacity-50 hover:bg-black hover:text-white" onClick={() => setPage(totalPages)}>Last</button>
                </nav>
               )}  
             </>
            )}
        </section>
    )
}