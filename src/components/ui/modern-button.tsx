import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const modernButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: 
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md border border-blue-600 hover:border-blue-700",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:shadow-md border border-red-500 hover:border-red-600",
        outline:
          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-sm hover:shadow-md",
        secondary:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 hover:border-slate-300 shadow-sm",
        ghost: 
          "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
        success:
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md border border-emerald-600 hover:border-emerald-700",
        glass:
          "glass text-slate-700 hover:bg-white/95",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ModernButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modernButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false, 
    icon, 
    iconPosition = "left",
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(modernButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -top-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_0.8s_ease-out]" />
        
        {/* Content */}
        <div className="relative flex items-center gap-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            icon && iconPosition === "left" && (
              <span className="w-4 h-4">{icon}</span>
            )
          )}
          
          {children && <span>{children}</span>}
          
          {!loading && icon && iconPosition === "right" && (
            <span className="w-4 h-4">{icon}</span>
          )}
        </div>
      </Comp>
    );
  },
);

ModernButton.displayName = "ModernButton";

// Floating Action Button
interface FABProps extends Omit<ModernButtonProps, 'size' | 'variant'> {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ className, position = 'bottom-right', children, ...props }, ref) => {
    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'top-right': 'fixed top-6 right-6',
      'top-left': 'fixed top-6 left-6',
    };

    return (
      <ModernButton
        ref={ref}
        size="icon"
        className={cn(
          positionClasses[position],
          'w-14 h-14 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 z-50 animate-float',
          className
        )}
        {...props}
      >
        {children}
      </ModernButton>
    );
  }
);

FloatingActionButton.displayName = "FloatingActionButton";

export { ModernButton, modernButtonVariants };