import { useLocalStorage } from "../hooks/useLocalStorage"
import { useFetch } from "../hooks/useFetch"
import { endpoints } from "../api/spacex"
import type { Launch } from "../types/spacex"
import LaunchCard from "../components/LaunchCard"
import FavoritesSkeleton from "../components/FavoritesSkeleton"

export default function() {
    const[favorites , setFavorites] = useLocalStorage<string[]>('favorites' , [])
    const { data , loading , error} = useFetch<Launch[]>({ url: endpoints.launches})
    const favSet =  new Set(favorites)
    const favItems = (data ??[]).filter(l => favSet.has(l.id))

    return (
    <div>
        <h1 className="text-xl font-semibold mb-3">Favorites</h1>
        {loading && <FavoritesSkeleton />}
        {error && <p role="alert">Failed to load favorites.</p>}
        {!loading && favItems.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {favItems.map(l => (
                    <LaunchCard 
                        key={l.id}
                        launch={l}
                        isFavorite={true}
                        onToggleFavorite={(id) => 
                            setFavorites(prev => prev.filter(x => x !== id))
                        }
                    />
                ))

                }
            </div>
        )}
    </div>
    )
}