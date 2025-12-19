const KEY = "my_movies";


export const getCollection = () =>
JSON.parse(localStorage.getItem(KEY)) || [];


export const saveMovie = (movie) => {
const movies = getCollection();
if (!movies.find(m => m.id === movie.id)) {
localStorage.setItem(KEY, JSON.stringify([...movies, movie]));
}
};


export const removeMovie = (id) => {
const movies = getCollection().filter(m => m.id !== id);
localStorage.setItem(KEY, JSON.stringify(movies));
};