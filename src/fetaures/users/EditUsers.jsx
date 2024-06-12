import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateUser} from "./UsersSlice";

const EditUsers = () => {

    const location = useLocation();

    const [id, setId] = useState(location.state.id);
    const [name, setName] = useState(location.state.name);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState(location.state.phone);
    const [address, setAddress] = useState(location.state.address);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({id, name, email, phone, address}));
        navigate("/list-users", {replace: true});
    }

    return <>
        <div>
            <h1>Edit Users</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}
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
                        setEmail(e.target.value)
                    }}
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
                        setPhone(e.target.value)
                    }}
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
                        setAddress(e.target.value)
                    }}
                    />
                </div>

                <button type="submit">Update User</button>
            </form>
        </div>
    </>
}

export default EditUsers;