import { useEffect, useState } from 'react';
import { type OverlayControls, useOverlay } from './useOverlay';
import {
  DialogFrame,
  dialogButtonRowStyle,
  ghostButtonStyle,
  primaryButtonStyle,
} from './dialogFrame';

export interface PromptOptions {
  title: string;
  message?: string;
  label?: string;
  initialValue?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

const PromptDialog = ({
  title,
  message,
  label = 'Value',
  initialValue = '',
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  isOpen,
  close,
}: PromptOptions & OverlayControls<string | null>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) setValue(initialValue);
  }, [initialValue, isOpen]);

  if (!isOpen) return null;

  return (
    <DialogFrame title={title}>
      {message && <p style={{ margin: '0 0 0.75rem', color: '#d4d4d8', lineHeight: 1.5 }}>{message}</p>}
      <label style={{ display: 'grid', gap: '0.35rem', fontSize: '0.85rem' }}>
        {label}
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={{
            borderRadius: '0.6rem',
            border: '1px solid #3f3f46',
            background: '#09090b',
            color: 'white',
            padding: '0.5rem 0.7rem',
          }}
        />
      </label>
      <div style={dialogButtonRowStyle}>
        <button type="button" style={primaryButtonStyle} onClick={() => close(value)}>
          {confirmLabel}
        </button>
        <button type="button" style={ghostButtonStyle} onClick={() => close(null)}>
          {cancelLabel}
        </button>
      </div>
    </DialogFrame>
  );
};

export const usePrompt = () => {
  const overlay = useOverlay<PromptOptions, string | null>(PromptDialog);
  const prompt = (options: PromptOptions) => overlay.open(options).then((result) => result ?? null);

  return { prompt, render: overlay.render } as const;
};
