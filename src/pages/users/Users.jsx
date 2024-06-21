import {useEffect, useState} from "react";
import {deleteUser, setUsers} from "../../fetaures/users/UsersSlice";
import useFetch from "../../hooks/useFetch";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/Table/Table";
const Users = () => {
    const url = `${appLocalizer.apiUrl}/rud/v1/users`;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const { data, isLoading, error, headers } = useFetch(url, currentPage);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer.users);
    const [ currentData, setCurrentData ] = useState(0);
    const userColumns = ['Name', 'Email', 'Phone', 'Address', 'Date'];

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
            setCurrentData( ( ( currentPage - 1 ) * 10 ) + data.length);
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (headers) {
            setTotalUsers(parseInt(headers['x-wp-total'], 10));
            setTotalPages(parseInt(headers['x-wp-totalpages'], 10));
            setPerPage(parseInt(headers['x-wp-perpage'], 10));
        }
    }, [headers]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
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
                    columns={userColumns}
                    data={users}
                    currentData={currentData}
                    totalData={totalUsers}
                    isLoading={isLoading}
                    totalPages={totalPages}
                    perPage={perPage}
                    currentPage={currentPage}
                    handleCurrentPage={handleCurrentPage}
                    handleDelete={handleDelete}
                />
            )}
        </>
    );
};

export default Users;