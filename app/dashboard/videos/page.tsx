"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { VideoForm } from "../../../components/common/videoInput";
import { Navbar } from "../../../components/common/Navbar";
import { VideoUnit } from "../../../components/common/videoUnit";



import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Play,
  Plus,
  MoreHorizontal,
  ListVideo,
} from "lucide-react";


export default function Home() {

  const router = useRouter();
  const { data: session, status, update } = useSession()


  const videos = [
    {
      title: "Title 1",
      description: "description 1",
    },

  ];

  return (
    <div className=" overflow-hidden bg-[#050816] font-['Inter'] text-white">


      {/* Header */}
      <Navbar tool={"video"} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-10 p-3 md:p-10 lg:grid-cols-[430px_1fr]">
        <VideoForm />

        {/* Video Section */}
        <div>
          <h2 className="mb-6 font-['Poppins'] text-4xl font-semibold text-white">
            Video :
          </h2>

          <div className="space-y-5">
            {videos.map((video, index) => (
              <VideoUnit index={index} video={video} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );



}

