import React from 'react';

const FormField = ({ label, name, type, value, onChange, required }) => {
    return (
        <tr>
            <th scope="row">
                <label htmlFor={name}>{label}</label>
            </th>
            <td>
                {type === 'textarea' ? (
                    <textarea
                        name={name}
                        id={name}
                        className="regular-text"
                        rows="3"
                        value={value}
                        onChange={onChange}
                        required={required}
                    ></textarea>
                ) : (
                    <input
                        name={name}
                        type={type}
                        id={name}
                        value={value}
                        onChange={onChange}
                        className="regular-text"
                        required={required}
                    />
                )}
            </td>
        </tr>
    );
};

export default FormField;
