import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "./UsersSlice";
import {Link} from "react-router-dom";

const ListUsers = () => {

    const users = useSelector((state) =>  state.usersReducer.users);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    }

    return(
        <div>
            <h1>Users List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map((user) => {
                    const { id, name, email, phone, address } = user;
                    return <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{address}</td>
                        <td>
                            <Link to="/edit-user" state={{id, name, email, phone, address}}>
                                <button>Edit</button>
                            </Link>
                            <button onClick={ () => {handleDelete(id) }}>Delete</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListUsers;