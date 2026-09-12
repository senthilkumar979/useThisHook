import { useCallback, useState } from 'react';

interface CopyToClipboardResult {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

export const useCopyToClipboard = (): CopyToClipboardResult => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    if (!navigator.clipboard) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch {
      setCopiedText(null);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setCopiedText(null);
  }, []);

  return { copiedText, copy, reset };
};
