import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url, currentPage) => {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}?page=${currentPage}`, {
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
    }, [url, currentPage]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, headers, fetchData };
};

export default useFetch;
