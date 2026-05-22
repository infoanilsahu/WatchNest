import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface VideoUnitProp {
    index: number;
    video: {
        title: string;
        description: string;
    };
}

export function VideoUnit({index, video} : VideoUnitProp) {
    return (
        <Card
            key={index}
            className="group flex items-center justify-between rounded-[20px] border border-[#1F2937] bg-[rgba(17,24,39,0.55)] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#8B5CFF]/40 hover:bg-[#141C31] hover:shadow-[0_0_30px_rgba(108,77,255,0.15)]"
        >
            <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-[#2A3348] bg-linear-to-br from-[#6C4DFF]/20 to-[#8B5CFF]/20">
                <Play className="h-7 w-7 fill-[#8B5CFF] text-[#8B5CFF]" />
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white">
                {video.title}
                </h3>

                <p className="mt-1 text-[#94A3B8]">
                {video.description}
                </p>
            </div>
            </div>

            <Button
            size="icon"
            className="h-14 w-14 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 hover:bg-[#22C55E]/20"
            >
            <Play className="ml-1 h-5 w-5 fill-[#22C55E] text-[#22C55E]" />
            </Button>
        </Card>
    );
}