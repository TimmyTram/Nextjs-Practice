'use client'
import { useSession } from "next-auth/react";
import useDummyData from "../../hooks/useDummyData";

interface User {
    id: string;
    username: string;
    email: string;
    creationDate: string;
}

const Page = () => {
    const { data: users, loading, error } = useDummyData(); 
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "unauthenticated" || session?.user.role !== 'ADMIN') {
        return <div>Unauthorized</div>;
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <p>Only Admins can see this page.</p>
            <ul className="space-y-6">
                {users.map((user: User) => (
                    <li
                        key={user.id}
                        className="p-5 bg-gray-800 shadow-md rounded-lg border border-gray-700"
                    >
                        <p className="text-lg font-semibold text-white mb-2">Username: {user.username}</p>
                        <p className="text-gray-300 mb-1">Email: {user.email}</p>
                        <p className="text-gray-400">Joined: {new Date(user.creationDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Page;