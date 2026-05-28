"use client"

import { ChevronRight, FolderOpen, Link2, Share2, Lock } from "lucide-react";
import { C } from "./colors";
import { styles } from "./styles";
import { Badge } from "./Badge";
import { ReactNode } from "react";

export function HowItWorks() {
  const steps: StepItem[] = [
    { num: "1", icon: <Link2 size={24} />, title: "Add Video", desc: "Paste the link of any video and add it to your library." },
    { num: "2", icon: <FolderOpen size={24} />, title: "Create Playlist", desc: "Organize your videos into playlists with title and description." },
    { num: "3", icon: <Lock size={24} />, title: "Choose Privacy", desc: "Keep it private or make it public to share with others." },
    { num: "4", icon: <Share2 size={24} />, title: "Share & Enjoy", desc: "Share the link and let others watch your curated playlist." },
  ];

  return (
    <section style={{ background: C.bgSecondary, padding: "96px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
        <Badge>Easy as 1-2-3</Badge>
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(28px, 3.5vw, 44px)",
            fontWeight: 800,
            margin: "0 0 64px",
            letterSpacing: "-0.02em",
          }}
        >
          How WatchNest Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
            position: "relative",
          }}
        >
          {steps.map((step, i) => (
            <div key={step.title} style={{ position: "relative" }}>
              <div
                style={{
                  ...styles.card,
                  textAlign: "center",
                  padding: 32,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,77,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${C.primary}22, ${C.accent}22)`,
                    border: `1px solid ${C.primary}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    color: C.violet,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    marginBottom: 10,
                  }}
                >
                  {step.num}. {step.title}
                </div>
                <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: -12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    color: C.primary,
                  }}
                >
                  <ChevronRight size={20} style={{ opacity: 0.4 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


interface StepItem {
  num: string;
  icon: ReactNode;
  title: string;
  desc: string;
}



