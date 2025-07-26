'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const discount = params.get('discount');
    const campaign = params.get('utm_campaign');

    if (discount || campaign) {
      window.gtag?.('event', 'influencer_visit', {
        discount_code: discount || 'N/A',
        campaign: campaign || 'N/A',
      });
    }
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-HFW3LSSHEY"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HFW3LSSHEY');
        `}
      </Script>
    </>
  );
}
