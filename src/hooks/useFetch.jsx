import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url, currentPage, search) => {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if ( search !== null ) {
        search = `search=${search}`;
    } else {
        search = '';
    }

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}?page=${currentPage}&${search}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce,
                },
            });
            setHeaders(response.headers);
            setData(response.data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setError(err);
            console.error(err);
        }
    }, [url, currentPage, search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, headers, fetchData };
};

export default useFetch;
