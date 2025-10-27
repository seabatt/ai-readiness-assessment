'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Info } from 'lucide-react';

interface ROICalculationModalProps {
  trigger?: React.ReactNode;
  className?: string;
}

export default function ROICalculationModal({ trigger, className = '' }: ROICalculationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = (e: React.MouseEvent | React.KeyboardEvent) => {
    triggerRef.current = e.currentTarget as HTMLElement;
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Restore focus to trigger element
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 0);
  };

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus management and trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Move focus to close button or modal container
    const initialFocus = closeButtonRef.current || modalRef.current;
    initialFocus?.focus();

    // Focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Guard against empty or single-element lists
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = focusableElements[0] as HTMLElement;
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

      // Single focusable element - prevent tabbing away
      if (focusableElements.length === 1) {
        e.preventDefault();
        firstFocusable?.focus();
        return;
      }

      // Handle backward tab
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Handle forward tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    // Use document listener to catch all tabs
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const defaultTrigger = (
    <button
      onClick={handleOpen}
      className="inline-flex items-center gap-1 text-accent-green hover:text-accent-green/80 transition-colors"
      aria-label="How is this calculated?"
    >
      <Info className="w-4 h-4" />
    </button>
  );

  if (!isOpen) {
    return (
      <span className={className}>
        {trigger ? (
          <span onClick={handleOpen} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleOpen(e)}>
            {trigger}
          </span>
        ) : (
          defaultTrigger
        )}
      </span>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative bg-[#1a1a1a] border border-brand-secondary/20 rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-brand-secondary/20 px-6 py-4 flex items-center justify-between">
              <h2 id="modal-title" className="text-2xl font-bold text-text-primary">How We Calculate Your ROI</h2>
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-8 text-text-secondary">
              {/* The Short Version */}
              <section>
                <h3 className="text-xl font-semibold text-text-primary mb-3">The Short Version</h3>
                <ol className="list-decimal list-inside space-y-2 text-lg">
                  <li>You tell us your <strong className="text-text-primary">ticket volumes</strong> and the <strong className="text-text-primary">average hands-on time</strong> it takes a person to handle them.</li>
                  <li>Based on your <strong className="text-text-primary">tech stack</strong>, we identify <strong className="text-text-primary">AI Workers</strong> (use cases) that can either fully handle or greatly speed up those tickets.</li>
                  <li>We <strong className="text-text-primary">avoid double-counting</strong> by only using the remaining tickets in each category as we add use cases.</li>
                  <li>We translate time saved into two views:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li><strong className="text-text-primary">Capacity FTE</strong> (operational headroom)</li>
                      <li><strong className="text-text-primary">Budget FTE</strong> (realistic financial impact)</li>
                    </ul>
                  </li>
                  <li>We apply <strong className="text-text-primary">confidence</strong> and show <strong className="text-text-primary">Expected / P70 / P90</strong> ranges so you can choose how conservative you want to be.</li>
                </ol>
              </section>

              {/* Key Concepts */}
              <section>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Key Concepts</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-accent-green/10 border border-accent-green/30 rounded-lg">
                    <h4 className="font-semibold text-accent-green mb-2">Capacity FTE vs Budget FTE</h4>
                    <p className="text-lg"><strong className="text-text-primary">Capacity FTE</strong> shows operational headroom (hours saved converted to an annualized FTE using 2,000 hours/FTE). It's useful for planning workload and SLAs.</p>
                    <p className="text-lg mt-2"><strong className="text-text-primary">Budget FTE</strong> reflects what typically turns into budget-relevant capacity. We apply a <strong className="text-text-primary">capture rate</strong> (how much saved time becomes truly usable—default 50%) and <strong className="text-text-primary">effective hours per FTE</strong> (realistic annual working hours—default 1,800).</p>
                  </div>

                  <div className="p-4 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
                    <h4 className="font-semibold text-accent-blue mb-2">Confidence Bands</h4>
                    <p className="text-lg">Not every organization sees the same outcomes. Each worker has a confidence score. We weight savings by confidence and present:</p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-lg">
                      <li><strong className="text-text-primary">Expected</strong> (our best estimate)</li>
                      <li><strong className="text-text-primary">P70</strong> (conservative)</li>
                      <li><strong className="text-text-primary">P90</strong> (more conservative)</li>
                    </ul>
                    <p className="text-lg mt-2">This gives you a range to share with stakeholders depending on your risk tolerance.</p>
                  </div>
                </div>
              </section>

              {/* How Savings Are Calculated */}
              <section>
                <h3 className="text-xl font-semibold text-text-primary mb-3">How Savings Are Calculated</h3>
                <div className="space-y-3 text-lg">
                  <p>For each matching AI Worker:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>We determine how many tickets it can handle from the <strong className="text-text-primary">remaining pool</strong> in that category.</li>
                    <li>We estimate <strong className="text-text-primary">time saved per ticket</strong>:
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li>If the task is fully automated: the <strong className="text-text-primary">full hands-on time</strong> is saved.</li>
                        <li>If it still needs a quick review/approval: we save the <strong className="text-text-primary">difference</strong> between the original time and the short micro-touch (typically ~5 minutes).</li>
                      </ul>
                    </li>
                    <li>If a small share of tickets still require a person (approvals/exceptions), we reduce the savings for those.</li>
                  </ul>
                  <p className="mt-3">We add up the hours across all workers to get <strong className="text-text-primary">total hours saved per month</strong>. If totals ever exceed your overall ticket count, we automatically <strong className="text-text-primary">cap and scale</strong> the result so it stays realistic.</p>
                </div>
              </section>

              {/* Guardrails */}
              <section>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Guardrails That Keep Results Honest</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 bg-bg-primary/50 rounded border border-brand-secondary/10">
                    <span className="text-accent-green font-medium">✓</span> No double-counting within a category
                  </div>
                  <div className="p-3 bg-bg-primary/50 rounded border border-brand-secondary/10">
                    <span className="text-accent-green font-medium">✓</span> Caps to prevent saving more tickets than you have
                  </div>
                  <div className="p-3 bg-bg-primary/50 rounded border border-brand-secondary/10">
                    <span className="text-accent-green font-medium">✓</span> Confidence-weighted outcomes
                  </div>
                  <div className="p-3 bg-bg-primary/50 rounded border border-brand-secondary/10">
                    <span className="text-accent-green font-medium">✓</span> Conservative defaults for micro-touch and capture rate
                  </div>
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Why two FTE numbers?</h4>
                    <p className="text-lg">Capacity FTE describes operational headroom. Budget FTE is what usually translates into budget or hiring decisions.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Why not just divide by 2,000 and be done?</h4>
                    <p className="text-lg">Because saved minutes rarely convert 1:1 into money. Capture rate and effective hours reflect how teams actually work.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Our tickets still need approvals—does that inflate savings?</h4>
                    <p className="text-lg">No. If a worker still needs a quick human touch, we subtract that micro-touch from the saved time.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Where do the worker confidence scores come from?</h4>
                    <p className="text-lg">From real-world maturity of the automation and how well it fits your stack. We weight savings by those scores.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-brand-secondary/20 px-6 py-4">
              <button
                onClick={handleClose}
                className="w-full bg-accent-green text-black font-medium py-3 px-6 rounded-lg hover:bg-accent-green/90 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
