import { GlowOrb } from "./GlowOrb";
import { Badge } from "./Badge";
import { ArrowRight, Check, Play } from "lucide-react";
import { C } from "./colors";
import { styles } from "./styles";
import { DashboardPreview } from "./DashboardPreview";


export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 100px",
      }}
    >
      <GlowOrb x="-10%" y="-20%" color={C.primary} size={600} opacity={0.18} />
      <GlowOrb x="60%" y="10%" color={C.accent} size={500} opacity={0.12} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 64, flexWrap: "wrap" }}>
          {/* Left */}
          <div style={{ flex: "1 1 420px" }}>
            <Badge>Your Videos. Your Playlists.</Badge>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(40px, 5vw, 64px)",
                fontWeight: 800,
                lineHeight: 1.1,
                margin: "0 0 8px",
                letterSpacing: "-0.02em",
              }}
            >
              Save. Organize.
              <br />
              Share. Watch.
              <br />
              <span style={styles.gradText}>Together.</span>
            </h1>
            <p style={{ color: C.textSec, fontSize: 17, lineHeight: 1.7, margin: "20px 0 36px", maxWidth: 460 }}>
              WatchNest lets you save videos from anywhere, organize them into playlists, and share with anyone.
              Your library, your way.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button style={styles.btnPrimary}>
                Get Started for Free <ArrowRight size={16} />
              </button>
              <button style={styles.btnSecondary}>
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
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: C.textMuted,
                fontSize: 13,
              }}
            >
              <Check size={14} color={C.green} />
              No credit card required
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div style={{ flex: "1 1 400px", display: "flex", justifyContent: "flex-end" }}>
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}


