import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link to="/">Go back home</Link>
        </div>
    );
}