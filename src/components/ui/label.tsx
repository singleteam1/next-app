import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Label primitive passes htmlFor and children via props
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none select-none text-neutral-800 dark:text-neutral-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        {...props}
      />
    );
  },
);

Label.displayName = "Label";
