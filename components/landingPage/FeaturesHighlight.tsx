"use client"

import { BookmarkPlus, ListVideo, Share2, Lock } from "lucide-react";
import { ReactNode } from "react";
import { C } from "./colors";
import { styles } from "./styles";

export function FeaturesHighlight() {
  const features: FeatureItem[] = [
    {
      icon: <BookmarkPlus size={22} />,
      iconColor: C.accent,
      title: "Save Anything",
      desc: "Add videos from YouTube, Vimeo, Drive and more with just a link.",
    },
    {
      icon: <ListVideo size={22} />,
      iconColor: C.green,
      title: "Organize Easily",
      desc: "Create playlists to keep your videos organized your way.",
    },
    {
      icon: <Lock size={22} />,
      iconColor: C.blue,
      title: "Private or Public",
      desc: "Keep playlists private or make them public to share with the world.",
    },
    {
      icon: <Share2 size={22} />,
      iconColor: C.rose,
      title: "Share & Discover",
      desc: "Share your playlists and discover great content from others.",
    },
  ];

  return (
    <section style={{ background: C.bgSecondary, padding: "80px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                ...styles.card,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,77,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `${f.iconColor}18`,
                  border: `1px solid ${f.iconColor}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.iconColor,
                }}
              >
                {f.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    marginBottom: 6,
                  }}
                >
                  {f.title}
                </div>
                <div style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureItem {
  icon: ReactNode;
  iconColor: string;
  title: string;
  desc: string;
}

