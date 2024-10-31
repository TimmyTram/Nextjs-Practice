'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DeleteLocationButton() {
    const { data: session, status } = useSession();

    return (
        <>
            {status === "authenticated" && session?.user.role === "ADMIN" ? (
                <Link href="/admin/deleteLocation" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Delete Location</Link>
            ) : (<div></div>)}
        </>
    );
};