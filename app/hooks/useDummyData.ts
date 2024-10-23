import { useState, useEffect } from 'react';

const useDummyData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDummy = async () => {
            try {
                const response = await fetch("/api/dummy", { cache: "no-store" });
                setLoading(true);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDummy();
    }, []);

    return { data, loading, error };
};

export default useDummyData;