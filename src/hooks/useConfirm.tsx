import { type OverlayControls, useOverlay } from './useOverlay';
import {
  DialogFrame,
  dialogButtonRowStyle,
  ghostButtonStyle,
  primaryButtonStyle,
} from './dialogFrame';

export interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

const ConfirmDialog = ({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger,
  isOpen,
  close,
}: ConfirmOptions & OverlayControls<boolean>) => {
  if (!isOpen) return null;

  return (
    <DialogFrame title={title}>
      {message && <p style={{ margin: 0, color: '#d4d4d8', lineHeight: 1.5 }}>{message}</p>}
      <div style={dialogButtonRowStyle}>
        <button
          type="button"
          style={{
            ...primaryButtonStyle,
            background: danger ? '#e11d48' : primaryButtonStyle.background,
          }}
          onClick={() => close(true)}
        >
          {confirmLabel}
        </button>
        <button type="button" style={ghostButtonStyle} onClick={() => close(false)}>
          {cancelLabel}
        </button>
      </div>
    </DialogFrame>
  );
};

export const useConfirm = () => {
  const overlay = useOverlay<ConfirmOptions, boolean>(ConfirmDialog);

  const confirm = (options: ConfirmOptions) =>
    overlay.open(options).then((result) => Boolean(result));

  return { confirm, render: overlay.render } as const;
};
