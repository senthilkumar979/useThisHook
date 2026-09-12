import type { HookCategory } from '../hookDoc';

interface NavGroupHeaderProps {
  category: HookCategory;
  count: number;
}

const styles: Record<HookCategory, string> = {
  State: 'bg-violet-500/15 text-violet-800 ring-violet-400/35 dark:text-violet-200',
  Browser: 'bg-sky-500/15 text-sky-800 ring-sky-400/35 dark:text-sky-200',
  App: 'bg-emerald-500/15 text-emerald-800 ring-emerald-400/35 dark:text-emerald-200',
};

const hints: Record<HookCategory, string> = {
  State: 'Values and timing',
  Browser: 'Window and device',
  App: 'Forms and flows',
};

export const NavGroupHeader = ({ category, count }: NavGroupHeaderProps) => (
  <div className={`mb-2 flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 ring-1 ${styles[category]}`}>
    <div>
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]">{category}</p>
      <p className="text-[0.65rem] font-normal tracking-normal opacity-80">{hints[category]}</p>
    </div>
    <span className="rounded-full bg-surface/80 px-1.5 py-0.5 text-[0.65rem] tabular-nums text-fg">
      {count}
    </span>
  </div>
);
