import * as React from "react";
import { cn } from "@/lib/utils";

// Win2000-style window panel with title bar + content area
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-[#D4D0C8] text-foreground",
      className
    )}
    style={{
      border: "2px solid",
      borderTopColor: "#ffffff",
      borderLeftColor: "#ffffff",
      borderBottomColor: "#404040",
      borderRightColor: "#404040",
      outline: "1px solid #808080",
      outlineOffset: "-1px",
    }}
    {...props}
  />
));
Card.displayName = "Card";

// Win2000 title bar for the card
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { titleBar?: boolean }
>(({ className, titleBar = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      titleBar
        ? "win-titlebar flex items-center px-2 py-0.5 text-white font-bold text-xs"
        : "flex flex-col space-y-0.5 px-3 pt-2 pb-1",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xs font-bold text-foreground", className)}
    style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[11px] text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-3 pb-3 pt-1", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-3 pb-2", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
