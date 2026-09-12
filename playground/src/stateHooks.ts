import { useCopyToClipboardApi, useDocumentTitleApi, useIntervalApi, useLocalStorageApi } from './api/persistApi';
import { useCounterApi, useDebounceApi, useDisclosureApi, usePreviousApi, useToggleApi } from './api/coreStateApi';
import { UseCopyToClipboardDemo, useCopyToClipboardExample } from './demos/UseCopyToClipboardDemo';
import { UseCounterDemo, useCounterExample } from './demos/UseCounterDemo';
import { UseDebounceDemo, useDebounceExample } from './demos/UseDebounceDemo';
import { UseDisclosureDemo, useDisclosureExample } from './demos/UseDisclosureDemo';
import { UseDocumentTitleDemo, useDocumentTitleExample } from './demos/UseDocumentTitleDemo';
import { UseIntervalDemo, useIntervalExample } from './demos/UseIntervalDemo';
import { UseLocalStorageDemo, useLocalStorageExample } from './demos/UseLocalStorageDemo';
import { UsePreviousDemo, usePreviousExample } from './demos/UsePreviousDemo';
import { UseToggleDemo, useToggleExample } from './demos/UseToggleDemo';
import type { HookEntry } from './hookDoc';

export const stateHooks: HookEntry[] = [
  {
    id: 'useToggle',
    name: 'useToggle',
    summary: 'Boolean state with toggle helpers.',
    whenToUse: 'Use for panels, switches, and any on/off UI.',
    category: 'State',
    api: useToggleApi,
    Demo: UseToggleDemo,
    example: useToggleExample,
  },
  {
    id: 'useCounter',
    name: 'useCounter',
    summary: 'Numeric counter with a configurable step.',
    whenToUse: 'Use for quantity pickers and simple tallies.',
    category: 'State',
    api: useCounterApi,
    Demo: UseCounterDemo,
    example: useCounterExample,
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
    id: 'usePrevious',
    name: 'usePrevious',
    summary: 'Keep the value from the previous render.',
    whenToUse: 'Use to compare current and last state.',
    category: 'State',
    api: usePreviousApi,
    Demo: UsePreviousDemo,
    example: usePreviousExample,
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
  {
    id: 'useDocumentTitle',
    name: 'useDocumentTitle',
    summary: 'Set document.title while a component is mounted.',
    whenToUse: 'Use for page-specific tab titles.',
    category: 'State',
    api: useDocumentTitleApi,
    Demo: UseDocumentTitleDemo,
    example: useDocumentTitleExample,
  },
];
