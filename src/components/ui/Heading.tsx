import React from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ children, size = 'xl', className = '' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
    '2xl': 'text-6xl'
  };

  return (
    <h1 className={cn(
      "font-display font-black text-neo-black uppercase leading-tight",
      sizes[size],
      className
    )}>
      {children}
    </h1>
  );
};
