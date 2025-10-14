import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import { LeadFormData } from '@/types';

const ITSM_PLATFORMS = [
  { value: 'jira', label: 'Jira Service Management' },
  { value: 'servicenow', label: 'ServiceNow' },
  { value: 'freshservice', label: 'Freshservice' },
  { value: 'ivanti', label: 'Ivanti' },
  { value: 'other', label: 'Other' },
];

const MONTHLY_VOLUMES = [
  { value: '0-500', label: '0-500' },
  { value: '500-1500', label: '500-1,500' },
  { value: '1500-5000', label: '1,500-5,000' },
  { value: '5000-15000', label: '5,000-15,000' },
  { value: '15000+', label: '15,000+' },
];

export default function DiscoveryCTA() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    itsmPlatform: '',
    monthlyVolume: '',
    interestedInDiscovery: true,
    preferredMeetingTime: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your CRM (HubSpot, Salesforce, etc.)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // In production, you'd send this to your backend/CRM
    // Example: await submitToHubSpot(formData);
  };

  const updateField = (field: keyof LeadFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto mb-16">
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Request Received!
            </h3>
            <p className="text-text-secondary mb-6">
              Our team will reach out within 1 business day to schedule your Discovery analysis.
            </p>
            <p className="text-sm text-text-tertiary">
              Check your email ({formData.email}) for confirmation.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mb-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          See Exactly Which AI Workers Will Work in YOUR Environment
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          This assessment uses industry benchmarks. We can analyze your actual tickets to show you 
          precise automation opportunities and how AI Workers would learn in your specific environment.
        </p>
      </div>

      {/* Offer Box */}
      <Card className="mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-accent-blue/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Let us run Discovery on your IT environment for one week
            </h3>
            <p className="text-text-secondary mb-4">
              We'll deliver a custom report showing:
            </p>
            <ul className="space-y-2">
              {[
                'Which pre-built AI Workers from our library fit your specific workflows',
                'Exact deployment order (what to deploy Week 1, Month 2, etc.)',
                'Precise time savings based on YOUR ticket data',
                'How quickly AI Workers will learn your patterns',
                'ROI projections specific to your team',
                'Custom 90-day deployment roadmap',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-text-secondary">
                  <span className="text-accent-green mt-1 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-secondary/10 pt-6">
          <h4 className="text-sm font-semibold text-text-primary mb-3">What We Need:</h4>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-accent-blue mt-0.5">→</span>
              <span>Read-only access to your ITSM (Jira/ServiceNow)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-accent-blue mt-0.5">→</span>
              <span>30-minute kickoff call</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-accent-blue mt-0.5">→</span>
              <span>1-week observation period</span>
            </li>
          </ul>

          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="w-full justify-center">
              Request Discovery Analysis
            </Button>
          )}
        </div>
      </Card>

      {/* Form */}
      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Name"
                required
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="John Smith"
              />
              <Input
                label="Work Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john@company.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Company"
                required
                value={formData.company}
                onChange={(e) => updateField('company', e.target.value)}
                placeholder="Acme Corp"
              />
              <Input
                label="Phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Current ITSM Platform"
                required
                value={formData.itsmPlatform}
                onChange={(e) => updateField('itsmPlatform', e.target.value)}
                options={ITSM_PLATFORMS}
              />
              <Select
                label="Monthly Ticket Volume"
                required
                value={formData.monthlyVolume}
                onChange={(e) => updateField('monthlyVolume', e.target.value)}
                options={MONTHLY_VOLUMES}
              />
            </div>

            <Input
              label="Preferred Meeting Time (optional)"
              value={formData.preferredMeetingTime}
              onChange={(e) => updateField('preferredMeetingTime', e.target.value)}
              placeholder="e.g., Tuesdays 2-4pm EST"
            />

            <div className="pt-4 border-t border-brand-secondary/10">
              <Checkbox
                label="I'm interested in Discovery analysis"
                checked={formData.interestedInDiscovery}
                onChange={(checked) => updateField('interestedInDiscovery', checked)}
              />
            </div>

            <Button type="submit" className="w-full justify-center">
              Submit Request
            </Button>

            <div className="flex flex-wrap gap-6 justify-center text-xs text-text-tertiary">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your data stays private—deleted after analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Average time to first AI Worker: 2 weeks</span>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Trust Signals */}
      <div className="mt-12 pt-12 border-t border-brand-secondary/10">
        <div className="flex flex-wrap justify-center items-center gap-8 text-text-tertiary text-sm">
          <div>Built by the team behind WalkMe</div>
          <div className="w-px h-4 bg-brand-secondary/20" />
          <div>Backed by A*, lool ventures, FirstMinute Capital</div>
          <div className="w-px h-4 bg-brand-secondary/20" />
          <div className="flex items-center gap-2">
            <span className="text-accent-green">●</span>
            SOC2 & GDPR Compliant
          </div>
        </div>
      </div>
    </div>
  );
}
