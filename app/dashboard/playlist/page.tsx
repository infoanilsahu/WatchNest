"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PlaylistForm } from "../../../components/common/playlistInput";
import { Navbar } from "../../../components/common/Navbar";
import { PlaylistCard } from "../../../components/common/playlistUnit";
import { useEffect, useState } from "react";
import { ErrorPage } from "@/components/common/ErrorHandlePage";
import axios from "axios";
import { PlaylistDeleteOption } from "../../../components/common/PlaylistMenu";



export default function Home() {

  const router = useRouter();
  const { data: session, status, update } = useSession()
   const [openMenu, setOpenMenu] = useState(false);

 
  const [deleteMenu, setDeleteMenu] = useState(false)
  const [user, setUser] = useState<UserProp>()
  const [playlist, setPlaylist] = useState<playlistProp[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  console.log(deleteMenu);
  
  

  const loadData = async () => {
    try {

      setLoading(true)

      const res = await axios({
        method: "GET",
        url: "/api/dashboard"
      })

      if( res.status === 200 ) {
        const {user, playlist, videos} = res.data

        console.log("data", res.data);
        

        setPlaylist(playlist)
        setUser({
          accountId: user.id,
          name: user.name,
          username: user.username,
          userId: user.userId
        })
      }
      
    } catch (err: unknown) {
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
  };


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
      <Navbar tool={"playlist"} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-10 p-5 lg:grid-cols-[530px_1fr]">
        <PlaylistForm setPlaylist={setPlaylist} reqLink="/api/adduserdata/playlist" />

        {/* Video Section */}
        <div>
          <h2 className="mb-6 font-['Poppins'] text-4xl font-semibold text-white">
            Playlist :
          </h2>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
            {playlist.map((playlist, index) => (
              
              <>
                <PlaylistCard key={index} playlist={{
                  title: playlist.title,
                  videos: playlist.videoLength,
                  privacy: playlist.visible
                }}
                loading={loading}
                clickDelete={ () => {
                  setDeleteMenu(true) 
                  console.log("hello1");
                  
                }}
                clickEdit={() => {
                  console.log("helloEdit");
                  
                }}
                routePush={() => {
                  router.push(`/dashboard/playlist/playlistvid?accountId=${user?.accountId}&playlistId=${playlist.id}`)
                }}
                />

                {deleteMenu && user && (
                  <div
                    
                    className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
                  >
                    <PlaylistDeleteOption 
                    accountId={user.accountId} 
                    playlistId={playlist.id} 
                    onlyPlaylistLink="/api/deletedata/playlist/onlyplaylist" 
                    withAllVideoLink="/api/deletedata/playlist/withallvideo" 
                    setDeleteMenu={setDeleteMenu} 
                    setError={setError} 
                    setPlaylist={setPlaylist} />
                    <div onClick={() => setDeleteMenu(false)} className="w-full h-full"></div>
                  </div>
                )}

              </>
            ))}
              </div>
          </div>
        </div>

      </div>



    </div>
  );



}


interface playlistProp {
  id: number;
  title: string;
  videoLength: number;
  visible: "public" | "private";
}


interface UserProp {
  accountId: number;
  username: string;
  name: string;
  userId: number;
}


