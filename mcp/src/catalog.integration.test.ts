import { describe, expect, it } from 'vitest';
import { formatHookMarkdown, getHook, listHooks, loadCatalog } from './catalog.js';
import { searchHooks } from './search.js';

describe('generated catalog', () => {
  it('loads every playground hook', () => {
    const hooks = loadCatalog();
    expect(hooks.length).toBeGreaterThanOrEqual(33);
    expect(new Set(hooks.map((hook) => hook.id)).size).toBe(hooks.length);
  });

  it('exposes fingerprint and confirm docs', () => {
    expect(getHook('useFingerprint')?.api.signature).toContain('useFingerprint');
    expect(formatHookMarkdown(getHook('useConfirm')!).includes('useConfirm')).toBe(true);
    expect(listHooks('Browser').some((hook) => hook.id === 'useFingerprint')).toBe(true);
  });

  it('finds debounce via search', () => {
    expect(searchHooks('useDebounce search input')[0]?.id).toBe('useDebounce');
  });
});
