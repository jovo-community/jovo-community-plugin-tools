import { JovoCommunityToolsPluginConfig } from '../JovoCommunityToolsPlugin';
import _get from 'lodash.get';
import _set from 'lodash.set';

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const STORE_PATH = 'jcTools.streakCounter';

export interface StreakCounterEntry {
  count: number;
  lastDay: number;
}

export class StreakCounter {
  constructor(readonly config: JovoCommunityToolsPluginConfig, readonly userData: unknown) {}

  private init(key: string) {
    const entry = this.getEntry(key);

    if (!entry) {
      const newEntry: StreakCounterEntry = {
        count: 1,
        lastDay: this.getDaysSinceEpoch(),
      };

      this.setEntry(key, newEntry);
    }
  }

  private getDaysSinceEpoch(): number {
    return Math.round(new Date().getTime() / MILLISECONDS_IN_DAY);
  }

  getEntry(key: string): StreakCounterEntry {
    const path = `${STORE_PATH}.${key}`;
    const entry: StreakCounterEntry = _get(this.userData, path);

    return entry;
  }

  setEntry(key: string, entry: StreakCounterEntry | undefined): void {
    const path = `${STORE_PATH}.${key}`;
    _set(this.userData as any, path, entry);
  }

  reset(key: string): void {
    this.setEntry(key, undefined);
    this.init(key);
  }

  getCount(key: string): number {
    this.init(key);

    const entry = this.getEntry(key);

    const now = this.getDaysSinceEpoch();
    const diff = now - entry.lastDay;

    if (diff === 1) {
      const newEntry: StreakCounterEntry = {
        count: entry.count++,
        lastDay: now,
      };
      
      this.setEntry(key, newEntry);
    } else if (diff > 1) {
      this.reset(key);
    }

    return this.getEntry(key).count;
  }
}
