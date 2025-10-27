interface BeforeAfterTimelineProps {
  before: string;
  after: string;
}

export default function BeforeAfterTimeline({ before, after }: BeforeAfterTimelineProps) {
  return (
    <div className="my-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-20 text-sm text-text-tertiary font-semibold">
          Before
        </div>
        <div className="flex-1 p-4 bg-accent-orange/10 border border-accent-orange/20 rounded-lg">
          <p className="text-sm text-text-secondary">{before}</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-20 text-sm text-text-tertiary font-semibold">
          After
        </div>
        <div className="flex-1 p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg">
          <p className="text-sm text-text-secondary">{after}</p>
        </div>
      </div>
    </div>
  );
}
