import {useEffect, useState} from "react";
import {deleteUser, setUsers} from "../../fetaures/users/UsersSlice";
import useFetch from "../../hooks/useFetch";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/Table/Table";
import useDelete from "../../hooks/useDelete";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
    const url = `${appLocalizer.apiUrl}/rud/v1/users`;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const { data, isLoading, error, headers, fetchData } = useFetch(url, currentPage);
    const { deleteItem, isDeleteLoading, deleteError } = useDelete(url);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer.users);
    const [ currentData, setCurrentData ] = useState(0);
    const [ addActionLink, setAddActionLink ] = useState('/create-users');
    const [ editActionLink, setEditActionLink ] = useState('/edit-users');
    const userColumns = {'Name': 'name', 'Email': 'email', 'Phone': 'phone', 'Address': 'address', 'Date': 'date'};

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
            setCurrentData( ( ( currentPage - 1 ) * 10 ) + data.length);
            console.log('data fetched');
        }
        // console.log(currentPage);
    }, [data, totalUsers, currentPage]); // if any error found add dispatch here

    useEffect(() => {
        if (headers) {
            setTotalUsers(parseInt(headers['x-wp-total'], 10));
            setTotalPages(parseInt(headers['x-wp-totalpages'], 10));
            setPerPage(parseInt(headers['x-wp-perpage'], 10));
        }
    }, [headers]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const result = await deleteItem(id);
            console.log(result);
            if (result) {
                dispatch(deleteUser(id));

                const remainder = totalUsers % perPage;

                if (remainder === 1 && currentPage > 1) {

                    setCurrentPage(currentPage - 1);
                } else {
                    await fetchData(); // Re-fetch data after delete
                }
                toast.error( result.previous.name + ' has deleted successfully');
            } else {
                toast.error('Data not found');
                // await fetchData();
            }
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
                    addActionLink={addActionLink}
                    editActionLink={editActionLink}
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
                />
            )}
            <ToastContainer />
        </>
    );
};

export default Users;