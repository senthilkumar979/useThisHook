import { useCallback, useEffect } from 'react';

export type LeaveConfirmer = (message: string) => boolean | Promise<boolean>;

export const useUnsavedChanges = (isDirty: boolean, confirmLeave?: LeaveConfirmer) => {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const requestLeave = useCallback(
    async (message = 'Leave without saving?') => {
      if (!isDirty) return true;
      if (confirmLeave) return confirmLeave(message);
      return window.confirm(message);
    },
    [confirmLeave, isDirty],
  );

  return { confirmLeave: requestLeave } as const;
};
