import { Jovo } from '@jovotech/framework';
import {
  JovoCommunityToolsPlugin,
  JovoCommunityToolsPluginConfig,
} from './JovoCommunityToolsPlugin';
import { ShuffleArray } from './tools';

export class JovoCommunityTools {
  shuffleArray: ShuffleArray;

  constructor(readonly plugin: JovoCommunityToolsPlugin, jovo: Jovo) {
    this.shuffleArray = new ShuffleArray(plugin, jovo);
  }

  get config(): JovoCommunityToolsPluginConfig {
    return this.plugin.config;
  }
}
