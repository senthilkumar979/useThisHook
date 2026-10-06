import type { HookApi } from '../hookDoc';

export const useOnlineStatusApi: HookApi = {
  signature: 'useOnlineStatus(): boolean',
  explanation:
    'Subscribes to the browser online and offline events and returns whether the machine currently reports a network connection.',
  arguments: [],
  returns: {
    type: 'boolean',
    description:
      'true when the browser thinks it is online, false when it fires the offline event.',
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
      description:
        'A CSS media query, for example "(min-width: 768px)" or "(prefers-color-scheme: dark)".',
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

export const useFingerprintApi: HookApi = {
  signature: 'useFingerprint(options?: { enabled?: boolean })',
  explanation:
    'Collects browser signals (user agent, canvas, WebGL, screen, locale, storage) and hashes them into a stable client-side visitor id — similar to the open-source FingerprintJS approach. No network calls and no API key.',
  arguments: [
    {
      name: 'options.enabled',
      type: 'boolean',
      description:
        'When false, skip automatic identification on mount. Call refresh() yourself. Default true.',
    },
  ],
  returns: {
    type: '{ visitorId, components, isPending, error, refresh }',
    description: 'Visitor id plus the raw signal map used to build it.',
    fields: [
      {
        name: 'visitorId',
        type: 'string | null',
        description: 'Hex hash of the collected signals, or null before the first successful run.',
      },
      {
        name: 'components',
        type: 'FingerprintComponents | null',
        description: 'Named browser signals that went into the hash.',
      },
      {
        name: 'isPending',
        type: 'boolean',
        description: 'true while identification is running.',
      },
      {
        name: 'error',
        type: 'Error | null',
        description: 'Set when collection throws unexpectedly.',
      },
      {
        name: 'refresh',
        type: '() => Promise<string | null>',
        description: 'Re-run identification and return the new visitor id.',
      },
    ],
  },
  caveats: [
    'This is client-side fingerprinting only. Identical devices can share an id; it is not Fingerprint Identification (the commercial SaaS).',
    'Privacy-focused browsers may reduce signal entropy. Treat the id as a hint, not a hard identity.',
  ],
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
