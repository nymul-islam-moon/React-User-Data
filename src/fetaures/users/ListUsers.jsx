import { useDispatch, useSelector } from "react-redux";
import {deleteUser, setError, setUsers, updateLoadingState} from "./UsersSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../layouts/Pagination";

const ListUsers = () => {
    const dispatch = useDispatch();
    const url = `${appLocalizer.apiUrl}/rud/v1/users`;
    const { users, isLoading, error } = useSelector((state) => state.usersReducer);

    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(10); // Assuming 10 users per page initially
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {

            try {
                dispatch(updateLoadingState(true))
                const response = await axios.get(`${url}?page=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                const headers = response.headers;
                setTotalData(parseInt(headers['x-wp-total'], 10));
                setTotalPage(parseInt(headers['x-wp-totalpages'], 10));
                dispatch(setUsers(response.data));
                dispatch(updateLoadingState(false))
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(setError(error))
                dispatch(updateLoadingState(false))
            }
        };
        fetchData();
    }, [dispatch, currentPage]);

    const handleDelete = (id) => {
        const deleteUrl = `${url}/${id}`;
        if (window.confirm('Are you sure you want to delete this user?')) {
            const deleteData = async () => {
                try {
                    await axios.delete(deleteUrl, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': appLocalizer.nonce,
                        },
                    });
                    dispatch(deleteUser(id));
                    setTotalData(totalData - 1);
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            };
            deleteData();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    console.log(error)

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">Users</h1>
            <Link to="/add-users" className="page-title-action">
                Add User
            </Link>
            <div className="tablenav top">
                <div className="alignleft actions bulkactions">
                    <label htmlFor="bulk-action-selector-top" className="screen-reader-text">Select bulk action</label>
                    <select name="action" id="bulk-action-selector-top">
                        <option value="-1">Bulk actions</option>
                        <option value="edit" className="hide-if-no-js">Edit</option>
                        <option value="trash">Move to Trash</option>
                    </select>
                    <input type="submit" id="doaction" className="button action" value="Apply" />
                </div>
                <div className="alignleft actions">
                    <label htmlFor="filter-by-date" className="screen-reader-text">Filter by date</label>
                    <select name="m" id="filter-by-date">
                        <option value="0">All dates</option>
                        <option value="202406">June 2024</option>
                    </select>
                    <label className="screen-reader-text" htmlFor="cat">Filter by category</label>
                    <select name="cat" id="cat" className="postform">
                        <option value="0">All Categories</option>
                        <option className="level-0" value="1">Uncategorized</option>
                    </select>
                    <input type="submit" name="filter_action" id="post-query-submit" className="button" value="Filter" />
                </div>
                <div className="tablenav-pages one-page">
                    <span className="displaying-num">Total Users {totalData}</span>
                </div>
                <br className="clear" />
            </div>
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

                {isLoading && (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                            Loading...
                        </td>
                    </tr>
                )}


                {!isLoading && users.length === 0 && (
                    <tr>
                        <td colSpan="7" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em'}}>
                            No Data Found
                        </td>
                    </tr>
                )}

                {!isLoading && users && users.map((user) => {
                    const {id, name, email, phone, address} = user;
                    return (
                        <tr key={id}>
                            <th scope="row" className="check-column">
                                <input type="checkbox" value={id} />
                            </th>
                            <td className="column-name">{name}</td>
                            <td className="column-email">{email}</td>
                            <td className="column-phone">{phone}</td>
                            <td className="column-address">{address}</td>
                            <td className="column-date">2024-05-30</td>
                            <td className="column-actions">
                                    <span className="actions">
                                        <Link to="/edit-user" state={{ id, name, email, phone, address }}>
                                            <button className="edit">Edit</button>
                                        </Link>
                                        |
                                        <button onClick={() => handleDelete(id)} className="delete">Delete</button>
                                    </span>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {totalData > 10 && (
                <Pagination
                    currentPage={currentPage}
                    totalPage={totalPage}
                    prePage={handlePreviousPage}
                    nextPage={handleNextPage}
                />
            )}
        </div>
    );
};

export default ListUsers;
