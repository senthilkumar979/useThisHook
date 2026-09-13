import type { HookApi } from '../hookDoc';

export const useEventListenerApi: HookApi = {
  signature: 'useEventListener(target, type, handler, options?): void',
  explanation:
    'Adds an event listener on a window, document, node, or ref. The handler ref stays current so the subscription does not reset every render.',
  arguments: [
    {
      name: 'target',
      type: 'Window | Document | EventTarget | RefObject<EventTarget | null> | null',
      description: 'Where to listen. Pass null to skip attaching (SSR-safe).',
    },
    { name: 'type', type: 'string', description: 'Event name, for example "resize" or "keydown".' },
    {
      name: 'handler',
      type: '(event: Event) => void',
      description: 'Called for each matching event. Latest function is used.',
    },
    {
      name: 'options',
      type: 'boolean | AddEventListenerOptions',
      description: 'Passed through to addEventListener.',
      optional: true,
    },
  ],
  returns: { type: 'void', description: 'Nothing. Side effect only.' },
};

export const useTimeoutApi: HookApi = {
  signature: 'useTimeout(callback, delayMs): void',
  explanation:
    'Runs callback once after delayMs. Pass null to pause or clear. The latest callback is used without restarting the timer.',
  arguments: [
    { name: 'callback', type: '() => void', description: 'Invoked once when the timer fires.' },
    {
      name: 'delayMs',
      type: 'number | null',
      description: 'Delay in milliseconds. null means do not schedule.',
    },
  ],
  returns: { type: 'void', description: 'Nothing. Side effect only.' },
};

export const useKeyPressApi: HookApi = {
  signature: 'useKeyPress(key: string): boolean',
  explanation:
    'True while that event.key is held down on window. Keydowns from inputs, textareas, selects, and contenteditable are ignored.',
  arguments: [
    {
      name: 'key',
      type: 'string',
      description: 'KeyboardEvent.key value, for example "Escape" or "k".',
    },
  ],
  returns: { type: 'boolean', description: 'true between matching keydown and keyup.' },
};