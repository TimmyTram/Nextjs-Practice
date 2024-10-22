import { useState, useEffect} from 'react';

const useBookmarkData = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await fetch('/api/bookmarks', { cache: 'no-store' });
                setLoading(true);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookmarks');
                }
                const data = await response.json();
                setBookmarks(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, []);

    return { bookmarks, loading, error };
};

export default useBookmarkData;