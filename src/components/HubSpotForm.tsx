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
    // Load the HubSpot forms script
    const script = document.createElement('script');
    script.src = `https://js-${region}.hsforms.net/forms/embed/v2.js`;
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Create the form once the script loads
    script.addEventListener('load', () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: '#hubspotForm',
          onFormReady: () => {
            console.log('HubSpot form ready');
          },
          onFormSubmitted: () => {
            console.log('HubSpot form submitted');
          }
        });
      }
    });

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [portalId, formId, region]);

  return (
    <div id="hubspotForm" className="hubspot-form-wrapper" />
  );
}
