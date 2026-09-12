import { useState } from 'react';
import { type StepFlowStepProps, useStepFlow } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

const NameStep = ({ onNext, onCancel }: StepFlowStepProps<string>) => (
  <div className="space-y-3">
    <p>Step 1: choose a name</p>
    <button type="button" className={buttonClass} onClick={() => onNext('Ada')}>
      Continue as Ada
    </button>
    <button type="button" className={ghostButtonClass} onClick={onCancel}>
      Cancel
    </button>
  </div>
);

const ConfirmStep = ({ onNext, onCancel }: StepFlowStepProps<string>) => (
  <div className="space-y-3">
    <p>Step 2: confirm</p>
    <button type="button" className={buttonClass} onClick={() => onNext('confirmed')}>
      Finish
    </button>
    <button type="button" className={ghostButtonClass} onClick={onCancel}>
      Cancel
    </button>
  </div>
);

export const UseStepFlowDemo = () => {
  const flow = useStepFlow<string>([NameStep, ConfirmStep]);
  const [result, setResult] = useState<string>('Idle');

  const start = async () => {
    const values = await flow.next();
    setResult(values ? values.join(', ') : 'Cancelled');
  };

  return (
    <div className="space-y-3">
      <button type="button" className={buttonClass} onClick={() => void start()}>
        Start flow
      </button>
      <p>Result: {result}</p>
      {flow.renderCurrentStep()}
    </div>
  );
};

export const useStepFlowExample = `import { useStepFlow } from 'usethishook';

export const Wizard = () => {
  const flow = useStepFlow([StepOne, StepTwo]);
  return (
    <>
      <button type="button" onClick={() => void flow.next()}>Start</button>
      {flow.renderCurrentStep()}
    </>
  );
};`;
