import {useEffect, useState} from "react";
import {deleteUser, setUsers} from "../../fetaures/users/UsersSlice";
import useFetch from "../../hooks/useFetch";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/Table/Table";
import useDelete from "../../hooks/useDelete";
import { toast } from 'react-toastify';
import {useLocation, useNavigate} from "react-router-dom";

const Users = () => {
    const location = useLocation(); // only for get the message
    const navigate = useNavigate(); // only for get the message
    const url = `${appLocalizer.apiUrl}/rud/v1/users`;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [ search, setSearch ] = useState(null);
    const [ filterStartDate, setFilterStartDate ] = useState(null);
    const [ filterEndDate, setFilterEndDate ] = useState(null);
    const { data, isLoading, error, headers, fetchData } = useFetch(url, currentPage, search, filterStartDate, filterEndDate);
    const { deleteItem, isDeleteLoading, deleteError } = useDelete(url);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer.users);
    const [ currentData, setCurrentData ] = useState(0);
    const userColumns = {'Name': 'name', 'Email': 'email', 'Phone': 'phone', 'Address': 'address', 'Date': 'date'};

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
            setCurrentData( ( ( currentPage - 1 ) * 10 ) + data.length);

            console.log('data fetched');
        }
        if (headers) {
            setTotalUsers(parseInt(headers['x-wp-total'], 10));
            setTotalPages(parseInt(headers['x-wp-totalpages'], 10));
            setPerPage(parseInt(headers['x-wp-perpage'], 10));
        }

        if (location.state?.message) {
            toast.success(location.state.message);
            // Clear the message after displaying it
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [data, dispatch, search]); // if any error found add dispatch here

    const handleDelete = async (ids) => {
        if (window.confirm('Are you sure you want to delete the selected users?')) {
            const response = await deleteItem(ids);

            if (response) {
                if (Array.isArray(ids)) {
                    ids.forEach(id => dispatch(deleteUser(id)));
                } else {
                    dispatch(deleteUser(ids));
                }

                const remainder = (totalUsers - (Array.isArray(ids) ? ids.length : 1)) % perPage;

                if (remainder === 0 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else {
                    await fetchData(); // Re-fetch data after delete
                }
                toast.error(response.message);
            } else {
                toast.error('Data not found');
            }
        }
    };

    const handleSearch = (data) => {
        setSearch(data);
    }

    const handleFilter = (start, end) => {
        if ( start ) {
            setFilterStartDate(start);
        }

        if (end) {
            setFilterEndDate(end);
        }
    }

    const handleBulkAction = async (data) => {
        if (data.action === 'trash') {
            await handleDelete(data.items);
        }
    };

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {error && <p>Error: {error.message}</p>}
            {!error && users && (
                <Table
                    title="Users"
                    addActionLink="/create-users"
                    editActionLink="/edit-users"
                    columns={userColumns}
                    data={users}
                    currentData={currentData}
                    totalData={totalUsers}
                    isLoading={isLoading}
                    totalPages={totalPages}
                    perPage={perPage}
                    currentPage={currentPage}
                    handleCurrentPage={handleCurrentPage}
                    isDeleteLoading={isDeleteLoading}
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    handleFilter={handleFilter}
                    handleBulkAction={handleBulkAction}
                />
            )}
        </>
    );
};

export default Users;