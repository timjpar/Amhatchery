import Link from "next/link";

interface ButtonBaseProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ButtonActionProps extends ButtonBaseProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

type ButtonProps = ButtonLinkProps | ButtonActionProps;

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-150 rounded-btn no-underline hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:translate-y-px";

const sizeStyles = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  external,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = `${baseStyles} ${sizeStyles[size]} ${
    variant === "ghost" ? "" : "hover:opacity-90"
  } ${className}`;

  const inlineStyle: React.CSSProperties =
    variant === "primary"
      ? { background: "var(--c-brand)", color: "var(--c-brand-fg)" }
      : variant === "secondary"
      ? { background: "var(--c-accent)", color: "var(--c-accent-fg)" }
      : variant === "outline"
      ? {
          background: "transparent",
          border: "1.5px solid var(--c-brand)",
          /* Border carries the brand color; the label uses the darker
             text-weight variant so it stays legible at button sizes. */
          color: "var(--c-link)",
        }
      : { background: "transparent", color: "var(--c-link)" };

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          style={inlineStyle}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={inlineStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
      style={inlineStyle}
    >
      {children}
    </button>
  );
}
