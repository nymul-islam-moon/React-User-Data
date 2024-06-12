import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSave from "../components/HOOKS/useSave";
import useFetch from "../components/HOOKS/useFetch";


const SaveUser = ({ onUserAdded }) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loader, setLoader] = useState(id ? 'Update User' : 'Add User');
    const url = `${appLocalizer.apiUrl}/rud/v1/users`;

    const { saveData, isSaving, error: saveError } = useSave(url, appLocalizer.nonce);
    const { data: user, loading: loadingUser, error: fetchError } = useFetch(id ? `${url}/${id}` : null, appLocalizer.nonce);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setAddress(user.address);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(id ? 'Updating user...' : 'Adding user...');

        try {
            await saveData({ name, email, phone, address }, id);
            setLoader(id ? 'Update User' : 'Add User');
            if (!id) {
                setName('');
                setEmail('');
                setPhone('');
                setAddress('');
            }
            onUserAdded(); // Notify parent component to refresh the user list
        } catch (err) {
            console.error('There was an error!', err);
            setLoader(id ? 'Update User' : 'Add User');
        }
    };

    if (loadingUser) {
        return <div>Loading...</div>;
    }

    if (fetchError) {
        return <div>Error loading user data.</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <table className="form-table" role="presentation">
                <tbody>
                <tr>
                    <th scope="row">
                        <label htmlFor="name">Name</label>
                    </th>
                    <td>
                        <input
                            type="text"
                            id="name"
                            name="name"
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
                            type="email"
                            id="email"
                            name="email"
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
                            type="tel"
                            id="phone"
                            name="phone"
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
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="regular-text"
                                rows="3"
                            ></textarea>
                    </td>
                </tr>
                </tbody>
            </table>
            <p className="submit">
                <button type="submit" className="button button-primary" disabled={isSaving}>
                    {loader}
                </button>
            </p>
            {saveError && <div>Error saving data.</div>}
        </form>
    );
};

export default SaveUser;
