import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser, updateUser} from "./UsersSlice";
import axios from "axios";

const EditUsers = () => {

    const location = useLocation();

    const [id, setId] = useState(location.state.id);
    const [name, setName] = useState(location.state.name);
    const [email, setEmail] = useState(location.state.email);
    const [phone, setPhone] = useState(location.state.phone);
    const [address, setAddress] = useState(location.state.address);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updateUrl = `${appLocalizer.apiUrl}/rud/v1/users/${id}`;
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(updateUrl, {
                name: name,
                phone: phone,
                email: email,
                address: address
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            console.log(response.data);
            dispatch(updateUser(response.data));

            navigate("/list-users", {replace: true});
        } catch (error) {
            console.error('Error adding user:', error.response);
        }
    }

    return <>
        <div className="wrap">
            <h1 className="wp-heading-inline">Add New User</h1>
            <hr className="wp-header-end"/>
            <form onSubmit={handleSubmit}>
                <table className="form-table">
                    <tbody>
                    <tr>
                        <th scope="row">
                            <label htmlFor="name">Name</label>
                        </th>
                        <td>
                            <input name="name"
                                   type="text"
                                   id="name"
                                   value={name}
                                   onChange={(e) => {
                                       setName(e.target.value)
                                   }}
                                   className="regular-text"
                                   required/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label htmlFor="email">Email</label>
                        </th>
                        <td>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                value={email} onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                                className="regular-text"
                                required/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label htmlFor="phone">Phone</label>
                        </th>
                        <td>
                            <input
                                name="phone"
                                type="tel"
                                id="phone"
                                value={phone} onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                                className="regular-text"/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label htmlFor="address">Address</label>
                        </th>
                        <td>
                                <textarea
                                    name="address"
                                    id="address"
                                    className="regular-text"
                                    rows="3"
                                    value={address} onChange={(e) => {
                                    setAddress(e.target.value)
                                }}
                                ></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">Update User</button>
                </p>
            </form>
        </div>
    </>
}

export default EditUsers;