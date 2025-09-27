import { useCallback , useMemo } from "react"
import LaunchCard from "./LaunchCard"
import LaunchSkeleton from "./LaunchSkeleton"
import LaunchFilters from "./LaunchFilters"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useLaunches } from "../hooks/useLaunches"

export default function LaunchList() {
    const {items , loading ,error , page , totalPages , setPage , years , filters ,setFilters } = useLaunches(12)
    const [favorites , setFavorites] = useLocalStorage<string[]>('favorites' , [])
    const favSet = useMemo(() => new Set(favorites) , [favorites])

    const toggleFav = useCallback((id: string) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav ! == id) : [...prev ,id])
    }, [setFavorites])

    if (error) return (
        <div role="alert">
            <p>Failed to load launches.</p>
            <button onClick={() => location.reload()}>Retry</button>
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
                <div>
                    {Array.from({length:12}).map((_,i) => <LaunchSkeleton key={i}/>)}
                </div>
            ) : (
                <>
                <div>
                    {items.map(l => (
                        <LaunchCard 
                            key={l.id}
                            launch={l}
                            isFavorite={favSet.has(l.id)}
                            onToggleFavorite={toggleFav}
                        />
                    ))}
                </div>

                <nav aria-label="pagination">
                    <button disabled={page===1} onClick={() => setPage(1)}>First</button>
                    <button disabled={page===1} onClick={() => setPage(1)}>First</button>
                    <span>Page {page} / {totalPages}</span>
                    <button disabled={page===totalPages} onClick={() => setPage(page+1)}>Next</button>
                    <button disabled={page===totalPages} onClick={() => setPage(totalPages)}>Last</button>

                </nav>
             
                </>
            )}
        </section>
    )
}