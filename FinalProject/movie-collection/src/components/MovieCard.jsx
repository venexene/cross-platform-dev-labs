import { saveMovie, removeMovie, getCollection } from "../utils/storage";
import { useState, useEffect } from "react";

export default function MovieCard({ movie }) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const collection = getCollection();
        setSaved(collection.some(m => m.id === movie.id));
    }, [movie]);

    const handleClick = () => {
        if (saved) {
            removeMovie(movie.id);
            setSaved(false);
        } else {
            saveMovie(movie);
            setSaved(true);
        }
    };

    return (
        <div className="card">
            <div className="card-img-container">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                    alt={movie.title}
                />
            </div>
            <div className="card-content">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
            </div>
            <button onClick={handleClick}>{saved ? "Удалить" : "Добавить"}</button>
        </div>
    );
}