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
          border border-bg-card-alt/20
          text-text-primary
          px-4 py-3
          rounded-lg
          focus:border-highlight
          focus:outline-none
          focus:ring-2
          focus:ring-highlight/30
          transition-all duration-200
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
