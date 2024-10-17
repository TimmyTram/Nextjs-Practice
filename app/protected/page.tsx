'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoutButton from "../components/logout";



export default function Page() {
    const { data: session, status} = useSession();
    console.log(session);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [session, status, router]);


    return (
        <div>
            <h1>Protected Page</h1>
            <p>This page is protected.</p>
            <p>Welcome: {session?.user.username}</p>
            <LogoutButton />
        </div>
    );

}