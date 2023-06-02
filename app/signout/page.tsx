"use client"
import * as React from "react";
import { logout } from "@/lib/services/firebase-auth";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    React.useEffect(() => {
        logout();
        router.push("/");
    }, [router]);

    return (
        <div>
            <h1>Logged out</h1>
        </div>
    )
}