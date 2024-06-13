import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <Link to="/" className="nav-link">
                Home
            </Link>
            <Link to="/list-users" >
                Users
            </Link>
        </nav>
    )
}

export default NavBar;