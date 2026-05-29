"use client"

import { NavbarHome } from "@/components/common/NavbarHome";
import { VideoUnitPublic } from "@/components/common/videoUnitPublic";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ErrorPage } from "@/components/common/ErrorHandlePage";
import { PlaylistTitle } from "@/components/common/PlaylistTitle";
import { UserAccountShow } from "@/components/common/UserAccountShow";

export const dynamic = "force-dynamic";

export default function PublicPlaylistPage() {
    <Suspense fallback={null} >
        <PublicPlaylistContant />
    </Suspense>
}

function PublicPlaylistContant() {
    const searchParams = useSearchParams()
    
    const accountId = Number(searchParams.get("accountId"));
    const playlistId = Number(searchParams.get("playlistId"));
    const title = searchParams.get("title");

    const [user, setUser] = useState<UserProp>()
    const [videos, setVideos] = useState<VideosProp[]>([])
    const [playlist, setPlaylist] = useState<PlaylistProp>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadData = async () => {
        try {
            setLoading(true)

            const res = await axios({
                method: "POST",
                url: "/api/public/playlistvid",
                data: {
                    accountId, playlistId
                }
            })

            if( res.status === 200 ) {
                const {playlist: resPlaylist, video: resVideo, account} = res.data
                setVideos(resVideo)
                setPlaylist(resPlaylist)
                setUser({
                    accountId: account.id,
                    name: account.name,
                    username: account.username
                })
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
        <div className=" min-h-screen overflow-hidden bg-[#050816] font-['Inter'] text-white">


            {/* Header */}
            <NavbarHome />

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-10 p-3 md:p-4 lg:grid-cols-[530px_1fr]">
                <div className="">
                    <UserAccountShow name={user?.name ?? ""} username={user?.username ?? ""} />
                    <PlaylistTitle title={playlist?.title ?? ""} descption={playlist?.description ?? ""} videoLenght={videos.length} visible={playlist?.visible ?? "private"} accountId={accountId} playlistId={playlistId} />
                </div>
            

                {/* Video Section */}
                <div>

                    <h2 className="mb-4 font-['Poppins'] text-2xl font-semibold text-white">
                    Video :
                    </h2>

                    <div className="space-y-5">
                    {videos.map((video, index) => (
                        <VideoUnitPublic index={index} video={{
                            title: video.title,
                            description: video.description ?? "",
                            link: video.link,
                        }} />
                    ))}
                    </div>
                </div> 

            </div>
        </div>
    );
}


interface VideosProp {
    id: number;
    title: string;
    description: string | null;
    link: string;
}

interface PlaylistProp {
    id: number;
    title: string;
    description: string | null;
    timestamp: Date;
    visible: "public" | "private";
}


interface UserProp {
    accountId: number;
    username: string;
    name: string;
}

