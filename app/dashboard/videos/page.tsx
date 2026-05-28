"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { VideoForm } from "../../../components/common/videoInput";
import { Navbar } from "../../../components/common/Navbar";
import { VideoUnit } from "../../../components/common/videoUnit";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorPage } from "@/components/common/ErrorHandlePage";
import { DeleteVideo } from "@/lib/deleteFunction";


export default function Home() {

  const router = useRouter();
  const { data: session, status, update } = useSession()

  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(window.location.origin)
  }, [])


  const [user, setUser] = useState<UserProp>()
  const [videos, setVideos] = useState<videoProp[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const loadData = async () => {
    try {

      setLoading(true)

      const res = await axios({
        method: "GET",
        url: "/api/dashboard",
        withCredentials: true
      })

      if( res.status === 200 ) {
        const {user: reqUser, playlist, videos} = res.data
        console.log("user", reqUser);
        
        setVideos(videos)
        setUser({
          accountId: reqUser.id,
          name: reqUser.name,
          username: reqUser.username
        })

        
      }
      
    } catch (err: unknown) {

        if (axios.isAxiosError(err)) {

        const backendMessage = err.response?.data?.message;

        if (typeof backendMessage === "string") {

          setError(backendMessage);

        } else if (
          backendMessage &&
          typeof backendMessage === "object" &&
          "message" in backendMessage
        ) {

          setError(String(backendMessage.message));

        } else {

          setError(err.message || "Something went wrong");

        }

      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
} finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    loadData()
  }, [])

  if( error ) {
    console.log("error", error);
    
      return (
          <div className="">
              <ErrorPage errorMsg={error} />
          </div>
      )
  }

  return (
    <div className=" min-h-screen overflow-hidden bg-[#050816] font-['Inter'] text-white">


      {/* Header */}
      <Navbar tool={"video"} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-10 p-3 md:p-4 lg:grid-cols-[530px_1fr]">
        <VideoForm  playlistId={null} setVideo={setVideos} reqLink={`${url}/api/adduserdata/video`}  />

        {/* Video Section */}
        <div>
          <h2 className="mb-6 font-['Poppins'] text-4xl font-semibold text-white">
            Video :
          </h2>
          {user && (
            <div className="space-y-5">
              {videos.map((video, index) => (
                <VideoUnit
                  key={index}
                  loading={loading}
                  clickDelete={async () => {
                    const deleted = await DeleteVideo({
                      videoId: video.id,
                      playlistId: null,
                      accountId: user.accountId,
                      reqLink: "/api/deletedata/video",
                      setError,
                      setLoading,
                    })

                    if( deleted ) {
                      setVideos((prev) => prev.filter((v) => v.id !== video.id ))
                    }

                  }}
                  video={{
                    title: video.title,
                    description: video.description ?? "",
                    link: video.link,
                  }}
                />
              ))}
            </div>
          )}
        </div> 

      </div>
    </div>
  );



}


interface videoProp {
  id: number;
  title: string;
  description: string | null;
  link: string;
  timestamp: Date;
  playlistId: number | null;
  accountId: number;
}

interface UserProp {
    accountId: number;
    username: string;
    name: string;
}



