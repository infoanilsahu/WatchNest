"use client"

import { Navbar } from "@/components/common/Navbar";
import { VideoForm } from "@/components/common/videoInput";
import { VideoUnit } from "@/components/common/videoUnit";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorPage } from "@/components/common/ErrorHandlePage";
import { PlaylistTitle } from "@/components/common/PlaylistTitle";
import { DeleteVideo } from "@/lib/deleteFunction";



export default function PlaylistPage() {
    const searchParams = useSearchParams()
    
    const accountId = Number(searchParams.get("accountId"));
    const playlistId = Number(searchParams.get("playlistId"));
    const title = searchParams.get("title");

    const [videos, setVideos] = useState<VideosProp[]>([])
    const [playlist, setPlaylist] = useState<PlaylistProp>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const loadData = async () => {
        try {
            setLoading(true)

            const res = await axios({
                method: "POST",
                url: "/api/playlist",
                data: {
                    accountId, playlistId
                }
            })

            if( res.status === 200 ) {
                const {playlist: resPlaylist, videos: resVideo} = res.data
                setVideos(resVideo)
                setPlaylist(resPlaylist)
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
            <Navbar tool={null} />

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-10 p-3 md:p-4 lg:grid-cols-[530px_1fr]">
            <VideoForm setVideo={setVideos} playlistId={playlist?.id ?? null } reqLink="/api/adduserdata/playlistvid" />

            {/* Video Section */}
            <div>
                <PlaylistTitle title={playlist?.title ?? ""} descption={playlist?.description ?? ""} videoLenght={videos.length} visible={playlist?.visible ?? "private"} accountId={accountId} playlistId={playlistId} />

                <h2 className="mb-4 font-['Poppins'] text-2xl font-semibold text-white">
                Video :
                </h2>

                <div className="space-y-5">
                {videos.map((video, index) => (
                    <VideoUnit 
                        key={index}
                        video={{
                            title: video.title,
                            description: video.description ?? "",
                            link: video.link,
                        }}
                        loading={loading}
                        clickDelete={async () => {
                            const deleted = await DeleteVideo({
                                videoId: video.id,
                                playlistId: playlistId,
                                accountId: accountId,
                                reqLink: "/api/deletedata/playlistvid",
                                setError,
                                setLoading,
                            })
        
                            if( deleted ) {
                                setVideos((prev) => prev.filter((v) => v.id !== video.id ))
                            }
                        }}
                      />
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
  timestamp: Date;
  playlistId: number | null;
  accountId: number;
}

interface PlaylistProp {
    id: number;
    title: string;
    description: string | null;
    timestamp: Date;
    visible: "public" | "private";
}