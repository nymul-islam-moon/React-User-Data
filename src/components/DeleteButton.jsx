import React from 'react';
import useDelete from '../hooks/useDelete';

const DeleteButton = ({ url, itemId, onDelete }) => {
    const { deletedData, isLoading, error } = useDelete(url, itemId);

    console.log(deletedData);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {

        }
    };

    return (
        <button onClick={handleDelete} disabled={isLoading} className="delete">
            {isLoading ? 'Deleting...' : 'Delete'}
        </button>
    );
};

export default DeleteButton;
