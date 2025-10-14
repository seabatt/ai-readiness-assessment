export const HOURLY_RATE = 150; // Blended IT team rate

export const TICKET_VOLUME_OPTIONS = [
  { value: '0-500', label: '0-500' },
  { value: '500-1500', label: '500-1,500' },
  { value: '1500-5000', label: '1,500-5,000' },
  { value: '5000-15000', label: '5,000-15,000' },
  { value: '15000+', label: '15,000+' },
];

export const TEAM_SIZE_OPTIONS = [
  { value: '1-3', label: '1-3 people' },
  { value: '4-10', label: '4-10 people' },
  { value: '11-25', label: '11-25 people' },
  { value: '26-50', label: '26-50 people' },
  { value: '50+', label: '50+ people' },
];

export const RESOLUTION_TIME_OPTIONS = [
  { value: '<30min', label: '< 30 minutes' },
  { value: '30min-2hrs', label: '30 min - 2 hours' },
  { value: '2-8 hours', label: '2-8 hours' },
  { value: '1-3 days', label: '1-3 days' },
  { value: '3+ days', label: '3+ days' },
];

export const EMPLOYEE_COUNT_OPTIONS = [
  { value: '50-200', label: '50-200' },
  { value: '200-500', label: '200-500' },
  { value: '500-1500', label: '500-1,500' },
  { value: '1500-5000', label: '1,500-5,000' },
  { value: '5000+', label: '5,000+' },
];

export const APPROVAL_WORKFLOW_OPTIONS = [
  { value: 'automated', label: 'Yes, fully automated' },
  { value: 'manual', label: 'Yes, but manual (email, Slack)' },
  { value: 'none', label: 'No formal process' },
  { value: 'unknown', label: "Don't know" },
];

export const REPETITIVE_PERCENTAGE_OPTIONS = [
  { value: '0-20', label: '0-20%' },
  { value: '20-40', label: '20-40%' },
  { value: '40-60', label: '40-60%' },
  { value: '60-80', label: '60-80%' },
  { value: '80-100', label: '80-100%' },
];

export const PAIN_POINT_OPTIONS = [
  { value: 'too-slow', label: 'Too slow to resolve tickets' },
  { value: 'team-overwhelmed', label: 'Team overwhelmed with volume' },
  { value: 'manual-busywork', label: 'Manual busywork (ticket triage, routing)' },
  { value: 'lack-automation', label: 'Lack of automation capabilities' },
  { value: 'all-above', label: 'All of the above' },
];
