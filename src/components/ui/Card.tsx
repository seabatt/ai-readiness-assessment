import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-bg-card 
        border border-brand-secondary/10 
        rounded-card 
        p-8
        ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/20 hover:shadow-card-hover' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
