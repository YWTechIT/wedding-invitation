import type { ButtonProps, ButtonVariant } from "./types";

const BASE_CLASS_NAME = "flex w-full items-center justify-center gap-2";

const VARIANT_CLASS_NAMES: Record<ButtonVariant, string> = {
  primary: "h-[52px] rounded-full bg-primary text-base text-white",
  secondary:
    "h-12 rounded-full border border-foreground bg-card text-[15px] text-foreground",
  square:
    "h-[52px] rounded-xl border border-line bg-card text-base text-foreground",
};

export function Button({
  variant = "primary",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(variant, className)}
      {...props}
    />
  );
}

/** Lets links (`tel:`, map apps) share the button look without being a <button>. */
export function getButtonClassName(variant: ButtonVariant, className = "") {
  return `${BASE_CLASS_NAME} ${VARIANT_CLASS_NAMES[variant]} ${className}`.trim();
}
