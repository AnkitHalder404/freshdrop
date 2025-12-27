import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, variant = 'primary', className = '', disabled = false, isLoading = false, ...props }, ref) => {
    const variants = {
      primary: "bg-neo-blue text-white hover:bg-blue-600",
      secondary: "bg-white text-neo-black hover:bg-gray-100",
      accent: "bg-neo-yellow text-neo-black hover:bg-yellow-400",
      danger: "bg-neo-pink text-neo-black hover:bg-pink-400"
    };

    return (
      <button 
        ref={ref}
        onClick={onClick} 
        disabled={disabled || isLoading}
        className={cn(
          "relative px-6 py-3 font-bold uppercase tracking-wider border-3 border-neo-black shadow-neo",
          "transition-all active:shadow-neo-pressed active:translate-x-[4px] active:translate-y-[4px]",
          "flex items-center justify-center gap-2",
          variants[variant],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
