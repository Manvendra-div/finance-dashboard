import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const win2kBorder = {
  borderTop: "2px solid #ffffff",
  borderLeft: "2px solid #ffffff",
  borderRight: "2px solid #404040",
  borderBottom: "2px solid #404040",
  outline: "1px solid #808080",
  outlineOffset: "-1px",
};

const win2kBorderPressed = {
  borderTop: "2px solid #404040",
  borderLeft: "2px solid #404040",
  borderRight: "2px solid #ffffff",
  borderBottom: "2px solid #ffffff",
  outline: "1px solid #808080",
  outlineOffset: "-1px",
};

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap text-[11px] font-normal",
    "bg-[#D4D0C8] text-black cursor-default select-none",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0A246A] focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-x-px active:translate-y-px",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        destructive: "text-red-700",
        outline: "",
        secondary: "",
        ghost: "bg-transparent border-none outline-none shadow-none hover:bg-[#D4D0C8]/50",
        link: "bg-transparent border-none outline-none text-[#0000ff] underline shadow-none",
      },
      size: {
        default: "h-[23px] px-3 py-0.5 min-w-[75px]",
        sm: "h-[21px] px-2 py-0 text-[11px]",
        lg: "h-[27px] px-6 py-1",
        icon: "h-[23px] w-[23px] p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, style, ...props }, ref) => {
    const isGhost = variant === "ghost";
    const isLink = variant === "link";
    const borderStyle = isGhost || isLink ? {} : win2kBorder;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ ...borderStyle, fontFamily: "Tahoma, Verdana, Arial, sans-serif", ...style }}
        onMouseDown={(e) => {
          if (!isGhost && !isLink) {
            const target = e.currentTarget;
            Object.assign(target.style, win2kBorderPressed);
          }
          props.onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          if (!isGhost && !isLink) {
            const target = e.currentTarget;
            Object.assign(target.style, { ...win2kBorder, fontFamily: "Tahoma, Verdana, Arial, sans-serif" });
          }
          props.onMouseUp?.(e);
        }}
        onMouseLeave={(e) => {
          if (!isGhost && !isLink) {
            const target = e.currentTarget;
            Object.assign(target.style, { ...win2kBorder, fontFamily: "Tahoma, Verdana, Arial, sans-serif" });
          }
          props.onMouseLeave?.(e);
        }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
