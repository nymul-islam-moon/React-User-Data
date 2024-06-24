import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
    const [deletedData, setDeletedData] = useState(null);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteItem = async (itemId) => {
        setIsDeleteLoading(true);
        try {
            const response = await axios.delete(`${url}/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setDeletedData(response.data);
            setIsDeleteLoading(false);
            return response.data; // return the deleted data for further processing
        } catch (err) {
            setIsDeleteLoading(false);
            setDeleteError(err);
            return false;
        }
    };

    return { deleteItem, deletedData, isDeleteLoading, deleteError };
};

export default useDelete;
