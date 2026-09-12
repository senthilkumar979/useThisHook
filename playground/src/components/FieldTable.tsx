import type { ApiField } from '../hookDoc';

interface FieldTableProps {
  caption: string;
  emptyLabel: string;
  fields: ApiField[];
}

export const FieldTable = ({ caption, emptyLabel, fields }: FieldTableProps) => {
  if (fields.length === 0) {
    return <p className="text-sm leading-6 text-zinc-400">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-white/10 text-[0.7rem] uppercase tracking-[0.14em] text-zinc-500">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 font-medium">What it is</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.name} className="border-b border-white/5 align-top">
              <td className="py-3 pr-4 font-mono text-[0.8rem] text-violet-200">
                {field.name}
                {field.optional && <span className="ml-1 text-zinc-500">optional</span>}
              </td>
              <td className="py-3 pr-4 font-mono text-[0.8rem] text-sky-200/90">
                {field.type}
                {field.defaultValue && (
                  <div className="mt-1 text-[0.7rem] text-zinc-500">default {field.defaultValue}</div>
                )}
              </td>
              <td className="py-3 leading-6 text-zinc-300">{field.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
