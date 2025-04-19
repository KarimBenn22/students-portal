import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [transition-property:all] [transition-timing-function:cubic-bezier(.4,0,.2,1)] [transition-duration:0.2s] [will-change:transform]",
  {
    variants: {
      variant: {
        default:
          "from-primary to-primary/85 text-primary-foreground border border-zinc-950/25 bg-gradient-to-t transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-white/20",
        destructive:
          "from-destructive to-destructive/85 text-destructive-foreground border border-zinc-950/25 bg-gradient-to-t shadow-md shadow-zinc-950/20 ring-1 ring-inset ring-white/20 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-white/15 dark:ring-transparent",
        secondary:
          "from-secondary to-secondary/85 text-secondary-foreground border border-zinc-950/25 bg-gradient-to-t shadow-md shadow-zinc-950/20 ring-1 ring-inset ring-white/20 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-white/20 dark:ring-transparent",
        outline:
          "bg-muted hover:bg-background dark:bg-muted/25 dark:hover:bg-muted/50 dark:border-border inset-shadow-2xs inset-shadow-white dark:inset-shadow-transparent relative flex border border-zinc-300 shadow-sm shadow-zinc-950/10 ring-0 duration-150",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:scale-[0.98] active:scale-[0.97]",
        link: "text-primary underline-offset-4 hover:underline hover:opacity-90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      prefixIcon,
      suffixIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            <span className="sr-only">Loading</span>
            {typeof children === "string" ? children : null}
          </>
        ) : (
          <>
            {prefixIcon && (
              <span className="button-icon-prefix" aria-hidden="true">
                {prefixIcon}
              </span>
            )}
            {children}
            {suffixIcon && (
              <span className="button-icon-suffix" aria-hidden="true">
                {suffixIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
