import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block font-mono font-bold text-sm uppercase mb-2">
            {label}
          </label>
        )}
        <input 
          ref={ref}
          {...props}
          className={cn(
            "w-full bg-white border-3 border-neo-black p-3 font-mono text-neo-black",
            "placeholder-gray-500 focus:outline-none focus:shadow-neo transition-all",
            error && "border-neo-red",
            className
          )}
        />
        {error && (
          <p className="mt-1 text-sm font-mono text-neo-red">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
