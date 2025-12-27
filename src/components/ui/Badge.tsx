import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'pink' | 'green' | 'red';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'yellow', className }) => {
  const colors = {
    yellow: 'bg-neo-yellow text-black',
    blue: 'bg-neo-blue text-white',
    pink: 'bg-neo-pink text-black',
    green: 'bg-neo-green text-white',
    red: 'bg-neo-red text-white'
  };

  return (
    <span className={cn(
      "px-3 py-1 text-xs font-bold border-2 border-neo-black shadow-neo-sm uppercase tracking-widest",
      colors[color],
      className
    )}>
      {children}
    </span>
  );
};
