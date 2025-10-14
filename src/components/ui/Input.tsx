import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-text-tertiary mb-2">
          {label}
          {props.required && <span className="text-accent-orange ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full
          bg-bg-card
          border border-brand-tertiary/30
          text-text-primary
          px-4 py-3
          rounded-lg
          focus:border-accent-blue
          focus:outline-none
          focus:ring-2
          focus:ring-accent-blue/20
          transition-all
          placeholder:text-text-tertiary/50
          ${error ? 'border-accent-orange' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-accent-orange mt-1">{error}</p>}
    </div>
  );
}
