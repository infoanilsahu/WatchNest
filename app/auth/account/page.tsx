"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { NavbarHome } from "@/components/common/NavbarHome";

export default function Account() {
  const router = useRouter();

  const { data: session, status, update } = useSession();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.hasAccount === true
    ) {
      router.push("/dashboard/videos");
    } else if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router, session]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const email = session?.user?.email;

      const res = await axios.post(
        `/api/auth/account`,
        {
          username,
          name,
          email,
        }
      );

      if (
        res.status === 200 ||
        res.status === 201
      ) {
        await update({
          userId: res.data.account[0].userId,
        });

        router.push("/dashboard/videos");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data.message ||
            "Something went wrong"
        );
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#8B5CFF] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] font-['Inter'] text-white">
      
      {/* Glow Background */}
      <div className="absolute -left-30 -top-30 h-80 w-[320px] rounded-full bg-[#6C4DFF]/20 blur-3xl" />

      <div className="absolute -bottom-30 -right-30 h-80 w-[320px] rounded-full bg-[#8B5CFF]/20 blur-3xl" />

      {/* Navbar */}
      <NavbarHome />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center px-6 ">
        
        <Card className="w-full max-w-md rounded-[28px] border border-white/10 bg-[#111827]/80 shadow-[0_0_45px_rgba(108,77,255,0.18)] backdrop-blur-xl">
          
          <CardHeader className="space-y-3 pb-2 text-center">
            
            <CardTitle className="font-['Poppins'] text-3xl font-bold tracking-tight text-white">
              Create Account
            </CardTitle>

            <p className="text-sm leading-6 text-gray-400">
              Set up your WatchNest profile to start
              saving, organizing, and sharing videos.
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              
              {/* Username */}
              <div className="space-y-2">
                
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-300"
                >
                  Username
                </Label>

                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                  className="h-12 rounded-xl border border-white/10 bg-[#0B1023]/80 text-white placeholder:text-gray-500 focus-visible:border-[#8B5CFF] focus-visible:ring-[#8B5CFF]/30"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300"
                >
                  Full Name
                </Label>

                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="h-12 rounded-xl border border-white/10 bg-[#0B1023]/80 text-white placeholder:text-gray-500 focus-visible:border-[#8B5CFF] focus-visible:ring-[#8B5CFF]/30"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-linear-to-r from-[#6C4DFF] to-[#8B5CFF] text-sm font-medium text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#8B5CFF]/30 disabled:opacity-70"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              {/* Footer */}
              <p className="pt-2 text-center text-xs leading-5 text-gray-500">
                Your account information is used only
                for your WatchNest profile and playlists.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}