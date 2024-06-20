import {useEffect} from "react";
import {deleteUser, setUsers} from "../../fetaures/users/UsersSlice";
import useFetch from "../../hooks/useFetch";
import {useDispatch, useSelector} from "react-redux";
import Table from "../../components/Table";
const Users = () => {

    const url = `${appLocalizer.apiUrl}/rud/v1/users`;
    const { data, isLoading, error } = useFetch(url);
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.usersReducer);
    const userColumns = ['Name', 'Email', 'Phone', 'Address', 'Date'];

    useEffect(() => {
        if (data) {
            dispatch(setUsers(data));
        }
    }, [data, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    return <>
        {error && <p>Error: {error.message}</p>}
        { !error && users && (
            <Table
                title="User"
                columns={userColumns}
                data={users}
                isLoading={isLoading}
                error={error}
                url={url}
                handleDelete={handleDelete}
            />
        )}
    </>
}

export default Users;