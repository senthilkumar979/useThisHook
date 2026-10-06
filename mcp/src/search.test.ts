import { afterEach, describe, expect, it } from 'vitest';
import { getHook, listHooks, setCatalogForTests } from './catalog.js';
import { recommendHooks, searchHooks } from './search.js';
import type { HookDoc } from './types.js';

const sampleHooks: HookDoc[] = [
  {
    id: 'useBoolean',
    name: 'useBoolean',
    summary: 'Boolean state with toggle helpers.',
    whenToUse: 'Use for panels, switches, and any on/off UI.',
    category: 'State',
    description: 'Named helpers to turn a flag on, off, or flip it.',
    api: {
      signature: 'useBoolean(initialValue: boolean)',
      explanation: 'Boolean state helpers.',
      arguments: [],
      returns: { type: 'object', description: 'Flag helpers' },
    },
    example: 'const { value, toggle } = useBoolean(false);',
    playgroundUrl: 'https://usethishook.mentorbridge.in/useBoolean',
    import: "import { useBoolean } from 'usethishook';",
  },
  {
    id: 'useConfirm',
    name: 'useConfirm',
    summary: 'Await a yes/no dialog.',
    whenToUse: 'Use before destructive actions like delete.',
    category: 'App',
    description: 'Promise-based confirm dialog for delete flows.',
    api: {
      signature: 'useConfirm()',
      explanation: 'Confirm dialog as a promise.',
      arguments: [],
      returns: { type: 'object', description: 'confirm + render' },
    },
    example: 'await confirm({ title: "Delete?" })',
    playgroundUrl: 'https://usethishook.mentorbridge.in/useConfirm',
    import: "import { useConfirm } from 'usethishook';",
  },
  {
    id: 'useDebounce',
    name: 'useDebounce',
    summary: 'Delay updates until the value stops changing.',
    whenToUse: 'Use for search inputs and expensive derived work.',
    category: 'State',
    description: 'Debounce a rapidly changing value such as search text.',
    api: {
      signature: 'useDebounce<T>(value: T, delayMs?: number): T',
      explanation: 'Lagged value after idle time.',
      arguments: [],
      returns: { type: 'T', description: 'Debounced value' },
    },
    example: 'const debounced = useDebounce(query, 300);',
    playgroundUrl: 'https://usethishook.mentorbridge.in/useDebounce',
    import: "import { useDebounce } from 'usethishook';",
  },
];

afterEach(() => {
  setCatalogForTests(undefined);
});

describe('catalog helpers', () => {
  it('lists and filters by category', () => {
    setCatalogForTests(sampleHooks);
    expect(listHooks()).toHaveLength(3);
    expect(listHooks('App').map((hook) => hook.id)).toEqual(['useConfirm']);
  });

  it('gets a hook by id case-insensitively', () => {
    setCatalogForTests(sampleHooks);
    expect(getHook('useboolean')?.name).toBe('useBoolean');
  });
});

describe('search and recommend', () => {
  it('ranks debounce ahead of unrelated hooks for search queries', () => {
    setCatalogForTests(sampleHooks);
    const results = searchHooks('debounce search input');
    expect(results[0]?.id).toBe('useDebounce');
  });

  it('recommends confirm for delete confirmation tasks', () => {
    setCatalogForTests(sampleHooks);
    const results = recommendHooks('await yes/no before deleting a row');
    expect(results[0]?.id).toBe('useConfirm');
  });
});
