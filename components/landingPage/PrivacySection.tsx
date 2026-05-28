import { Globe, Lock, MoreVertical } from "lucide-react";
import { ReactNode } from "react";
import { C } from "./colors";
import { styles } from "./styles";
import { GlowOrb } from "./GlowOrb";
import { Badge } from "./Badge";

export function PrivacySection() {
  const privacyOptions: Array<{ icon: ReactNode; color: string; title: string; desc: string }> = [
    { icon: <Lock size={18} />, color: C.blue, title: "Private", desc: "Only you can see and manage." },
    { icon: <Globe size={18} />, color: C.green, title: "Public", desc: "Anyone with the link can view." },
  ];

  const playlists: PlaylistItem[] = [
    {
      title: "My Study Playlist",
      count: 12,
      updated: "2 days ago",
      type: "Private",
      icon: <Lock size={12} />,
      iconColor: C.textMuted,
    },
    {
      title: "Best Design Talks",
      count: 18,
      updated: "5 days ago",
      type: "Public",
      icon: <Globe size={12} />,
      iconColor: C.green,
    },
  ];

  const thumbBg = ["#1a2a4a", "#1a1a3a"];

  return (
    <section style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
      <GlowOrb x="55%" y="0%" color={C.blue} size={400} opacity={0.1} />
      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 360px" }}>
            <Badge>Share Your World</Badge>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(32px, 4vw, 50px)",
                fontWeight: 800,
                lineHeight: 1.15,
                margin: "0 0 20px",
                letterSpacing: "-0.02em",
              }}
            >
              Private or Public.
              <br />
              You're in Control.
            </h2>
            <p style={{ color: C.textSec, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              Create playlists for yourself or share them with others. Make them public and share a link — anyone
              with the link can view your playlist. Simple and powerful.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {privacyOptions.map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.color,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 14 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ flex: "1 1 360px" }}>
            <div style={{ ...styles.glassCard, padding: 0, overflow: "hidden" }}>
              {playlists.map((pl, i) => (
                <div
                  key={pl.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "18px 20px",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 44,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${thumbBg[i]}, ${C.bgSecondary})`,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        marginBottom: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {pl.title}
                      <span style={{ color: pl.iconColor }}>{pl.icon}</span>
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 12 }}>
                      {pl.count} videos · Updated {pl.updated}
                    </div>
                  </div>
                  <div
                    style={{
                      background: `${pl.type === "Private" ? C.textDis : C.green}18`,
                      border: `1px solid ${pl.type === "Private" ? C.textDis : C.green}40`,
                      color: pl.type === "Private" ? C.textMuted : C.green,
                      borderRadius: 8,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {pl.type}
                  </div>
                  <MoreVertical size={16} color={C.textDis} />
                </div>
              ))}

              {/* Share box */}
              <div style={{ padding: 20 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Share Playlist</div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div
                    style={{
                      flex: 1,
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 12,
                      color: C.textMuted,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    https://watchnest.app/playlist/best-design-talks
                  </div>
                  <button
                    style={{ ...styles.btnPrimary, padding: "10px 18px", fontSize: 13, borderRadius: 10 }}
                  >
                    Copy Link
                  </button>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: C.textMuted,
                    fontSize: 12,
                  }}
                >
                  <Globe size={12} color={C.green} />
                  Anyone with the link can view this playlist.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


interface PlaylistItem {
  title: string;
  count: number;
  updated: string;
  type: "Private" | "Public";
  icon: ReactNode;
  iconColor: string;
}

