import { useState, useCallback } from 'react';

export default function useFetch(fn) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const wrappedFn = useCallback(
        async (...args) => {
            setLoading(true);
            setError(null);
            try {
                const result = await fn(...args);
                setData(result);
                setLoading(false);
                return result;
            } catch (err) {
                setError(err);
                setLoading(false);
                throw err;
            }
        },
        [fn]
    );

    return { loading, fn: wrappedFn, data, error };
}
