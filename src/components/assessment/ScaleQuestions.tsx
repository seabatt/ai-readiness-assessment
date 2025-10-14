import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import { 
  TICKET_VOLUME_OPTIONS, 
  TEAM_SIZE_OPTIONS, 
  RESOLUTION_TIME_OPTIONS, 
  EMPLOYEE_COUNT_OPTIONS 
} from '@/lib/constants';

interface ScaleQuestionsProps {
  ticketVolume: string;
  teamSize: string;
  avgResolutionTime: string;
  employeeCount: string;
  onChange: (field: string, value: string) => void;
}

export default function ScaleQuestions({
  ticketVolume,
  teamSize,
  avgResolutionTime,
  employeeCount,
  onChange
}: ScaleQuestionsProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        Help Us Understand Your Scale
      </h2>
      <p className="text-text-secondary mb-8">
        This helps us calculate your potential impact
      </p>

      <Card className="!bg-black">
        <div className="space-y-6">
          <Select
            label="Monthly IT ticket volume"
            value={ticketVolume}
            onChange={(e) => onChange('ticketVolume', e.target.value)}
            options={TICKET_VOLUME_OPTIONS}
            required
          />

          <Select
            label="IT team size"
            value={teamSize}
            onChange={(e) => onChange('teamSize', e.target.value)}
            options={TEAM_SIZE_OPTIONS}
            required
          />

          <Select
            label="Average time to resolve a typical access request"
            value={avgResolutionTime}
            onChange={(e) => onChange('avgResolutionTime', e.target.value)}
            options={RESOLUTION_TIME_OPTIONS}
            required
          />

          <Select
            label="Employee count"
            value={employeeCount}
            onChange={(e) => onChange('employeeCount', e.target.value)}
            options={EMPLOYEE_COUNT_OPTIONS}
            required
          />
        </div>
      </Card>
    </div>
  );
}
