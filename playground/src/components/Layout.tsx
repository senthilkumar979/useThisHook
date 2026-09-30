import type { ReactNode } from 'react';
import { homeHref } from '../hookHref';
import { BrandMark } from './BrandMark';
import { HookNav } from './HookNav';
import { MobileNav } from './MobileNav';
import { SidebarScroll } from './SidebarScroll';
import { SiteFooter } from './SiteFooter';
import { SiteLinks } from './SiteLinks';
import { ThemeToggle } from './ThemeToggle';

interface LayoutProps {
  activeId?: string;
  children: ReactNode;
}

export const Layout = ({ activeId, children }: LayoutProps) => (
  <div className="min-h-screen lg:grid lg:grid-cols-[17.5rem_1fr]">
    <ThemeToggle />
    <MobileNav activeId={activeId} />
    <aside className="hidden flex-col border-r border-line bg-aside p-5 backdrop-blur lg:sticky lg:top-0 lg:flex lg:h-screen">
      <a href={homeHref()} className="mb-1 inline-block">
        <BrandMark size="sm" />
      </a>
      <p className="mb-3 mt-3 text-sm leading-6 text-muted">
        Typed React hooks with live previews and a full API reference.
      </p>
      <SiteLinks className="mb-6" />
      <SidebarScroll>
        <HookNav activeId={activeId} />
      </SidebarScroll>
    </aside>
    <main className="relative py-8 pl-5 pr-14 lg:py-10 lg:pl-12 lg:pr-16">
      {children}
      <SiteFooter />
    </main>
  </div>
);
