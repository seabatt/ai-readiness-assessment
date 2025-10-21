import { Suspense } from 'react';
import EmailGateContent from './EmailGateContent';

export default function EmailGatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-highlight border-t-transparent mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    }>
      <EmailGateContent />
    </Suspense>
  );
}
