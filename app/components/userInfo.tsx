'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./logout";


export default function UserInfo() {
    const { data: session, status } = useSession();

    console.log(session);

    return (
        <>
            {status === "authenticated" ? (
                <div className="bg-black p-4 rounded-lg shadow-md max-w-sm mx-auto">
                    <p className="text-lg font-semibold underline text-gray-300 mb-2">User Details</p>
                    <p className="text-lg font-semibold text-gray-300 mb-2">USER ID: <span className="text-white">{session?.user.id}</span></p>
                    <p className="text-lg font-semibold text-gray-300 mb-2">USERNAME: <span className="text-white">{session?.user.username}</span></p>
                    <p className="text-lg font-semibold text-gray-300">ROLE: <span className="text-white">{session?.user.role}</span></p>
                    <LogoutButton />
                </div>
            ) : (
                <Link href="/auth/signin" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</Link>
            )}
        </>
    );
};