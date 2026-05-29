"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { NavbarHome } from "@/components/common/NavbarHome";

import { ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.hasAccount === false) {
      router.push("/auth/account");
    } else if (
      status === "authenticated" &&
      session?.hasAccount === true
    ) {
      router.push("/dashboard/videos");
    }
  }, [status, router, session?.hasAccount]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#8B5CFF] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] font-['Inter'] text-white">
      
      {/* Background Glow */}
      <div className="absolute -left-30 -top-30 h-80 w-[320px] rounded-full bg-[#6C4DFF]/25 blur-3xl" />

      <div className="absolute -bottom-35 -right-25 h-85 w-85 rounded-full bg-[#8B5CFF]/20 blur-3xl" />

      {/* Navbar */}
      <NavbarHome />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-24">
        
        <Card className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#111827]/80 shadow-[0_0_40px_rgba(108,77,255,0.18)] backdrop-blur-xl">
          
          <CardContent className="p-8 sm:p-10">
            
            {/* Logo / Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#6C4DFF] to-[#8B5CFF] shadow-lg shadow-[#6C4DFF]/30">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="font-['Poppins'] text-3xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Sign in to continue managing your videos,
                playlists, and shared content on WatchNest.
              </p>
            </div>

            {/* Login Button */}
            <div className="mt-8">
              
              <Button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/auth/account",
                  })
                }
                className="group h-12 w-full rounded-xl bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#8B5CFF]/30"
              >
                  {/* Google Icon */}

                Continue with Google

                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Bottom Text */}
            <p className="mt-6 text-center text-xs leading-5 text-gray-500">
              By continuing, you agree to WatchNest’s
              Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}