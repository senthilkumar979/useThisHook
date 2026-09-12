import { type ComponentType, useCallback, useRef, useState } from 'react';

export interface OverlayControls<TResult = unknown> {
  isOpen: boolean;
  close: (result?: TResult) => void;
}

export const useOverlay = <TProps extends object, TResult = unknown>(
  Overlay: ComponentType<TProps & OverlayControls<TResult>>,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [props, setProps] = useState<TProps | null>(null);
  const resolverRef = useRef<((result?: TResult) => void) | null>(null);
  const previousOverflowRef = useRef('');

  const open = useCallback((data?: TProps) => {
    setProps(data ?? ({} as TProps));
    setIsOpen(true);
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return new Promise<TResult | undefined>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const close = useCallback((result?: TResult) => {
    setIsOpen(false);
    document.body.style.overflow = previousOverflowRef.current;

    if (!resolverRef.current) return;
    resolverRef.current(result);
    resolverRef.current = null;
  }, []);

  const render = () => {
    if (!isOpen && !props) return null;

    const overlayProps = (props ?? {}) as TProps;
    return <Overlay {...overlayProps} isOpen={isOpen} close={close} />;
  };

  return { open, close, render } as const;
};
