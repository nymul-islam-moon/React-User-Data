import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <Link to="#/" className="nav-link">
                Home
            </Link>
            <Link to="#/users" >
                Users
            </Link>
            <Link to="#/add-user" >
                Add User
            </Link>
        </nav>
    )
}