import type { ReactNode } from 'react';
import { BrandMark } from './BrandMark';
import { HookNav } from './HookNav';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  activeId?: string;
  children: ReactNode;
}

export const Layout = ({ activeId, children }: LayoutProps) => (
  <div className="min-h-screen lg:grid lg:grid-cols-[17.5rem_1fr]">
    <ThemeToggle />
    <aside className="border-b border-line bg-aside p-5 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <a href="#/" className="mb-1 inline-block">
        <BrandMark size="sm" />
      </a>
      <p className="mb-3 mt-3 text-sm leading-6 text-muted">
        Typed React hooks with live previews and a full API reference.
      </p>
      <p className="mb-6 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <a
          className="text-violet-700 underline decoration-violet-400/50 underline-offset-2 hover:decoration-violet-500 dark:text-violet-300"
          href="https://www.npmjs.com/package/usethishook"
          rel="noreferrer"
          target="_blank"
        >
          npm
        </a>
        <a
          className="text-violet-700 underline decoration-violet-400/50 underline-offset-2 hover:decoration-violet-500 dark:text-violet-300"
          href="https://github.com/senthilkumar979/useThisHook"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </p>
      <HookNav activeId={activeId} />
    </aside>
    <main className="relative py-8 pl-5 pr-14 lg:py-10 lg:pl-12 lg:pr-16">{children}</main>
  </div>
);
