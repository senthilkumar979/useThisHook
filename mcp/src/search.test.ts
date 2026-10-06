import { afterEach, describe, expect, it } from 'vitest';
import { getHook, listHooks, setCatalogForTests } from './catalog.js';
import { recommendHooks, searchHooks } from './search.js';
import type { HookDoc } from './types.js';

function fixture(partial: Pick<HookDoc, 'id' | 'summary' | 'whenToUse' | 'category'>): HookDoc {
  return {
    name: partial.id,
    description: partial.summary,
    api: {
      signature: `${partial.id}()`,
      explanation: partial.summary,
      arguments: [],
      returns: { type: 'unknown', description: 'Hook return value' },
    },
    example: `const value = ${partial.id}();`,
    playgroundUrl: `https://usethishook.mentorbridge.in/${partial.id}`,
    import: `import { ${partial.id} } from 'usethishook';`,
    ...partial,
  };
}

const sampleHooks: HookDoc[] = [
  fixture({
    id: 'useBoolean',
    summary: 'Boolean state with toggle helpers.',
    whenToUse: 'Use for panels, switches, and any on/off UI.',
    category: 'State',
  }),
  fixture({
    id: 'useConfirm',
    summary: 'Await a yes/no dialog.',
    whenToUse: 'Use before destructive actions like delete.',
    category: 'App',
  }),
  fixture({
    id: 'useDebounce',
    summary: 'Delay updates until the value stops changing.',
    whenToUse: 'Use for search inputs and expensive derived work.',
    category: 'State',
  }),
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
