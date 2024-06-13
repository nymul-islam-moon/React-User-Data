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
        <div className="wrap">
            <h1 className="wp-heading-inline">Users</h1>
            <Link to="/add-users" className="page-title-action" >
                Add User
            </Link>
            <hr className="wp-header-end" />
                <table className="wp-list-table widefat fixed striped">
                    <thead>
                    <tr>
                        <td id="cb" className="manage-column column-cb check-column">
                            <input type="checkbox" />
                        </td>
                        <th scope="col" className="manage-column column-name">Name</th>
                        <th scope="col" className="manage-column column-email">Email</th>
                        <th scope="col" className="manage-column column-phone">Phone</th>
                        <th scope="col" className="manage-column column-address">Address</th>
                        <th scope="col" className="manage-column column-date">Date</th>
                        <th scope="col" className="manage-column column-actions">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { users && users.map((user) => {
                        const {id, name, email, phone, address} = user;
                        return <tr>
                            <th scope="row" className="check-column">
                                <input type="checkbox" value={user.id}/>
                            </th>
                            <td className="column-name">{ user.name }</td>
                            <td className="column-email">{ user.email }</td>
                            <td className="column-phone">{ user.phone }</td>
                            <td className="column-address">{ user.address }</td>
                            <td className="column-date">2024-05-30</td>
                            <td className="column-actions">
                        <span className="actions">
                            <Link to="/edit-user" state={{id, name, email, phone, address}}>
                                <button className="edit">Edit</button>
                            </Link>
                             | <button onClick={() => {
                            handleDelete(id)
                        }} className="delete">Delete</button>
                        </span>
                            </td>
                        </tr>
                    })}

                    </tbody>
                </table>
        </div>
    )
}

export default ListUsers;