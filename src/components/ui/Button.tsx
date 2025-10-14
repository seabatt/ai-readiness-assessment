import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'font-semibold px-6 py-3 rounded-pill transition-all duration-300 flex items-center gap-2';
  
  const variants = {
    primary: 'bg-brand-primary text-bg-primary hover:bg-brand-secondary hover:scale-[1.02] shadow-card',
    secondary: 'bg-transparent border border-brand-secondary text-brand-primary hover:bg-brand-primary/5 hover:border-brand-primary',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="w-2 h-2 bg-accent-green rounded-full" />
      {children}
      <span className="text-xl">›</span>
    </button>
  );
}
