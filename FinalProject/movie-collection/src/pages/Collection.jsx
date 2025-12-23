import MovieList from "../components/MovieList";
import { useMovies } from "../context/MovieContext";

export default function Collection() {
    const { collection } = useMovies();

    return (
        <div>
            <h1>Моя коллекция</h1>

            {collection.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                    Коллекция пуста 🎬
                </p>
            ) : (
                <MovieList movies={collection} saved />
            )}
        </div>
    );
}
