"use client";

import { useState } from "react";

import {
  Play,
  Clock3,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface VideoUnitProp {
  index: number;
  video: {
    title: string;
    description: string;
    duration?: string;
    link: string;
  };
}

export function VideoUnitPublic({ index, video }: VideoUnitProp) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className={`
        relative overflow-hidden 
        rounded-[24px]
        border border-[#1F2937]
        bg-[rgba(17,24,39,0.58)]
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        backdrop-blur-lg
        transition-all duration-500
        p-1 md:p-4
        ${
          expanded
            ? "border-[#8B5CFF]/50 shadow-[0_0_45px_rgba(108,77,255,0.18)]"
            : ""
        }
      `}
    >
      {/* Glow */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-500
          ${expanded ? "opacity-100" : "opacity-0"}
        `}
      >
        <div
          className="
            absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2
            rounded-full bg-[#6C4DFF]/20 blur-3xl
          "
        />
      </div>

      <div className="relative z-10 p-4 sm:p-5">
        {/* Top Section */}
        <div className="flex items-start gap-4">
          {/* Thumbnail */}
          <div
            className="
              flex h-12 md:h-16 w-12 md:w-16 shrink-0 items-center justify-center
              rounded-[18px]
              border border-[#2A3348]
              bg-linear-to-br from-[#6C4DFF]/20 to-[#8B5CFF]/10
              shadow-[0_0_25px_rgba(108,77,255,0.15)]
              sm:h-20 sm:w-20 sm:rounded-[22px]
            "
          >
            <Play className="h-7 w-7 fill-[#A78BFA] text-[#A78BFA]" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 h-fit">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className="
                  line-clamp-1
                  text-[17px] font-semibold tracking-[0.2px]
                  text-white sm:text-[20px]
                "
              >
                {video.title}
              </h3>

              {video.duration && (
                <div
                  className="
                    flex items-center gap-1 rounded-full
                    border border-[#2A3348]
                    bg-[#0B1023]/80 px-2 py-1
                    text-[11px] text-[#94A3B8]
                    sm:px-2.5 sm:text-xs
                  "
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  {video.duration}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-2 h-fit">
              {!expanded ? (
                <p
                  className="
                    line-clamp-1
                    text-sm leading-6 text-[#94A3B8] text-wrap h-fit
                    sm:text-[15px]
                  "
                >
                  {video.description}
                </p>
              ) : (
                <div className="animate-in fade-in-0 duration-300">
                  <p
                    className="
                      text-sm leading-7 text-[#CBD5E1] text-wrap h-fit
                      sm:text-[15px]
                    "
                  >
                    {video.description}
                  </p>

                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Play Button */}
            <Button
                onClick={() => window.open(video.link, "_blank")}
              size="icon"
              className="
                h-11 w-11 rounded-full
                border border-[#22C55E]/30
                bg-[#22C55E]/10
                shadow-[0_0_20px_rgba(34,197,94,0.12)]
                transition-all duration-300
                hover:scale-105
                hover:bg-[#22C55E]/20
                sm:h-14 sm:w-14
              "
            >
              <Play className="ml-0.5 h-4 w-4 fill-[#22C55E] text-[#22C55E] sm:h-5 sm:w-5" />
            </Button>

            
          </div>
        </div>
      </div>
    </Card>
  );
}