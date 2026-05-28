"use client"

import { Navbar } from "@/components/common/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorPage } from "@/components/common/ErrorHandlePage";
import { Pencil, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function PlaylistPage() {

    const [user, setUser] = useState<UserProp>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadData = async () => {
        try {
            setLoading(true)

            const res = await axios({
                method: "GET",
                url: "/api/account",
            })

            if( res.status === 200 ) {
                const { user } = res.data
                setUser(user)
            }

        } catch (err:unknown) {

            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || 
                    err.message || 
                    "Something went wrong"
                )
            } else if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Unknown error occurred")
            }

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    if( error ) {
        return (
            <div className="">
                <ErrorPage errorMsg={error} />
            </div>
        )
    }

    return (
        <div className="min-h-screen overflow-hidden bg-[#050816] font-['Inter'] text-white">

            {/* Navbar */}
            <Navbar tool={null} />

            {/* Main */}
            <div className="p-2 md:p-3">

                <div
                    className="
                        relative
                        min-h-[82vh]
                        px-4
                        py-5
                        shadow-[0_0_25px_rgba(108,77,255,0.06)]
                        overflow-hidden
                    "
                >

                    {/* Small Glow */}
                    <div className="
                        absolute
                        left-1/2
                        top-20
                        h-44
                        w-45
                        -translate-x-1/2
                        rounded-full
                        bg-[#6C4DFF]/10
                        blur-3xl
                    " />

                    {/* Title */}
                    <div className="relative z-10 flex justify-center">
                        <h1 className="
                            text-[34px]
                            font-semibold
                            tracking-tight
                            text-white
                            md:text-[48px]
                        ">
                            Account
                        </h1>
                    </div>

                    {/* Card */}
                    <div className="
                        relative
                        z-10
                        mx-auto
                        mt-8
                        max-w-105
                    ">

                        <div className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/3
                            p-5
                            backdrop-blur-xl
                        ">

                            {/* Avatar */}
                            <div className="flex justify-center">
                                <div className="
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#6C4DFF]/40
                                    bg-[#6C4DFF]/10
                                    text-2xl
                                    font-bold
                                    uppercase
                                    text-[#8B72FF]
                                ">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="mt-5 text-center">

                                <h2 className="
                                    text-2xl
                                    font-semibold
                                    tracking-tight
                                    text-white
                                ">
                                    {user?.name || "User Name"}
                                </h2>

                                <div className="mt-4 space-y-2">

                                    <div className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/3
                                        px-3
                                        py-2.5
                                        text-left
                                    ">
                                        <p className="text-xs text-white/50">
                                            Username
                                        </p>

                                        <p className="
                                            mt-0.5
                                            text-sm
                                            font-medium
                                            text-white
                                        ">
                                            @{user?.username || "username"}
                                        </p>
                                    </div>

                                    <div className="
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-white/3
                                        px-3
                                        py-2.5
                                        text-left
                                    ">
                                        <p className="text-xs text-white/50">
                                            Email
                                        </p>

                                        <p className="
                                            mt-0.5
                                            text-sm
                                            font-medium
                                            text-white
                                            break-all
                                        ">
                                            {user?.email || "example@email.com"}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="mt-5 flex flex-col gap-3">

                                <button
                                    className="
                                        flex
                                        h-10
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[#6C4DFF]/40
                                        bg-[#6C4DFF]/15
                                        text-sm
                                        font-medium
                                        text-white
                                        transition-all
                                        duration-200
                                        hover:bg-[#6C4DFF]/25
                                    "
                                >
                                    <Pencil size={16} />
                                    Edit Account
                                </button>

                                <button
                                    onClick={() => signOut()}
                                    className="
                                        flex
                                        h-10
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-red-500/30
                                        bg-red-500/10
                                        text-sm
                                        font-medium
                                        text-red-300
                                        transition-all
                                        duration-200
                                        hover:bg-red-500/20
                                    "
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

interface UserProp {
    email: string;
    username: string;
    name: string;
}