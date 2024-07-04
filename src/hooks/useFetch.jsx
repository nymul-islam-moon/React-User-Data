import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url, currentPage, search, filterStartDate, filterEndDate, orderBy, order) => {
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

        queryString += `&orderby=${orderBy}&order=${order}`;

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
        console.log(orderBy);
    }, [url, currentPage, search, filterStartDate, filterEndDate, orderBy, order]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, headers, fetchData };
};

export default useFetch;
