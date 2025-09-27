import LaunchList from "../components/LaunchList"

export default function HomePage() {
    return (
        <div>
            <section className="text-center py-10">
                 <h1 className="font-heading text-4xl font-bold mb-3 animate-pulse tracking-tight">SpaceX Launches Explorer</h1>
                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover all SpaceX launches — past, present, and future.
                    Filter by year, mission success, and mark your favorites to follow them easily.
                 </p>
            </section>
           
            <LaunchList/>
        </div>
    )
}