import { Link , Outlet} from 'react-router-dom'

export default function Shell () {
    return (
        <div className='min-h-screen bg-white text-gray-900'>
            <header className='border-b'>
                <div className='max-w-5xl mx-auto px-4 py-4 flex gap-4'>
                    <Link className="font-semibold" to="/">Launches</Link>
                    <Link className="font-semibold" to="/favorites">Favorites</Link>
                </div>
            </header>
            <main className='max-w-5xl mx-auto px-4 py-6'>
                <Outlet/>
            </main>
        </div>
    )
}