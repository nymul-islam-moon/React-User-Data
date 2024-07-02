import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url, currentPage, search, filterStartDate, filterEndDate) => {
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const buildQueryString = () => {
        let queryString = `page=${currentPage}`;
        if (search) {
            queryString += `&search=${search}`;
        }
        if (filterStartDate) {
            queryString += `&start_date=${filterStartDate}`;
        }
        if (filterEndDate) {
            queryString += `&end_date=${filterEndDate}`;
        }
        return queryString;
    };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const queryString = buildQueryString();
            const response = await axios.get(`${url}?${queryString}`, {
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
    }, [url, currentPage, search, filterStartDate, filterEndDate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, headers, fetchData };
};

export default useFetch;
