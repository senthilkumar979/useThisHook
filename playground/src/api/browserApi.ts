import type { HookApi } from '../hookDoc';

export const useOnlineStatusApi: HookApi = {
  signature: 'useOnlineStatus(): boolean',
  explanation:
    'Subscribes to the browser online and offline events and returns whether the machine currently reports a network connection.',
  arguments: [],
  returns: {
    type: 'boolean',
    description: 'true when the browser thinks it is online, false when it fires the offline event.',
  },
  caveats: ['This is the browser’s connectivity flag, not a guarantee that your API is reachable.'],
};

export const useMediaQueryApi: HookApi = {
  signature: 'useMediaQuery(query: string): boolean',
  explanation:
    'Subscribes to window.matchMedia so your component re-renders when the query starts or stops matching, the same way CSS breakpoints work.',
  arguments: [
    {
      name: 'query',
      type: 'string',
      description: 'A CSS media query, for example "(min-width: 768px)" or "(prefers-color-scheme: dark)".',
    },
  ],
  returns: {
    type: 'boolean',
    description: 'true while the query matches the current viewport / environment.',
  },
};

export const useWindowSizeApi: HookApi = {
  signature: 'useWindowSize(): { width, height }',
  explanation:
    'Tracks window.innerWidth and window.innerHeight and updates on resize. Use this when you need pixel sizes, not just a breakpoint.',
  arguments: [],
  returns: {
    type: '{ width: number, height: number }',
    description: 'Viewport dimensions in CSS pixels.',
    fields: [
      { name: 'width', type: 'number', description: 'window.innerWidth' },
      { name: 'height', type: 'number', description: 'window.innerHeight' },
    ],
  },
};

export const useOnClickOutsideApi: HookApi = {
  signature: 'useOnClickOutside(ref, handler): void',
  explanation:
    'Listens for mousedown and touchstart on the document. If the event target is outside ref.current, it calls handler. Use this to dismiss popovers.',
  arguments: [
    {
      name: 'ref',
      type: 'RefObject<T | null>',
      description: 'Ref attached to the element that should count as “inside”.',
    },
    {
      name: 'handler',
      type: '(event: MouseEvent | TouchEvent) => void',
      description: 'Called only for presses that happen outside that element.',
    },
  ],
  returns: {
    type: 'void',
    description: 'Nothing. Typically you close local state from handler.',
  },
};
