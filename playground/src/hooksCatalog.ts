import { appHooks } from './appHooks';
import { browserHooks } from './browserHooks';
import { hookDescriptions } from './descriptions/hookDescriptions';
import type { HookDoc } from './hookDoc';
import { leverageHooks } from './leverageHooks';
import { stateHooks } from './stateHooks';

export type { HookDoc } from './hookDoc';

export const hooksCatalog: HookDoc[] = [
  ...stateHooks,
  ...browserHooks,
  ...appHooks,
  ...leverageHooks,
].map((hook) => {
  const description = hookDescriptions[hook.id];
  if (!description) throw new Error(`Missing description for ${hook.id}`);
  return { ...hook, description };
});

export function getHookById(id: string) {
  return hooksCatalog.find((hook) => hook.id === id);
}
