interface StatusPillProps {
  status: 'success' | 'active' | 'warning';
  children: React.ReactNode;
}

export default function StatusPill({ status, children }: StatusPillProps) {
  const colors = {
    success: 'bg-accent-green',
    active: 'bg-accent-blue',
    warning: 'bg-accent-orange',
  };

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-brand-primary/5 border border-brand-secondary/10">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
      <span className="text-sm text-text-secondary">{children}</span>
    </div>
  );
}
