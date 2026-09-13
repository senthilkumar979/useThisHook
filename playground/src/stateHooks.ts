import { useCopyToClipboardApi, useIntervalApi, useLocalStorageApi } from './api/persistApi';
import { useBooleanApi, useDebounceApi, useDisclosureApi } from './api/coreStateApi';
import { UseBooleanDemo, useBooleanExample } from './demos/UseBooleanDemo';
import { UseCopyToClipboardDemo, useCopyToClipboardExample } from './demos/UseCopyToClipboardDemo';
import { UseDebounceDemo, useDebounceExample } from './demos/UseDebounceDemo';
import { UseDisclosureDemo, useDisclosureExample } from './demos/UseDisclosureDemo';
import { UseIntervalDemo, useIntervalExample } from './demos/UseIntervalDemo';
import { UseLocalStorageDemo, useLocalStorageExample } from './demos/UseLocalStorageDemo';
import type { HookEntry } from './hookDoc';

export const stateHooks: HookEntry[] = [
  {
    id: 'useBoolean',
    name: 'useBoolean',
    summary: 'Boolean state with toggle helpers.',
    whenToUse: 'Use for panels, switches, and any on/off UI.',
    category: 'State',
    api: useBooleanApi,
    Demo: UseBooleanDemo,
    example: useBooleanExample,
  },
  {
    id: 'useDisclosure',
    name: 'useDisclosure',
    summary: 'Open, close, and toggle for menus and dialogs.',
    whenToUse: 'Use when UI has an explicit open/closed lifecycle.',
    category: 'State',
    api: useDisclosureApi,
    Demo: UseDisclosureDemo,
    example: useDisclosureExample,
  },
  {
    id: 'useDebounce',
    name: 'useDebounce',
    summary: 'Delay updates until the value stops changing.',
    whenToUse: 'Use for search inputs and expensive derived work.',
    category: 'State',
    api: useDebounceApi,
    Demo: UseDebounceDemo,
    example: useDebounceExample,
  },
  {
    id: 'useInterval',
    name: 'useInterval',
    summary: 'Declarative setInterval that always calls the latest callback.',
    whenToUse: 'Use for polling and timers. Pass null to pause.',
    category: 'State',
    api: useIntervalApi,
    Demo: UseIntervalDemo,
    example: useIntervalExample,
  },
  {
    id: 'useCopyToClipboard',
    name: 'useCopyToClipboard',
    summary: 'Copy text with the Clipboard API.',
    whenToUse: 'Use for share and copy buttons.',
    category: 'State',
    api: useCopyToClipboardApi,
    Demo: UseCopyToClipboardDemo,
    example: useCopyToClipboardExample,
  },
  {
    id: 'useLocalStorage',
    name: 'useLocalStorage',
    summary: 'Persist JSON-serializable state in localStorage.',
    whenToUse: 'Use for user preferences that should survive refresh.',
    category: 'State',
    api: useLocalStorageApi,
    Demo: UseLocalStorageDemo,
    example: useLocalStorageExample,
  },
];
