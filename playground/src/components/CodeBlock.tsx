import { useCopyToClipboard } from 'usethishook';

interface CodeBlockProps {
  code: string;
  label?: string;
}

export const CodeBlock = ({ code, label = 'Example' }: CodeBlockProps) => {
  const { copiedText, copy } = useCopyToClipboard();
  const isCopied = copiedText === code;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#09090b]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-zinc-500">{label}</span>
        <button
          type="button"
          className="rounded-md bg-white/10 px-2.5 py-1 text-xs text-zinc-200 hover:bg-white/15"
          onClick={() => void copy(code)}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-6 text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};
