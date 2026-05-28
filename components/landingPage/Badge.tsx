import { ReactNode } from "react";
import { C } from "./colors";

export function Badge({ children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "rgba(108,77,255,0.15)",
        border: `1px solid rgba(108,77,255,0.35)`,
        color: C.violet,
        borderRadius: 100,
        padding: "6px 16px",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontFamily: "'Poppins', sans-serif",
        marginBottom: 20,
      }}
    >
      {children}
    </span>
  );
}

interface BadgeProps {
  children: ReactNode;
}