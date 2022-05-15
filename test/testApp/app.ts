import { App } from '@jovotech/framework';
import { JovoCommunityToolsPlugin } from '../../src/JovoCommunityToolsPlugin';
import { FakeDbPlugin } from './FakeDbPlugin';
import { GlobalComponent } from './GlobalComponent';

const app = new App({
  components: [GlobalComponent],

  plugins: [new FakeDbPlugin(), new JovoCommunityToolsPlugin()],
});

export { app };
