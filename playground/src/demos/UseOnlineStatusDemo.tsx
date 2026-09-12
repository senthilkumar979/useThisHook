import { useOnlineStatus } from 'usethishook';

export const UseOnlineStatusDemo = () => {
  const isOnline = useOnlineStatus();

  return (
    <p>
      Browser status:{' '}
      <span className={isOnline ? 'text-emerald-400' : 'text-rose-400'}>
        {isOnline ? 'online' : 'offline'}
      </span>
    </p>
  );
};

export const useOnlineStatusExample = `import { useOnlineStatus } from 'usethishook';

export const ConnectionBadge = () => {
  const isOnline = useOnlineStatus();
  return <span>{isOnline ? 'Online' : 'Offline'}</span>;
};`;
