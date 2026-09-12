import { appDescriptions } from './appDescriptions';
import { browserDescriptions } from './browserDescriptions';
import { coreDescriptions } from './coreDescriptions';

export const hookDescriptions: Record<string, string> = {
  ...coreDescriptions,
  ...browserDescriptions,
  ...appDescriptions,
};
