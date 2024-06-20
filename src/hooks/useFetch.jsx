import React, {useEffect, useState} from "react";
import axios from "axios";


const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${url}?page=1`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                const headers = response.headers;
                // setTotalData(parseInt(headers['x-wp-total'], 10));
                // setTotalPage(parseInt(headers['x-wp-totalpages'], 10));
                // dispatch(setUsers(response.data));
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        })();
    }, []);

    return { data, isLoading, error };
}

export default useFetch;