import { useState } from 'react';
import axios from 'axios';

const useAction = (url) => {
    const [responseData, setResponseData] = useState(null);
    const [actionError, setActionError] = useState(null);

    const performAction = async (data, method = 'POST', itemId = null) => {
        try {
            const response = await axios({
                method,
                url: itemId ? `${url}/${itemId}` : url,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setResponseData(response.data);
            return response.data; // return the response data for further processing
        } catch (err) {
            setActionError(err);
            return false;
        }
    };

    return { performAction, responseData, actionError };
};

export default useAction;
