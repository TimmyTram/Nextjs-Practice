import { useState, useEffect } from 'react';

const useLocationSearch = (queryParams: string) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilteredLocations = async () => {
            try {
                setLoading(true);
                console.log("[INFO]: Received query params: ", queryParams);
                console.log(`[INFO]: Hitting /api/locations/search?${queryParams}`);
                const response = await fetch(`/api/locations/search?${queryParams}`, { cache: 'no-store' });
                const data = await response.json();
                if(data.error) throw new Error(data.error);
                setLocations(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if(queryParams.length > 0) {
            fetchFilteredLocations();
        }
    }, [queryParams]);

    return { locations, loading, error };
};

export default useLocationSearch;