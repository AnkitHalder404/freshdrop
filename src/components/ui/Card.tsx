import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={cn(
      "bg-white border-3 border-neo-black shadow-neo p-6",
      "transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-neo-lg",
      onClick && "cursor-pointer",
      className
    )}
  >
    {children}
  </div>
);
