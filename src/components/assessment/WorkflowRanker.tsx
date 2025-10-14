import { useState } from 'react';
import Card from '@/components/ui/Card';
import toolsData from '@/data/tools.json';

interface WorkflowRankerProps {
  selectedWorkflows: string[];
  onWorkflowsChange: (workflows: string[]) => void;
}

export default function WorkflowRanker({ selectedWorkflows, onWorkflowsChange }: WorkflowRankerProps) {
  const workflows = toolsData.workflows;

  const toggleWorkflow = (workflowId: string) => {
    if (selectedWorkflows.includes(workflowId)) {
      onWorkflowsChange(selectedWorkflows.filter(id => id !== workflowId));
    } else if (selectedWorkflows.length < 5) {
      onWorkflowsChange([...selectedWorkflows, workflowId]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        What Eats Up Most of Your Team's Time?
      </h2>
      <p className="text-text-secondary mb-8">
        Select your top 5 most time-consuming activities
      </p>

      <Card>
        <div className="space-y-3">
          {workflows.map((workflow, index) => {
            const isSelected = selectedWorkflows.includes(workflow.id);
            const rank = selectedWorkflows.indexOf(workflow.id) + 1;

            return (
              <button
                key={workflow.id}
                onClick={() => toggleWorkflow(workflow.id)}
                disabled={!isSelected && selectedWorkflows.length >= 5}
                className={`
                  w-full text-left p-4 rounded-lg border transition-all
                  ${isSelected 
                    ? 'border-accent-blue bg-accent-blue/10' 
                    : 'border-brand-secondary/20 hover:border-brand-secondary/40 hover:bg-bg-elevated'
                  }
                  ${!isSelected && selectedWorkflows.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="flex items-center gap-3">
                  {isSelected && (
                    <span className="flex-shrink-0 w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center text-bg-primary font-bold">
                      {rank}
                    </span>
                  )}
                  <span className={isSelected ? 'text-text-primary font-medium' : 'text-text-secondary'}>
                    {workflow.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="mt-6 text-center">
        <span className="text-text-tertiary">
          Selected: {selectedWorkflows.length} / 5
        </span>
      </div>
    </div>
  );
}
