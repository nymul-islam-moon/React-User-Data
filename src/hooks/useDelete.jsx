import { useState } from 'react';
import axios from 'axios';

const useDelete = (url, itemId) => {
    const [ deletedData, setDeletedData ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const deleteItem = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${url}/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setDeletedData(response.data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err);
            return false;
        }
    };

    return { deletedData, isLoading, error };
};

export default useDelete;
