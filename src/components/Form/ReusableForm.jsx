import React from 'react';
import FormField from './FormField';

const ReusableForm = ({ title, fields, handleSubmit, buttonText, actionError }) => {
    return (
        <div className="wrap">
            <h1 className="wp-heading-inline">{title}</h1>
            <hr className="wp-header-end" />
            <form onSubmit={handleSubmit}>
                <table className="form-table">
                    <tbody>
                    {fields.map(field => (
                        <FormField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={field.value}
                            onChange={field.onChange}
                            required={field.required}
                        />
                    ))}
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">{buttonText}</button>
                </p>
            </form>
            {actionError && <p>Error: {actionError.response.data.message}</p>}
        </div>
    );
};

export default ReusableForm;
