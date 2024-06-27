import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState({});
    const [deleteError, setDeleteError] = useState(null);

    const deleteItem = async (itemIds) => {
        let loadingState = {};
        if (Array.isArray(itemIds)) {
            itemIds.forEach(id => loadingState[id] = true);
        } else {
            loadingState[itemIds] = true;
        }
        setIsDeleteLoading(loadingState);

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
                setIsDeleteLoading({});
                return { message: 'Items deleted successfully' };
            } else {
                const response = await axios.delete(`${url}/${itemIds}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                setIsDeleteLoading({});
                console.log(response.data.previous);
                return { message: response.data.previous.name + ' deleted successfully' };
            }
        } catch (err) {
            setIsDeleteLoading({});
            setDeleteError(err);
            console.error('Delete Error:', err.response ? err.response.data.message : err.message);
            return false;
        }
    };

    return { deleteItem, isDeleteLoading, deleteError };
};

export default useDelete;
