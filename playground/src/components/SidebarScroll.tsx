import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { ReactNode } from 'react';

interface SidebarScrollProps {
  children: ReactNode;
}

export const SidebarScroll = ({ children }: SidebarScrollProps) => (
  <ScrollArea.Root className="min-h-40 flex-1 overflow-hidden lg:min-h-0">
    <ScrollArea.Viewport className="h-full max-h-[70vh] pr-2 lg:max-h-none">{children}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex w-2.5 touch-none select-none bg-transparent p-0.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="relative flex-1 rounded-full bg-line" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);
