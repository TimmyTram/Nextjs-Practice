"use client"
import useUserData from "../hooks/useUserData";

interface User {
    id: string;
    username: string;
    email: string;
    timestamp: string;
}

const Page = () => {
    const { users, loading, error } = useUserData();

    if (loading) {
        return <div>Loading . . .</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-black min-h-screen">
            <h1 className="text-3xl font-bold text-white mb-6">Users</h1>

            <ul className="space-y-6">
                {users.map((user: User) => (
                    <li
                        key={user.id}
                        className="p-5 bg-gray-800 shadow-md rounded-lg border border-gray-700"
                    >
                        <p className="text-lg font-semibold text-white mb-2">Username: {user.username}</p>
                        <p className="text-gray-300 mb-1">Email: {user.email}</p>
                        <p className="text-gray-400">Joined: {new Date(user.timestamp).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;