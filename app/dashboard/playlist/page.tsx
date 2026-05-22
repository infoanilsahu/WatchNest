"use client"

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { VideoForm } from "../../../components/common/videoInput";
import { Navbar } from "../../../components/common/Navbar";
import { VideoUnit } from "../../../components/common/videoUnit";



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
      <Navbar tool={"playlist"} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-10 p-10 lg:grid-cols-[430px_1fr]">
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

