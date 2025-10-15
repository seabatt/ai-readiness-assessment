import { useEffect, useState } from 'react';

const messages = [
  'Analyzing your tech stack...',
  'Matching pre-built AI Workers to your environment...',
  'Calculating efficiency gains...',
  'Generating your readiness score...',
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-highlight border-t-transparent mb-8" />
      
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        {messages[messageIndex]}
      </h2>
    </div>
  );
}
