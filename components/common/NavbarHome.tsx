"use client"

import { Home, LogIn } from "lucide-react";
import { Button } from "../ui/button";
import watchnest from "./../../assests/logo.svg"
import { useRouter } from "next/navigation";


export function NavbarHome() {

  const router = useRouter()

    return (
        <div className="flex items-center justify-between md:p-4 md:m-3 p-2">
          <div className="">
            <img src={watchnest.src} alt="logo" className="w-50 md:w-62" />
          </div>

          <div className="flex items-center gap-4   ">
            <div className="flex items-center rounded-[8px] gap-0.5 md:gap-5 ">
              <Button onClick={() => router.push("/")} 
              variant="ghost"
              className={`rounded-[6px]  text-[#CBD5E1] hover:bg-white/5 hover:text-white`}>
                <Home className=" h-4 w-4" />
                Home
              </Button>

              <Button
                onClick={() => router.push("/auth/login")}
                className={`rounded-[6px] border-0 bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] px-3 font-['Poppins'] text-base font-semibold text-white shadow-[0_0_40px_rgba(108,77,255,0.25)] hover:from-[#7C5CFF] hover:to-[#8B5CFF]`}
              >
                <LogIn />
                Sing In
              </Button>
            </div>

            
          </div>

        </div>
    )
}