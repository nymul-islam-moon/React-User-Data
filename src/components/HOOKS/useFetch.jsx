import {useEffect, useState} from "react";
import axios from 'axios';

const useFetch = (url) => {
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': appLocalizer.nonce,
                    },
                });
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    return {data, isLoading, error};
}

export default useFetch;