import { Jovo } from '@jovotech/framework';
import { JovoCommunityToolsPluginConfig } from './JovoCommunityToolsPlugin';
import { ShuffleArray, StreakCounter } from './tools';

export class JovoCommunityTools {
  shuffleArray: ShuffleArray;
  streakCounter: StreakCounter;

  constructor(readonly config: JovoCommunityToolsPluginConfig, jovo: Jovo) {
    this.shuffleArray = new ShuffleArray(config, jovo.$user.data);
    this.streakCounter = new StreakCounter(config, jovo.$user.data);
  }
}
