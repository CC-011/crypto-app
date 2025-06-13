"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  color?: string;
  background?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color, background, ...props }, ref) => {
  const isTailwindFill = color?.startsWith("bg-");
  const isTailwindBg = background?.startsWith("bg-");

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full",
        isTailwindBg ? background : "bg-muted",
        className
      )}
      style={{
        ...(isTailwindBg ? {} : { backgroundColor: background }),
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all",
          isTailwindFill ? color : ""
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          ...(isTailwindFill ? {} : { backgroundColor: color }),
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
