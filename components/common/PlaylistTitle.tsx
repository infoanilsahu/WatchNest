import { Globe, Copy, Lock } from "lucide-react";

import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface PlatlistTitleProp {
  title: string;
  descption: string;
  visible: "public" | "private";
  videoLenght: number;
  accountId: number;
  playlistId: number;
}

export function PlaylistTitle({
  title,
  descption,
  visible,
  videoLenght,
  accountId,
  playlistId
}: PlatlistTitleProp) {
  const isPublic = visible === "public";

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const shareLink = `${url}/public/playlist?accountId=${accountId}&playlistId=${playlistId}`

  const copyLink = async () => {
    if (!shareLink) return;

    await navigator.clipboard.writeText(shareLink);
  };

  return (
    <div className="space-y-4 mb-5">
      {/* Playlist Card */}
      <Card
        className="
          px-4 py-0
          bg-transparent
        "
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="space-y-2 w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white font-[Poppins]">
                {title}
              </h2>


            <div className="flex flex-wrap gap-3">
                {/* Video Length */}
                <div
                    className="
                    rounded-full
                    border border-[#1F2937]
                    bg-[#0B1023]
                    px-3 py-1
                    text-sm text-[#CBD5E1]
                    "
                >
                    {videoLenght} Videos
                </div>

                {/* Visibility */}
                <div
                    className={`
                    flex items-center gap-1.5
                    rounded-full border px-3 py-1 text-sm
                    ${
                        isPublic
                        ? "border-[#3B82F6]/20 bg-[#3B82F6]/10 text-[#93C5FD]"
                        : "border-[#64748B]/20 bg-[#1F2937] text-[#CBD5E1]"
                    }
                    `}
                >
                    {isPublic ? (
                    <Globe className="h-3.5 w-3.5" />
                    ) : (
                    <Lock className="h-3.5 w-3.5" />
                    )}

                    {isPublic ? "Public" : "Private"}
                </div>

            </div>


            </div>

            <p className="max-w-3xl text-sm leading-6 text-[#94A3B8] font-[Inter]">
              {descption}
            </p>
          </div>
        </div>
      </Card>

      {/* Share Card */}
      {isPublic && (
        <Card
          className="
            bg-transparent
            p-1
          "
        >
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-white font-[Poppins]">
              Share Playlist
            </h3>

            <div className="flex gap-3">
              <Input
                readOnly
                value={shareLink}
                className="
                  h-11
                  rounded-[12px]
                  border border-[#2A3348]
                  bg-[#0B1023]
                  px-4
                  text-sm text-[#CBD5E1]
                  focus-visible:ring-0
                  focus-visible:border-[#6C4DFF]
                "
              />

              <Button
                onClick={copyLink}
                className="
                  h-11
                  rounded-[12px]
                  bg-[#6C4DFF]
                  px-5
                  text-sm font-semibold text-white
                  hover:bg-[#7C5CFF]
                  shadow-[0_0_30px_rgba(108,77,255,0.25)]
                  active:opacity-75
                "
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <Globe className="h-3.5 w-3.5 text-[#8B5CFF]" />

              <p>Anyone with the link can view this playlist.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}