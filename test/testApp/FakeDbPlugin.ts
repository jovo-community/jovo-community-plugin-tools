/* eslint-disable @typescript-eslint/no-unused-vars */

import { DbPlugin, DbPluginConfig, Jovo } from '@jovotech/framework';

export class FakeDbPlugin extends DbPlugin {
  constructor(config?: DbPluginConfig) {
    super(config);
  }

  getDefaultConfig(): DbPluginConfig {
    return {
      ...super.getDefaultConfig(),
    };
  }

  async loadData(userId: string, jovo: Jovo): Promise<void> {
    return;
  }

  async saveData(userId: string, jovo: Jovo): Promise<void> {
    return;
  }
}
