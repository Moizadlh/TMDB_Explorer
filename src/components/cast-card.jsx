export default function CastCard({ actor }) {
    return (
        <div className="snap-start flex-shrink-0 w-32 md:w-36 group">
            <div className="rounded-xl overflow-hidden mb-3 aspect-[2/3] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-indigo-500/30 transition-colors">
                {actor?.profile_path ? (
                    <img 
                        src={`https://image.tmdb.org/t/p/w185${actor?.profile_path}`} 
                        alt={actor?.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-700">
                        No Image
                    </div>
                )}
            </div>
            <h4 className="text-slate-900 dark:text-white font-semibold text-sm truncate">{actor?.name}</h4>
            <p className="text-slate-600 dark:text-slate-500 text-xs truncate mt-0.5">{actor?.character}</p>
        </div>
    );
}
