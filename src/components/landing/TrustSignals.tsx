export default function TrustSignals() {
  return (
    <section className="py-12 px-4 border-t border-brand-secondary/10">
      <div className="max-w-4xl mx-auto">
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
    </section>
  );
}
