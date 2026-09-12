import { type ComponentType, useCallback, useRef, useState } from 'react';

export interface StepFlowStepProps<TStepData = unknown> {
  stepIndex: number;
  isLastStep: boolean;
  onNext: (stepData?: TStepData) => void;
  onCancel: () => void;
}

export const useStepFlow = <TStepData = unknown>(
  steps: Array<ComponentType<StepFlowStepProps<TStepData>>>,
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const resultsRef = useRef<Array<TStepData | undefined>>([]);
  const resolverRef = useRef<((result: Array<TStepData | undefined> | null) => void) | null>(
    null,
  );

  const next = useCallback(() => {
    setIsActive(true);
    setCurrentStepIndex(0);
    resultsRef.current = [];

    return new Promise<Array<TStepData | undefined> | null>((resolve) => {
      resolverRef.current = resolve;
    });
  }, []);

  const completeStep = useCallback(
    (stepData?: TStepData) => {
      resultsRef.current = [...resultsRef.current, stepData];

      setCurrentStepIndex((previous) => {
        if (previous + 1 < steps.length) return previous + 1;

        if (resolverRef.current) {
          resolverRef.current(resultsRef.current);
          resolverRef.current = null;
        }

        setIsActive(false);
        return 0;
      });
    },
    [steps.length],
  );

  const cancel = useCallback(() => {
    if (resolverRef.current) {
      resolverRef.current(null);
      resolverRef.current = null;
    }

    setIsActive(false);
    setCurrentStepIndex(0);
    resultsRef.current = [];
  }, []);

  const renderCurrentStep = useCallback(
    (extraProps: Record<string, unknown> = {}) => {
      if (!isActive) return null;

      const StepComponent = steps[currentStepIndex];
      if (!StepComponent) return null;

      return (
        <StepComponent
          {...extraProps}
          stepIndex={currentStepIndex}
          isLastStep={currentStepIndex === steps.length - 1}
          onNext={completeStep}
          onCancel={cancel}
        />
      );
    },
    [cancel, completeStep, currentStepIndex, isActive, steps],
  );

  return { next, cancel, completeStep, renderCurrentStep, currentStepIndex, isActive } as const;
};
