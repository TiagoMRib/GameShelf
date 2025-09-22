import { useEffect, useState } from 'react';

/**
 * A generic custom hook for handling API calls and async operations
 * Manages loading states, error handling, and data fetching in a reusable way
 * 
 * @param fetchFunction - The async function to execute 
 * @param autoFetch - Whether to automatically call the function on mount (default: true)
 * @returns Object containing data, loading state, error state, and control functions
 */
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    // State to store the fetched data
    const [data, setData] = useState<T | null>(null);
    // Loading indicator to show while request is in progress
    const [loading, setLoading] = useState<boolean>(false);
    // Error state to handle and display any failures
    const [error, setError] = useState<Error | null>(null);

    /**
     * Main function that executes the API call and handles all states
     * Sets loading to true, clears previous errors, then processes the response
     */
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('UNKNOWN_ERROR'));
        } finally {
            setLoading(false);
        }
    }

    /**
     * Utility function to reset all states to their initial values
     * Useful when clearing previous search results or starting fresh
     */
    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        // Only fetch automatically if autoFetch is enabled
        // This allows for manual control when needed (like search on demand)
        if (autoFetch)
        {
            fetchData();
        }
        
    }, []);

    // Return all the state and functions for the component to use
    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;