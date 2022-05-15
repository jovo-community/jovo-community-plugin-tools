import { Jovo } from '@jovotech/framework';
import {
  JovoCommunityToolsPlugin,
  JovoCommunityToolsPluginConfig,
} from '../JovoCommunityToolsPlugin';
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
  constructor(readonly plugin: JovoCommunityToolsPlugin, readonly jovo: Jovo) {}

  get config(): JovoCommunityToolsPluginConfig {
    return this.plugin.config;
  }

  private init(key: string, length: number, reset: boolean) {
    const existing: ShuffleArrayEntry = this.getEntry(key);

    if (
      reset ||
      !existing ||
      existing.indexes.length > length ||
      existing.index >= existing.indexes.length
    ) {
      const newEntry: ShuffleArrayEntry = {
        indexes: _shuffle(_range(length)),
        index: 0,
      };

      this.setEntry(key, newEntry);
    }
  }

  private getIndex(key: string): number {
    const entry: ShuffleArrayEntry = this.jovo.$user.data.jcTools.shuffleArray[key];
    const current = entry.indexes[entry.index];
    entry.index++;

    return current;
  }

  clear(key: string): void {
    this.setEntry(key, undefined);
  }

  getEntry(key: string): ShuffleArrayEntry {
    const path = `${STORE_PATH}.${key}`;
    const existing: ShuffleArrayEntry = _get(this.jovo.$user.data, path);

    return existing;
  }

  setEntry(key: string, entry: ShuffleArrayEntry | undefined): void {
    const path = `${STORE_PATH}.${key}`;
    _set(this.jovo.$user.data, path, entry);
  }

  getNextIndex(key: string, length: number, reset = false): number {
    this.init(key, length, reset);
    return this.getIndex(key);
  }

  getNextItem(key: string, array: unknown[], reset = false): unknown {
    const index = this.getNextIndex(key, array.length, reset);
    return array[index];
  }
}
