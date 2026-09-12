import {
  useControllableStateApi,
  useElementSizeApi,
  useInViewApi,
  usePaginationApi,
  useUnsavedChangesApi,
} from './api/leverageApi';
import { UseControllableStateDemo, useControllableStateExample } from './demos/UseControllableStateDemo';
import { UseElementSizeDemo, useElementSizeExample } from './demos/UseElementSizeDemo';
import { UseInViewDemo, useInViewExample } from './demos/UseInViewDemo';
import { UsePaginationDemo, usePaginationExample } from './demos/UsePaginationDemo';
import { UseUnsavedChangesDemo, useUnsavedChangesExample } from './demos/UseUnsavedChangesDemo';
import type { HookEntry } from './hookDoc';

export const leverageHooks: HookEntry[] = [
  {
    id: 'useControllableState',
    name: 'useControllableState',
    summary: 'Controlled and uncontrolled state in one setter.',
    whenToUse: 'Use in reusable inputs, drawers, and tabs.',
    category: 'App',
    api: useControllableStateApi,
    Demo: UseControllableStateDemo,
    example: useControllableStateExample,
  },
  {
    id: 'useUnsavedChanges',
    name: 'useUnsavedChanges',
    summary: 'Warn on tab close and confirm in-app leave when dirty.',
    whenToUse: 'Use on editors and long forms.',
    category: 'App',
    api: useUnsavedChangesApi,
    Demo: UseUnsavedChangesDemo,
    example: useUnsavedChangesExample,
  },
  {
    id: 'useElementSize',
    name: 'useElementSize',
    summary: 'Live width and height of an element via ResizeObserver.',
    whenToUse: 'Use for charts, split panes, and autosize fields.',
    category: 'App',
    api: useElementSizeApi,
    Demo: UseElementSizeDemo,
    example: useElementSizeExample,
  },
  {
    id: 'useInView',
    name: 'useInView',
    summary: 'Whether an element intersects the viewport (or a root).',
    whenToUse: 'Use for lazy load, infinite scroll, and enter animations.',
    category: 'App',
    api: useInViewApi,
    Demo: UseInViewDemo,
    example: useInViewExample,
  },
  {
    id: 'usePagination',
    name: 'usePagination',
    summary: 'Page, page size, offset, and next/prev with clamping.',
    whenToUse: 'Use to slice lists and tables.',
    category: 'App',
    api: usePaginationApi,
    Demo: UsePaginationDemo,
    example: usePaginationExample,
  },
];
