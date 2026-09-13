import type { CSSProperties, ReactNode } from 'react';

const backdropStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  display: 'grid',
  placeItems: 'center',
  background: 'rgba(0, 0, 0, 0.6)',
};

const panelStyle: CSSProperties = {
  width: 'min(24rem, calc(100vw - 2rem))',
  borderRadius: '1rem',
  background: '#18181b',
  color: '#fafafa',
  padding: '1.25rem',
  boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
};

interface DialogFrameProps {
  title: string;
  children: ReactNode;
}

const dialogStyle: CSSProperties = {
  ...backdropStyle,
  border: 'none',
  margin: 0,
  padding: 0,
  maxWidth: 'none',
  maxHeight: 'none',
  width: '100vw',
  height: '100vh',
};

export const DialogFrame = ({ title, children }: DialogFrameProps) => (
  <dialog open aria-labelledby="usethishook-dialog-title" style={dialogStyle}>
    <div style={panelStyle}>
      <h2 id="usethishook-dialog-title" style={{ margin: '0 0 0.75rem', fontSize: '1.05rem' }}>
        {title}
      </h2>
      {children}
    </div>
  </dialog>
);

const buttonRowStyle: CSSProperties = { display: 'flex', gap: '0.5rem', marginTop: '1rem' };

export const dialogButtonRowStyle = buttonRowStyle;

export const primaryButtonStyle: CSSProperties = {
  border: 'none',
  borderRadius: '999px',
  padding: '0.45rem 0.9rem',
  background: '#7c3aed',
  color: 'white',
  cursor: 'pointer',
};

export const ghostButtonStyle: CSSProperties = {
  border: '1px solid #3f3f46',
  borderRadius: '999px',
  padding: '0.45rem 0.9rem',
  background: 'transparent',
  color: 'white',
  cursor: 'pointer',
};
