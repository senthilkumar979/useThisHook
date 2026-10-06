import { FingerprintProvider } from '@fingerprint/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import 'goey-toast/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { FingerprintIdentify } from './FingerprintIdentify';
import './index.css';
import { applyTheme, readTheme } from './theme';
applyTheme(readTheme());

const fingerprintApiKey = import.meta.env.VITE_FINGERPRINT_API_KEY;
if (!fingerprintApiKey) {
  throw new Error(
    'Missing VITE_FINGERPRINT_API_KEY. Set it in .env.local and in Vercel Environment Variables.',
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <FingerprintProvider apiKey={fingerprintApiKey} region="eu">
      <FingerprintIdentify />
      <App />
      <Analytics />
      <SpeedInsights />
    </FingerprintProvider>
  </StrictMode>,
);
