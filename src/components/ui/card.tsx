import type { CardProps } from "./types";

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-card ${className}`.trim()}
      {...props}
    />
  );
}
