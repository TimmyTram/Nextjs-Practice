'use client';
import useBookmarkData from "../hooks/useBookmarkData";

interface User {
    id: string;
    username: string;
    email: string;
    creationDate: string;
}

interface Bookmark {
    id: string;
    user: User;
    creationDate: string;
}

const Page = () => {
    const { bookmarks, loading, error } = useBookmarkData();

    if (loading) {
        return <div>Loading . . .</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-black min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Bookmarks</h1>

            <ul className="space-y-6">
                {bookmarks.map((bookmark: Bookmark) => (
                    <li
                        key={bookmark.id}
                        className="p-5 bg-gray-800 shadow-md rounded-lg border border-gray-700"
                    >
                        <p className="text-lg font-semibold text-white mb-2">User: {bookmark.user.username}</p>
                        <p className="text-gray-300 mb-1">Email: {bookmark.user.email}</p>
                        <p className="text-gray-400">Created: {new Date(bookmark.creationDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;