import { useState } from 'react';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';
import toolsData from '@/data/tools.json';

interface TechStackSelectorProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

export default function TechStackSelector({ selectedTools, onToolsChange }: TechStackSelectorProps) {
  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      onToolsChange(selectedTools.filter(id => id !== toolId));
    } else {
      onToolsChange([...selectedTools, toolId]);
    }
  };

  const groupedTools = {
    'Identity & Access Management': ['okta', 'microsoft-entra', 'jumpcloud', 'google-workspace'],
    'ITSM Platforms': ['servicenow', 'jira', 'freshservice', 'ivanti'],
    'Communication': ['slack', 'microsoft-teams', 'zoom'],
    'Productivity & Collaboration': ['google-workspace', 'microsoft-365', 'notion', 'confluence', 'monday'],
    'Business Applications': ['salesforce', 'hubspot', 'sap-successfactors', 'hibob', 'docusign', 'linear'],
    'Development Tools': ['github', 'jira'],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-text-primary mb-4">
        What's Your Current IT Stack?
      </h2>
      <p className="text-text-secondary mb-8">
        Select all the tools your team uses. We'll show you exactly which pre-built AI Workers are ready for your environment.
      </p>

      <div className="space-y-6">
        {Object.entries(groupedTools).map(([category, toolIds]) => (
          <Card key={category} className="!bg-[#141414]">
            <h3 className="text-lg font-semibold text-text-primary mb-4">{category}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {toolIds.map(toolId => {
                const tool = toolsData.tools.find(t => t.id === toolId);
                if (!tool) return null;
                
                return (
                  <div key={toolId} className="flex items-center gap-3">
                    <img 
                      src={tool.logo} 
                      alt={tool.name}
                      className="w-6 h-6 rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <Checkbox
                      label={tool.name}
                      checked={selectedTools.includes(toolId)}
                      onChange={() => toggleTool(toolId)}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center text-text-tertiary">
        Selected: {selectedTools.length} tools
      </div>
    </div>
  );
}
