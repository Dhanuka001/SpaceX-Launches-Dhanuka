import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Shell from './Shell'
import HomePage from '../pages/HomePage'
import LaunchDetailsPage from '../pages/LaunchDetailsPage'
import FavoritesPage from '../pages/FavoritesPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Shell/>,
        children: [
            {index: true , element: <HomePage />},
            {path: 'launch/:id' , element: <LaunchDetailsPage/>},
            {path: 'favorites' , element: <FavoritesPage />},
        ],
    },
])

export default function AppRoutes() {
    return <RouterProvider router={router} />
}