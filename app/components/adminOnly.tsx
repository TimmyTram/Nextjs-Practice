'use client';
import { useSession } from "next-auth/react";


export default function AdminOnly() {
    const { data: session, status } = useSession();

    return (
        <>
            {status === "authenticated" && session?.user.role === "ADMIN" ? (
                <div className="bg-black text-white p-4 rounded-lg shadow-md">
                    <p>You should only be seeing this div if you are an admin</p>
                    <p>Admin: {session?.user.username}</p>
                    <p>Role: {session?.user.role}</p>
                </div>
            ) : (<div></div>)}
        </>
    );
};