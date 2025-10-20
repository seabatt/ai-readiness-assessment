'use client';

import { useEffect } from 'react';

interface HubSpotFormProps {
  portalId: string;
  formId: string;
  targetId?: string;
}

export default function HubSpotForm({ portalId, formId, targetId = 'hubspot-form' }: HubSpotFormProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: portalId,
          formId: formId,
          target: `#${targetId}`
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, [portalId, formId, targetId]);

  return <div id={targetId} className="hubspot-form-wrapper" />;
}

declare global {
  interface Window {
    hbspt: any;
  }
}
