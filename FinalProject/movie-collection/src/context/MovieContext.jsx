import { createContext, useContext, useEffect, useState } from "react";
import {
    getCollection,
    saveMovie,
    removeMovie,
} from "../utils/storage";

const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        setCollection(getCollection());
    }, []);

    const addToCollection = (movie) => {
        saveMovie(movie);
        setCollection(getCollection());
    };

    const removeFromCollection = (id) => {
        removeMovie(id);
        setCollection(getCollection());
    };

    const isSaved = (id) => {
        return collection.some(movie => movie.id === id);
    };

    return (
        <MovieContext.Provider
            value={{
                collection,
                addToCollection,
                removeFromCollection,
                isSaved,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export function useMovies() {
    return useContext(MovieContext);
}
