import { useCopyToClipboard } from 'usethishook';

interface CodeBlockProps {
  code: string;
  label?: string;
}

export const CodeBlock = ({ code, label = 'Example' }: CodeBlockProps) => {
  const { copiedText, copy } = useCopyToClipboard();
  const isCopied = copiedText === code;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-code">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">{label}</span>
        <button
          type="button"
          className="rounded-md bg-surface px-2.5 py-1 text-xs text-fg hover:opacity-80"
          onClick={() => void copy(code)}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-6 text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
};
