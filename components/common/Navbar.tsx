import { ListVideo, MoreHorizontal, Play } from "lucide-react";
import { Button } from "../ui/button";
import watchnest from "./../../assests/logo.svg"
import { useRouter } from "next/navigation";

interface NavbarProp {
  tool: "video" | "playlist" | null;
}

export function Navbar({tool}: NavbarProp) {

  const router = useRouter()

    return (
        <div className="flex items-center justify-between border-b border-[#1F2937] md:p-4 md:m-3 p-2">
          <div className="">
            <img src={watchnest.src} alt="logo" className="w-50 md:w-62" />
          </div>

          <div className="md:flex items-center gap-4 hidden  ">
            <div className="flex items-center rounded-[8px] border border-[#2A3348] bg-[#111827]/70 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <Button onClick={() => router.push("/dashboard/videos")} 
              variant={tool === "video" ? "default" : "ghost"}
              className={`rounded-[6px] ${ tool === "video" ? "border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] px-3 font-['Poppins'] text-base font-semibold text-white shadow-[0_0_40px_rgba(108,77,255,0.25)] hover:from-[#7C5CFF] hover:to-[#8B5CFF]": "text-[#CBD5E1] hover:bg-white/5 hover:text-white" }`}>
                <Play className="mr-2 h-4 w-4" />
                Video
              </Button>

              <Button
                onClick={() => router.push("/dashboard/playlist")}
                variant={tool === "playlist" ? "default" : "ghost"}
                className={`rounded-[6px] ${ tool === "playlist" ?"border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] px-3 font-['Poppins'] text-base font-semibold text-white shadow-[0_0_40px_rgba(108,77,255,0.25)] hover:from-[#7C5CFF] hover:to-[#8B5CFF]": "text-[#CBD5E1] hover:bg-white/5 hover:text-white" }`}
              >
                <ListVideo className="mr-2 h-4 w-4" />
                Playlist
              </Button>
            </div>

            <Button
              onClick={() => router.push("/account")}
              size="icon"
              variant="ghost"
              className=" h-3 md:h-12 w-3 md:w-12 rounded-full border border-[#2A3348] bg-[#111827]/70 hover:bg-white/10"
            >
              <MoreHorizontal className="h-5 w-5 text-white" />
            </Button>
          </div>

          <div className="flex gap-2 md:hidden">
            <div className="flex items-center rounded-[8px] border border-[#2A3348] bg-[#111827]/70 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
                  <Button onClick={() => router.push("/dashboard/videos")} 
              variant={tool === "video" ? "default" : "ghost"}
              className={`rounded-[6px] text-sm ${ tool === "video" ? "border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] font-['Poppins'] font-semibold text-white shadow-[0_0_40px_rgba(108,77,255,0.25)] hover:from-[#7C5CFF] hover:to-[#8B5CFF]": "text-[#CBD5E1] hover:bg-white/5 hover:text-white" }`}>
                <Play className="h-4! w-4!" />
              </Button>

              <Button
                onClick={() => router.push("/dashboard/playlist")}
                variant={tool === "playlist" ? "default" : "ghost"}
                className={`rounded-[6px] text-sm ${ tool === "playlist" ? "border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] font-['Poppins'] font-semibold text-white shadow-[0_0_40px_rgba(108,77,255,0.25)] hover:from-[#7C5CFF] hover:to-[#8B5CFF]": "text-[#CBD5E1] hover:bg-white/5 hover:text-white" }`}
              >
                <ListVideo className="h-4! w-4!" />
              </Button>

            </div>


            <Button
              onClick={() => router.push("/account")}
              size="icon"
              variant="ghost"
              className=" h-12 w-12 rounded-full border border-[#2A3348] bg-[#111827]/70 hover:bg-white/10"
            >
              <MoreHorizontal className="h-5 w-5 text-white" />
            </Button>
          </div>

        </div>
    )
}