import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAction from '../../hooks/useAction';
import ReusableForm from '../../components/Form/ReusableForm';

const UserForm = () => {
    const location = useLocation();
    const user = location.state?.item || {};
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [ buttonType, setButtonType ] = useState('submit');

    const { performAction, responseData, actionError } = useAction(`${appLocalizer.apiUrl}/rud/v1/users`);
    const navigate = useNavigate();

    useEffect(() => {
        if (responseData) {
            const message = responseData.created ? 'User created successfully' : 'User updated successfully';
            navigate('/users', { state: { message } });
        }
        if (actionError) {
            console.log(actionError);
        }
    }, [responseData, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonType('button');
        const data = { name, email, phone, address };
        const method = user.id ? 'PUT' : 'POST';
        const itemId = user.id || null;
        await performAction(data, method, itemId);
        setButtonType('submit');
    };

    const fields = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true
        },
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
        },
        {
            label: 'Phone',
            name: 'phone',
            type: 'tel',
            value: phone,
            onChange: (e) => setPhone(e.target.value),
            required: false
        },
        {
            label: 'Address',
            name: 'address',
            type: 'textarea',
            value: address,
            onChange: (e) => setAddress(e.target.value),
            required: false
        }
    ];

    return (
        <ReusableForm
            title={user.id ? 'Edit User' : 'Add New User'}
            fields={fields}
            handleSubmit={handleSubmit}
            buttonText={user.id ? 'Update User' : 'Add User'}
            buttonType={buttonType}
            actionError={actionError}
        />
    );
};

export default UserForm;
