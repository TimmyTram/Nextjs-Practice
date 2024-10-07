"use client"
import { useEffect, useState } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
    timestamp: string;
}

const Page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // should move this to its own folder called /hooks
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                setLoading(true);
                if(!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch(err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    if(loading) {
        return <div>Loading . . .</div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    return (
        <div className="p-5">
            <h1 className="py-5">Users</h1>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Joined: {new Date(user.timestamp).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Page;