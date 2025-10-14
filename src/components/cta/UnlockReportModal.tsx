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

        {submitted ? (
          // Success state
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-accent-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Report Unlocked!
            </h3>
            <p className="text-text-secondary">
              Check your email for the full PDF report.
            </p>
          </div>
        ) : (
          // Form
          <>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Unlock Your Full Report
            </h2>
            <p className="text-text-secondary mb-6">
              Get the downloadable PDF and email summary with your complete
              readiness assessment and next steps.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="John Doe"
              />

              <Input
                label="Work Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="john@company.com"
              />

              <Input
                label="Company"
                required
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Acme Corp"
              />

              <Select
                label="Role"
                required
                value={formData.role}
                onChange={(e) => updateField("role", e.target.value)}
                options={ROLE_OPTIONS}
              />

              <Button type="submit" className="w-full justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Unlock Report
              </Button>

              <p className="text-xs text-text-tertiary text-center">
                Your information is secure and will only be used to send your
                report.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
