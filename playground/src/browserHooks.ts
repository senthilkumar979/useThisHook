import {
  useMediaQueryApi,
  useOnClickOutsideApi,
  useOnlineStatusApi,
  useWindowSizeApi,
} from './api/browserApi';
import { useEventListenerApi, useKeyPressApi, useTimeoutApi } from './api/browserEventsApi';
import { useAsyncSelectApi, useOverlayApi, useStepFlowApi } from './api/flowApi';
import { UseAsyncSelectDemo, useAsyncSelectExample } from './demos/UseAsyncSelectDemo';
import { UseEventListenerDemo, useEventListenerExample } from './demos/UseEventListenerDemo';
import { UseKeyPressDemo, useKeyPressExample } from './demos/UseKeyPressDemo';
import { UseMediaQueryDemo, useMediaQueryExample } from './demos/UseMediaQueryDemo';
import { UseOnClickOutsideDemo, useOnClickOutsideExample } from './demos/UseOnClickOutsideDemo';
import { UseOnlineStatusDemo, useOnlineStatusExample } from './demos/UseOnlineStatusDemo';
import { UseOverlayDemo, useOverlayExample } from './demos/UseOverlayDemo';
import { UseStepFlowDemo, useStepFlowExample } from './demos/UseStepFlowDemo';
import { UseTimeoutDemo, useTimeoutExample } from './demos/UseTimeoutDemo';
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
  {
    id: 'useEventListener',
    name: 'useEventListener',
    summary: 'Subscribe to a DOM or window event with a stable handler.',
    whenToUse: 'Use instead of addEventListener in an effect you would rewrite often.',
    category: 'Browser',
    api: useEventListenerApi,
    Demo: UseEventListenerDemo,
    example: useEventListenerExample,
  },
  {
    id: 'useTimeout',
    name: 'useTimeout',
    summary: 'Run a callback once after a delay. null pauses.',
    whenToUse: 'Use for one-shot delays, not repeating ticks (see useInterval).',
    category: 'Browser',
    api: useTimeoutApi,
    Demo: UseTimeoutDemo,
    example: useTimeoutExample,
  },
  {
    id: 'useKeyPress',
    name: 'useKeyPress',
    summary: 'True while a keyboard key is held (ignores text fields).',
    whenToUse: 'Use for shortcuts such as Escape.',
    category: 'Browser',
    api: useKeyPressApi,
    Demo: UseKeyPressDemo,
    example: useKeyPressExample,
  },
];
