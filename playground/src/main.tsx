import { FingerprintProvider } from '@fingerprint/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { FingerprintIdentify } from './FingerprintIdentify';
import { applyTheme, readTheme } from './theme';
import 'goey-toast/styles.css';
import './index.css';

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
    </FingerprintProvider>
  </StrictMode>,
);
