import { useState, useEffect, useCallback } from 'react';
import { fetchHelper } from '../helpers/fetchHelper';

const useFetch = (fetchUrl = '') => {
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        const auxResponse = await fetchHelper(fetchUrl);

        if ((auxResponse).data !== null) {
            setData(auxResponse.data);
        } else {
            setError(auxResponse.error);
        }
    }, [fetchUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData, fetchUrl]);

    return { data, error };
};

export default useFetch;