import { StrictMode } from 'react';
import { App } from './App';
import { ClientExtras } from './ClientExtras';

export const DocumentApp = () => (
  <StrictMode>
    <ClientExtras />
    <App />
  </StrictMode>
);
