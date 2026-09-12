import { useState } from 'react';
import { type OverlayControls, useOverlay } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

interface ConfirmProps {
  title: string;
}

const ConfirmModal = ({ title, isOpen, close }: ConfirmProps & OverlayControls<boolean>) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-black/60">
      <div className="w-80 rounded-xl bg-slate-900 p-5">
        <p>{title}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" className={buttonClass} onClick={() => close(true)}>
            Confirm
          </button>
          <button type="button" className={ghostButtonClass} onClick={() => close(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const UseOverlayDemo = () => {
  const overlay = useOverlay<ConfirmProps, boolean>(ConfirmModal);
  const [result, setResult] = useState<string>('Waiting');

  const handleOpen = async () => {
    const confirmed = await overlay.open({ title: 'Delete this item?' });
    setResult(confirmed ? 'Confirmed' : 'Cancelled');
  };

  return (
    <div className="space-y-3">
      <button type="button" className={buttonClass} onClick={() => void handleOpen()}>
        Open overlay
      </button>
      <p>Last result: {result}</p>
      {overlay.render()}
    </div>
  );
};

export const useOverlayExample = `import { useOverlay } from 'usethishook';

const Modal = ({ title, isOpen, close }) =>
  isOpen ? <dialog open><p>{title}</p><button type="button" onClick={() => close(true)}>OK</button></dialog> : null;

export const Example = () => {
  const overlay = useOverlay(Modal);
  return (
    <>
      <button type="button" onClick={() => void overlay.open({ title: 'Continue?' })}>Open</button>
      {overlay.render()}
    </>
  );
};`;
