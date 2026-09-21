import type { ComponentProps } from "react";

export type SectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export type ButtonVariant = "primary" | "secondary" | "square";

export type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export type CardProps = ComponentProps<"div">;
