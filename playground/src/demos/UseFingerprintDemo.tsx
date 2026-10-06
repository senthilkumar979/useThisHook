import { useFingerprint } from 'usethishook';
import { buttonClass, ghostButtonClass } from '../components/styles';

export const UseFingerprintDemo = () => {
  const { visitorId, components, isPending, error, refresh } = useFingerprint();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Client-side visitor id from browser signals (canvas, WebGL, screen, locale…).
      </p>
      <p className="font-mono text-sm break-all">
        {isPending ? 'Identifying…' : (visitorId ?? 'No visitor id yet')}
      </p>
      {error && <p className="text-sm text-rose-400">{error.message}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={() => void refresh()}>
          Refresh id
        </button>
        <button
          type="button"
          className={ghostButtonClass}
          onClick={() => {
            if (visitorId) void navigator.clipboard?.writeText(visitorId);
          }}
          disabled={!visitorId}
        >
          Copy id
        </button>
      </div>
      {components && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-muted">
          <dt>platform</dt>
          <dd className="font-mono text-fg">{components.platform}</dd>
          <dt>timezone</dt>
          <dd className="font-mono text-fg">{components.timezone}</dd>
          <dt>screen</dt>
          <dd className="font-mono text-fg">{components.screenResolution}</dd>
          <dt>webgl</dt>
          <dd className="font-mono text-fg truncate">{components.webgl}</dd>
        </dl>
      )}
    </div>
  );
};

export const useFingerprintExample = `import { useFingerprint } from 'usethishook';

export const VisitorBadge = () => {
  const { visitorId, isPending, refresh } = useFingerprint();

  if (isPending) return <span>Identifying…</span>;

  return (
    <div>
      <code>{visitorId}</code>
      <button type="button" onClick={() => void refresh()}>
        Refresh
      </button>
    </div>
  );
};`;
