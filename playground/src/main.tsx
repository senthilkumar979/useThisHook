import 'goey-toast/styles.css';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { DocumentApp } from './DocumentApp';
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

const app = <DocumentApp />;
if (rootElement.childElementCount > 0) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
