import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const deleteItem = async (itemIds) => {
        setIsDeleteLoading(true);
        try {
            if (Array.isArray(itemIds)) {
                const responses = await Promise.all(itemIds.map(itemId =>
                    axios.delete(`${url}/${itemId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': appLocalizer.nonce,
                        },
                    })
                ));
                setIsDeleteLoading(false);

                return { message: 'Items deleted successfully' };
            } else {
                const response = await axios.delete(`${url}/${itemIds}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                setIsDeleteLoading(false);
                console.log(response.data.previous);
                return { message: response.data.previous.name + ' deleted successfully' };
            }
        } catch (err) {
            setIsDeleteLoading(false);
            setDeleteError(err);
            console.error('Delete Error:', err.response ? err.response.data.message : err.message);
            return false;
        }
    };

    return { deleteItem, isDeleteLoading, deleteError };
};

export default useDelete;
