"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface UnlockReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS = [
  { value: "it-manager", label: "IT Manager" },
  { value: "it-director", label: "IT Director" },
  { value: "vp-it", label: "VP of IT" },
  { value: "cto", label: "CTO" },
  { value: "cio", label: "CIO" },
  { value: "other", label: "Other" },
];

export default function UnlockReportModal({
  isOpen,
  onClose,
}: UnlockReportModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Integrate with CRM (HubSpot/Salesforce)
    console.log("Form submitted:", formData);

    // Show success state
    setSubmitted(true);

    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-card border border-brand-secondary/20 rounded-lg shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Move from Blueprint to Proof.
          </h2>
          <p className="text-lg text-text-secondary mb-6">
            Your Blueprint shows what's possible — now validate it with your real data.
          </p>

          <a 
            href="https://www.ai.work/book-a-demo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-highlight"></span>
            <span className="flex-1 text-center">Run Your Data Science Assessment</span>
            <span>&gt;</span>
          </a>

          <p className="text-sm text-text-tertiary">
            Quantify impact. Verify accuracy. Build your deployment plan.
          </p>
        </div>
      </div>
    </div>
  );
}
