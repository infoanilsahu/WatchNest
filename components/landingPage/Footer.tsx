"use client"

import { Play, X, Code2, Globe } from "lucide-react";
import { ReactNode } from "react";
import { C } from "./colors";
import { styles } from "./styles";
import watchnest from "./../../assests/logo.svg";

export function Footer() {
  const cols: FooterCol[] = [
    { heading: "Product", links: ["Features", "Explore", "How It Works", "Updates"] },
    { heading: "Company", links: ["About Us", "Blog", "Contact", "Privacy Policy"] },
    { heading: "Support", links: ["Help Center", "FAQ", "Terms of Service"] },
  ];

  const socialIcons: ReactNode[] = [<X size={17} />, <Code2 size={17} />, <Globe size={17} />];

  return (
    <footer
      style={{
        background: C.bgSecondary,
        borderTop: `1px solid ${C.border}`,
        padding: "64px 24px 32px",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ flex: "1 1 240px", minWidth: 200 }}>
            <div className="w-60" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={watchnest.src} alt="watchnest logo" />
            </div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Your space to save, organize and share videos in playlists.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              {socialIcons.map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.textMuted,
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = C.violet;
                    e.currentTarget.style.borderColor = C.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = C.textMuted;
                    e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading} style={{ flex: "1 1 130px" }}>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                {col.heading}
              </div>
              {col.links.map((link) => (
                <div
                  key={link}
                  style={{
                    color: C.textMuted,
                    fontSize: 14,
                    marginBottom: 10,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = C.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = C.textMuted;
                  }}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}

          
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ color: C.textDis, fontSize: 13 }}>© 2024 WatchNest. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            {(["Privacy Policy", "Terms of Service", "Cookies"] as const).map((l) => (
              <span key={l} style={{ color: C.textDis, fontSize: 13, cursor: "pointer" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterCol {
  heading: string;
  links: string[];
}

