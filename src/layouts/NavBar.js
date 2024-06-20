import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <Link to="/" className="nav-link">
                Home
            </Link>
            <Link to="/list-users" className="nav-link">
                Users
            </Link>
            <Link to="/books" className="nav-link">
                Books
            </Link>

            <Link to="/new-users" className="nav-link">
                New Users
            </Link>
        </nav>
    )
}

export default NavBar;