import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "./UsersSlice";
import {useNavigate} from "react-router-dom";

const AddUsers = () => {

    const [name, setName]       = useState("");
    const [email, setEmail]     = useState("");
    const [phone, setPhone]     = useState("");
    const [address, setAddress]     = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const numberOfUsers = useSelector((state) => state.usersReducer.users.length);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {id: numberOfUsers + 1, name, email, phone, address};
        dispatch(addUser(user));
        navigate("/list-users");
    }


    return(
        <div>
            <h1>Add Users</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name} onChange={(e) => {
                        setName(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email} onChange={(e) => {
                        setEmail(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="phone">Email</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone} onChange={(e) => {
                        setPhone(e.target.value) }}
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address} onChange={(e) => {
                        setAddress(e.target.value) }}
                    />
                </div>

                <button type="submit">Add User</button>
            </form>
        </div>
    )
}

export default AddUsers;