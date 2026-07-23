export default function GenreList({ genres = [] }) {
    if (!genres || genres.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
                const genreId = typeof genre === 'object' ? genre.id : genre;
                const genreName = typeof genre === 'object' ? genre.name : genre;

                return (
                    <span 
                        key={genreId} 
                        className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-full text-xs font-semibold tracking-wide"
                    >
                        {genreName}
                    </span>
                );
            })}
        </div>
    );
}
