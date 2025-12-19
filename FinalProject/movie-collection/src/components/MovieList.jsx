import MovieCard from "./MovieCard";


export default function MovieList({ movies, saved }) {
    return (
        <div className="grid">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    isSaved={saved}
                />
            ))}
        </div>
    );
}