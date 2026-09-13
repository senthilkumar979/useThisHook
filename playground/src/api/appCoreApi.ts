import type { HookApi } from '../hookDoc';

export const useStableCallbackApi: HookApi = {
  signature: 'useStableCallback<T>(fn: T): T',
  explanation:
    'Returns a function with a stable identity that always calls the latest fn you passed. Use it when a subscription or interval should not reset, but should see fresh state.',
  arguments: [
    {
      name: 'fn',
      type: 'T extends (...args) => unknown',
      description: 'The function you would normally recreate every render.',
    },
  ],
  returns: {
    type: 'T',
    description: 'A stable callback. Put this in dependency arrays; it will not change.',
  },
};

export const useResetStateApi: HookApi = {
  signature: 'useResetState<T>(source, initialValue)',
  explanation:
    'Like useState(initialValue), but when source changes (user id, record id, open flag), state becomes the initialValue from that render.',
  arguments: [
    {
      name: 'source',
      type: 'unknown',
      description: 'Identity of the thing being edited. Changing it resets state.',
    },
    {
      name: 'initialValue',
      type: 'T',
      description: 'State to use on first render and whenever source changes.',
    },
  ],
  returns: {
    type: '[state, setState]',
    description: 'The same tuple shape as useState.',
    fields: [
      { name: 'state', type: 'T', description: 'Current local value.' },
      {
        name: 'setState',
        type: 'Dispatch<SetStateAction<T>>',
        description: 'Update state until source changes.',
      },
    ],
  },
};
