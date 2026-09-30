import { useEffect } from 'react';
import { useDisclosure } from 'usethishook';
import { homeHref } from '../hookHref';
import { BrandMark } from './BrandMark';
import { HookNav } from './HookNav';
import { SiteLinks } from './SiteLinks';

interface MobileNavProps {
  activeId?: string;
}

export const MobileNav = ({ activeId }: MobileNavProps) => {
  const { isOpen, toggle, close } = useDisclosure();

  useEffect(() => {
    close();
  }, [activeId, close]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-aside/95 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 pr-16">
        <a href={homeHref()} className="min-w-0 shrink" onClick={close}>
          <BrandMark size="sm" />
        </a>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium text-fg hover:bg-code"
          aria-expanded={isOpen}
          aria-controls="mobile-hook-nav"
          onClick={toggle}
        >
          Hooks
          <ChevronIcon open={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div
          id="mobile-hook-nav"
          className="max-h-[min(70vh,32rem)] overflow-y-auto border-t border-line px-4 pb-4 pt-3"
        >
          <p className="mb-3 text-sm leading-6 text-muted">
            Typed React hooks with live previews and a full API reference.
          </p>
          <SiteLinks className="mb-5" />
          <HookNav activeId={activeId} />
        </div>
      )}
    </header>
  );
};

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 7.5 10 12.5 15 7.5" />
  </svg>
);
