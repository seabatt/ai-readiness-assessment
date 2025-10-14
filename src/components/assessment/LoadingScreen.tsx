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
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-brand-secondary/20" />
        <div className="absolute inset-0 rounded-full border-4 border-accent-blue border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-green/20 animate-pulse" />
      </div>
      
      <p className="text-xl text-text-secondary animate-pulse">
        {messages[messageIndex]}
      </p>
    </div>
  );
}
