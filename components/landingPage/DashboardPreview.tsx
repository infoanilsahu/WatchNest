import { Clock, FolderOpen, Heart, ListVideo, MoreVertical, Pencil, Play, Plus, Users } from "lucide-react";
import { C } from "./colors";
import { styles } from "./styles";

export function DashboardPreview() {
  const videos: VideoItem[] = [
    { title: "Exploring the Future of AI", duration: "12:45", source: "YouTube", color: "#FF0000" },
    { title: "Bali Travel Guide 2024", duration: "8:32", source: "YouTube", color: "#FF0000" },
    { title: "Minimal Web Design Tips", duration: "14:20", source: "Vimeo", color: "#1AB7EA" },
    { title: "Inception (2010)", duration: "2:18:33", source: "Drive", color: "#4285F4" },
  ];

  const sidebarItems = [
    { icon: <ListVideo size={13} />, label: "My Library", active: true },
    { icon: <FolderOpen size={13} />, label: "Playlists", active: false },
    { icon: <Users size={13} />, label: "Shared with me", active: false },
    { icon: <Heart size={13} />, label: "Favorites", active: false },
    { icon: <Clock size={13} />, label: "Watch Later", active: false },
  ];

  const playlistColors: string[] = [C.primary, C.green, C.rose, C.blue];

  return (
    <div
      style={{
        ...styles.glassCard,
        padding: 0,
        overflow: "hidden",
        width: "100%",
        maxWidth: 480,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={12} fill="#fff" color="#fff" />
          </div>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13 }}>WatchNest</span>
        </div>
        <span style={{ fontWeight: 600, fontSize: 14 }}>My Library</span>
        <button style={{ ...styles.btnPrimary, padding: "6px 14px", fontSize: 12, borderRadius: 10 }}>
          <Plus size={12} /> Add Video
        </button>
      </div>

      {/* Body */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: 150, borderRight: `1px solid ${C.border}`, padding: "12px 0" }}>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                fontSize: 12,
                color: item.active ? C.text : C.textMuted,
                background: item.active ? "rgba(108,77,255,0.1)" : "transparent",
                borderLeft: item.active ? `2px solid ${C.primary}` : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}

          <div
            style={{
              padding: "12px 16px 4px",
              fontSize: 10,
              color: C.textDis,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Your Playlists
          </div>
          {(["Tech Talks", "Travel Vibes", "Movie Nights", "Design Inspo"] as const).map((pl, i) => (
            <div
              key={pl}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                fontSize: 11,
                color: C.textMuted,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 16,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${playlistColors[i]}, ${C.accent})`,
                }}
              />
              <span>{pl}</span>
            </div>
          ))}

          <div style={{ padding: "8px 16px" }}>
            <button
              style={{
                ...styles.btnSecondary,
                padding: "5px 10px",
                fontSize: 10,
                borderRadius: 8,
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Plus size={10} /> New Playlist
            </button>
          </div>
        </div>

        {/* Video list */}
        <div style={{ flex: 1 }}>
          {videos.map((v) => (
            <div
              key={v.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderBottom: `1px solid ${C.border}`,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 44,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, #1a1f35, #0d1226)`,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Play size={14} fill={C.textMuted} color={C.textMuted} />
                <span
                  style={{
                    position: "absolute",
                    bottom: 3,
                    right: 4,
                    fontSize: 9,
                    color: C.textSec,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: 3,
                    padding: "1px 3px",
                  }}
                >
                  {v.duration}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: C.text,
                    marginBottom: 3,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: v.color }} />
                  <span style={{ fontSize: 10, color: C.textMuted }}>{v.source}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Pencil size={12} color={C.textDis} />
                <MoreVertical size={12} color={C.textDis} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface VideoItem {
  title: string;
  duration: string;
  source: string;
  color: string;
}