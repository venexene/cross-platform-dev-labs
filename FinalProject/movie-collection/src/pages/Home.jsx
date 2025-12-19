import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";


export default function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");


    useEffect(() => {
        if (loading) return;

        setLoading(true);

        const request = query
            ? searchMovies(query, page)
            : getPopularMovies(page);

        request
            .then(res => {
                setMovies(prev => {
                    if (page === 1) {
                        return res.data.results;
                    }
                    return [...prev, ...res.data.results];
                });
            })
            .catch(error => {
                console.error("Ошибка загрузки фильмов:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [page, query]);


    useEffect(() => {
        const handleScroll = () => {
            const scrollBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300;


            if (scrollBottom && !loading) {
                setPage(prev => prev + 1);
            }
        };


        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);


    const handleSearch = (e) => {
        setQuery(e.target.value);
        setPage(1);
        setMovies([]);
    };


    return (
        <div>
            <h1>Фильмы</h1>


            <input
                type="text"
                placeholder="Поиск фильма..."
                value={query}
                onChange={handleSearch}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                }}
            />


            <MovieList movies={movies} />
            {loading && <p style={{ textAlign: "center" }}>Загрузка...</p>}
        </div>
    );
}
