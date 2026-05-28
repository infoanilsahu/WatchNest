import { ArrowRight, Check, Play } from "lucide-react";
import { C } from "./colors";
import { GlowOrb } from "./GlowOrb";
import { styles } from "./styles";

export function CTASection() {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${C.primary}22, ${C.accent}15)`,
            border: `1px solid ${C.primary}30`,
            borderRadius: 28,
            padding: "60px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 80px rgba(108,77,255,0.15)`,
          }}
        >
          <GlowOrb x="-5%" y="-40%" color={C.primary} size={350} opacity={0.2} />
          <GlowOrb x="70%" y="30%" color={C.accent} size={300} opacity={0.15} />

          <div style={{ display: "flex", alignItems: "center", gap: 24, zIndex: 1, flexWrap: "wrap" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 30px rgba(108,77,255,0.4)`,
                flexShrink: 0,
              }}
            >
              <Play size={32} fill="#fff" color="#fff" />
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(22px, 3vw, 36px)",
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}
              >
                Ready to build your WatchNest?
              </h2>
              <p style={{ color: C.textSec, fontSize: 16, margin: 0 }}>
                Start saving, organizing and sharing videos today.
              </p>
            </div>
          </div>

          <div style={{ zIndex: 1, textAlign: "center" }}>
            <button style={{ ...styles.btnPrimary, fontSize: 16, padding: "14px 32px" }}>
              Get Started for Free <ArrowRight size={18} />
            </button>
            <div
              style={{
                marginTop: 10,
                color: C.textMuted,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
                justifyContent: "center",
              }}
            >
              <Check size={13} color={C.green} /> No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
