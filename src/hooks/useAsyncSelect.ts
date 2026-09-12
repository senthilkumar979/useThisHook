import { useCallback } from 'react';

export interface AsyncSelectOptions {
  accept?: string;
  multiple?: boolean;
}

export const useAsyncSelect = () => {
  const selectFile = useCallback((options: AsyncSelectOptions = {}) => {
    const { accept = '*', multiple = false } = options;

    return new Promise<File | File[] | null>((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = accept;
      input.multiple = multiple;
      input.style.display = 'none';

      let isSettled = false;

      const settle = (value: File | File[] | null) => {
        if (isSettled) return;
        isSettled = true;
        window.removeEventListener('focus', handleCancel);
        input.remove();
        resolve(value);
      };

      const handleChange = (event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (!files || files.length === 0) {
          settle(null);
          return;
        }

        settle(multiple ? Array.from(files) : (files[0] ?? null));
      };

      const handleCancel = () => {
        window.setTimeout(() => {
          if (!input.files || input.files.length === 0) settle(null);
        }, 300);
      };

      input.addEventListener('change', handleChange);
      input.addEventListener('cancel', () => settle(null));
      window.addEventListener('focus', handleCancel);

      document.body.appendChild(input);
      input.click();
    });
  }, []);

  return selectFile;
};
