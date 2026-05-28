"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Account() {
    const router = useRouter();
    const { data: session, status, update } = useSession()

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if( status === "authenticated" && session.hasAccount === true ) {
                       
            router.push("/dashboard/videos")
        }
        else if( status === "unauthenticated" ) router.push("/auth/login")
    }, [status, router, session])


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();

            setLoading(true);
            setError("");

            try {

                const email = session?.user?.email;

                const res = await axios.post(`/api/auth/account`, {
                    username,
                    name,
                    email
                })

                if( res.status === 200 || res.status === 201 ) {
                    await update({ userId: res.data.account[0].userId })
                    router.push("/dashboard/videos")
                }

            } catch (err: any) {

                if( axios.isAxiosError(err) ) {
                    setError(
                        err.response?.data.message ||
                        "Something went wrong"
                    )
                } 
                else setError("Server error");

            } finally {
                setLoading(false);
            }
    }

    if (status === "loading") {
        return (
        <div className="h-screen flex items-center justify-center">
            <p>Loading...</p>
        </div>
        );
    }

    return (
        <div className="h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl text-center">
                Create Account
            </CardTitle>
            </CardHeader>

            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                <Label htmlFor="username">Username</Label>

                <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>

                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
                )}

                <Button
                type="submit"
                className="w-full"
                disabled={loading}
                >
                {loading ? "Creating..." : "Create Account"}
                </Button>
            </form>
            </CardContent>
        </Card>
        </div>
    );
}