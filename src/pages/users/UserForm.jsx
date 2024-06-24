import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAction from "../../hooks/useAction";

const UserForm = () => {
    const location = useLocation();
    const user = location.state?.item || {};
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');

    const { performAction, responseData, actionError } = useAction(`${appLocalizer.apiUrl}/rud/v1/users`);
    const navigate = useNavigate();

    useEffect(() => {
        if (responseData) {
            navigate('/users');
        }
    }, [responseData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email, phone, address };
        const method = user.id ? 'PUT' : 'POST';
        const itemId = user.id || null;
        await performAction(data, method, itemId);
    };

    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{user.id ? 'Edit User' : 'Add New User'}</h1>
            <hr className="wp-header-end" />
            <form onSubmit={handleSubmit}>
                <table className="form-table">
                    <tbody>
                    <tr>
                        <th scope="row">
                            <label htmlFor="name">Name</label>
                        </th>
                        <td>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="regular-text"
                                required
                            />
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="regular-text"
                                required
                            />
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
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="regular-text"
                            />
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">{user.id ? 'Update User' : 'Add User'}</button>
                </p>
            </form>
            {actionError && <p>Error: {actionError.message}</p>}
        </div>
    );
};

export default UserForm;
