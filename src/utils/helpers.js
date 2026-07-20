import movieImagePlaceholder from "../assets/images/movie-image-placeholder.jpg";

export const formatRuntime = (runtime) => {
    if (!runtime) return '0m';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
};

export const getReleaseYear = (dateString) => {
    return dateString ? new Date(dateString).getFullYear() : 'Unknown';
};

export const getImageUrl = (imagePath, size = 'w500') => {
    return imagePath ? `https://image.tmdb.org/t/p/${size}${imagePath}` : movieImagePlaceholder;
};
