import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export default function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCollection, removeFromCollection, isSaved } = useMovies();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const saved = isSaved(Number(id));

    useEffect(() => {
        setLoading(true);
        setError(null);

        getMovieDetails(id)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.error(err);
                setError("Не удалось загрузить фильм");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleSave = () => {
        if (!movie) return;

        if (saved) {
            removeFromCollection(movie.id);
        } else {
            addToCollection({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
            });
        }
    };

    if (loading) {
        return <p style={{ textAlign: "center" }}>Загрузка...</p>;
    }

    if (error) {
        return (
            <p style={{ textAlign: "center", color: "#ff6b6b" }}>
                {error}
            </p>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
            <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                    style={{
                        width: 300,
                        borderRadius: 12,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                />

                <div style={{ flex: 1, textAlign: "left" }}>
                    <h2>
                        {movie.title}
                        {movie.release_date
                            ? ` (${movie.release_date.slice(0, 4)})`
                            : ""}
                    </h2>

                    <p>⭐ {movie.vote_average}</p>

                    {movie.runtime && (
                        <p>
                            <strong>Длительность:</strong>{" "}
                            {movie.runtime} мин
                        </p>
                    )}

                    {movie.genres?.length > 0 && (
                        <p>
                            <strong>Жанры:</strong>{" "}
                            {movie.genres.map(g => g.name).join(", ")}
                        </p>
                    )}

                    <h3>Описание</h3>
                    <p style={{ lineHeight: 1.6 }}>
                        {movie.overview || "Описание отсутствует"}
                    </p>

                    <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                        <button onClick={() => navigate(-1)}>
                            ← Назад
                        </button>

                        <button onClick={handleSave}>
                            {saved
                                ? "Удалить из коллекции"
                                : "Добавить в коллекцию"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
