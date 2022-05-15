import {
  Extensible,
  PluginConfig,
  Plugin,
  HandleRequest,
  InvalidParentError,
  DbPlugin,
  JovoError,
} from '@jovotech/framework';
import { JovoCommunityTools } from './JovoCommunityTools';

export type JovoCommunityToolsPluginConfig = PluginConfig;

export class JovoCommunityToolsPlugin extends Plugin<JovoCommunityToolsPluginConfig> {
  mount(parent: Extensible): Promise<void> | void {
    if (!(parent instanceof HandleRequest)) {
      throw new InvalidParentError(this.constructor.name, HandleRequest);
    }

    parent.middlewareCollection.use('dialogue.start', (jovo) => {
      jovo.$jcTools = new JovoCommunityTools(this.config, jovo);

      const dbPlugins = Object.values(jovo.$handleRequest.plugins).filter(
        (plugin) => plugin instanceof DbPlugin,
      ) as DbPlugin[];

      if (dbPlugins.length === 0) {
        throw new JovoError({
          message: 'App must configure a database integration.',
          hint: 'You can find a list of databases on https://www.jovo.tech/docs/databases',
          learnMore: 'https://github.com/jovo-community/jovo-community-plugin-tools#readme',
        });
      }
    });
  }

  getDefaultConfig(): JovoCommunityToolsPluginConfig {
    return {};
  }
}
