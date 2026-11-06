import { FingerprintProvider } from '@fingerprint/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { GooeyToaster } from 'goey-toast';
import { ClientOnly } from './components/ClientOnly';
import { FingerprintIdentify } from './FingerprintIdentify';

/** Browser-only widgets. The first paint (and prerender) is empty so hydration matches. */
export const ClientExtras = () => {
  const apiKey = import.meta.env.VITE_FINGERPRINT_API_KEY;

  return (
    <ClientOnly>
      {apiKey ? (
        <FingerprintProvider apiKey={apiKey} region="eu">
          <FingerprintIdentify />
        </FingerprintProvider>
      ) : null}
      <GooeyToaster position="bottom-right" />
      <Analytics />
      <SpeedInsights />
    </ClientOnly>
  );
};
