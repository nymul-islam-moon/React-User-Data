import {Link} from "react-router-dom";

const NavBar = () => {
    return <>
        <nav>
            <Link to="/" >Home</Link>
            <Link to="/list-users" >User List</Link>
            <Link to="/add-users" >Add User</Link>
        </nav>
    </>
}

export default NavBar;