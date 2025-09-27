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
        <article>
            <header>
                <h3>
                    <Link to={`/launch/${launch.id}`}>{launch.name}</Link>
                </h3>

                <button
                    aria-label={isFavorite ? 'Unfavorite launch' : 'Favorite Launch'}
                    onClick={() => onToggleFavorite(launch.id)}
                >
                    {isFavorite ? (
                        <FaStar color="gold" size={20}/>
                    ) : (
                        <FaRegStar color="gray" size={20}/>
                    )}

                </button>  
            </header>

            <div>{formatLocalDate(launch.date_utc)}</div>

            <span>
                {launch.success === true ? 'Success' : launch.success === false ? 'Failed' : 'TBD'}
            </span>
       
        </article>
    )
}