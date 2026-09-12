import { useMediaQueryApi, useOnClickOutsideApi, useOnlineStatusApi, useWindowSizeApi } from './api/browserApi';
import { useAsyncSelectApi, useOverlayApi, useStepFlowApi } from './api/flowApi';
import { UseAsyncSelectDemo, useAsyncSelectExample } from './demos/UseAsyncSelectDemo';
import { UseMediaQueryDemo, useMediaQueryExample } from './demos/UseMediaQueryDemo';
import { UseOnClickOutsideDemo, useOnClickOutsideExample } from './demos/UseOnClickOutsideDemo';
import { UseOnlineStatusDemo, useOnlineStatusExample } from './demos/UseOnlineStatusDemo';
import { UseOverlayDemo, useOverlayExample } from './demos/UseOverlayDemo';
import { UseStepFlowDemo, useStepFlowExample } from './demos/UseStepFlowDemo';
import { UseWindowSizeDemo, useWindowSizeExample } from './demos/UseWindowSizeDemo';
import type { HookEntry } from './hookDoc';

export const browserHooks: HookEntry[] = [
  {
    id: 'useOnlineStatus',
    name: 'useOnlineStatus',
    summary: 'Subscribe to the browser online/offline state.',
    whenToUse: 'Use to warn users when the network drops.',
    category: 'Browser',
    api: useOnlineStatusApi,
    Demo: UseOnlineStatusDemo,
    example: useOnlineStatusExample,
  },
  {
    id: 'useMediaQuery',
    name: 'useMediaQuery',
    summary: 'Subscribe to a CSS media query.',
    whenToUse: 'Use for layout branches that match CSS breakpoints.',
    category: 'Browser',
    api: useMediaQueryApi,
    Demo: UseMediaQueryDemo,
    example: useMediaQueryExample,
  },
  {
    id: 'useWindowSize',
    name: 'useWindowSize',
    summary: 'Current viewport width and height.',
    whenToUse: 'Use when you need pixel dimensions, not just a breakpoint.',
    category: 'Browser',
    api: useWindowSizeApi,
    Demo: UseWindowSizeDemo,
    example: useWindowSizeExample,
  },
  {
    id: 'useOnClickOutside',
    name: 'useOnClickOutside',
    summary: 'Run a handler when the user clicks outside a ref.',
    whenToUse: 'Use for popovers, dropdowns, and dismissible cards.',
    category: 'Browser',
    api: useOnClickOutsideApi,
    Demo: UseOnClickOutsideDemo,
    example: useOnClickOutsideExample,
  },
  {
    id: 'useOverlay',
    name: 'useOverlay',
    summary: 'Promise-based overlay / modal rendering.',
    whenToUse: 'Use when a modal should await the user’s choice.',
    category: 'Browser',
    api: useOverlayApi,
    Demo: UseOverlayDemo,
    example: useOverlayExample,
  },
  {
    id: 'useStepFlow',
    name: 'useStepFlow',
    summary: 'Multi-step wizard that resolves when the flow finishes.',
    whenToUse: 'Use for onboarding or checkout-style sequences.',
    category: 'Browser',
    api: useStepFlowApi,
    Demo: UseStepFlowDemo,
    example: useStepFlowExample,
  },
  {
    id: 'useAsyncSelect',
    name: 'useAsyncSelect',
    summary: 'Open the native file picker and await the result.',
    whenToUse: 'Use instead of a hidden file input when you want a Promise.',
    category: 'Browser',
    api: useAsyncSelectApi,
    Demo: UseAsyncSelectDemo,
    example: useAsyncSelectExample,
  },
];
