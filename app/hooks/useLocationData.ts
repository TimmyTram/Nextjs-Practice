import { useState, useEffect } from 'react';

const useLocationData = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('/api/locations', { cache: 'no-store' });
                setLoading(true);
                if (!response.ok) {
                    throw new Error('Failed to fetch locations');
                }
                const data = await response.json();
                setLocations(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return { locations, loading, error };
};

export default useLocationData;