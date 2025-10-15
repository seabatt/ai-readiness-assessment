import toolApis from '@/data/tool-apis.json';
import useCaseMappings from '@/data/use-case-mappings.json';

interface Tool {
  name: string;
  license_tier?: string;
}

export interface FeasibilityResult {
  tool: string;
  available_apis: string[];
  available_capabilities: string[];
  enabled_use_cases: string[];
  missing_apis: string[];
  license_gaps: string[];
  prerequisites: string[];
  confidence: number;
}

export class FeasibilityEngine {
  
  /**
   * Analyzes which APIs and capabilities are available for a given tool
   */
  analyzeToolFeasibility(tool: Tool): FeasibilityResult {
    const toolName = tool.name.toLowerCase().replace(/\s+/g, '_');
    const toolConfig = (toolApis as any).tools[toolName];
    
    if (!toolConfig) {
      return {
        tool: tool.name,
        available_apis: [],
        available_capabilities: [],
        enabled_use_cases: [],
        missing_apis: [],
        license_gaps: [],
        prerequisites: ['Tool configuration not found'],
        confidence: 0
      };
    }

    // Determine which APIs are available based on license tier
    const licenseTier = tool.license_tier || 'standard';
    const availableApiKeys = toolConfig.license_tiers[licenseTier] || [];
    
    const availableApis: string[] = [];
    const availableCapabilities: string[] = [];
    const prerequisites: string[] = [];

    // Collect available APIs and capabilities
    for (const apiKey of availableApiKeys) {
      const apiConfig = toolConfig.apis[apiKey];
      if (apiConfig) {
        availableApis.push(apiConfig.name);
        availableCapabilities.push(...(apiConfig.capabilities as string[]));
        prerequisites.push(`${apiConfig.name}: ${toolConfig.prerequisites}`);
      }
    }

    // Find which use cases this tool enables
    const enabledUseCases = (useCaseMappings as any).use_cases
      .filter((useCase: any) => {
        // Check if tool is required
        if (!useCase.required_tools.includes(toolName)) {
          return false;
        }
        
        // Check if required APIs are available
        const requiredApis = useCase.required_apis[toolName] || [];
        const hasAllRequiredApis = requiredApis.every((api: string) => 
          availableApiKeys.includes(api)
        );
        
        return hasAllRequiredApis;
      })
      .map((useCase: any) => useCase.id);

    // Identify missing APIs for potential use cases
    const potentialUseCases = (useCaseMappings as any).use_cases
      .filter((useCase: any) => 
        useCase.required_tools.includes(toolName) && 
        !enabledUseCases.includes(useCase.id)
      );
    
    const missingApis = Array.from(new Set(
      potentialUseCases.flatMap((useCase: any) => 
        (useCase.required_apis[toolName] || [])
          .filter((api: string) => !availableApiKeys.includes(api))
      )
    )) as string[];

    // Check for license gaps
    const licenseGaps: string[] = [];
    const allApiKeys = Object.keys(toolConfig.apis);
    const unavailableApis = allApiKeys.filter(key => !availableApiKeys.includes(key));
    
    if (unavailableApis.length > 0) {
      // Find which tier would enable these
      for (const [tier, apis] of Object.entries(toolConfig.license_tiers as Record<string, string[]>)) {
        if (tier !== licenseTier && apis.some(api => unavailableApis.includes(api))) {
          licenseGaps.push(`Upgrade to ${tier} to unlock ${unavailableApis.join(', ')}`);
        }
      }
    }

    return {
      tool: tool.name,
      available_apis: availableApis,
      available_capabilities: availableCapabilities,
      enabled_use_cases: enabledUseCases,
      missing_apis: missingApis,
      license_gaps: Array.from(new Set(licenseGaps)),
      prerequisites,
      confidence: enabledUseCases.length > 0 ? 0.90 : 0.50
    };
  }

  /**
   * Analyzes the entire stack
   */
  analyzeStack(tools: Tool[]): FeasibilityResult[] {
    return tools.map(tool => this.analyzeToolFeasibility(tool));
  }

  /**
   * Gets detailed API information for a specific tool and API category
   */
  getApiDetails(toolName: string, apiCategory: string) {
    const tool = (toolApis as any).tools[toolName.toLowerCase().replace(/\s+/g, '_')];
    if (!tool || !tool.apis[apiCategory]) {
      return null;
    }

    const api = tool.apis[apiCategory];
    return {
      name: api.name,
      base_url: api.base_url,
      endpoints: api.endpoints,
      capabilities: api.capabilities,
      scopes_required: api.scopes_required,
      documentation: api.documentation
    };
  }
}
