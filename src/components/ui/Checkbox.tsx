import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Checkbox({ label, checked, onChange, disabled = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            w-6 h-6 
            border-2 
            rounded 
            transition-all
            flex items-center justify-center
            ${checked 
              ? 'bg-accent-blue border-accent-blue' 
              : 'bg-transparent border-brand-tertiary group-hover:border-brand-secondary'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {checked && (
            <svg className="w-4 h-4 text-bg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className="text-text-secondary group-hover:text-text-primary transition-colors">
        {label}
      </span>
    </label>
  );
}
