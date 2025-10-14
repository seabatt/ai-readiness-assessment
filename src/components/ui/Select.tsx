import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export default function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-text-tertiary mb-2">
          {label}
          {props.required && <span className="text-accent-orange ml-1">*</span>}
        </label>
      )}
      <select
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
          cursor-pointer
          ${error ? 'border-accent-orange' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-accent-orange mt-1">{error}</p>}
    </div>
  );
}
