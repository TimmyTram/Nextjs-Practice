'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";


export default function CreateLocationButton() {
    const { data: session, status } = useSession();

    return (
        <>
            {status === "authenticated" && session?.user.role === "ADMIN" ? (
                <Link href="/admin/createLocation" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Location</Link>
            ) : (<div></div>)}
        </>
    );

};