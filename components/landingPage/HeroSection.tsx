"use client"


import { Badge } from "./Badge";
import { ArrowRight, Check, Play } from "lucide-react";
import { C } from "./colors";
import { styles } from "./styles";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import preview from "./../../assests/preview.png";

export function HeroSection() {

  const router = useRouter()

  return (
    <section className="relative flex w-full overflow-hidden bg-[#050816] py-1 px-3 text-white ">
      
      

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 lg:flex-row">
        
        {/* Left Content */}
        <div className="flex w-full lg:pl-5 max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          
          <Badge>Your Videos. Your Playlists.</Badge>

          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.6rem, 7vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginTop: 18,
            }}
          >
            Save. Organize.
            <br />
            Share. Watch.
            <br />
            <span style={styles.gradText}>Together.</span>
          </h1>

          <p
            className="mt-6 max-w-xl text-sm leading-7 sm:text-base"
            style={{ color: C.textSec }}
          >
            WatchNest lets you save videos from anywhere,
            organize them into playlists, and share with
            anyone. Your library, your way.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            
            <button
              onClick={() => router.push("/auth/login")}
              style={styles.btnPrimary}
              className="flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={16} />
            </button>

            <button
              style={styles.btnSecondary}
              className="flex items-center justify-center gap-3"
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Play size={10} fill="#fff" color="#fff" />
              </div>

              Watch Demo
            </button>
          </div>

          {/* Bottom Text */}
          <div
            className="mt-5 flex items-center gap-2 text-sm"
            style={{ color: C.textMuted }}
          >
            <Check size={14} color={C.green} />
            No credit card required
          </div>
        </div>

        {/* Right Preview */}
        <div className="flex w-full justify-center lg:justify-end">
          
          <div className="relative w-full max-w-900">
            
            <div
              className="absolute inset-0 rounded-[32px] blur-3xl"
              style={{
                background: `linear-gradient(135deg, ${C.primary}40, ${C.accent}30)`,
              }}
            />

            <img
              src={preview.src}
              alt="WatchNest Preview"
              className="relative w-full z-10 rounded-[28px] border border-white/10 shadow-2xl"
            />

            {/* Optional Next Image */}
            {/*
            <Image
              src={preview}
              alt="WatchNest Preview"
              className="relative z-10 w-full rounded-[28px] border border-white/10 shadow-2xl"
            />
            */}
          </div>
        </div>
      </div>
    </section>
  );
}