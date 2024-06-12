import { useState } from 'react';
import axios from 'axios';

const useDeleteData = (url) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (id) => {
        setIsDeleting(true);
        setError(null);

        try {
            const response = await axios.delete(`${url}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setIsDeleting(false);
            return response.data;
        } catch (err) {
            setError(err);
            setIsDeleting(false);
            throw err;
        }
    };

    return { deleteData, isDeleting, error };
};

export default useDeleteData;
