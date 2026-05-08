"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {

    const router = useRouter();
    const { data: session, status, update } = useSession()

    return (
        <>
        <div>Welcome Home</div>
        </>
    )
}

