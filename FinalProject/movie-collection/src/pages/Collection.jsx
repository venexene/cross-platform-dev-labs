import { useEffect, useState } from "react";
import { getCollection } from "../utils/storage";
import MovieList from "../components/MovieList";


export default function Collection() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        setMovies(getCollection());
    }, []);


    return (
        <div>
            <h1>Моя коллекция</h1>
            <MovieList movies={movies} saved />
        </div>
    );
}