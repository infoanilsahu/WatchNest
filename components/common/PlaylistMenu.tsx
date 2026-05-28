import { TriangleAlert, Trash2, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { playlistProp } from "@/types/playlist";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";

interface PlaylistDeletaOptionProp {
  onlyPlaylistLink: string;
  withAllVideoLink: string;
  playlistId: number;
  accountId: number;
  setError: (value: string) => void;
  setPlaylist: Dispatch<SetStateAction<playlistProp[]>>;
  setDeleteMenu: Dispatch<SetStateAction<boolean>>;
}

export function PlaylistDeleteOption({
  onlyPlaylistLink,
  withAllVideoLink,
  playlistId,
  accountId,
  setError,
  setPlaylist,
  setDeleteMenu
}: PlaylistDeletaOptionProp) {

  const [loading, setLoading] = useState(false)

  const handleDeleteOnyPlaylist = async () => {
    try {
      setLoading(true)

      const res = await axios({
        method: "DELETE",
        url: onlyPlaylistLink,
        data: {
          playlistId, accountId
        }
      })

      if( res.status === 200 ) {
        const { playlist } = res.data
        setPlaylist((prev) => prev.filter((p) => p.id != playlist.id ))
        setDeleteMenu(false)
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
    }
    finally {
      setLoading(false)
    }
  }


  const handleDeleteWithAllVideo = async () => {
    try {
      setLoading(true)

      const res = await axios({
        method: "DELETE",
        url: withAllVideoLink,
        data: {
          playlistId, accountId
        }
      })

      if( res.status === 200 ) {
        const { playlist } = res.data
        setPlaylist((prev) => prev.filter((p) => p.id != playlist.id ))
        setDeleteMenu(false)
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
    }
    finally {
      setLoading(false)
    }
  }
  

  return (
    <Card className="w-full m-2 md:max-w-105 rounded-[28px] border border-[#262637] bg-[#111114]/95 p-6 shadow-[0_0_40px_rgba(108,77,255,0.12)] backdrop-blur-xl fixed ">
      
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10">
          <TriangleAlert className="h-6 w-6 text-red-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">
            Delete Playlist
          </h2>

          <p className="text-sm leading-relaxed text-[#A1A1AA]">
            Choose how you want to delete this playlist. You can remove only
            the playlist or permanently delete the playlist with all videos.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        
        <Button
          disabled={loading}
          onClick={handleDeleteOnyPlaylist}
          className="h-11 rounded-2xl bg-[#6C4DFF] text-sm font-medium text-white hover:bg-[#7A5CFF] disabled:opacity-55"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Only Playlist
        </Button>

        <Button
          disabled={loading}
          onClick={handleDeleteWithAllVideo}
          className="h-11 rounded-2xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-55"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Playlist & All Videos
        </Button>

        <Button
          onClick={ () => setDeleteMenu(false) }
          disabled={loading}
          variant="outline"
          className="h-11 rounded-2xl border border-[#2A2A3A] bg-transparent text-sm font-medium text-[#D4D4D8] hover:bg-[#1A1A24] hover:text-[#D4D#D8] disabled:opacity-55 "
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>

      </div>
    </Card>
  );
}