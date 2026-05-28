import {
  Lock,
  MoreVertical,
  PlayCircle,
  Globe,
  Pencil,
  Trash2,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

interface PlaylistCardProps {
  playlist: {
    title: string;
    videos: number;
    updatedAt?: string;
    privacy: "private" | "public";
  };
  loading: boolean;
  clickDelete: () => void;
  routePush: () => void;
  clickEdit: () => void;
}

export function PlaylistCard({ playlist, clickDelete, clickEdit, loading, routePush }: PlaylistCardProps) {  
   const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className=" flex flex-col">
    <Card
      className="
    
        group relative overflow-hidden
        rounded-[22px] sm:rounded-[28px]
        border border-[#1F2937]
        bg-[rgba(17,24,39,0.62)]
        p-4 sm:p-6
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        backdrop-blur-lg
        transition-all duration-500
        hover:-translate-y-1
        hover:border-[#8B5CFF]/40
        hover:shadow-[0_0_40px_rgba(108,77,255,0.18)]
      "
    >
      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-0 transition-opacity duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute -top-24 right-0 h-52 w-52
            rounded-full bg-[#6C4DFF]/20 blur-3xl
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between gap-3 sm:gap-4">
        {/* Left */}
        <div className="min-w-0 flex-1 cursor-pointer" onClick={routePush} >
          {/* Title */}
          <div className="flex items-center gap-2">
            <h3
              className="
                line-clamp-1
                text-[16px] font-semibold tracking-[0.2px]
                text-white
                sm:text-[20px]
              "
            >
              {playlist.title}
            </h3>

            {/* Privacy Icon */}
            <div
              className="
                flex h-7 w-7 shrink-0 items-center justify-center
                rounded-full
                border border-[#8B5CFF]/20
                bg-[#6C4DFF]/10
                sm:h-8 sm:w-8
              "
            >
              {playlist.privacy === "private" ? (
                <Lock className="h-3.5 w-3.5 text-[#A78BFA] sm:h-4 sm:w-4" />
              ) : (
                <Globe className="h-3.5 w-3.5 text-[#A78BFA] sm:h-4 sm:w-4" />
              )}
            </div>
          </div>

          {/* Meta */}
          <div
            className="
              mt-2 flex flex-wrap items-center gap-2
              text-xs text-[#94A3B8]
              sm:mt-3 sm:gap-3 sm:text-sm
            "
          >
            <div className="flex items-center gap-1.5">
              <PlayCircle className="h-3.5 w-3.5 text-[#8B5CFF] sm:h-4 sm:w-4" />
              <span>{playlist.videos} videos</span>
            </div>

            <div className="h-1 w-1 rounded-full bg-[#475569]" />

            <span className="truncate">
              Updated {playlist.updatedAt ?? ""}
            </span>
          </div>

          {/* Mobile Privacy Badge */}
          <div className="mt-3 flex sm:hidden">
            <div
              className="
                rounded-full
                border border-[#8B5CFF]/20
                bg-[#6C4DFF]/10
                px-3 py-1
                text-[11px] font-medium
                capitalize text-[#C4B5FD]
              "
            >
              {playlist.privacy}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 cursor-pointer">
          {/* Desktop Privacy Badge */}
          <div
            onClick={routePush}
            className="
              hidden rounded-full
              border border-[#8B5CFF]/20
              bg-[#6C4DFF]/10
              px-4 py-2
              text-sm font-medium
              capitalize text-[#C4B5FD]
              sm:flex
            "
          >
            {playlist.privacy}
          </div>

          {/* Menu */}
          <Button
            onClick={() => {
              setOpenMenu((prev) => !prev)
              console.log("hello3");
              
            }}
            size="icon"
            className="
              h-9 w-9 rounded-full
              border border-[#2A3348]
              bg-[#0B1023]/80
              text-[#94A3B8]
              transition-all duration-300
              hover:bg-[#141C31]
              hover:text-white
              sm:h-10 sm:w-10
            "
          >
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>

            

        </div>
      </div>

      

      {/* Bottom Line */}
      <div
        className="
          absolute bottom-0 left-0 h-0.5
          w-0 bg-linear-to-r
          from-[#6C4DFF] to-[#A78BFA]
          transition-all duration-500
          group-hover:w-full
        "
      />
    </Card>

      {/* Action Buttons */}
      {openMenu && (
        <div className="m-1 ml-8 mb-3 flex gap-3">
          
          <Button
            type="button"
            size="sm"
            disabled={loading}
            onClick={clickEdit}
            className="
              disabled:opacity-55
              rounded-[14px]
              border border-[#6C4DFF]/30
              bg-[#6C4DFF]/10
              text-[#A78BFA]
              hover:bg-[#6C4DFF]/20
            "
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            type="button"
            onClick={clickDelete}
            disabled={loading}
            size="sm"
            className="
              disabled:opacity-55
              rounded-[14px]
              border border-[#F43F5E]/30
              bg-[#F43F5E]/10
              text-[#F43F5E]
              hover:bg-[#F43F5E]/20
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

        </div>
      )}

    </div>
  );
}