import { act, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { type StepFlowStepProps, useStepFlow } from './useStepFlow';

const NameStep = ({ onNext, onCancel, isLastStep, stepIndex }: StepFlowStepProps<string>) => (
  <div>
    <span>{isLastStep ? 'last' : 'first'}</span>
    <span>step-{stepIndex}</span>
    <button type="button" onClick={() => onNext('Ada')}>
      Next
    </button>
    <button type="button" onClick={onCancel}>
      Cancel
    </button>
  </div>
);

const ConfirmStep = ({ onNext, isLastStep }: StepFlowStepProps<string>) => (
  <div>
    <span>{isLastStep ? 'last' : 'first'}</span>
    <button type="button" onClick={() => onNext('confirmed')}>
      Finish
    </button>
  </div>
);

describe('useStepFlow', () => {
  it('renders nothing until the flow is started', () => {
    const { result } = renderHook(() => useStepFlow<string>([NameStep, ConfirmStep]));
    expect(result.current.isActive).toBe(false);
    expect(result.current.renderCurrentStep()).toBeNull();
  });

  it('walks through steps and resolves collected data', async () => {
    const { result } = renderHook(() => useStepFlow<string>([NameStep, ConfirmStep]));
    let flowResult: Array<string | undefined> | null = [];

    act(() => {
      void result.current.next().then((value) => {
        flowResult = value;
      });
    });

    expect(result.current.isActive).toBe(true);
    const first = render(result.current.renderCurrentStep());
    expect(screen.getByText('first')).toBeTruthy();
    expect(screen.getByText('step-0')).toBeTruthy();

    await act(async () => {
      screen.getByRole('button', { name: 'Next' }).click();
    });

    first.unmount();
    render(result.current.renderCurrentStep());
    expect(screen.getByText('last')).toBeTruthy();

    await act(async () => {
      screen.getByRole('button', { name: 'Finish' }).click();
    });

    expect(flowResult).toEqual(['Ada', 'confirmed']);
    expect(result.current.isActive).toBe(false);
    expect(result.current.currentStepIndex).toBe(0);
  });

  it('resolves null when cancelled', async () => {
    const { result } = renderHook(() => useStepFlow<string>([NameStep, ConfirmStep]));
    let flowResult: Array<string | undefined> | null = [];

    act(() => {
      void result.current.next().then((value) => {
        flowResult = value;
      });
    });

    render(result.current.renderCurrentStep());

    await act(async () => {
      screen.getByRole('button', { name: 'Cancel' }).click();
    });

    expect(flowResult).toBeNull();
    expect(result.current.isActive).toBe(false);
  });
});
