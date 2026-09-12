import { type Dispatch, type SetStateAction, useState } from 'react';

export const useResetState = <T>(source: unknown, initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const [trackedSource, setTrackedSource] = useState(source);

  if (trackedSource !== source) {
    setTrackedSource(source);
    setState(initialValue);
  }

  return [state, setState] as [T, Dispatch<SetStateAction<T>>];
};
