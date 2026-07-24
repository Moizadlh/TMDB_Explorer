import { useNavigate } from 'react-router-dom';

import { StarIcon } from '@/components/icons';

import { formatDecimal, getReleaseYear, getImageUrl } from '@/utils/index';

export default function MovieCard({ movie = null, tvShow = null }) {
    const navigate = useNavigate();
    const imageUrl = movie ? getImageUrl(movie?.poster_path) : getImageUrl(tvShow?.poster_path);
    const releaseYear = movie ? getReleaseYear(movie?.release_date) : getReleaseYear(tvShow?.first_air_date);

    return (
        <div 
            onClick={() => movie ? (navigate(`/movie/${movie?.id}`)) : ("")}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] flex flex-col h-full cursor-pointer"
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                    src={imageUrl}
                    alt={movie ? movie?.title : tvShow?.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
                
                <div className="absolute top-3 right-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{movie ? (formatDecimal(movie?.vote_average, 1)) : (formatDecimal(tvShow?.vote_average, 1)) }</span>
                </div>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white line-clamp-1 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {movie ? movie?.title : tvShow?.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-auto">
                    {releaseYear}
                </p>
            </div>
        </div>
    );
}
