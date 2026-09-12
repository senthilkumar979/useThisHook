import { hooksCatalog } from '../hooksCatalog';

interface HookNavProps {
  activeId?: string;
}

export const HookNav = ({ activeId }: HookNavProps) => {
  const groups = ['State', 'Browser', 'App'] as const;

  return (
    <nav className="flex max-h-[70vh] flex-col gap-5 overflow-auto pr-1 lg:max-h-[calc(100vh-11rem)]">
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-2 px-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
            {group}
          </p>
          <div className="flex flex-col gap-0.5">
            {hooksCatalog
              .filter((hook) => hook.category === group)
              .map((hook) => {
                const isActive = hook.id === activeId;
                return (
                  <a
                    key={hook.id}
                    href={`#/${hook.id}`}
                    className={`rounded-lg px-2.5 py-1.5 font-mono text-[0.8rem] ${
                      isActive
                        ? 'bg-violet-500/15 text-fg shadow-[inset_0_0_0_1px_rgba(139,92,246,0.35)]'
                        : 'text-muted hover:bg-code hover:text-fg'
                    }`}
                  >
                    {hook.name}
                  </a>
                );
              })}
          </div>
        </div>
      ))}
    </nav>
  );
};
