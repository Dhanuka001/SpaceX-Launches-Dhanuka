import { Link } from "react-router-dom"
import { formatLocalDate } from "../utils/format"
import type { Launch } from "../types/spacex"
import { FaRegStar , FaStar } from "react-icons/fa"


type Props = {
    launch: Launch;
    isFavorite: boolean;
    onToggleFavorite: (id : string) => void
}
export default function LaunchCard({launch , isFavorite , onToggleFavorite }: Props) {

    return (
        <Link
            to={`/launch/${launch.id}`}
            className="border border-gray-300 rounded-xl p-4 flex flex-col gap-2 min-w-[300px] transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
            <header className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">
                    <Link to={`/launch/${launch.id}`} className="hover:underline">{launch.name}</Link>
                </h3>

                <button
                    aria-label={isFavorite ? 'Unfavorite launch' : 'Favorite Launch'}
                    onClick={() => onToggleFavorite(launch.id)}
                    className={`
                        hover:bg-yellow-100
                        focus:outline-none  focus:rind-yellow-400
                        ${isFavorite ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-300'}
                        `}
                >
                    {isFavorite ? (
                        <FaStar className="text-yellow-500" size={20}/>
                    ) : (
                        <FaRegStar className="text-gray-400" size={20}/>
                    )}

                </button>  
            </header>

            <div className="text-sm text-gray-500">{formatLocalDate(launch.date_utc)}</div>

            <span className={`text-xs px-2 py-0.5 rounded-full w-max font-medium
                ${launch.success === true ? 'bg-green-100 text-green-600' : launch.success === false ? 'bg-red-100 text-red-600' : 'bg-gray-100'}`}>
                {launch.success === true ? 'Success' : launch.success === false ? 'Failed' : 'TBD'}
            </span>
       
        </Link>
    )
}