import { JovoCommunityToolsPluginConfig } from '../JovoCommunityToolsPlugin';
import _get from 'lodash.get';
import _set from 'lodash.set';

const MINUTES_IN_DAY = 60 * 24;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const STORE_PATH = 'jcTools.rechargeCounter';

export interface RechargeCounterEntry {
  max: number;
  times: number[];
  rechargeMinutes: number;
}

export class RechargeCounter {
  constructor(readonly config: JovoCommunityToolsPluginConfig, readonly userData: unknown) {}

  private init(key: string) {
    const entry = this.getEntry(key);

    if (!entry) {
      const newEntry: RechargeCounterEntry = {
        max: 10,
        times: [],
        rechargeMinutes: MINUTES_IN_DAY,
      };

      this.setEntry(key, newEntry);
    }
  }

  private getMinutesSinceEpoch(): number {
    return Math.round(new Date().getTime() / MILLISECONDS_IN_MINUTE);
  }

  private removeExpired(key: string): void {
    const entry = this.getEntry(key);
    const now = this.getMinutesSinceEpoch();

    // get only times that are still active
    const active = entry.times.filter((t) => now - t < entry.rechargeMinutes);
    entry.times = active;
  }

  getEntry(key: string): RechargeCounterEntry {
    const path = `${STORE_PATH}.${key}`;
    const entry: RechargeCounterEntry = _get(this.userData, path);

    return entry;
  }

  setEntry(key: string, entry: RechargeCounterEntry | undefined): void {
    const path = `${STORE_PATH}.${key}`;
    _set(this.userData as any, path, entry);
  }

  reset(key: string): void {
    this.init(key);
    const path = `${STORE_PATH}.${key}.times`;
    _set(this.userData as any, path, []);
  }

  // getMax(key: string): number {
  //   this.init(key);
  //   const entry = this.getEntry(key);

  //   return entry.max;
  // }

  setMax(key: string, max: number): void {
    this.init(key);
    this.removeExpired(key);

    const entry = this.getEntry(key);
    entry.max = max;
    const length = entry.times.length;

    if (max < length) {
      // remove the oldest entries from entry.times
      entry.times = entry.times.slice((length - max) * -1);
    }
  }

  setRechargeMinutes(key: string, minutes: number): void {
    this.init(key);
    const entry = this.getEntry(key);
    entry.rechargeMinutes = minutes;
  }

  getCount(key: string): number {
    this.init(key);
    this.removeExpired(key);

    const entry = this.getEntry(key);

    return entry.max - entry.times.length;
  }

  subtract(key: string): boolean {
    this.init(key);
    this.removeExpired(key);
    let success = false;

    if (this.getCount(key) > 0) {
      const now = this.getMinutesSinceEpoch();
      const entry = this.getEntry(key);

      entry.times.push(now);

      success = true;
    }

    return success;
  }

  getNextRechargeInMinutes(key: string): number {
    this.init(key);
    let nextRechargeMinutes = 0;

    // getCount calls removeExpired
    if (this.getCount(key) === 0) {
      const entry = this.getEntry(key);

      const sorted = entry.times.sort((a, b) => {
        // sort ascending
        return a - b;
      });

      const oldest = sorted[0];
      const now = this.getMinutesSinceEpoch();

      const minutesAgo = now - oldest;
      nextRechargeMinutes = Math.max(0, entry.rechargeMinutes - minutesAgo);
    }

    return nextRechargeMinutes;
  }
}
