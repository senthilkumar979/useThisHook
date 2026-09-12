import type { HookApi } from '../hookDoc';

export const useListApi: HookApi = {
  signature: 'useList<T extends { id: string }>(initialItems?)',
  explanation:
    'Holds an array of items with id and exposes insert, update, remove, move, and replace so list screens do not hand-spread arrays.',
  arguments: [
    {
      name: 'initialItems',
      type: 'T[]',
      optional: true,
      defaultValue: '[]',
      description: 'Starting list. Each item must have a string id.',
    },
  ],
  returns: {
    type: '{ items, insert, update, remove, move, replace, setItems }',
    description: 'The list and the mutations.',
    fields: [
      { name: 'items', type: 'T[]', description: 'Current array.' },
      {
        name: 'insert',
        type: '(item: T, index?: number) => void',
        description: 'Appends, or inserts at index.',
      },
      {
        name: 'update',
        type: '(id, patch | fn) => void',
        description: 'Merges a partial or maps one item.',
      },
      { name: 'remove', type: '(id: string) => void', description: 'Drops the item with that id.' },
      {
        name: 'move',
        type: '(fromIndex, toIndex) => void',
        description: 'Reorders one item. No-op if indexes are out of range.',
      },
      {
        name: 'replace',
        type: '(next: T[]) => void',
        description: 'Swap the whole list (for example after fetch).',
      },
    ],
  },
};

export const useSelectionApi: HookApi = {
  signature: 'useSelection({ mode, initial }?)',
  explanation:
    'Selected ids for a list or table. multiple (default) toggles membership; single keeps at most one id.',
  arguments: [
    {
      name: 'mode',
      type: "'single' | 'multiple'",
      optional: true,
      defaultValue: "'multiple'",
      description: 'Whether more than one id can be selected.',
    },
    {
      name: 'initial',
      type: 'string[]',
      optional: true,
      defaultValue: '[]',
      description: 'Ids selected on first render.',
    },
  ],
  returns: {
    type: '{ selected, isSelected, toggle, selectOnly, selectAll, clear, setSelected }',
    description: 'selected is a string[] in click order.',
    fields: [
      { name: 'selected', type: 'string[]', description: 'Currently selected ids.' },
      {
        name: 'isSelected',
        type: '(id: string) => boolean',
        description: 'Whether id is in the selection.',
      },
      {
        name: 'toggle',
        type: '(id: string) => void',
        description: 'Add/remove in multiple; replace or clear in single.',
      },
      {
        name: 'selectOnly',
        type: '(id: string) => void',
        description: 'Selection becomes exactly this id.',
      },
      {
        name: 'selectAll',
        type: '(ids: string[]) => void',
        description: 'Select these ids (first only in single mode).',
      },
      { name: 'clear', type: '() => void', description: 'Empty selection.' },
    ],
  },
};

export const useSearchStateApi: HookApi = {
  signature: 'useSearchState(defaults)',
  explanation:
    'Treat location.search as state. Keys come from defaults (all strings). Empty strings are omitted from the URL. Updates use history.replaceState so the back button is not flooded.',
  arguments: [
    {
      name: 'defaults',
      type: 'T extends Record<string, string>',
      description: 'Default query values. Keep this object stable (module scope or useMemo).',
    },
  ],
  returns: {
    type: '[values, setValues]',
    description: 'Like useState. setValues accepts a partial or a functional update.',
    fields: [
      { name: 'values', type: 'T', description: 'Current params merged on top of defaults.' },
      {
        name: 'setValues',
        type: '(partial | fn) => void',
        description: 'Writes the query string and notifies subscribers.',
      },
    ],
  },
  caveats: ['Hash routes still work; only location.search is read and written.'],
};

export const useConfirmApi: HookApi = {
  signature: 'useConfirm()',
  explanation:
    'Promise-based confirm dialog with a default UI. confirm(options) resolves true or false. You must render {render()} once in the tree.',
  arguments: [],
  returns: {
    type: '{ confirm, render }',
    description: 'Same pattern as useOverlay, with a built-in dialog.',
    fields: [
      {
        name: 'confirm',
        type: '(options: ConfirmOptions) => Promise<boolean>',
        description: 'options: title, message?, confirmLabel?, cancelLabel?, danger?.',
      },
      {
        name: 'render',
        type: '() => ReactNode',
        description: 'Place this in JSX. Null until the first confirm().',
      },
    ],
  },
};

export const usePromptApi: HookApi = {
  signature: 'usePrompt()',
  explanation:
    'Promise-based prompt for a single string. prompt(options) resolves the string or null on cancel. Render {render()} in the tree.',
  arguments: [],
  returns: {
    type: '{ prompt, render }',
    description: 'Built-in labeled input dialog.',
    fields: [
      {
        name: 'prompt',
        type: '(options: PromptOptions) => Promise<string | null>',
        description:
          'options: title, message?, label?, initialValue?, confirmLabel?, cancelLabel?.',
      },
      { name: 'render', type: '() => ReactNode', description: 'Place this in JSX.' },
    ],
  },
};
