'use client';

import { useEffect } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  region?: string;
}

export default function HubSpotForm({ 
  portalId, 
  formId, 
  region = 'eu1'
}: HubSpotFormProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://js-${region}.hsforms.net/forms/embed/developer/${portalId}.js`;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, region]);

  return (
    <div 
      className="hs-form-html hubspot-form-wrapper" 
      data-region={region}
      data-form-id={formId}
      data-portal-id={portalId}
    />
  );
}
