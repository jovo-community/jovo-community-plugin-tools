import { Jovo } from '@jovotech/framework';
import { JovoCommunityToolsPluginConfig } from './JovoCommunityToolsPlugin';
import { ShuffleArray } from './tools';

export class JovoCommunityTools {
  shuffleArray: ShuffleArray;

  constructor(readonly config: JovoCommunityToolsPluginConfig, jovo: Jovo) {
    this.shuffleArray = new ShuffleArray(config, jovo.$user.data);
  }
}
