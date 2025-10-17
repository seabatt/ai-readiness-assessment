'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';

interface VolumeServiceProfileProps {
  monthlyTickets: number;
  ticketDistribution: {
    applications: number;
    hardware: number;
    onboarding: number;
    distributionLists: number;
    network: number;
    security: number;
  };
  onChange: (field: string, value: any) => void;
}

export default function VolumeServiceProfile({
  monthlyTickets,
  ticketDistribution,
  onChange,
}: VolumeServiceProfileProps) {
  const [localDistribution, setLocalDistribution] = useState(ticketDistribution);

  useEffect(() => {
    setLocalDistribution(ticketDistribution);
  }, [ticketDistribution]);

  const handleSliderChange = (category: keyof typeof ticketDistribution, newValue: number) => {
    const updated = { ...localDistribution, [category]: newValue };
    
    setLocalDistribution(updated);
    onChange('ticketDistribution', updated);
  };

  const total = Object.values(localDistribution).reduce((sum, val) => sum + val, 0);

  const categories = [
    { key: 'applications', label: 'Applications' },
    { key: 'hardware', label: 'Hardware' },
    { key: 'onboarding', label: 'Onboarding/Offboarding' },
    { key: 'distributionLists', label: 'Distribution Lists' },
    { key: 'network', label: 'Network' },
    { key: 'security', label: 'Security' },
  ] as const;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        Volume & Service Profile
      </h2>
      <p className="text-text-tertiary mb-8">
        Help us understand your typical ticket volume and distribution
      </p>

      <Card className="!bg-bg-card !border !border-bg-card-alt/20">
        {/* Monthly Tickets Input */}
        <div className="mb-8">
          <label className="block text-text-primary font-bold mb-2">
            Average Monthly Tickets
          </label>
          <input
            type="number"
            value={monthlyTickets || ''}
            onChange={(e) => onChange('monthlyTickets', parseInt(e.target.value) || 0)}
            className="w-full bg-black border border-bg-card-alt/40 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-highlight/40 transition-colors"
            placeholder="1000"
            min="0"
          />
          <p className="text-sm text-text-tertiary mt-2">
            Approximate number of IT tickets your team handles per month
          </p>
        </div>

        {/* Ticket Distribution Sliders */}
        <div>
          <label className="block text-text-primary font-bold mb-4">
            Ticket Distribution by Category (%)
          </label>

          <div className="space-y-6">
            {categories.map(({ key, label }) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary">{label}</span>
                  <span className="text-text-primary font-bold">{localDistribution[key]}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localDistribution[key]}
                  onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
                  className="w-full h-2 bg-bg-card-alt rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #82D895 0%, #82D895 ${localDistribution[key]}%, #41403E ${localDistribution[key]}%, #41403E 100%)`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-bg-card-alt/20">
            <div className="flex justify-between items-center">
              <span className="text-text-tertiary">Total:</span>
              <span className={`font-bold text-lg ${total === 100 ? 'text-highlight' : 'text-red-400'}`}>
                {total}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #82D895;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #82D895;
        }
      `}</style>
    </div>
  );
}
