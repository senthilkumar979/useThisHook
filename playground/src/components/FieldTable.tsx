import type { ApiField } from '../hookDoc';

interface FieldTableProps {
  caption: string;
  emptyLabel: string;
  fields: ApiField[];
}

export const FieldTable = ({ caption, emptyLabel, fields }: FieldTableProps) => {
  if (fields.length === 0) {
    return <p className="text-sm leading-6 text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-[0.7rem] uppercase tracking-[0.14em] text-muted">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 font-medium">What it is</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.name} className="border-b border-line align-top">
              <td className="py-3 pr-4 font-mono text-[0.8rem] text-violet-700 dark:text-violet-200">
                {field.name}
                {field.optional && <span className="ml-1 text-muted">optional</span>}
              </td>
              <td className="py-3 pr-4 font-mono text-[0.8rem] text-sky-800 dark:text-sky-200/90">
                {field.type}
                {field.defaultValue && (
                  <div className="mt-1 text-[0.7rem] text-muted">default {field.defaultValue}</div>
                )}
              </td>
              <td className="py-3 leading-6 text-muted">{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
