import axios from "axios";


const API_KEY = "32684ec687435b955b3abd404aa2e171";


export const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: API_KEY,
        language: "ru-RU",
    },
});


export const getPopularMovies = (page = 1) =>
    tmdb.get("/movie/popular", {
        params: { page },
    });


export const searchMovies = (query, page = 1) =>
    tmdb.get("/search/movie", {
        params: { query, page },
    });