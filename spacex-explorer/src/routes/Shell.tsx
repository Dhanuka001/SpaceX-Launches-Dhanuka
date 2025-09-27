import { Link , Outlet} from 'react-router-dom'

export default function Shell () {
    return (
        <div className='min-h-screen bg-white text-gray-900 flex flex-col'>
            <header className='sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm'>
                <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
                    {/* logo */}
                    <Link to="/" className="flex items-center gap-1 group">
                        <span className="w-2 h-2 bg-black rounded-full group-hover:bg-gray-700"></span>
                        <span className="w-2 h-2 bg-black rounded-full group-hover:bg-gray-700"></span>
                        <span className="w-2 h-2 bg-black rounded-full group-hover:bg-gray-700"></span>
                    </Link>
                    {/* nav links */}
                    <nav className='flex gap-6'>
                        <Link className="font-medium text-gray-700 hover:text-black transition-color" to="/">Launches</Link>
                        <Link className="font-medium text-gray-700 hover:text-black transition-colors" to="/favorites">Favorites</Link>
                    </nav>
                   
                </div>
            </header>

            <main className='max-w-5xl mx-auto px-4 py-8'>
                <Outlet/>
            </main>
        </div>
    )
}