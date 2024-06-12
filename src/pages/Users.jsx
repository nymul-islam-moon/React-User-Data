import React from 'react';
import User from "../components/User";
import useFetch from "../components/HOOKS/useFetch";
import useDeleteData from "../components/HOOKS/useDeleteData";

const Users = () => {

    const url = `${appLocalizer.apiUrl}/rud/v1/users`;

    const { fetchData, data, isLoading, error } = useFetch(url);

    const { deleteData, isDeleting, deleteError } = useDeleteData(url);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteData(id);
            // Reload users or remove the user from the state
            fetchData();
            // window.location.reload(); // Simplest way to reload the data, but can be optimized
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="wp-heading-inline">Users</h1>
                <a href="#/add-user" className="page-title-action btn btn-primary" data-toggle="modal" data-target="#addUserModal">Add New</a>
            </div>
            <div>
                <table className="wp-list-table widefat fixed striped" id="user-table">
                    <thead>
                        <tr>
                            <td id="cb" className="manage-column column-cb check-column">
                                <input type="checkbox"/>
                            </td>
                            <th className="manage-column column-name">Name</th>
                            <th className="manage-column column-email">Email</th>
                            <th className="manage-column column-phone">Phone</th>
                            <th className="manage-column column-address">Address</th>
                            <th className="manage-column column-address">Date</th>
                            <th className="manage-column column-actions">Actions</th>
                        </tr>
                    </thead>
                    { isLoading && `Loading..` }
                    <tbody>
                    { data && data.map((user) => {
                        return <User {...user} key={user.id} handleDelete={handleDelete}/>
                    }) }
                    </tbody>
                </table>
                { isDeleting && <div>Deleting user...</div> }
                { deleteError && <div>Error deleting user: {deleteError.message}</div> }
            </div>
        </React.Fragment>
    );
}

export default Users;
