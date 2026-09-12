import { useFields } from 'usethishook';
import { buttonClass, ghostButtonClass, inputClass } from '../components/styles';

const schema = {
  safeParse: (data: unknown) => {
    const values = data as { email: string; name: string };
    if (!values.email.includes('@')) {
      return {
        success: false as const,
        error: { issues: [{ path: ['email'] as Array<string | number>, message: 'Enter a valid email' }] },
      };
    }
    return { success: true as const, data: values };
  },
};

const initial = { name: '', email: '' };

export const UseFieldsDemo = () => {
  const form = useFields(initial, schema);

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        form.submit(() => undefined);
      }}
    >
      <input
        className={inputClass}
        placeholder="Name"
        value={form.values.name}
        onChange={(event) => form.setField('name', event.target.value)}
      />
      <input
        className={inputClass}
        placeholder="Email"
        value={form.values.email}
        onChange={(event) => form.setField('email', event.target.value)}
      />
      {form.errors.email && <p className="text-sm text-rose-300">{form.errors.email}</p>}
      <p className="text-sm text-zinc-400">{form.isDirty ? 'Unsaved changes' : 'Clean'}</p>
      <div className="flex gap-2">
        <button type="submit" className={buttonClass}>
          Submit
        </button>
        <button type="button" className={ghostButtonClass} onClick={form.reset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export const useFieldsExample = `import { useFields } from 'usethishook';

export const Invite = () => {
  const form = useFields({ email: '' }, schema);
  return (
    <input value={form.values.email} onChange={(event) => form.setField('email', event.target.value)} />
  );
};`;
