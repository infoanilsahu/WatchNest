export function GlowOrb({ x, y, color = C.primary, size = 400, opacity = 0.15 }: GlowOrbProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        filter: "blur(100px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

import { C } from "./colors";

interface GlowOrbProps {
  x: string | number;
  y: string | number;
  color?: string;
  size?: number;
  opacity?: number;
}
