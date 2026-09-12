import type { HookApi } from '../hookDoc';

export const useOverlayApi: HookApi = {
  signature: 'useOverlay<TProps, TResult>(Overlay)',
  explanation:
    'Turns a modal component into a promise. You call open(props), the overlay renders, and close(result) resolves that promise. Body scroll is locked while it is open.',
  arguments: [
    {
      name: 'Overlay',
      type: 'ComponentType<TProps & { isOpen, close }>',
      description:
        'Your UI. It receives the props you pass to open(), plus isOpen and close. Keep showing it when isOpen is false if you need an exit animation.',
    },
  ],
  returns: {
    type: '{ open, close, render }',
    description: 'Control the overlay from the parent and place it in the tree with render().',
    fields: [
      {
        name: 'open',
        type: '(data?: TProps) => Promise<TResult | undefined>',
        description: 'Shows the overlay and waits until close is called.',
      },
      {
        name: 'close',
        type: '(result?: TResult) => void',
        description: 'Hides the overlay, restores overflow, and resolves the pending open() promise.',
      },
      {
        name: 'render',
        type: '() => ReactNode',
        description: 'Returns the overlay element, or null before the first open(). Put this in JSX.',
      },
    ],
  },
  caveats: [
    'render() is null until open() has been called once.',
    'close() without a matching open() is a no-op for the promise.',
  ],
};

export const useStepFlowApi: HookApi = {
  signature: 'useStepFlow<TStepData>(steps)',
  explanation:
    'Runs an ordered list of step components. next() starts the wizard and returns a promise for every step’s data. The last onNext resolves that promise; cancel resolves null.',
  arguments: [
    {
      name: 'steps',
      type: 'Array<ComponentType<StepFlowStepProps<TStepData>>>',
      description: 'Components rendered one at a time. Each receives stepIndex, isLastStep, onNext, and onCancel.',
    },
  ],
  returns: {
    type: '{ next, cancel, completeStep, renderCurrentStep, currentStepIndex, isActive }',
    description: 'Start/stop the flow and render the active step.',
    fields: [
      {
        name: 'next',
        type: '() => Promise<Array<TStepData | undefined> | null>',
        description: 'Starts from step 0. Resolves with collected step data, or null on cancel.',
      },
      { name: 'cancel', type: '() => void', description: 'Aborts, resets the index, resolves next() with null.' },
      {
        name: 'completeStep',
        type: '(stepData?: TStepData) => void',
        description: 'Records data and advances. Same function passed to each step as onNext.',
      },
      {
        name: 'renderCurrentStep',
        type: '(extraProps?: object) => ReactNode',
        description: 'The active step, or null when the flow is inactive. extraProps are spread onto the step.',
      },
      { name: 'currentStepIndex', type: 'number', description: 'Zero-based index of the visible step.' },
      { name: 'isActive', type: 'boolean', description: 'True between next() and finish/cancel.' },
    ],
  },
};

export const useAsyncSelectApi: HookApi = {
  signature: 'useAsyncSelect()',
  explanation:
    'Returns a function that opens the native file picker and resolves with the chosen file(s). There is no visible input in your tree; the hook creates a temporary one.',
  arguments: [],
  returns: {
    type: '(options?: AsyncSelectOptions) => Promise<File | File[] | null>',
    description: 'Call this from a click handler. Await the picker result.',
    fields: [
      {
        name: 'options.accept',
        type: 'string',
        optional: true,
        defaultValue: "'*'",
        description: 'Same as the input accept attribute, e.g. "image/*" or ".pdf".',
      },
      {
        name: 'options.multiple',
        type: 'boolean',
        optional: true,
        defaultValue: 'false',
        description: 'When true, the promise resolves to File[]. When false, it resolves to a single File.',
      },
    ],
  },
  caveats: [
    'Resolves null if the user cancels the picker or selects nothing.',
    'Must be triggered from a user gesture (click) or the browser may block the picker.',
  ],
};
