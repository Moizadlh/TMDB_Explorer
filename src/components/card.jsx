import { StarIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import movieImagePlaceholder from "../assets/movie-image-placeholder.jpg"

export default function Card({ movie }) {
    const navigate = useNavigate();

    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : movieImagePlaceholder;

    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'Unknown';

    return (
        <div 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] flex flex-col h-full cursor-pointer"
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-slate-950">
                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-700/50 flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm md:text-base font-bold text-white line-clamp-1 mb-1 group-hover:text-indigo-400 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-xs text-slate-400 mt-auto">
                    {releaseYear}
                </p>
            </div>
        </div>
    );
}
