import { Jovo } from '@jovotech/framework';
import { JovoCommunityToolsPluginConfig } from '../JovoCommunityToolsPlugin';
import _get from 'lodash.get';
import _set from 'lodash.set';
import _shuffle from 'lodash.shuffle';
import _range from 'lodash.range';
const STORE_PATH = 'jcTools.shuffleArray';

export interface ShuffleArrayEntry {
  indexes: number[];
  index: number;
}

export class ShuffleArray {
  constructor(readonly config: JovoCommunityToolsPluginConfig, readonly userData: unknown) {}
  
  private init(key: string, length: number, reset: boolean) {
    const entry = this.getEntry(key);

    if (reset || !entry || entry.indexes.length > length || entry.index >= entry.indexes.length) {
      const newEntry: ShuffleArrayEntry = {
        indexes: _shuffle(_range(length)),
        index: 0,
      };

      this.setEntry(key, newEntry);
    }
  }

  clear(key: string): void {
    this.setEntry(key, undefined);
  }

  getEntry(key: string): ShuffleArrayEntry {
    const path = `${STORE_PATH}.${key}`;
    const entry: ShuffleArrayEntry = _get(this.userData, path);

    return entry;
  }

  setEntry(key: string, entry: ShuffleArrayEntry | undefined): void {
    const path = `${STORE_PATH}.${key}`;
    _set(this.userData as any, path, entry);
  }

  getNextIndex(key: string, length: number, reset = false): number {
    this.init(key, length, reset);

    const entry = this.getEntry(key);
    const currentIndex = entry.indexes[entry.index];
    entry.index++;

    return currentIndex;
  }

  getNextItem(key: string, array: unknown[], reset = false): unknown {
    const index = this.getNextIndex(key, array.length, reset);
    return array[index];
  }
}
