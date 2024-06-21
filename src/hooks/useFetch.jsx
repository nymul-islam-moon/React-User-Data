import React, {useEffect, useState} from "react";
import axios from "axios";


const useFetch = ( url, currentPage ) => {

    const [data, setData] = useState(null);
    const [ headers, setHeaders ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${url}?page=${currentPage}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                const headers = response.headers;
                setHeaders( headers );
                // setTotalData(parseInt(headers['x-wp-total'], 10));
                // setTotalPage(parseInt(headers['x-wp-totalpages'], 10));
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        })();
    }, [currentPage]);

    return { data, isLoading, error, headers };
}

export default useFetch;