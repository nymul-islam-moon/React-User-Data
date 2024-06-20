import React from 'react';
import useDelete from '../hooks/useDelete';

const DeleteButton = ({ url, itemId, onDelete }) => {
    const { deleteItem, isLoading, error } = useDelete(url, itemId);

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            const success = await deleteItem();
            if (success) {
                onDelete(itemId);
            }
        }
    };

    return (
        <button onClick={handleDelete} disabled={isLoading} className="delete">
            {isLoading ? 'Deleting...' : 'Delete'}
        </button>
    );
};

export default DeleteButton;
