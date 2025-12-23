import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import MovieDetails from "./pages/MovieDetails";
import { MovieProvider } from "./context/MovieContext";

export default function App() {
    return (
        <BrowserRouter>
            <MovieProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </MovieProvider>
        </BrowserRouter>
    );
}
