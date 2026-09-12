import type { HookApi } from '../hookDoc';

export const useControllableStateApi: HookApi = {
  signature: 'useControllableState({ value, defaultValue, onChange })',
  explanation:
    'One setter for both controlled and uncontrolled components. If value is passed, the hook is controlled and only calls onChange. Otherwise it keeps defaultValue internally.',
  arguments: [
    {
      name: 'value',
      type: 'T',
      optional: true,
      description: 'Controlled value. Omit this to run uncontrolled.',
    },
    { name: 'defaultValue', type: 'T', description: 'Starting value when value is omitted.' },
    {
      name: 'onChange',
      type: '(value: T) => void',
      optional: true,
      description: 'Fires with the next value in both modes.',
    },
  ],
  returns: {
    type: '[current, setValue]',
    description: 'Same shape as useState. setValue accepts a value or a functional update.',
  },
};

export const useUnsavedChangesApi: HookApi = {
  signature: 'useUnsavedChanges(isDirty, confirmLeave?)',
  explanation:
    'While isDirty is true, the tab’s beforeunload prompt is armed. confirmLeave() is for in-app navigation: it returns true if leaving is allowed.',
  arguments: [
    { name: 'isDirty', type: 'boolean', description: 'Whether there are unsaved edits.' },
    {
      name: 'confirmLeave',
      type: '(message: string) => boolean | Promise<boolean>',
      optional: true,
      description: 'Injected confirmer (for example useConfirm). Falls back to window.confirm.',
    },
  ],
  returns: {
    type: '{ confirmLeave }',
    description:
      'Call before changing route. Resolves true when clean, or when the user agrees to leave.',
    fields: [
      {
        name: 'confirmLeave',
        type: '(message?: string) => Promise<boolean>',
        description: 'Default message: “Leave without saving?”',
      },
    ],
  },
};

export const useElementSizeApi: HookApi = {
  signature: 'useElementSize<T extends HTMLElement>()',
  explanation:
    'Callback ref plus live contentRect width and height from ResizeObserver. Measure the element, not the window.',
  arguments: [],
  returns: {
    type: '{ ref, width, height }',
    description: 'Attach ref to the node you want to measure. Starts at 0×0 until it mounts.',
    fields: [
      {
        name: 'ref',
        type: '(element: T | null) => void',
        description: 'Callback ref for the observed element.',
      },
      { name: 'width', type: 'number', description: 'contentRect.width' },
      { name: 'height', type: 'number', description: 'contentRect.height' },
    ],
  },
};

export const useInViewApi: HookApi = {
  signature: 'useInView(options?)',
  explanation:
    'Callback ref plus isInView from IntersectionObserver. Use for lazy media, infinite-scroll sentinels, and enter animations.',
  arguments: [
    {
      name: 'root',
      type: 'Element | null',
      optional: true,
      description: 'Scroll root. Default is the viewport.',
    },
    {
      name: 'rootMargin',
      type: 'string',
      optional: true,
      defaultValue: "'0px'",
      description: 'Same as IntersectionObserver rootMargin.',
    },
    {
      name: 'threshold',
      type: 'number | number[]',
      optional: true,
      defaultValue: '0',
      description: 'How much of the target must be visible.',
    },
    {
      name: 'once',
      type: 'boolean',
      optional: true,
      defaultValue: 'false',
      description: 'If true, stays true after the first intersection and disconnects.',
    },
  ],
  returns: {
    type: '{ ref, isInView }',
    description:
      'Attach ref to the target. isInView updates as it enters and leaves (unless once).',
  },
};

export const usePaginationApi: HookApi = {
  signature: 'usePagination({ total, pageSize, initialPage })',
  explanation:
    '1-based page state with derived pageCount, offset, and next/prev. Clamps page when total shrinks. Changing page size returns to page 1.',
  arguments: [
    { name: 'total', type: 'number', description: 'Total item count.' },
    {
      name: 'pageSize',
      type: 'number',
      optional: true,
      defaultValue: '10',
      description: 'Items per page (initial).',
    },
    {
      name: 'initialPage',
      type: 'number',
      optional: true,
      defaultValue: '1',
      description: 'Starting page (1-based).',
    },
  ],
  returns: {
    type: '{ page, pageSize, total, pageCount, offset, canNext, canPrev, setPage, setPageSize, next, prev }',
    description: 'Slice with items.slice(offset, offset + pageSize).',
    fields: [
      {
        name: 'page',
        type: 'number',
        description: 'Current page, always between 1 and pageCount.',
      },
      { name: 'offset', type: 'number', description: '(page - 1) * pageSize' },
      { name: 'pageCount', type: 'number', description: 'At least 1, even when total is 0.' },
      {
        name: 'setPageSize',
        type: '(size: number) => void',
        description: 'Updates page size and resets to page 1.',
      },
    ],
  },
};
