interface ConnectedAppLogosProps {
  apps: string[];
  maxVisible?: number;
  size?: number;
  spacing?: number;
  prominent?: boolean; // For larger, more prominent display
}

const APP_LOGO_MAP: Record<string, string> = {
  'Okta': 'https://logo.clearbit.com/okta.com',
  'ServiceNow': 'https://logo.clearbit.com/servicenow.com',
  'Slack': 'https://logo.clearbit.com/slack.com',
  'Jira': 'https://logo.clearbit.com/atlassian.com',
  'Zendesk': 'https://logo.clearbit.com/zendesk.com',
  'Microsoft 365': 'https://logo.clearbit.com/microsoft.com',
  'Google Workspace': 'https://logo.clearbit.com/google.com',
  'Azure AD': 'https://logo.clearbit.com/microsoft.com',
  'Salesforce': 'https://logo.clearbit.com/salesforce.com',
  'GitHub': 'https://logo.clearbit.com/github.com',
  'GitLab': 'https://logo.clearbit.com/gitlab.com',
  'Confluence': 'https://logo.clearbit.com/atlassian.com',
  'Asana': 'https://logo.clearbit.com/asana.com',
  'Monday.com': 'https://logo.clearbit.com/monday.com',
  'Zoom': 'https://logo.clearbit.com/zoom.us',
  'Teams': 'https://logo.clearbit.com/microsoft.com',
  'Workday': 'https://logo.clearbit.com/workday.com',
  'BambooHR': 'https://logo.clearbit.com/bamboohr.com',
  'Duo Security': 'https://logo.clearbit.com/duo.com',
  'CyberArk': 'https://logo.clearbit.com/cyberark.com',
};

export default function ConnectedAppLogos({ 
  apps, 
  maxVisible = 7,
  size = 24,
  spacing = 12,
  prominent = false
}: ConnectedAppLogosProps) {
  const visibleApps = apps.slice(0, maxVisible);
  const hasOverflow = apps.length > maxVisible;
  
  const gapClass = spacing === 12 ? 'gap-3' : spacing === 8 ? 'gap-2' : 'gap-4';
  
  return (
    <div className={`flex items-center flex-wrap ${gapClass}`}>
      {visibleApps.map((app, index) => {
        const logoUrl = APP_LOGO_MAP[app] || `https://logo.clearbit.com/${app.toLowerCase().replace(/\s+/g, '')}.com`;
        
        return (
          <div
            key={`${app}-${index}`}
            className="relative group"
          >
            {prominent ? (
              <div className="relative">
                {/* Circular background with subtle border */}
                <div 
                  className="rounded-full bg-bg-primary border-2 border-border/30 flex items-center justify-center transition-all duration-200 hover:border-highlight/40 hover:scale-105"
                  style={{ 
                    height: `${size + 12}px`, 
                    width: `${size + 12}px`
                  }}
                >
                  <img
                    src={logoUrl}
                    alt={`${app} logo`}
                    className="rounded-full"
                    style={{ 
                      height: `${size}px`, 
                      width: `${size}px`,
                      objectFit: 'contain',
                      padding: '4px'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const initials = app.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
                        parent.innerHTML = `
                          <div class="flex items-center justify-center text-text-tertiary text-sm font-bold" 
                               style="height: 100%; width: 100%;">
                            ${initials}
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <img
                src={logoUrl}
                alt={`${app} logo`}
                className="rounded transition-all duration-200 hover:scale-102 hover:shadow-glow-highlight-hover"
                style={{ 
                  height: `${size}px`, 
                  width: `${size}px`,
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const initials = app.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
                    parent.innerHTML = `
                      <div class="flex items-center justify-center bg-bg-card-alt rounded text-text-tertiary text-xs font-semibold" 
                           style="height: ${size}px; width: ${size}px;">
                        ${initials}
                      </div>
                    `;
                  }
                }}
              />
            )}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-card border border-bg-card-alt/40 rounded text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              {app} Integration Active
            </div>
          </div>
        );
      })}
      
      {hasOverflow && (
        <div 
          className="flex items-center justify-center bg-bg-card-alt rounded text-text-tertiary text-xs font-semibold"
          style={{ height: `${size}px`, width: `${size}px` }}
          title={`+${apps.length - maxVisible} more`}
        >
          +{apps.length - maxVisible}
        </div>
      )}
    </div>
  );
}
