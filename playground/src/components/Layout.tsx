import type { ReactNode } from 'react';
import { BrandMark } from './BrandMark';
import { HookNav } from './HookNav';

interface LayoutProps {
  activeId?: string;
  children: ReactNode;
}

export const Layout = ({ activeId, children }: LayoutProps) => (
  <div className="min-h-screen lg:grid lg:grid-cols-[17.5rem_1fr]">
    <aside className="border-b border-white/10 bg-zinc-950/90 p-5 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <a href="#/" className="mb-1 inline-block">
        <BrandMark size="sm" />
      </a>
      <p className="mb-6 mt-3 text-sm leading-6 text-zinc-400">
        Typed React hooks with live previews and a full API reference.
      </p>
      <HookNav activeId={activeId} />
    </aside>
    <main className="relative px-5 py-8 lg:px-12 lg:py-10">{children}</main>
  </div>
);
