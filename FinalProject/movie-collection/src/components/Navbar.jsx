import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav>
            <Link to="/">Фильмы</Link>
            <Link to="/collection">Моя коллекция</Link>
        </nav>
    );
}