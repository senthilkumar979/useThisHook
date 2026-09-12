import type { ReactNode } from 'react';

interface PreviewCardProps {
  children: ReactNode;
}

export const PreviewCard = ({ children }: PreviewCardProps) => (
  <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_80px_-40px_rgba(56,189,248,0.35)]">
    <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
      <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
      <span className="h-2.5 w-2.5 rounded-full bg-muted/50" />
      <span className="ml-3 text-[0.7rem] uppercase tracking-[0.16em] text-muted">Preview</span>
    </div>
    <div className="p-6 text-fg">{children}</div>
  </div>
);
