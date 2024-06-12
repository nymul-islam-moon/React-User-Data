import { useState } from 'react';
import axios from 'axios';

// Custom hook for saving data (add or update)
const useSaveData = (url, nonce) => {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const saveData = async (data, id = null) => {
        setIsSaving(true);
        setError(null);

        const method = id ? 'put' : 'post';
        const apiUrl = id ? `${url}/${id}` : url;

        try {
            const response = await axios({
                method: method,
                url: apiUrl,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': nonce
                }
            });
            setIsSaving(false);
            return response.data;
        } catch (err) {
            setError(err);
            setIsSaving(false);
            throw err;
        }
    };

    return { saveData, isSaving, error };
};

export default useSaveData;
