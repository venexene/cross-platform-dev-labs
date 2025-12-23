import { Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

export default function MovieCard({ movie }) {
    const { addToCollection, removeFromCollection, isSaved } = useMovies();
    const saved = isSaved(movie.id);

    const handleClick = (e) => {
        e.stopPropagation();

        if (saved) {
            removeFromCollection(movie.id);
        } else {
            addToCollection(movie);
        }
    };

    return (
        <div className="card">
            <Link
                to={`/movie/${movie.id}`}
                className="card-link"
            >
                <div className="card-img-container">
                    <img
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={movie.title}
                    />
                </div>

                <div className="card-content">
                    <h3>{movie.title}</h3>
                    <p>⭐ {movie.vote_average}</p>
                </div>
            </Link>

            <button onClick={handleClick}>
                {saved ? "Удалить" : "Добавить"}
            </button>
        </div>
    );
}
