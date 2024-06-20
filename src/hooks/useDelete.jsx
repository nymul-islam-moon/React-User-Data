import { useState } from 'react';
import axios from 'axios';

const useDelete = (url, itemId) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`${url}/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setIsLoading(false);
            return true;
        } catch (err) {
            setIsLoading(false);
            setError(err);
            return false;
        }
    };

    return { deleteItem, isLoading, error };
};

export default useDelete;
