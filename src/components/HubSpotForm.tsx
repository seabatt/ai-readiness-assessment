'use client';

import { useEffect } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
  targetId?: string;
}

export default function HubSpotForm({ 
  portalId, 
  formId, 
  region = 'na1',
  targetId = 'hubspot-form' 
}: HubSpotFormProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://js-${region}.hsforms.net/forms/embed/${portalId}.js`;
    script.defer = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: `#${targetId}`
        });
      }
    });

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId, region, targetId]);

  return <div id={targetId} className="hubspot-form-wrapper" />;
}

declare global {
  interface Window {
    hbspt: any;
  }
}
