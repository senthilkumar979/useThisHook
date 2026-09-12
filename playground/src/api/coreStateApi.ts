import type { HookApi } from '../hookDoc';

export const useToggleApi: HookApi = {
  signature: 'useToggle(initialValue?: boolean)',
  explanation:
    'Keeps a boolean in React state and returns helpers so you can flip, force on, or force off without writing setState yourself.',
  arguments: [
    {
      name: 'initialValue',
      type: 'boolean',
      optional: true,
      defaultValue: 'false',
      description: 'Starting on/off value for the first render.',
    },
  ],
  returns: {
    type: '{ value, toggle, setTrue, setFalse, setValue }',
    description: 'The current flag plus stable callbacks to change it.',
    fields: [
      { name: 'value', type: 'boolean', description: 'Whether the flag is currently on.' },
      {
        name: 'toggle',
        type: '() => void',
        description: 'Flips value from true to false or the reverse.',
      },
      { name: 'setTrue', type: '() => void', description: 'Sets value to true.' },
      { name: 'setFalse', type: '() => void', description: 'Sets value to false.' },
      {
        name: 'setValue',
        type: 'Dispatch<SetStateAction<boolean>>',
        description: 'Escape hatch for any boolean update, including functional updates.',
      },
    ],
  },
};

export const useCounterApi: HookApi = {
  signature: 'useCounter(initialValue?: number, step?: number)',
  explanation:
    'Holds a number and changes it by a fixed step. Useful for quantity pickers, pagination, and simple scores.',
  arguments: [
    {
      name: 'initialValue',
      type: 'number',
      optional: true,
      defaultValue: '0',
      description: 'Starting count. reset() always returns to this value.',
    },
    {
      name: 'step',
      type: 'number',
      optional: true,
      defaultValue: '1',
      description: 'How much increment() and decrement() add or subtract.',
    },
  ],
  returns: {
    type: '{ count, increment, decrement, reset, setCount }',
    description: 'The current number and ways to move it.',
    fields: [
      { name: 'count', type: 'number', description: 'Current value.' },
      { name: 'increment', type: '() => void', description: 'Adds step to count.' },
      { name: 'decrement', type: '() => void', description: 'Subtracts step from count.' },
      { name: 'reset', type: '() => void', description: 'Sets count back to initialValue.' },
      {
        name: 'setCount',
        type: 'Dispatch<SetStateAction<number>>',
        description: 'Set an exact number, bypassing step.',
      },
    ],
  },
};

export const useDisclosureApi: HookApi = {
  signature: 'useDisclosure(initialOpen?: boolean)',
  explanation:
    'Named open/close/toggle helpers for UI that has a visible and hidden state, such as menus, drawers, and dialogs.',
  arguments: [
    {
      name: 'initialOpen',
      type: 'boolean',
      optional: true,
      defaultValue: 'false',
      description: 'Whether the surface starts visible.',
    },
  ],
  returns: {
    type: '{ isOpen, open, close, toggle }',
    description: 'Visibility flag and the three actions you typically wire to buttons.',
    fields: [
      { name: 'isOpen', type: 'boolean', description: 'True while the surface should be shown.' },
      { name: 'open', type: '() => void', description: 'Shows the surface.' },
      { name: 'close', type: '() => void', description: 'Hides the surface.' },
      { name: 'toggle', type: '() => void', description: 'Flips isOpen.' },
    ],
  },
};

export const useDebounceApi: HookApi = {
  signature: 'useDebounce<T>(value: T, delayMs?: number): T',
  explanation:
    'Returns a copy of value that only updates after value has stayed still for delayMs. The first render returns the original value immediately.',
  arguments: [
    {
      name: 'value',
      type: 'T',
      description: 'The rapidly changing source, such as an input string.',
    },
    {
      name: 'delayMs',
      type: 'number',
      optional: true,
      defaultValue: '300',
      description: 'Idle time in milliseconds before the returned value catches up.',
    },
  ],
  returns: {
    type: 'T',
    description: 'The lagged value. Use this for search queries, filters, or expensive work.',
  },
};

export const usePreviousApi: HookApi = {
  signature: 'usePrevious<T>(value: T): T | undefined',
  explanation:
    'On each render, returns what value was on the previous render. The first render returns undefined because there is no previous value yet.',
  arguments: [
    { name: 'value', type: 'T', description: 'Any value you want to compare across renders.' },
  ],
  returns: {
    type: 'T | undefined',
    description: 'The last distinct value, or undefined until value has changed once.',
  },
};
