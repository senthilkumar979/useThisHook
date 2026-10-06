import { useVisitorData } from '@fingerprint/react';
import { useEffect } from 'react';

/** Identifies the visitor once on mount and logs IDs for local verification. */
export const FingerprintIdentify = () => {
  const { data, error } = useVisitorData({ immediate: true });

  useEffect(() => {
    if (error) {
      console.error('[Fingerprint]', error);
      return;
    }
    if (!data?.visitor_id) return;
    console.log(data.event_id, data.visitor_id);
  }, [data, error]);

  return null;
};
